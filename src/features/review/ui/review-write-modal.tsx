"use client";

import { useState } from "react";

import { PurchaseItemType } from "@/entities/item";
import { ConfirmDeleteModal } from "@/shared/ui";

import { ReviewModalBase, ReviewModalActions } from "./review-modal-base";

interface ReviewWriteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: PurchaseItemType | null;
  onSubmit?: (data: { rating: number; content: string }) => void;
}

export function ReviewWriteModal({ open, onOpenChange, item, onSubmit }: ReviewWriteModalProps) {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");

  const [showWarning, setShowWarning] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  if (!item) return null;

  const handleAttemptSubmit = () => {
    if (rating < 0.5) {
      setShowWarning(true);
      return;
    }
    setShowConfirm(true);
  };

  const handleRealSubmit = () => {
    onSubmit?.({ rating, content });
    onOpenChange(false);
    setRating(0);
    setContent("");
    setShowConfirm(false);
  };

  return (
    <>
      <ReviewModalBase
        open={open}
        onOpenChange={onOpenChange}
        title="리뷰 작성"
        description="구매하신 상품은 어떠셨나요?"
        product={{
          imageUrl: item.imageUrl,
          name: item.name,
          price: item.price,
        }}
        seller={item.seller}
        rating={rating}
        onRatingChange={setRating}
        content={content}
        onContentChange={setContent}
        contentPlaceholder="거래에 대한 솔직한 리뷰를 작성해주세요.&#13;&#10;• 상품의 상태는 어떠셨나요?&#13;&#10;• 판매자와의 거래는 만족스러우셨나요?&#13;&#10;• 다른 구매자분들께 도움이 될 내용을 작성해주세요."
        actions={
          <ReviewModalActions
            onCancel={() => onOpenChange(false)}
            onSubmit={handleAttemptSubmit}
            submitText="등록하기"
            variant="brand"
          />
        }
      />

      <ConfirmDeleteModal
        open={showWarning}
        onOpenChange={setShowWarning}
        onConfirm={() => setShowWarning(false)}
        title="별점을 선택해주세요"
        description="최소 0.5점 이상의 별점을 선택해야 리뷰를 등록할 수 있습니다."
        confirmText="확인"
        cancelText="취소"
        variant="destructive"
      />

      <ConfirmDeleteModal
        open={showConfirm}
        onOpenChange={setShowConfirm}
        onConfirm={handleRealSubmit}
        title="리뷰를 등록하시겠습니까?"
        description="작성하신 리뷰는 다른 사용자들에게 공개됩니다."
        confirmText="등록하기"
        cancelText="취소"
        variant="brand"
      />
    </>
  );
}
