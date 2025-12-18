"use client";

import { useState, useMemo, useCallback, useRef, useEffect, ReactNode } from "react";

import { MOCK_WISHLIST_ITEMS } from "@/entities/item/api/mocks";
import { WishlistItem } from "@/entities/item/model/types";
import { ItemCardFilter } from "@/entities/item/ui/item-card-filter";
import { WishlistItemCard } from "@/features/wishlist/ui/wishlist-item-card";
import {
  filterItemsByStatus,
  generateFilterOptions,
  sortItemsByDateAndName,
} from "@/shared/lib/utils/filter/user-page-item-filter";
import { DashboardContentLayout } from "@/shared/ui/layout/dashboard-content-layout";
import { ConfirmDeleteModal } from "@/shared/ui/modal/confirm-delete-modal";

const WISHLIST_STATUSES = ["판매중", "판매 완료", "경매 예정", "경매 종료"];

interface WishlistProps {
  labelNode?: ReactNode;
}

export function Wishlist({ labelNode }: WishlistProps) {
  const [filterStatus, setFilterStatus] = useState("전체");

  const [deleteItem, setDeleteItem] = useState<WishlistItem | null>(null);

  const deleteItemRef = useRef<WishlistItem | null>(null);

  useEffect(() => {
    deleteItemRef.current = deleteItem;
  }, [deleteItem]);

  const filterOptions = useMemo(() => generateFilterOptions(WISHLIST_STATUSES), []);

  const filteredWishlist = useMemo(
    () => sortItemsByDateAndName(filterItemsByStatus(MOCK_WISHLIST_ITEMS, filterStatus)),
    [filterStatus]
  );

  const handleDelete = useCallback(() => {
    const targetItem = deleteItemRef.current;

    if (!targetItem) return;

    // TODO: API 실제 관심 목록 해제 요청 로직 구현 필요 (targetItem.id 등 사용)

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
        {filteredWishlist.map((item) => (
          <WishlistItemCard
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
        title="관심 목록 해제"
        description="선택하신 상품을 관심 목록에서 제외하시겠습니까?"
        confirmText="해제하기"
        variant="destructive"
      />
    </>
  );
}
