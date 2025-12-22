"use client";

import { useState, useMemo } from "react";

import {
  DailyAuctionCalendar,
  transformItemsToCalendarEvents,
} from "@/features/daily-auction-calendar";
import { DailyAuctionList } from "@/features/daily-auction-list";
import { useSalesList } from "@/features/sale/api/use-sales";
import { useWishlist } from "@/features/wishlist/api/use-wishlist";
import { DashboardContentLayout } from "@/shared/ui";

interface UserDashboardCalendarProps {
  label?: React.ReactNode;
}

export function UserDashboardCalendar({ label }: UserDashboardCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const { data: sales = [] } = useSalesList();
  const { data: wishlist = [] } = useWishlist();

  const allItems = useMemo(() => [...sales, ...wishlist], [sales, wishlist]);

  const calendarEvents = useMemo(() => transformItemsToCalendarEvents(allItems), [allItems]);

  return (
    <DashboardContentLayout label={label} className="flex w-full flex-col">
      <div className="flex w-full flex-col gap-6 lg:flex-row lg:items-start">
        <div className="w-full lg:w-1/2">
          <DailyAuctionCalendar
            events={calendarEvents}
            onSelectDate={setSelectedDate}
            selectedDate={selectedDate}
          />
        </div>

        <div className="w-full lg:w-1/2">
          <DailyAuctionList items={allItems} selectedDate={selectedDate} />
        </div>
      </div>
    </DashboardContentLayout>
  );
}
