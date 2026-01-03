import { NextResponse } from "next/server";

const isProduction = process.env.NODE_ENV === "production";

const COOKIE_DOMAIN = isProduction ? ".wind-fall.store" : undefined;

export const COOKIE_OPTIONS = {
  ACCESS_TOKEN: {
    name: "accessToken",
    options: {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? ("none" as const) : ("lax" as const),
      path: "/",
      maxAge: 60 * 60,
      domain: COOKIE_DOMAIN,
    },
  },
  REFRESH_TOKEN: {
    name: "refreshToken",
    options: {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? ("none" as const) : ("lax" as const),
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      domain: COOKIE_DOMAIN,
    },
  },
  USER_ID: {
    name: "userId",
    options: {
      httpOnly: false,
      secure: isProduction,
      sameSite: isProduction ? ("none" as const) : ("lax" as const),
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      domain: COOKIE_DOMAIN,
    },
  },
};

export function setAuthCookies(
  response: NextResponse,
  data: { accessToken: string; refreshToken: string; userId: string | number }
) {
  response.cookies.set(
    COOKIE_OPTIONS.ACCESS_TOKEN.name,
    data.accessToken,
    COOKIE_OPTIONS.ACCESS_TOKEN.options
  );

  response.cookies.set(
    COOKIE_OPTIONS.REFRESH_TOKEN.name,
    data.refreshToken,
    COOKIE_OPTIONS.REFRESH_TOKEN.options
  );

  response.cookies.set(
    COOKIE_OPTIONS.USER_ID.name,
    String(data.userId),
    COOKIE_OPTIONS.USER_ID.options
  );
}

export function clearAuthCookies(response: NextResponse) {
  response.cookies.delete("accessToken");
  response.cookies.delete("refreshToken");
  response.cookies.delete("userId");
}
