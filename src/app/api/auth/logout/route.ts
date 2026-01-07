import { NextResponse } from "next/server";

import { clearAuthCookies } from "@/shared/lib/utils/auth/cookie-options";

export async function POST() {
  const response = NextResponse.json({ ok: true });

  clearAuthCookies(response);

  return response;
}
