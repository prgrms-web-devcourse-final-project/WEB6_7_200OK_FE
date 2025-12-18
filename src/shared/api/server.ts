import { cookies } from "next/headers";

import { ApiError } from "@/shared/api/error/api-error";

const API_URL = process.env.API_URL ?? "http://localhost:8080";

interface StrictRequestInit<TRequest> extends Omit<RequestInit, "body"> {
  body?: TRequest;
}

export async function fetch<TResponse, TRequest = unknown>(
  path: string,
  init?: StrictRequestInit<TRequest>
): Promise<TResponse> {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join(";");

  const res = await globalThis.fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader,
      ...(init?.headers || {}),
    },
    body: init?.body ? JSON.stringify(init.body) : undefined,
    cache: "no-store",
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));

    throw new ApiError({
      message: errorData.message || "API 호출 중 오류가 발생했습니다.",
      code: errorData.errorCode || "UNKNOWN_ERROR",
      status: res.status,
      displayMessage: errorData.userMessage,
      data: errorData,
    });
  }

  return res.json() as Promise<TResponse>;
}
