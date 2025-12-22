import { cookies } from "next/headers";

import type {
  ApiPath,
  HttpMethod,
  JsonRequestBody,
  JsonResponse,
  StrictInit,
} from "@/shared/api/types/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function serverFetch<Path extends ApiPath, Method extends HttpMethod>(
  path: Path,
  method: Method,
  init?: StrictInit<JsonRequestBody<Path, Method>>
): Promise<JsonResponse<Path, Method>> {
  const cookieHeader = (await cookies())
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");

  const url = new URL(path, API_URL);

  const hasBody = init?.body !== undefined;

  const response = await globalThis.fetch(url, {
    method: method.toUpperCase(),

    headers: {
      Cookie: cookieHeader,
      ...(init?.headers ?? {}),
      ...(hasBody ? { "Content-Type": "application/json" } : {}),
    },

    body: hasBody ? JSON.stringify(init.body) : undefined,
    cache: init?.cache ?? "no-store",
  });

  if (!response.ok) {
    throw new Error(`서버 API 통신 에러: ${response.status}`);
  }

  return response.json();
}
