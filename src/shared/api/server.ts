import { cookies } from "next/headers";

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

  return res.json() as Promise<TResponse>;
}
