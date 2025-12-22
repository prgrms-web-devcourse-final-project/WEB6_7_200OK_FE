import type { ApiResponseType } from "@/shared/api/types/response";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface StrictRequestInit<TBody = unknown> extends Omit<RequestInit, "body"> {
  body?: TBody;
}

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

export async function fetchClient<TResponse, TBody = unknown>(
  path: string,
  init?: StrictRequestInit<TBody>
): Promise<ApiResponseType<TResponse>> {
  const url = `${API_URL}${path}`;

  try {
    const response = await fetch(url, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...init?.headers,
      },
      credentials: "include",
      body: init?.body ? JSON.stringify(init.body) : undefined,
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        throw new ApiError(response.status, `HTTP Error: ${response.statusText}`, response.status);
      }

      throw new ApiError(
        errorData.code || response.status,
        errorData.message || response.statusText,
        response.status
      );
    }

    const data = (await response.json()) as ApiResponseType<TResponse>;

    if (data.code !== 200) {
      throw new ApiError(data.code, data.message || "API Error");
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    if (error instanceof Error) {
      throw new ApiError(0, error.message);
    }

    throw new ApiError(0, "An unknown error occurred");
  }
}
