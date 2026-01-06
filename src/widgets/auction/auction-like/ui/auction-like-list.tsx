"use client";

import { useState, useMemo, useCallback, useRef, useEffect, ReactNode } from "react";

import { Heart } from "lucide-react";

import { type UserAuctionLikeItemType, UserItemCardFilter } from "@/entities/auction";
import {
  UserAuctionLikeItemCard,
  useUserAuctionLike,
  useRemoveLike,
} from "@/features/auction/auction-like";
import {
  filterItemsByStatus,
  generateFilterOptions,
  sortItemsByDateAndName,
} from "@/shared/lib/utils/filter/user-page-item-filter";
import { showToast } from "@/shared/lib/utils/toast/show-toast";
import { DashboardContentLayout, ConfirmDeleteModal, Skeleton } from "@/shared/ui";
import EmptyState from "@/shared/ui/empty/empty";
import { CommonItemListSkeleton } from "@/widgets/user/ui/skeletons";

const AUCTIONLIKE_STATUSES = ["판매중", "판매 완료", "경매 예정", "경매 종료"];

interface AuctionLikeProps {
  label?: ReactNode;
}

export function UserAuctionLikeList({ label }: AuctionLikeProps) {
  const { data: auctionLikeItems = [], isLoading } = useUserAuctionLike();
  const { mutate: removeLike } = useRemoveLike();

  const [filterStatus, setFilterStatus] = useState("전체");
  const [deleteItem, setDeleteItem] = useState<UserAuctionLikeItemType | null>(null);

  const deleteItemRef = useRef<UserAuctionLikeItemType | null>(null);
  useEffect(() => {
    deleteItemRef.current = deleteItem;
  }, [deleteItem]);

  const filterOptions = useMemo(() => generateFilterOptions(AUCTIONLIKE_STATUSES), []);

  const filteredAuctionLike = useMemo(
    () => sortItemsByDateAndName(filterItemsByStatus(auctionLikeItems, filterStatus)),
    [filterStatus, auctionLikeItems]
  );

  const handleDelete = useCallback(() => {
    const targetItem = deleteItemRef.current;
    if (!targetItem) return;

    removeLike(Number(targetItem.id), {
      onSuccess: () => {
        showToast.success("관심 목록에서 해제되었습니다.");
        setDeleteItem(null);
      },
      onError: () => {
        showToast.error("요청에 실패했습니다. 잠시 후 다시 시도해주세요.");
      },
    });
  }, [removeLike]);

  if (isLoading) {
    return (
      <DashboardContentLayout label={label} filters={<Skeleton className="h-10 w-24 rounded-md" />}>
        <CommonItemListSkeleton />
      </DashboardContentLayout>
    );
  }

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
        {filteredAuctionLike.length > 0 ? (
          filteredAuctionLike.map((item) => (
            <UserAuctionLikeItemCard
              key={item.id}
              item={item}
              onRemove={(target) => setDeleteItem(target)}
            />
          ))
        ) : (
          <EmptyState
            Icon={Heart}
            title="관심 목록이 비어있습니다."
            description="마음에 드는 상품을 찜하고 알림을 받아보세요."
            className="py-20"
          />
        )}
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
