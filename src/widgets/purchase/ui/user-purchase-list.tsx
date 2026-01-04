"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";

import { MOCK_PURCHASES, UserPurchaseItemType, UserItemCardFilter } from "@/entities/auction";
import { MOCK_REVIEWS, ReviewType } from "@/entities/review";
import { UserPurchasedItemCard } from "@/features/purchase";
import { ReviewEditModal, ReviewWriteModal } from "@/features/review";
import {
  filterItemsByStatus,
  generateFilterOptions,
  sortItemsByDateAndName,
} from "@/shared/lib/utils/filter/user-page-item-filter";
import { DashboardContentLayout, ConfirmDeleteModal } from "@/shared/ui";

const PURCHASE_STATUSES = ["구매 완료", "구매 확정"];

interface PurchaseListProps {
  label?: React.ReactNode;
}

export function UserPurchaseList({ label }: PurchaseListProps) {
  const [filterStatus, setFilterStatus] = useState("전체");

  const [writeModalItem, setWriteModalItem] = useState<UserPurchaseItemType | null>(null);
  const [editModalReview, setEditModalReview] = useState<ReviewType | null>(null);

  const [confirmItem, setConfirmItem] = useState<UserPurchaseItemType | null>(null);

  const confirmItemRef = useRef<UserPurchaseItemType | null>(null);

  useEffect(() => {
    confirmItemRef.current = confirmItem;
  }, [confirmItem]);

  const filterOptions = useMemo(() => generateFilterOptions(PURCHASE_STATUSES), []);

  const filteredPurchases = useMemo(
    () => sortItemsByDateAndName(filterItemsByStatus(MOCK_PURCHASES, filterStatus)),
    [filterStatus]
  );

  const handleReviewBtnClick = useCallback((item: UserPurchaseItemType) => {
    if (item.hasReview) {
      // TODO: API 연동 - 리뷰 데이터 조회
      const targetReview =
        MOCK_REVIEWS.find((r) => r.product.name === item.name) || MOCK_REVIEWS[0];
      setEditModalReview(targetReview);
    } else {
      setWriteModalItem(item);
    }
  }, []);

  const handleWriteSubmit = useCallback((_data: { rating: number; content: string }) => {
    // TODO: API 연동 - 리뷰 작성
  }, []);

  const handleEditSubmit = useCallback(
    (_id: string, _data: { rating: number; content: string }) => {
      // TODO: API 연동 - 리뷰 수정
    },
    []
  );

  const handleReviewDelete = useCallback((_id: string) => {
    // TODO: API 연동 - 리뷰 삭제
  }, []);

  const handleConfirmPurchase = useCallback(() => {
    const targetItem = confirmItemRef.current;

    if (!targetItem) return;

    // TODO: API 연동 - 구매 확정 (targetItem.id 사용)

    setConfirmItem(null);
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
        {filteredPurchases.map((item) => (
          <UserPurchasedItemCard
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
