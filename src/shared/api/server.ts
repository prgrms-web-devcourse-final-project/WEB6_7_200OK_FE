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

  const response = await globalThis.fetch(url, {
    ...init,

    headers: {
      ...(hasBody ? { "Content-Type": "application/json" } : {}),
      ...(init?.headers ?? {}),
    },

    body: hasBody ? JSON.stringify(init.body) : undefined,
    cache: init?.cache ?? "no-store",
  });

  return response.json() as Promise<ApiResponseType<TResponse>>;
}
