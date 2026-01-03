import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { setAuthCookies, clearAuthCookies } from "@/shared/lib/utils/auth/cookie-options";
import { refreshCookie } from "@/shared/lib/utils/auth/refresh-cookie";

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;
  const callbackUrl = request.nextUrl.searchParams.get("callbackUrl") || "/";

  if (!refreshToken) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  const authData = await refreshCookie(refreshToken);

  if (!authData) {
    const response = NextResponse.redirect(new URL("/auth/login", request.url));
    clearAuthCookies(response);
    return response;
  }

  const response = NextResponse.redirect(new URL(callbackUrl, request.url));
  setAuthCookies(response, authData);

  return response;
}
