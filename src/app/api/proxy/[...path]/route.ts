import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const isProduction = process.env.NODE_ENV === "production";

const COOKIE_OPTIONS = {
  ACCESS_TOKEN: {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? ("none" as const) : ("lax" as const),
    path: "/",
    maxAge: 60 * 60 * 24,
    domain: isProduction ? ".wind-fall.store" : undefined,
  },
  REFRESH_TOKEN: {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? ("none" as const) : ("lax" as const),
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    domain: isProduction ? ".wind-fall.store" : undefined,
  },
  USER_ID: {
    httpOnly: false,
    secure: isProduction,
    sameSite: isProduction ? ("none" as const) : ("lax" as const),
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    domain: isProduction ? ".wind-fall.store" : undefined,
  },
};

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
    } catch {
      return { body: null, isFormData: false };
    }
  }
  const arrayBuffer = await req.arrayBuffer();
  return { body: arrayBuffer.byteLength > 0 ? arrayBuffer : null, isFormData: false };
}

function clearAuthCookies(response: NextResponse) {
  response.cookies.delete("accessToken");
  response.cookies.delete("refreshToken");
  response.cookies.delete("userId");
}

async function proxyHandler(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;

  const pathString = path.join("/");
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;
  const backendUrlObj = new URL(`${API_BASE_URL}/${pathString}`);

  req.nextUrl.searchParams.forEach((value, key) => {
    backendUrlObj.searchParams.append(key, value);
  });

  const backendUrl = backendUrlObj.toString();
  const headers = new Headers(req.headers);

  // Authorization 헤더 설정
  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  headers.delete("host");
  headers.delete("cookie");
  headers.delete("content-length");

  const backendCookies = [];

  if (accessToken) backendCookies.push(`accessToken=${accessToken}`);
  if (refreshToken) backendCookies.push(`refreshToken=${refreshToken}`);
  if (backendCookies.length > 0) {
    headers.set("Cookie", backendCookies.join("; "));
  }

  const requestBody = await getRequestBody(req);

  try {
    let backendRes = await fetch(backendUrl, {
      method: req.method,
      headers,
      body: requestBody.body,
      cache: "no-store",
    });

    if (backendRes.status === 401 && refreshToken) {
      const refreshRes = await fetch(`${API_BASE_URL}/api/v1/auth/regenerate-access-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `refreshToken=${refreshToken}`,
        },
        cache: "no-store",
      });

      if (!refreshRes.ok) {
        const response = NextResponse.json(
          { error: "Session expired. Please login again." },
          { status: 401 }
        );
        clearAuthCookies(response);
        return response;
      }

      // Set-Cookie 헤더에서 새 accessToken 추출
      const setCookieHeaders = refreshRes.headers.get("set-cookie");
      let newAccessToken: string = accessToken || "";

      if (setCookieHeaders) {
        const accessTokenMatch = setCookieHeaders.match(/accessToken=([^;]+)/);
        if (accessTokenMatch) {
          const [, newToken] = accessTokenMatch;
          newAccessToken = newToken;
        }
      }

      // accessToken을 찾지 못한 경우 에러 처리
      if (!newAccessToken) {
        console.error("Failed to extract new access token from response");
        const response = NextResponse.json({ error: "Token refresh failed" }, { status: 401 });
        clearAuthCookies(response);
        return response;
      }

      const newRefreshToken = refreshToken;
      const userId = cookieStore.get("userId")?.value || "";

      headers.set("Authorization", `Bearer ${newAccessToken}`);

      const newBackendCookies = [];
      newBackendCookies.push(`accessToken=${newAccessToken}`);
      newBackendCookies.push(`refreshToken=${newRefreshToken}`);
      headers.set("Cookie", newBackendCookies.join("; "));

      backendRes = await fetch(backendUrl, {
        method: req.method,
        headers,
        body: requestBody.body,
        cache: "no-store",
      });

      if (backendRes.status === 401) {
        console.error("Request failed even after token refresh.");
        const response = NextResponse.json({ error: "Authentication failed" }, { status: 401 });
        clearAuthCookies(response);
        return response;
      }

      const response = new NextResponse(backendRes.body, {
        status: backendRes.status,
        headers: backendRes.headers,
      });

      response.cookies.set("accessToken", newAccessToken, COOKIE_OPTIONS.ACCESS_TOKEN);
      response.cookies.set("refreshToken", newRefreshToken, COOKIE_OPTIONS.REFRESH_TOKEN);
      if (userId) {
        response.cookies.set("userId", userId, COOKIE_OPTIONS.USER_ID);
      }

      return response;
    }

    return new NextResponse(backendRes.body, {
      status: backendRes.status,
      headers: backendRes.headers,
    });
  } catch {
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
