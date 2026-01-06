"use client";

import { useState, useMemo } from "react";

import { useUserAuctionLike } from "@/features/auction/auction-like";
import { useUserSalesList } from "@/features/auction/auction-sale";
import {
  DailyAuctionCalendar,
  transformItemsToCalendarEvents,
} from "@/features/daily-auction-calendar";
import { DailyAuctionList } from "@/features/daily-auction-list";
import { DashboardContentLayout } from "@/shared/ui";
import { CalendarTabSkeleton } from "@/widgets/user/ui/skeletons";

interface UserDashboardCalendarProps {
  label: React.ReactNode;
  userId: number;
}
export function UserDashboardCalendar({ label, userId }: UserDashboardCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const { data: salesItems = [], isLoading: isSalesLoading } = useUserSalesList(userId);
  const { data: auctionLikeItems = [], isLoading: isAuctionLikeLoading } = useUserAuctionLike();
  const allItems = useMemo(
    () => [...salesItems, ...auctionLikeItems],
    [salesItems, auctionLikeItems]
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
