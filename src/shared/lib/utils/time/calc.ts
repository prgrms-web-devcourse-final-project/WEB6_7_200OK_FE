export function calcMsPercent(ms: number, durationMs: number) {
  if (!Number.isFinite(ms) || !Number.isFinite(durationMs) || durationMs <= 0) {
    return { progress: 0, remain: 0 };
  }

  const safeRemain = Math.min(Math.max(ms, 0), durationMs);
  const remain = (safeRemain / durationMs) * 100;
  const progress = 100 - remain;

  return { progress, remain };
}

export const calculateRemainingSeconds = (nowMs: number, stepMs = 5 * 60 * 1000) => {
  const nextStepMs = Math.ceil(nowMs / stepMs) * stepMs;
  const remainMs = Math.max(0, nextStepMs - nowMs);

  return Math.max(0, Math.ceil(remainMs / 1000));
};

export const calculateServerNow = (offsetMs: number) => Date.now() + offsetMs;
