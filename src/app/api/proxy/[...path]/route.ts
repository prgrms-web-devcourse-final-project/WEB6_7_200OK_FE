import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { setAuthCookies, clearAuthCookies } from "@/shared/lib/utils/auth/cookie-options";
import { refreshCookie } from "@/shared/lib/utils/auth/refresh-cookie";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

async function getRequestBody(req: NextRequest): Promise<{
  body: string | ArrayBuffer | null;
  isFormData: boolean;
}> {
  const contentType = req.headers.get("content-type");

  if (contentType?.includes("application/json")) {
    try {
      return { body: JSON.stringify(await req.json()), isFormData: false };
    } catch {
      return { body: null, isFormData: false };
    }
  }

  if (contentType?.includes("multipart/form-data")) {
    try {
      const arrayBuffer = await req.arrayBuffer();
      return { body: arrayBuffer, isFormData: true };
    } catch (error) {
      console.error("FormData 읽기 실패:", error);
      return { body: null, isFormData: false };
    }
  }

  const arrayBuffer = await req.arrayBuffer();
  return { body: arrayBuffer.byteLength > 0 ? arrayBuffer : null, isFormData: false };
}

async function proxyHandler(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  const pathString = path.join("/");
  const searchParams = req.nextUrl.search;
  const apiUrl = `${API_BASE_URL}/${pathString}${searchParams}`;

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const requestBody = await getRequestBody(req);
  const headers = new Headers(req.headers);

  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  headers.delete("host");
  headers.delete("cookie");

  // FormData의 경우 content-length와 content-type을 보존해야 함
  if (requestBody.isFormData) {
    if (req.headers.get("content-type")) {
      headers.set("content-type", req.headers.get("content-type")!);
    }

    // ArrayBuffer의 실제 크기와 content-length가 일치하는지 확인
    if (requestBody.body instanceof ArrayBuffer) {
      const actualSize = requestBody.body.byteLength;
      const declaredSize = req.headers.get("content-length");

      // 실제 크기와 선언된 크기가 다르면 실제 크기로 업데이트
      if (declaredSize && parseInt(declaredSize, 10) !== actualSize) {
        console.warn(
          `Content-Length mismatch: declared=${declaredSize}, actual=${actualSize}. Using actual size.`
        );
        headers.set("content-length", String(actualSize));
      } else if (!declaredSize) {
        // content-length가 없으면 실제 크기로 설정
        headers.set("content-length", String(actualSize));
      } else {
        // 일치하면 그대로 사용
        headers.set("content-length", declaredSize);
      }
    } else if (req.headers.get("content-length")) {
      headers.set("content-length", req.headers.get("content-length")!);
    }
  } else {
    headers.delete("content-length");
  }

  const requestCookies = [];
  if (accessToken) requestCookies.push(`accessToken=${accessToken}`);
  if (refreshToken) requestCookies.push(`refreshToken=${refreshToken}`);
  if (requestCookies.length > 0) {
    headers.set("Cookie", requestCookies.join("; "));
  }

  let retryBody: string | ArrayBuffer | null = requestBody.body;

  if (requestBody.body instanceof ArrayBuffer) {
    retryBody = requestBody.body.slice(0);
  }

  // 요청 전 로깅 (FormData인 경우)
  if (requestBody.isFormData) {
    console.warn("[PROXY] FormData 요청 시작:", {
      url: apiUrl,
      method: req.method,
      contentType: req.headers.get("content-type"),
      contentLength: headers.get("content-length"),
      bodySize: requestBody.body instanceof ArrayBuffer ? requestBody.body.byteLength : null,
      hasAccessToken: !!accessToken,
    });
  }

  try {
    let apiResponse = await fetch(apiUrl, {
      method: req.method,
      headers,
      body: requestBody.body,
      cache: "no-store",
    });

    console.warn("[PROXY] API 응답 받음:", {
      url: apiUrl,
      status: apiResponse.status,
      statusText: apiResponse.statusText,
    });

    if (apiResponse.status === 401 && refreshToken) {
      const newAuthData = await refreshCookie(refreshToken);

      if (!newAuthData) {
        const response = NextResponse.json(
          { error: "Session expired. Please login again." },
          { status: 401 }
        );
        clearAuthCookies(response);
        return response;
      }

      const {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        userId: newUserId,
      } = newAuthData;

      headers.set("Authorization", `Bearer ${newAccessToken}`);

      const retryCookies = [];
      if (newAccessToken) retryCookies.push(`accessToken=${newAccessToken}`);
      if (newRefreshToken) retryCookies.push(`refreshToken=${newRefreshToken}`);
      if (newUserId) retryCookies.push(`userId=${newUserId}`);

      if (retryCookies.length > 0) {
        headers.set("Cookie", retryCookies.join("; "));
      }

      apiResponse = await fetch(apiUrl, {
        method: req.method,
        headers,
        body: retryBody,
        cache: "no-store",
      });

      if (apiResponse.status === 401) {
        const response = NextResponse.json(
          { error: "Session expired even after refresh." },
          { status: 401 }
        );
        clearAuthCookies(response);
        return response;
      }

      const response = new NextResponse(apiResponse.body, {
        status: apiResponse.status,
        headers: apiResponse.headers,
      });

      setAuthCookies(response, newAuthData);

      return response;
    }

    // 모든 응답에 대한 로깅 (에러 상태인 경우)
    if (!apiResponse.ok) {
      let errorMessage = "Unknown error";
      let errorData: Record<string, unknown> | null = null;

      try {
        errorData = (await apiResponse.clone().json()) as Record<string, unknown>;
        if (errorData) {
          errorMessage =
            (typeof errorData.message === "string" ? errorData.message : null) ||
            (typeof errorData.error === "string" ? errorData.error : null) ||
            JSON.stringify(errorData);
        }
      } catch {
        try {
          const errorText = await apiResponse.clone().text();
          errorMessage = errorText || "No error message";
        } catch {
          errorMessage = "Could not read error message";
        }
      }

      const logData = {
        url: apiUrl,
        method: req.method,
        status: apiResponse.status,
        contentType: req.headers.get("content-type"),
        contentLength: headers.get("content-length"),
        isFormData: requestBody.isFormData,
        hasBody: requestBody.body !== null,
        bodySize: requestBody.body instanceof ArrayBuffer ? requestBody.body.byteLength : null,
        errorMessage,
        errorData,
        responseHeaders: Object.fromEntries(apiResponse.headers.entries()),
        requestHeaders: Object.fromEntries(headers.entries()),
      };

      // 서버 콘솔에 로깅
      console.error(`[PROXY] ${apiResponse.status} Error:`, JSON.stringify(logData, null, 2));

      // 에러 상태인 경우 클라이언트에도 상세 정보를 포함한 응답 반환
      return NextResponse.json(
        {
          error: apiResponse.statusText || "Error",
          message: errorMessage,
          details: {
            url: apiUrl,
            method: req.method,
            contentType: req.headers.get("content-type"),
            contentLength: headers.get("content-length"),
            bodySize: requestBody.body instanceof ArrayBuffer ? requestBody.body.byteLength : null,
            serverError: errorData,
          },
        },
        { status: apiResponse.status }
      );
    }

    return new NextResponse(apiResponse.body, {
      status: apiResponse.status,
      headers: apiResponse.headers,
    });
  } catch (error) {
    console.error("Proxy Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export {
  proxyHandler as GET,
  proxyHandler as POST,
  proxyHandler as PUT,
  proxyHandler as DELETE,
  proxyHandler as PATCH,
};
