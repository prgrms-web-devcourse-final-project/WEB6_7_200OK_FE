import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

interface AuthValidationResponse {
  status: string;
  message: string;
  data: boolean;
}

async function checkAuth(request: NextRequest): Promise<boolean> {
  try {
    const cookieHeader = request.headers.get("cookie");

    if (!cookieHeader || cookieHeader.trim() === "") {
      return false;
    }

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiBaseUrl) {
      console.error("Auth check error: NEXT_PUBLIC_API_URL is not defined");
      return false;
    }

    const response = await fetch(`${apiBaseUrl}/api/v1/auth/validate-tokens`, {
      headers: { cookie: cookieHeader },
      cache: "no-store",
    });

    if (!response.ok) {
      return false;
    }

    const result: AuthValidationResponse = await response.json();
    return Boolean(result.data);
  } catch (error) {
    console.error("Auth check error:", error);
    return false;
  }
}

function getUserIdFromCookie(request: NextRequest): string | null {
  return request.cookies.get("userId")?.value || null;
}

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // users/me/[tab] -> /users/[userId]/[tab] rewrite
  if (pathname.startsWith("/users/me")) {
    const userId = getUserIdFromCookie(request);

    if (!userId) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    const newPath = pathname.replace("/users/me", `/users/${userId}`);
    return NextResponse.rewrite(new URL(newPath, request.url));
  }

  // 로그인 페이지: 인증된 사용자는 홈으로
  if (pathname === "/auth/login") {
    const isAuthenticated = await checkAuth(request);
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // 보호된 페이지: 미인증 사용자는 로그인으로
  if (pathname.startsWith("/user")) {
    const isAuthenticated = await checkAuth(request);
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/login", "/user/:path*", "/users/me/:path*"],
};
