"use client";

import { useState, useMemo } from "react";

import { PackageOpen } from "lucide-react";

import { UserItemBadge, UserItemCard } from "@/entities/auction";
import { ROUTES } from "@/shared/config/routes";
import { dayjs } from "@/shared/lib/utils/dayjs";
import { filterItemsByStatus } from "@/shared/lib/utils/filter/user-page-item-filter";
import { cn } from "@/shared/lib/utils/utils";
import { Button, EmptyState } from "@/shared/ui";

import { DashboardItemType } from "../model/types";

interface DailyAuctionListProps {
  items: DashboardItemType[];
  selectedDate: Date | null;
}

type FilterType = "전체" | "경매 예정" | "판매중";

export function DailyAuctionList({ items, selectedDate }: DailyAuctionListProps) {
  const [filter, setFilter] = useState<FilterType>("전체");

  const dateFilteredItems = useMemo(() => {
    if (!selectedDate) return items;
    const dateStr = dayjs(selectedDate).format("YYYY-MM-DD");
    return items.filter((item) => item.date === dateStr);
  }, [items, selectedDate]);

  const filteredItems = useMemo(
    () => filterItemsByStatus(dateFilteredItems, filter),
    [dateFilteredItems, filter]
  );

  return (
    <div className="bg-card border-border flex w-full flex-col gap-4 rounded-lg border p-6 shadow-sm">
      <div className="flex h-7 flex-row items-center justify-between">
        <h3 className="text-foreground text-base tracking-(--text-base--letter-spacing)">
          경매 목록
        </h3>

        <div className="flex flex-row items-start gap-2">
          <FilterButton active={filter === "전체"} label="전체" onClick={() => setFilter("전체")} />
          <FilterButton
            active={filter === "경매 예정"}
            label="예정"
            onClick={() => setFilter("경매 예정")}
          />
          <FilterButton
            active={filter === "판매중"}
            label="진행중"
            onClick={() => setFilter("판매중")}
          />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <UserItemCard
              key={`${item.id}-${item.name}`}
              name={item.name}
              imageUrl={item.imageUrl}
              date={item.date}
              price={item.price}
              originalPrice={item.originalPrice}
              discountRate={item.discountRate}
              isPriceGray={item.status === "경매 예정"}
              imageHref={ROUTES.auctionDetail(item.id)}
              badgeNode={<UserItemBadge status={item.status} />}
            />
          ))
        ) : (
          <EmptyState
            title="해당하는 경매가 없습니다."
            description="다른 날짜나 필터를 선택해보세요."
            Icon={PackageOpen}
            className="border-dashed py-10"
          />
        )}
      </div>
    </div>
  );
}

function FilterButton({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <Button
      onClick={onClick}
      variant={active ? "primary" : "ghost"}
      className={cn(
        "flex h-7 items-center justify-center rounded-lg border px-2 text-xs tracking-(--text-xs--letter-spacing) transition-colors"
      )}
    >
      {label}
    </Button>
  );
}
