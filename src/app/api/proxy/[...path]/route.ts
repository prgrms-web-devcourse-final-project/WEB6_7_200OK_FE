import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { setAuthCookies, clearAuthCookies } from "@/shared/lib/utils/auth/cookie-options";
import { refreshCookie } from "@/shared/lib/utils/auth/refresh-cookie";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Vercel 함수 설정
export const maxDuration = 60; // 파일 업로드 시 타임아웃 방지 (최대 실행 시간 60초)

async function getRequestBody(req: NextRequest): Promise<{
  body: string | ArrayBuffer | null;
  isFormData: boolean;
}> {
  const contentType = req.headers.get("content-type");

  if (contentType?.includes("application/json")) {
    try {
      return { body: JSON.stringify(await req.json()), isFormData: false };
    } catch (error) {
      console.error("JSON 파싱 실패:", error);
      return { body: null, isFormData: false };
    }
  }

  if (contentType?.includes("multipart/form-data")) {
    try {
      const arrayBuffer = await req.arrayBuffer();
      // FormData 읽기 성공
      return { body: arrayBuffer, isFormData: true };
    } catch (error) {
      console.error("FormData 읽기 실패:", error);
      throw new Error("FormData 처리 중 오류가 발생했습니다.");
    }
  }

  try {
    const arrayBuffer = await req.arrayBuffer();
    return { body: arrayBuffer.byteLength > 0 ? arrayBuffer : null, isFormData: false };
  } catch (error) {
    console.error("Request body 읽기 실패:", error);
    return { body: null, isFormData: false };
  }
}

async function proxyHandler(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  const pathString = path.join("/");
  const searchParams = req.nextUrl.search;
  const apiUrl = `${API_BASE_URL}/${pathString}${searchParams}`;

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  let requestBody;
  try {
    requestBody = await getRequestBody(req);
  } catch (error) {
    console.error("[Proxy] Request body 처리 실패:", error);
    return NextResponse.json(
      {
        error: "Request body 처리에 실패했습니다.",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 400 }
    );
  }

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
    if (req.headers.get("content-length")) {
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

  try {
    let apiResponse = await fetch(apiUrl, {
      method: req.method,
      headers,
      body: requestBody.body,
      cache: "no-store",
    });

    if (apiResponse.status === 403) {
      const errorText = await apiResponse.text();
      console.error(`[Proxy] 403 Forbidden 발생:`, errorText);
      return NextResponse.json(
        {
          error: "접근 권한이 없습니다.",
          message: errorText,
          code: 403,
        },
        { status: 403 }
      );
    }

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

    return new NextResponse(apiResponse.body, {
      status: apiResponse.status,
      headers: apiResponse.headers,
    });
  } catch (error) {
    console.error("[Proxy] 치명적 오류:", error);
    console.error("[Proxy] 오류 상세:", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      apiUrl,
      method: req.method,
    });

    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: error instanceof Error ? error.message : "Unknown error",
        code: 500,
      },
      { status: 500 }
    );
  }
}

export {
  proxyHandler as GET,
  proxyHandler as POST,
  proxyHandler as PUT,
  proxyHandler as DELETE,
  proxyHandler as PATCH,
};
