// 100 CONTINUE
// 400 BAD_REQUEST
// 403 FORBIDDEN
// 404 NOT_FOUND
// 409 CONFLICT
// 500 SERVER_ERROR <- 커스텀

export const ERROR_CODE = {
  CONTINUE: "100",
  BAD_REQUEST: "400",
  FORBIDDEN: "403",
  NOT_FOUND: "404",
  CONFLICT: "409",
  SERVER_ERROR: "500",
} as const;

export type ErrorCodeType = (typeof ERROR_CODE)[keyof typeof ERROR_CODE];

export const ERROR_STATUS = {
  CONTINUE: "CONTINUE",
  BAD_REQUEST: "BAD_REQUEST",
  FORBIDDEN: "FORBIDDEN",
  NOT_FOUND: "NOT_FOUND",
  CONFLICT: "CONFLICT",
  SERVER_ERROR: "SERVER_ERROR",
} as const;

export type ErrorStatusType = (typeof ERROR_STATUS)[keyof typeof ERROR_STATUS];
