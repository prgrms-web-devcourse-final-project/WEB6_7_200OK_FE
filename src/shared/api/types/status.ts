// 200 OK
// 400 BAD_REQUEST
// 403 FORBIDDEN
// 404 NOT_FOUND
// 409 CONFLICT
// 500 SERVER_ERROR <- 커스텀

export const HTTP_CODE = {
  OK: "200",
  BAD_REQUEST: "400",
  FORBIDDEN: "403",
  NOT_FOUND: "404",
  CONFLICT: "409",
  SERVER_ERROR: "500",
} as const;

export type HttpCodeType = (typeof HTTP_CODE)[keyof typeof HTTP_CODE];

export const HTTP_STATUS = {
  OK: "OK",
  BAD_REQUEST: "BAD_REQUEST",
  FORBIDDEN: "FORBIDDEN",
  NOT_FOUND: "NOT_FOUND",
  CONFLICT: "CONFLICT",
  SERVER_ERROR: "SERVER_ERROR",
} as const;

export type HttpStatusType = (typeof HTTP_STATUS)[keyof typeof HTTP_STATUS];
