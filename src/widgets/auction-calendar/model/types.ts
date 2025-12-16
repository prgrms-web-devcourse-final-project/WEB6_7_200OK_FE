import dayjs from "dayjs";

import { SellingItem, WishlistItem, RecentlyViewedItem } from "@/entities/item/model/types";

export type DashboardItem = SellingItem | WishlistItem | RecentlyViewedItem;

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  type: "progress" | "scheduled";
  count: number;
}

export const transformItemsToCalendarEvents = (items: DashboardItem[]): CalendarEvent[] => {
  const eventMap = new Map<string, { progress: number; scheduled: number }>();

  items.forEach((item) => {
    const dateKey = item.date;
    if (!eventMap.has(dateKey)) {
      eventMap.set(dateKey, { progress: 0, scheduled: 0 });
    }

    const counts = eventMap.get(dateKey)!;
    if (item.status === "판매중") counts.progress += 1;
    if (item.status === "경매 예정") counts.scheduled += 1;
  });

  const events: CalendarEvent[] = [];
  eventMap.forEach((counts, dateStr) => {
    const date = dayjs(dateStr).toDate();

    if (counts.progress > 0) {
      events.push({
        id: `progress-${dateStr}`,
        title: `진행 ${counts.progress}`,
        start: date,
        end: date,
        type: "progress",
        count: counts.progress,
      });
    }
    if (counts.scheduled > 0) {
      events.push({
        id: `scheduled-${dateStr}`,
        title: `예정 ${counts.scheduled}`,
        start: date,
        end: date,
        type: "scheduled",
        count: counts.scheduled,
      });
    }
  });

  return events;
};
