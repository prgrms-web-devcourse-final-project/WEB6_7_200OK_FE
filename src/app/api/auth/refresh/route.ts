import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { setAuthCookies, clearAuthCookies } from "@/shared/lib/utils/auth/cookie-options";
import { refreshCookie } from "@/shared/lib/utils/auth/refresh-cookie";

export const dynamic = "force-dynamic"; // route.ts를 캐싱하지 않도록 설정

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const rawCallbackUrl = request.nextUrl.searchParams.get("callbackUrl");
  let callbackUrl = "/"; // 입력된 callbackUrl이 잘못되었으면 홈으로 리다이렉트
  if (rawCallbackUrl && rawCallbackUrl.startsWith("/") && !rawCallbackUrl.startsWith("//")) {
    callbackUrl = rawCallbackUrl;
  }

  if (!refreshToken) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("callbackUrl", callbackUrl);
    return NextResponse.redirect(loginUrl);
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
