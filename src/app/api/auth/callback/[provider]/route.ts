import { NextRequest, NextResponse } from "next/server";

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

interface ExchangeResponse {
  status: string;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    userId: number;
  };
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ provider: string }> }
) {
  const { provider } = await params;
  const { searchParams } = new URL(request.url);

  const code = searchParams.get("code");
  const error = searchParams.get("error");

  // OAuth provider에서 에러 발생
  if (error) {
    return NextResponse.redirect(new URL(`/auth/login?error=oauth_${error}`, request.url));
  }

  // Authorization code가 없는 경우
  if (!code) {
    return NextResponse.redirect(new URL("/auth/login?error=missing_code", request.url));
  }

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiBaseUrl) {
    return NextResponse.redirect(new URL("/auth/login?error=server_config", request.url));
  }

  try {
    const response = await fetch(`${apiBaseUrl}/api/v1/auth/exchange/${provider}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.redirect(
        new URL(`/auth/login?error=exchange_failed&status=${response.status}`, request.url)
      );
    }

    const result: ExchangeResponse = await response.json();

    const { accessToken, refreshToken, userId } = result.data;

    if (!accessToken || !refreshToken) {
      return NextResponse.redirect(new URL("/auth/login?error=invalid_tokens", request.url));
    }

    // 홈으로 redirect 및 쿠키 설정
    const nextResponse = NextResponse.redirect(new URL("/", request.url));

    nextResponse.cookies.set("accessToken", accessToken, COOKIE_OPTIONS.ACCESS_TOKEN);
    nextResponse.cookies.set("refreshToken", refreshToken, COOKIE_OPTIONS.REFRESH_TOKEN);

    if (userId) {
      nextResponse.cookies.set("userId", String(userId), COOKIE_OPTIONS.USER_ID);
    }

    return nextResponse;
  } catch {
    return NextResponse.redirect(new URL("/auth/login?error=server_error", request.url));
  }
}
