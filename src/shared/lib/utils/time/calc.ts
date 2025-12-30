export function calcMsPercent(ms: number, durationMs: number) {
  if (!Number.isFinite(ms) || !Number.isFinite(durationMs) || durationMs <= 0) {
    return { progress: 0, remain: 0 };
  }

  const safeRemain = Math.min(Math.max(ms, 0), durationMs);
  const remain = (safeRemain / durationMs) * 100;
  const progress = 100 - remain;

  return { progress, remain };
}

// REFACTOR: 검증 함수 공통 로직 분리
export const calculateRemainingTimeToNextPriceDropMs = (nowMs: number, stepMs = 5 * 60 * 1000) => {
  if (!Number.isFinite(nowMs) || !Number.isFinite(stepMs) || stepMs <= 0) return 0;

  const nextStepMs = (Math.floor(nowMs / stepMs) + 1) * stepMs;
  return Math.max(0, nextStepMs - nowMs);
};

export const calculateRemainingTimeToAuctionStartMs = (nowMs: number, startAt: string) => {
  const startAtMs = Date.parse(startAt);

  if (Number.isNaN(startAtMs)) return 0;

  return Math.max(0, startAtMs - nowMs);
};

export const calculateServerNow = (offsetMs: number) => Date.now() + offsetMs;
