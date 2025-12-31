import type { ApiResponseType } from "./types/response";

const PROXY_BASE_URL = "/api/proxy";

export class ApiError extends Error {
  constructor(
    public code: number,
    message: string,
    public status?: number
  ) {
    super(message);
    this.name = "ApiError";
  }
}

interface StrictRequestInit<TRequest> extends Omit<RequestInit, "body"> {
  body?: TRequest | FormData;
  queryParams?: Record<string, string | number | boolean | undefined>;
}

export async function httpClient<TResponse, TRequest = unknown>(
  path: string,
  init?: StrictRequestInit<TRequest>
): Promise<ApiResponseType<TResponse>> {
  const requestPath = path;
  const url = new URL(`${PROXY_BASE_URL}${requestPath}`, window.location.origin);

  if (init?.queryParams) {
    Object.entries(init.queryParams).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  const hasBody = init?.body !== undefined;
  const isFormData = hasBody && init.body instanceof FormData;

  let requestBody: BodyInit | undefined;

  if (hasBody) {
    requestBody = isFormData ? (init.body as FormData) : JSON.stringify(init.body);
  }

  const response = await fetch(url.toString(), {
    ...init,
    credentials: "include",
    headers: {
      ...(hasBody && !isFormData ? { "Content-Type": "application/json" } : {}),
      ...(init?.headers ?? {}),
    },
    body: requestBody,
  });

  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch {
      throw new ApiError(response.status, `HTTP Error: ${response.status}`, response.status);
    }

    const message = errorData.message || errorData.error || "API Request Failed";

    const code = errorData.code || response.status;

    throw new ApiError(code, message, response.status);
  }

  return response.json() as Promise<ApiResponseType<TResponse>>;
}
