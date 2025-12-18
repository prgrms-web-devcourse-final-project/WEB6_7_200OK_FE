"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";

import { MOCK_RECENT_ITEMS } from "@/entities/item/api/mocks";
import { RecentlyViewedItem } from "@/entities/item/model/types";
import { ItemCardFilter } from "@/entities/item/ui/item-card-filter";
import { RecentViewedItemCard } from "@/features/recent-viewed/ui/recent-viewed-item-card";
import {
  filterItemsByStatus,
  generateFilterOptions,
  sortItemsByDateAndName,
} from "@/shared/lib/utils/filter/user-page-item-filter";
import { DashboardContentLayout } from "@/shared/ui/layout/dashboard-content-layout";
import { ConfirmDeleteModal } from "@/shared/ui/modal/confirm-delete-modal";

const RECENT_STATUSES = ["판매중", "판매 완료", "경매 예정", "경매 종료"];

interface RecentlyViewedListProps {
  labelNode?: React.ReactNode;
}

export function RecentViewedList({ labelNode }: RecentlyViewedListProps) {
  const [filterStatus, setFilterStatus] = useState("전체");

  const [deleteItem, setDeleteItem] = useState<RecentlyViewedItem | null>(null);

  const deleteItemRef = useRef<RecentlyViewedItem | null>(null);

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
        labelNode={labelNode}
        filterNode={
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
