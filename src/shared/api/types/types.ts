import type { paths } from "@/shared/api/schema";

export type ApiPath = keyof paths;

export type HttpMethod = "get" | "post" | "put" | "patch" | "delete";

type Operation<Path extends ApiPath, Method extends HttpMethod> = paths[Path][Method];

export type JsonResponse<Path extends ApiPath, Method extends HttpMethod> =
  Operation<Path, Method> extends { responses: infer Responses }
    ? 200 extends keyof Responses
      ? Responses[200] extends { content: { "application/json": infer Res } }
        ? Res
        : never
      : never
    : never;

export type JsonRequestBody<Path extends ApiPath, Method extends HttpMethod> =
  Operation<Path, Method> extends { requestBody: { content: { "application/json": infer Body } } }
    ? Body
    : never;

export type StrictInit<Body> = Omit<RequestInit, "method" | "body"> &
  (Body extends never ? { body?: never } : { body?: Body });
