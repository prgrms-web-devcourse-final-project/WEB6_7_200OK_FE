"use client";

import { useState, useMemo } from "react";

import { useAuctionLike } from "@/features/auctionLike/api/use-auctionLike";
import {
  DailyAuctionCalendar,
  transformItemsToCalendarEvents,
} from "@/features/daily-auction-calendar";
import { DailyAuctionList } from "@/features/daily-auction-list";
import { useSalesList } from "@/features/sale/api/use-sales";
import { DashboardContentLayout } from "@/shared/ui";
import { CalendarTabSkeleton } from "@/widgets/user/ui/skeletons";

interface UserDashboardCalendarProps {
  label: React.ReactNode;
}

export function UserDashboardCalendar({ label }: UserDashboardCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const { data: salesItems = [], isLoading: isSalesLoading } = useSalesList();
  const { data: AuctionLikeItems = [], isLoading: isAuctionLikeLoading } = useAuctionLike();

  const allItems = useMemo(
    () => [...salesItems, ...AuctionLikeItems],
    [salesItems, AuctionLikeItems]
  );

  const calendarEvents = useMemo(() => transformItemsToCalendarEvents(allItems), [allItems]);

  if (isSalesLoading || isAuctionLikeLoading) {
    return (
      <DashboardContentLayout label={label} className="flex w-full flex-col">
        <CalendarTabSkeleton />
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
