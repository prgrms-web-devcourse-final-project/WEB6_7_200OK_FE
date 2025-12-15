import dayjs, { Dayjs } from "dayjs";

import type { DateRange, TimeSelection } from "../types";

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

export const formatDateTimeDisplay = (date: Date, time: TimeSelection): string => {
  const dateStr = dayjs(date).format("YYYY년 M월 D일");
  const timeStr = `${time.timezone} ${time.hour}:${String(time.minute).padStart(2, "0")}`;
  return `${dateStr} ${timeStr}`;
};
