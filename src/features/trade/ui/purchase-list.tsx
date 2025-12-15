"use client";

import { useState, useMemo, useCallback } from "react";

import { MOCK_PURCHASES } from "@/entities/item/api/mocks";
import { PurchaseItem } from "@/entities/item/model/types";
import { Review } from "@/entities/review/model/types";
import { ReviewEditModal } from "@/features/review/ui/review-edit-modal";
import { ReviewWriteModal } from "@/features/review/ui/review-write-modal";
import { ItemFilter } from "@/features/trade/ui/item-filter";
import { PurchasedCardRow } from "@/features/trade/ui/purchased-card-row";
import {
  filterItemsByStatus,
  generateFilterOptions,
  sortItemsByDateAndName,
} from "@/shared/lib/utils/filter/user-page-item-filter";
import { DashboardListLayout } from "@/shared/ui/layout/dashboard-list-layout";
import { ConfirmDeleteModal } from "@/shared/ui/modal/confirm-delete-modal";

const PURCHASE_STATUSES = ["구매 완료", "구매 확정"];

export function PurchaseList() {
  const [filterStatus, setFilterStatus] = useState("전체");

  const [writeModalItem, setWriteModalItem] = useState<PurchaseItem | null>(null);
  const [editModalReview, setEditModalReview] = useState<Review | null>(null);
  const [confirmItem, setConfirmItem] = useState<PurchaseItem | null>(null);

  const filterOptions = useMemo(() => generateFilterOptions(PURCHASE_STATUSES), []);

  const filteredPurchases = useMemo(
    () => sortItemsByDateAndName(filterItemsByStatus(MOCK_PURCHASES, filterStatus)),
    [filterStatus]
  );

  const handleReviewBtnClick = useCallback((item: PurchaseItem) => {
    if (item.hasReview) {
      // TODO: API 연동 - 리뷰 데이터 조회
      setEditModalReview(null);
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
    if (!confirmItem) return;
    // TODO: API 연동 - 구매 확정
    setConfirmItem(null);
  }, [confirmItem]);

  return (
    <>
      <DashboardListLayout
        filterNode={
          <ItemFilter value={filterStatus} options={filterOptions} onChange={setFilterStatus} />
        }
      >
        {filteredPurchases.map((item) => (
          <PurchasedCardRow
            key={item.id}
            item={item}
            onReviewClick={handleReviewBtnClick}
            onConfirm={setConfirmItem}
          />
        ))}
      </DashboardListLayout>

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
