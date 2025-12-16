"use client";

import { useState, useMemo } from "react";

import { MOCK_SELLING_ITEMS, MOCK_WISHLIST_ITEMS } from "@/entities/item/api/mocks";
import { AuctionCalendar } from "@/widgets/auction-calendar";
import { transformItemsToCalendarEvents } from "@/widgets/auction-calendar/model/types";
import { DailyAuctionList } from "@/widgets/daily-auction-list";

export function UserDashboardOverview() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const allItems = useMemo(() => [...MOCK_SELLING_ITEMS, ...MOCK_WISHLIST_ITEMS], []);

  const calendarEvents = useMemo(() => transformItemsToCalendarEvents(allItems), [allItems]);

  return (
    <div className="flex w-full flex-col gap-6 lg:flex-row lg:items-start">
      <div className="w-full lg:w-1/2">
        <AuctionCalendar
          events={calendarEvents}
          onSelectDate={setSelectedDate}
          selectedDate={selectedDate}
        />
      </div>

      <div className="w-full lg:w-1/2">
        <DailyAuctionList items={allItems} selectedDate={selectedDate} />
      </div>
    </div>
  );
}
