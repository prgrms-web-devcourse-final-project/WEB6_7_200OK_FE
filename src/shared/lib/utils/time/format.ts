import { dayjs } from "@/shared/lib/utils/dayjs";

export function formatAgo(input: string | Date | number): string {
  const now = dayjs();
  const t = dayjs(input);

  if (!t.isValid()) return "";

  const diffMin = now.diff(t, "minute");
  if (diffMin < 1) return "방금 전";
  if (diffMin < 60) return `${diffMin}분 전`;

  const diffHour = now.diff(t, "hour");
  if (diffHour < 24) return `${diffHour}시간 전`;

  const diffDay = now.diff(t, "day");
  return `${diffDay}일 전`;
}

export function formatMs(ms: number) {
  const totalSec = Math.ceil(ms / 1000);
  const mm = Math.floor(totalSec / 60);
  const ss = totalSec % 60;
  return `${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}`;
}
