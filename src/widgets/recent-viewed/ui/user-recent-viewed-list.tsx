"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";

import {
  MOCK_RECENT_ITEMS,
  UserRecentlyViewedItemType,
  UserItemCardFilter,
} from "@/entities/auction";
import { UserRecentViewedItemCard } from "@/features/recent-viewed";
import {
  filterItemsByStatus,
  generateFilterOptions,
  sortItemsByDateAndName,
} from "@/shared/lib/utils/filter/user-page-item-filter";
import { DashboardContentLayout, ConfirmDeleteModal } from "@/shared/ui";

const RECENT_STATUSES = ["판매중", "판매 완료", "경매 예정", "경매 종료"];

interface RecentlyViewedListProps {
  label?: React.ReactNode;
}

export function UserRecentViewedList({ label }: RecentlyViewedListProps) {
  const [filterStatus, setFilterStatus] = useState("전체");

  const [deleteItem, setDeleteItem] = useState<UserRecentlyViewedItemType | null>(null);

  const deleteItemRef = useRef<UserRecentlyViewedItemType | null>(null);

  useEffect(() => {
    deleteItemRef.current = deleteItem;
  }, [deleteItem]);

  const filterOptions = useMemo(() => generateFilterOptions(RECENT_STATUSES), []);

  const filteredRecent = useMemo(
    () => sortItemsByDateAndName(filterItemsByStatus(MOCK_RECENT_ITEMS, filterStatus)),
    [filterStatus]
  );

  const handleDelete = useCallback(() => {
    const targetItem = deleteItemRef.current;

    if (!targetItem) return;

    // TODO: API 실제 최근 본 목록 삭제 요청 로직 구현 필요 (targetItem.id 사용)

    setDeleteItem(null);
  }, []);

  return (
    <>
      <DashboardContentLayout
        label={label}
        filters={
          <UserItemCardFilter
            value={filterStatus}
            options={filterOptions}
            onChange={setFilterStatus}
          />
        }
      >
        {filteredRecent.map((item) => (
          <UserRecentViewedItemCard
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
