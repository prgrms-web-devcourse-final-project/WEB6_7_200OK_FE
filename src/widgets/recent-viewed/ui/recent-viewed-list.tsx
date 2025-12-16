"use client";

import { useState, useMemo } from "react";

import { MOCK_RECENT_ITEMS } from "@/entities/item/api/mocks";
import { RecentlyViewedItem } from "@/entities/item/model/types";
import { RecentViewedItemCard } from "@/features/recent-viewed/ui/recent-viewed-item-card";
import {
  filterItemsByStatus,
  generateFilterOptions,
  sortItemsByDateAndName,
} from "@/shared/lib/utils/filter/user-page-item-filter";
import { ItemCardFilter } from "@/shared/ui/item-card-filter/item-card-filter";
import { ConfirmDeleteModal } from "@/shared/ui/modal/confirm-delete-modal";

const RECENT_STATUSES = ["판매중", "판매 완료", "경매 예정", "경매 종료"];

export function RecentViewedList() {
  const [filterStatus, setFilterStatus] = useState("전체");
  const [deleteItem, setDeleteItem] = useState<RecentlyViewedItem | null>(null);

  const filterOptions = useMemo(() => generateFilterOptions(RECENT_STATUSES), []);

  const filteredRecent = useMemo(
    () => sortItemsByDateAndName(filterItemsByStatus(MOCK_RECENT_ITEMS, filterStatus)),
    [filterStatus]
  );

  const handleDelete = () => {
    if (!deleteItem) return;
    setDeleteItem(null);
  };

  return (
    <>
      <div className="flex h-[34px] w-full flex-col items-end justify-center gap-2.5">
        <ItemCardFilter value={filterStatus} options={filterOptions} onChange={setFilterStatus} />
      </div>

      <div className="flex flex-col gap-4">
        {filteredRecent.map((item) => (
          <RecentViewedItemCard
            key={item.id}
            item={item}
            onRemove={(target) => setDeleteItem(target)}
          />
        ))}
      </div>

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
