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
  const totalSec = Math.floor(ms / 1000);

  const hh = Math.floor(totalSec / 3600);
  const mm = Math.floor((totalSec % 3600) / 60);
  const ss = totalSec % 60;

  if (hh > 0) {
    return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}`;
  }

  return `${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}`;
}

export function formatRemaining(totalSeconds: number) {
  if (totalSeconds <= 0) return "0초";

  const duration = dayjs.duration(totalSeconds, "seconds");

  const days = Math.floor(duration.asDays());
  const hours = duration.hours();
  const minutes = duration.minutes();
  const seconds = duration.seconds();

  if (days > 0) {
    return `${days}일 ${hours}시간`;
  }

  if (hours > 0) {
    return `${hours}시간 ${minutes}분`;
  }

  if (minutes > 0) {
    return `${minutes}분 ${seconds}초`;
  }

  return `${seconds}초`;
}
