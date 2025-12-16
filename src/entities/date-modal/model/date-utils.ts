import dayjs, { Dayjs } from "dayjs";

import type { DateRange, TimeSelection } from "./types";

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
