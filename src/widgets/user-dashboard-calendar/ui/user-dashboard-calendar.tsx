"use client";

import { useState, useMemo } from "react";

import {
  DailyAuctionCalendar,
  transformItemsToCalendarEvents,
} from "@/features/daily-auction-calendar";
import { DailyAuctionList } from "@/features/daily-auction-list";
import { useSalesList } from "@/features/sale/api/use-sales";
import { useWishlist } from "@/features/wishlist/api/use-wishlist";
import { DashboardContentLayout, Skeleton } from "@/shared/ui";

interface UserDashboardCalendarProps {
  label?: React.ReactNode;
}

export function UserDashboardCalendar({ label }: UserDashboardCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const { data: salesItems = [], isLoading: isSalesLoading } = useSalesList();
  const { data: wishlistItems = [], isLoading: isWishlistLoading } = useWishlist();

  const allItems = useMemo(() => [...salesItems, ...wishlistItems], [salesItems, wishlistItems]);

  const calendarEvents = useMemo(() => transformItemsToCalendarEvents(allItems), [allItems]);

  if (isSalesLoading || isWishlistLoading) {
    return (
      <DashboardContentLayout label={label} className="flex w-full flex-col">
        <Skeleton className="h-[500px] w-full rounded-xl" />
      </DashboardContentLayout>
    );
  }

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
