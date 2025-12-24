import { dayjs, type Dayjs } from "@/shared/lib/utils/dayjs";

import type { DateRange, TimeSelection } from "../model/types";

// 기본 시간 선택
export const DEFAULT_TIME_SELECTION: TimeSelection = {
  hour: 9,
  minute: 0,
  timezone: "오전",
};

export const getDefaultDate = (selectedDate: Date | null): Dayjs => {
  if (selectedDate) {
    return dayjs(selectedDate);
  }
  return dayjs().add(1, "day").startOf("day");
};

export const getDateRange = (): DateRange => {
  const minDate = dayjs().add(1, "day").startOf("day").toDate();
  const maxDate = dayjs().add(7, "days").endOf("day").toDate();
  return { minDate, maxDate };
};

// 날짜 시간 표시
export const formatDateTimeDisplay = (date: Date, time: TimeSelection | null): string => {
  const dateStr = dayjs(date).format("YYYY년 M월 D일");
  if (!time) {
    return dateStr;
  }
  const timeStr = `${time.timezone} ${String(time.hour).padStart(2, "0")}:${String(time.minute).padStart(2, "0")}`;
  return `${dateStr} ${timeStr}`;
};

// 시간 변환
export const combineDateTime = (date: Date, time: TimeSelection): Date => {
  const dateDayjs = dayjs(date);
  const { hour, minute } = time;
  let hourValue: number = hour;

  if (time.timezone === "오전" && hour === 12) {
    hourValue = 0;
  } else if (time.timezone === "오후" && hour !== 12) {
    hourValue += 12;
  }

  return dateDayjs.hour(hourValue).minute(minute).second(0).millisecond(0).toDate();
};

export const isValidDateTime = (date: Date | null, time: TimeSelection | null): boolean => {
  if (!date || !time) {
    return false;
  }

  const combinedDateTime = dayjs(combineDateTime(date, time));
  const now = dayjs();
  const minDateTime = now.add(1, "day");
  const maxDateTime = now.add(7, "days");

  // 날짜 및 시간 검증 (현재 시간 기준 +1일 ~ +7일 범위)
  return (
    (combinedDateTime.isAfter(minDateTime) || combinedDateTime.isSame(minDateTime)) &&
    (combinedDateTime.isBefore(maxDateTime) || combinedDateTime.isSame(maxDateTime))
  );
};

// 특정 날짜+시간이 유효한지 체크
export const getIsTimeDisabled = (selectedDate: Date | null) => {
  const cache = new Map<string, boolean>();
  return (hour: number, minute: number, timezone: string): boolean => {
    if (!selectedDate) {
      return false;
    }
    const key = `${hour}:${minute}:${timezone}`;
    const cached = cache.get(key);
    if (cached !== undefined) {
      return cached;
    }
    const timeSelection: TimeSelection = {
      hour: hour as TimeSelection["hour"],
      minute,
      timezone: timezone as TimeSelection["timezone"],
    };
    const isDisabled = !isValidDateTime(selectedDate, timeSelection);
    cache.set(key, isDisabled);
    return isDisabled;
  };
};
