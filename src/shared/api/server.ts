import { cookies } from "next/headers";

import type { ApiResponseType } from "@/shared/api/types/response";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface StrictRequestInit<TRequest> extends Omit<RequestInit, "body"> {
  body?: TRequest;
}

export async function fetch<TResponse, TRequest = unknown>(
  path: string,
  init?: StrictRequestInit<TRequest>
): Promise<ApiResponseType<TResponse>> {
  const url = new URL(path, API_URL);

  const hasBody = init?.body !== undefined;
  const headerStore = new Headers(init?.headers);
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (accessToken && !headerStore.has("Authorization")) {
    headerStore.set("Authorization", `Bearer ${accessToken}`);
  }

  if (!headerStore.has("Cookie")) {
    const requestCookies = [];

    if (accessToken) requestCookies.push(`accessToken=${accessToken}`);
    if (refreshToken) requestCookies.push(`refreshToken=${refreshToken}`);

    if (requestCookies.length > 0) {
      headerStore.set("Cookie", requestCookies.join("; "));
    }
  }

  const response = await globalThis.fetch(url, {
    ...init,

    headers: {
      ...(hasBody ? { "Content-Type": "application/json" } : {}),
      ...Object.fromEntries(headerStore.entries()),
    },

    body: hasBody ? JSON.stringify(init.body) : undefined,
    cache: init?.cache ?? "no-store",
  });

  return response.json();
}
