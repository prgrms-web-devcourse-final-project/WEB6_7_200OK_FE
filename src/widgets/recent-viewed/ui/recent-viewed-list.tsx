"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";

import { RecentlyViewedItemType, ItemCardFilter } from "@/entities/item";
import { RecentViewedItemCard } from "@/features/recent-viewed";
import { useRecentViewedItems } from "@/features/recent-viewed/api/use-recent-viewed";
import {
  filterItemsByStatus,
  generateFilterOptions,
  sortItemsByDateAndName,
} from "@/shared/lib/utils/filter/user-page-item-filter";
import { DashboardContentLayout, ConfirmDeleteModal, Skeleton } from "@/shared/ui";

const RECENT_STATUSES = ["판매중", "판매 완료", "경매 예정", "경매 종료"];

interface RecentlyViewedListProps {
  label?: React.ReactNode;
}

export function RecentViewedList({ label }: RecentlyViewedListProps) {
  const { data: recentItems = [], isLoading } = useRecentViewedItems();

  const [filterStatus, setFilterStatus] = useState("전체");

  const [deleteItem, setDeleteItem] = useState<RecentlyViewedItemType | null>(null);

  const deleteItemRef = useRef<RecentlyViewedItemType | null>(null);

  useEffect(() => {
    deleteItemRef.current = deleteItem;
  }, [deleteItem]);

  const filterOptions = useMemo(() => generateFilterOptions(RECENT_STATUSES), []);

  const filteredRecent = useMemo(
    () => sortItemsByDateAndName(filterItemsByStatus(recentItems, filterStatus)),
    [filterStatus, recentItems]
  );

  const handleDelete = useCallback(() => {
    const targetItem = deleteItemRef.current;
    if (!targetItem) return;
    // TODO: API 연동
    setDeleteItem(null);
  }, []);

  if (isLoading) {
    return (
      <DashboardContentLayout label={label}>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-40 w-full rounded-xl" />
          ))}
        </div>
      </DashboardContentLayout>
    );
  }

  return (
    <>
      <DashboardContentLayout
        label={label}
        filters={
          <ItemCardFilter value={filterStatus} options={filterOptions} onChange={setFilterStatus} />
        }
      >
        {filteredRecent.map((item) => (
          <RecentViewedItemCard
            key={item.id}
            item={item}
            onRemove={(target) => setDeleteItem(target)}
          />
        ))}
      </DashboardContentLayout>

      <ConfirmDeleteModal
        open={!!deleteItem}
        onOpenChange={(open) => !open && setDeleteItem(null)}
        onConfirm={handleDelete}
        title="최근 기록 삭제"
        description="이 상품을 최근 본 목록에서 지우시겠습니까?"
        confirmText="지우기"
        variant="destructive"
      />
    </>
  );
}
