import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

async function validateTokens(cookieHeader: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/validate-tokens`, {
      headers: { cookie: cookieHeader },
      cache: "no-store",
    });
    const result = await response.json();
    return response.ok && Boolean(result.data);
  } catch {
    return false;
  }
}

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const userId = request.cookies.get("userId")?.value;

  let isAuthenticated = false;

  if (accessToken) {
    const cookieHeader = request.headers.get("cookie") || "";
    isAuthenticated = await validateTokens(cookieHeader);
  }

  if (!isAuthenticated && refreshToken) {
    const refreshUrl = new URL("/api/auth/refresh", request.url);
    refreshUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(refreshUrl);
  }

  if (pathname.startsWith("/users/me")) {
    if (!isAuthenticated || !userId) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    const newPath = pathname.replace("/users/me", `/users/${userId}`);
    return NextResponse.rewrite(new URL(newPath, request.url));
  }

  if (pathname === "/auth/login" && isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/login", "/users/me", "/users/me/:path*"],
};
