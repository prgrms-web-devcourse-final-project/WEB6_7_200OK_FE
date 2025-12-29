export function calcMsPercent(ms: number, durationMs: number) {
  if (!Number.isFinite(ms) || !Number.isFinite(durationMs) || durationMs <= 0) {
    return { progress: 0, remain: 0 };
  }

  const safeRemain = Math.min(Math.max(ms, 0), durationMs);
  const remain = (safeRemain / durationMs) * 100;
  const progress = 100 - remain;

  return { progress, remain };
}

export function calculateRemainingTimeToNextPriceDrop(nowMs: number, stepMs: number) {
  const nextStepMs = (Math.floor(nowMs / stepMs) + 1) * stepMs;
  return Math.max(0, nextStepMs - nowMs);
}
