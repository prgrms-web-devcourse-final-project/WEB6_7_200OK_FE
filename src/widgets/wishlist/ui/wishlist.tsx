"use client";

import { useState, useMemo, useCallback, useRef, useEffect, ReactNode } from "react";

import { WishlistItemType, ItemCardFilter } from "@/entities/item";
import { WishlistItemCard } from "@/features/wishlist";
import { useWishlist } from "@/features/wishlist/api/use-wishlist";
import {
  filterItemsByStatus,
  generateFilterOptions,
  sortItemsByDateAndName,
} from "@/shared/lib/utils/filter/user-page-item-filter";
import { DashboardContentLayout, ConfirmDeleteModal, Skeleton } from "@/shared/ui";

const WISHLIST_STATUSES = ["판매중", "판매 완료", "경매 예정", "경매 종료"];

interface WishlistProps {
  label?: ReactNode;
}

export function Wishlist({ label }: WishlistProps) {
  const { data: wishlistItems = [], isLoading } = useWishlist();

  const [filterStatus, setFilterStatus] = useState("전체");

  const [deleteItem, setDeleteItem] = useState<WishlistItemType | null>(null);

  const deleteItemRef = useRef<WishlistItemType | null>(null);

  useEffect(() => {
    deleteItemRef.current = deleteItem;
  }, [deleteItem]);

  const filterOptions = useMemo(() => generateFilterOptions(WISHLIST_STATUSES), []);

  const filteredWishlist = useMemo(
    () => sortItemsByDateAndName(filterItemsByStatus(wishlistItems, filterStatus)),
    [filterStatus, wishlistItems]
  );

  const handleDelete = useCallback(() => {
    const targetItem = deleteItemRef.current;
    if (!targetItem) return;
    // TODO: API 실제 관심 목록 해제 요청
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
