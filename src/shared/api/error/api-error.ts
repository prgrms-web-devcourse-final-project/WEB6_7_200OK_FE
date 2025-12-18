export class ApiError extends Error {
  public readonly code: string;

  public readonly status: number;

  public readonly displayMessage: string;

  public readonly data?: unknown;

  constructor({
    message,
    code,
    status,
    displayMessage,
    data,
  }: {
    message: string;
    code: string;
    status: number;
    displayMessage?: string;
    data: unknown;
  }) {
    super(message);
    this.code = code;
    this.status = status;
    this.displayMessage = displayMessage ?? "일시적인 오류가 발생했습니다.";
    this.data = data;

    Object.setPrototypeOf(this, ApiError.prototype);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }
}
