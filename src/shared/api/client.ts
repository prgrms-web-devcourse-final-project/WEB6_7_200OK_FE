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
      const errorText = await response.text().catch(() => "Could not read error");
      console.error("=".repeat(80));
      console.error("[CLIENT] ❌ API Error Response (non-JSON):");
      console.error("Status:", response.status, response.statusText);
      console.error("URL:", url.toString());
      console.error("Error Text:", errorText);
      console.error("Headers:", Object.fromEntries(response.headers.entries()));
      console.error("=".repeat(80));
      throw new ApiError(response.status, `HTTP Error: ${response.status}`, response.status);
    }

    // 에러인 경우 상세 정보 로깅 (클라이언트 콘솔에 명확하게 표시)
    console.error("=".repeat(80));
    console.error(`[CLIENT] ❌ API Error ${response.status} ${response.statusText}:`);
    console.error("Request URL:", url.toString());
    console.error("Response Status:", response.status, response.statusText);
    console.error("Full Error Data:", errorData);
    console.error("Response Headers:", Object.fromEntries(response.headers.entries()));

    // 프록시에서 전달한 상세 정보가 있으면 추가 로깅
    if (errorData.proxyDetails || errorData.serverResponse) {
      console.error("\n[CLIENT] 📋 Proxy Error Details:");
      if (errorData.proxyDetails) {
        console.error("Proxy Details:", errorData.proxyDetails);
      }
      if (errorData.serverResponse) {
        console.error("Server Response:", errorData.serverResponse);
      }
      if (errorData.requestHeaders) {
        console.error("Request Headers:", errorData.requestHeaders);
      }
    }
    console.error("=".repeat(80));

    const message = errorData.message || errorData.error || "API Request Failed";

    const code = errorData.code || response.status;

    throw new ApiError(code, message, response.status);
  }

  return response.json() as Promise<ApiResponseType<TResponse>>;
}
