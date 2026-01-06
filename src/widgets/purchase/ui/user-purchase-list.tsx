"use client";

import React, { useState, useMemo, useCallback, useRef, useEffect } from "react";

import { ShoppingBag } from "lucide-react";

import { type UserPurchaseItemType, UserItemCardFilter } from "@/entities/auction";
import { UserPurchasedItemCard, usePurchases, usePurchaseConfirm } from "@/features/purchase";
import {
  ReviewEditModal,
  ReviewWriteModal,
  useCreateReview,
  useUpdateReview,
  useDeleteReview,
  useReviewDetail,
} from "@/features/review";
import {
  filterItemsByStatus,
  generateFilterOptions,
  sortItemsByDateAndName,
} from "@/shared/lib/utils/filter/user-page-item-filter";
import { showToast } from "@/shared/lib/utils/toast/show-toast";
import { DashboardContentLayout, ConfirmDeleteModal, EmptyState } from "@/shared/ui";
import { CommonItemListSkeleton } from "@/widgets/user/ui/skeletons";

const PURCHASE_STATUSES = ["구매 완료", "구매 확정"];

interface PurchaseListProps {
  label: React.ReactNode;
}

export function UserPurchaseList({ label }: PurchaseListProps) {
  const { data: purchaseItems = [], isPending, isFetched } = usePurchases();
  const { mutate: createReview } = useCreateReview();
  const { mutate: updateReview } = useUpdateReview();
  const { mutate: deleteReview } = useDeleteReview();
  const { mutate: confirmPurchase } = usePurchaseConfirm();

  const [filterStatus, setFilterStatus] = useState("전체");
  const [writeModalItem, setWriteModalItem] = useState<UserPurchaseItemType | null>(null);

  const [selectedReviewId, setSelectedReviewId] = useState<number | null>(null);
  const [selectedReviewItem, setSelectedReviewItem] = useState<UserPurchaseItemType | null>(null);

  const [confirmItem, setConfirmItem] = useState<UserPurchaseItemType | null>(null);
  const confirmItemRef = useRef<UserPurchaseItemType | null>(null);

  useEffect(() => {
    confirmItemRef.current = confirmItem;
  }, [confirmItem]);

  const { data: reviewDetailData } = useReviewDetail(selectedReviewId);

  const editModalReview = useMemo(() => {
    if (!reviewDetailData || !selectedReviewItem) return null;

    return {
      ...reviewDetailData,
      product: {
        id: selectedReviewItem.id,
        name: selectedReviewItem.name,
        imageUrl: selectedReviewItem.imageUrl,
      },
      seller: {
        id: reviewDetailData.seller?.id,
        name: reviewDetailData.seller?.name || "판매자",
        avatarUrl: reviewDetailData.seller?.avatarUrl,
      },
    };
  }, [reviewDetailData, selectedReviewItem]);

  const filterOptions = useMemo(() => generateFilterOptions(PURCHASE_STATUSES), []);
  const filteredPurchases = useMemo(
    () => sortItemsByDateAndName(filterItemsByStatus(purchaseItems, filterStatus)),
    [purchaseItems, filterStatus]
  );

  const handleReviewBtnClick = useCallback((item: UserPurchaseItemType) => {
    if (item.hasReview && item.reviewId) {
      setSelectedReviewItem(item);
      setSelectedReviewId(item.reviewId);
      return;
    }
    setWriteModalItem(item);
  }, []);

  const handleWriteSubmit = useCallback(
    (data: { rating: number; content: string }) => {
      if (!writeModalItem) return;

      createReview(
        {
          tradeId: writeModalItem.tradeId,
          rating: data.rating,
          content: data.content,
        },
        {
          onSuccess: () => {
            showToast.success("리뷰가 등록되었습니다.");
            setWriteModalItem(null);
          },
          onError: (err) => {
            console.error("리뷰 등록 실패", err);
            showToast.error("리뷰 등록에 실패했습니다.");
          },
        }
      );
    },
    [writeModalItem, createReview]
  );

  const handleEditSubmit = useCallback(
    (id: number, data: { rating: number; content: string }) => {
      updateReview(
        {
          reviewId: id,
          data: {
            rating: data.rating,
            content: data.content,
          },
        },
        {
          onSuccess: () => {
            showToast.success("리뷰가 수정되었습니다.");
            setSelectedReviewId(null);
            setSelectedReviewItem(null);
          },
          onError: (error) => {
            console.error("리뷰 수정 실패:", error);
            showToast.error("리뷰 수정에 실패했습니다.");
          },
        }
      );
    },
    [updateReview]
  );

  const handleReviewDelete = useCallback(
    (id: number) => {
      deleteReview(id, {
        onSuccess: () => {
          showToast.success("리뷰가 삭제되었습니다.");
          setSelectedReviewId(null);
          setSelectedReviewItem(null);
        },
        onError: (error) => {
          console.error("리뷰 삭제 실패:", error);
          showToast.error("리뷰 삭제에 실패했습니다.");
        },
      });
    },
    [deleteReview]
  );

  const handleConfirmPurchase = useCallback(() => {
    const targetItem = confirmItemRef.current;
    if (!targetItem) return;

    confirmPurchase(targetItem.tradeId, {
      onSuccess: () => {
        showToast.success("구매가 확정되었습니다.");
        setConfirmItem(null);
      },
      onError: () => {
        showToast.error("구매 확정에 실패했습니다.");
      },
    });
  }, [confirmPurchase]);

  const closeEditModal = useCallback(() => {
    setSelectedReviewId(null);
    setSelectedReviewItem(null);
  }, []);

  const purchaseListContent = useMemo(() => {
    if (isPending) {
      return <CommonItemListSkeleton />;
    }

    if (isFetched && filteredPurchases.length > 0) {
      return filteredPurchases.map((item) => (
        <UserPurchasedItemCard
          key={item.id}
          item={item}
          onReviewClick={handleReviewBtnClick}
          onConfirm={setConfirmItem}
        />
      ));
    }

    if (isFetched) {
      return (
        <EmptyState
          Icon={ShoppingBag}
          title="구매 내역이 없습니다."
          description="다양한 경매에 참여하여 상품을 구매해보세요."
          className="py-20"
        />
      );
    }

    return null;
  }, [isPending, isFetched, filteredPurchases, handleReviewBtnClick]);

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
        {purchaseListContent}
      </DashboardContentLayout>

      <ReviewWriteModal
        open={!!writeModalItem}
        onOpenChange={(open) => !open && setWriteModalItem(null)}
        item={writeModalItem}
        onSubmit={handleWriteSubmit}
      />

      <ReviewEditModal
        open={!!editModalReview}
        onOpenChange={(open) => !open && closeEditModal()}
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
