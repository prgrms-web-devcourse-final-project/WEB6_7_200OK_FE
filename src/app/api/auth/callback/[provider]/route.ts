import { NextRequest, NextResponse } from "next/server";

import { setAuthCookies } from "@/shared/lib/utils/auth/cookie-options";

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

  if (error) {
    return NextResponse.redirect(new URL(`/auth/login?error=oauth_${error}`, request.url));
  }

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

    const nextResponse = NextResponse.redirect(new URL("/", request.url));

    setAuthCookies(nextResponse, { accessToken, refreshToken, userId });

    return nextResponse;
  } catch {
    return NextResponse.redirect(new URL("/auth/login?error=server_error", request.url));
  }
}
