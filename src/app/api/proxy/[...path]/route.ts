import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const COOKIE_OPTIONS = {
  ACCESS_TOKEN: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 60,
  },
  REFRESH_TOKEN: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  },
};

interface RefreshResponse {
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

async function getRequestBody(req: NextRequest): Promise<string | ArrayBuffer | null> {
  const contentType = req.headers.get("content-type");

  if (contentType?.includes("application/json")) {
    try {
      return JSON.stringify(await req.json());
    } catch {
      return null;
    }
  }

  // 파일 업로드 등의 경우 ArrayBuffer로 처리
  const arrayBuffer = await req.arrayBuffer();
  return arrayBuffer.byteLength > 0 ? arrayBuffer : null;
}

function clearAuthCookies(response: NextResponse) {
  response.cookies.delete("accessToken");
  response.cookies.delete("refreshToken");
}

async function proxyHandler(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;

  const pathString = path.join("/");
  const searchParams = req.nextUrl.search;
  const backendUrl = `${API_BASE_URL}/${pathString}${searchParams}`;

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const headers = new Headers(req.headers);
  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  // 불필요한 헤더 삭제, 재시도 시 문제 방지
  headers.delete("host");
  headers.delete("cookie");
  headers.delete("content-length");

  // Body 읽기, 한 번만 읽고 재사용
  const requestBody = await getRequestBody(req);

  try {
    let backendRes = await fetch(backendUrl, {
      method: req.method,
      headers,
      body: requestBody,
      cache: "no-store",
    });

    if (backendRes.status === 401 && refreshToken) {
      const refreshRes = await fetch(`${API_BASE_URL}/api/v1/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
        cache: "no-store",
      });

      // 토큰이 만료되었거나 문제가 있다면 삭제
      if (!refreshRes.ok) {
        console.error("❌ Refresh token failed or expired.");

        const response = NextResponse.json(
          { error: "Session expired. Please login again." },
          { status: 401 }
        );
        clearAuthCookies(response);
        return response;
      }

      const refreshData: RefreshResponse = await refreshRes.json();
      const newAccessToken = refreshData.data.accessToken;
      const newRefreshToken = refreshData.data.refreshToken;

      // 새로운 액세스 토큰으로 재요청
      headers.set("Authorization", `Bearer ${newAccessToken}`);

      backendRes = await fetch(backendUrl, {
        method: req.method,
        headers,
        body: requestBody,
        cache: "no-store",
      });

      if (backendRes.status === 401) {
        console.error("❌ Request failed even after token refresh.");
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

      return response;
    }

    return new NextResponse(backendRes.body, {
      status: backendRes.status,
      headers: backendRes.headers,
    });
  } catch (error) {
    console.error("🔥 Proxy Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// 모든 HTTP 요청에 대응
export {
  proxyHandler as GET,
  proxyHandler as POST,
  proxyHandler as PUT,
  proxyHandler as DELETE,
  proxyHandler as PATCH,
};
