"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";

import { PurchaseItemType, ItemCardFilter } from "@/entities/item";
import { ReviewType } from "@/entities/review";
import { PurchasedItemCard } from "@/features/purchase";
import { usePurchaseList } from "@/features/purchase/api/use-purchases";
import { ReviewEditModal, ReviewWriteModal } from "@/features/review";
import { useReviewList } from "@/features/review/api/use-reviews";
import {
  filterItemsByStatus,
  generateFilterOptions,
  sortItemsByDateAndName,
} from "@/shared/lib/utils/filter/user-page-item-filter";
import { DashboardContentLayout, ConfirmDeleteModal, Skeleton } from "@/shared/ui";

const PURCHASE_STATUSES = ["구매 완료", "구매 확정"];

interface PurchaseListProps {
  label?: React.ReactNode;
}

export function PurchaseList({ label }: PurchaseListProps) {
  const { data: purchaseItems = [], isLoading: isPurchaseLoading } = usePurchaseList();
  const { data: reviews = [], isLoading: isReviewLoading } = useReviewList();

  const isLoading = isPurchaseLoading || isReviewLoading;

  const [filterStatus, setFilterStatus] = useState("전체");

  const [writeModalItem, setWriteModalItem] = useState<PurchaseItemType | null>(null);
  const [editModalReview, setEditModalReview] = useState<ReviewType | null>(null);

  const [confirmItem, setConfirmItem] = useState<PurchaseItemType | null>(null);

  const confirmItemRef = useRef<PurchaseItemType | null>(null);

  useEffect(() => {
    confirmItemRef.current = confirmItem;
  }, [confirmItem]);

  const filterOptions = useMemo(() => generateFilterOptions(PURCHASE_STATUSES), []);

  const filteredPurchases = useMemo(
    () => sortItemsByDateAndName(filterItemsByStatus(purchaseItems, filterStatus)),
    [filterStatus, purchaseItems]
  );

  const handleReviewBtnClick = useCallback(
    (item: PurchaseItemType) => {
      if (item.hasReview) {
        // TODO: API 연동 시에는 itemId나 reviewId를 통해 매칭 고려
        const targetReview = reviews.find((r) => r.product.name === item.name);

        if (targetReview) {
          setEditModalReview(targetReview);
        } else {
          console.warn("리뷰가 있다고 표시되었으나 데이터를 찾을 수 없습니다.");
        }
      } else {
        setWriteModalItem(item);
      }
    },
    [reviews]
  );

  const handleWriteSubmit = useCallback((_data: { rating: number; content: string }) => {
    // TODO: API 연동 - 리뷰 작성 Mutation 호출
  }, []);

  const handleEditSubmit = useCallback(
    (_id: string, _data: { rating: number; content: string }) => {
      // TODO: API 연동 - 리뷰 수정 Mutation 호출
    },
    []
  );

  const handleReviewDelete = useCallback((_id: string) => {
    // TODO: API 연동 - 리뷰 삭제 Mutation 호출
  }, []);

  const handleConfirmPurchase = useCallback(() => {
    const targetItem = confirmItemRef.current;

    if (!targetItem) return;

    // TODO: API 연동 - 구매 확정 Mutation 호출

    setConfirmItem(null);
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
        {filteredPurchases.map((item) => (
          <PurchasedItemCard
            key={item.id}
            item={item}
            onReviewClick={handleReviewBtnClick}
            onConfirm={setConfirmItem}
          />
        ))}
      </DashboardContentLayout>

      <ReviewWriteModal
        open={!!writeModalItem}
        onOpenChange={(open) => !open && setWriteModalItem(null)}
        item={writeModalItem}
        onSubmit={handleWriteSubmit}
      />

      <ReviewEditModal
        open={!!editModalReview}
        onOpenChange={(open) => !open && setEditModalReview(null)}
        review={editModalReview}
        onEdit={handleEditSubmit}
        onDelete={handleReviewDelete}
      />

      <ConfirmDeleteModal
        open={!!confirmItem}
        onOpenChange={(open) => !open && setConfirmItem(null)}
        onConfirm={handleConfirmPurchase}
        title="구매를 확정하시겠습니까?"
        description="구매 확정 후에는 취소할 수 없으며, 판매자에게 대금이 지급됩니다."
        confirmText="확정하기"
        cancelText="취소"
        variant="brand"
      />
    </>
  );
}
