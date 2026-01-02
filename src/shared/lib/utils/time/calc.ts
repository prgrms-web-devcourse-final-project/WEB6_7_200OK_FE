export function calcMsPercent(ms: number, durationMs: number) {
  if (!Number.isFinite(ms) || !Number.isFinite(durationMs) || durationMs <= 0) {
    return { progress: 0, remain: 0 };
  }

  const safeRemain = Math.min(Math.max(ms, 0), durationMs);
  const remain = (safeRemain / durationMs) * 100;
  const progress = 100 - remain;

  return { progress, remain };
}

export const calculateNextPriceDropSeconds = (nowMs: number, stepMs = 5 * 60 * 1000) => {
  if (!Number.isFinite(nowMs) || !Number.isFinite(stepMs) || stepMs <= 0) return 0;

  const nextStepMs = (Math.floor(nowMs / stepMs) + 1) * stepMs;
  const remainMs = Math.max(0, nextStepMs - nowMs);

  return Math.ceil(remainMs / 1000);
};

export const calculateAuctionStartSeconds = (nowMs: number, startAt: string) => {
  if (!Number.isFinite(nowMs)) return 0;

  const startAtMs = Date.parse(startAt);
  if (!Number.isFinite(startAtMs)) return 0;

  const remainMs = Math.max(0, startAtMs - nowMs);
  return Math.ceil(remainMs / 1000);
};

export const calculateAuctionStartMs = (now: string, startAt: string) => {
  const nowMs = Date.parse(now);
  if (!Number.isFinite(nowMs)) return 0;

  const startAtMs = Date.parse(startAt);
  if (!Number.isFinite(startAtMs)) return 0;

  const remainMs = Math.max(0, startAtMs - nowMs);
  return remainMs;
};

export const calculateServerTimeNow = (offsetMs: number) => Date.now() + offsetMs;

export function calculateMMSSToMs(dateStr: string) {
  const m = dateStr.match(/T\d{2}:(\d{2}):(\d{2})(?:\.(\d+))?/);
  if (!m) throw new Error("Invalid date string");

  const min = Number(m[1]) % 5;
  const sec = Number(m[2]);

  const frac = m[3] ?? "";
  const ms = Number(frac.padEnd(3, "0").slice(0, 3));

  return (min * 60 + sec) * 1000 + ms;
}
