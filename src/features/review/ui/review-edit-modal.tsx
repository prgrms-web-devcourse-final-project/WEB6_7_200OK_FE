"use client";

import { useState, useEffect } from "react";

import { type ReviewType, ReviewModalBase, ReviewModalThreeActions } from "@/entities/review";
import { ConfirmDeleteModal } from "@/shared/ui";

interface ReviewEditModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  review: ReviewType | null;
  onEdit?: (id: number, data: { rating: number; content: string }) => void;
  onDelete?: (id: number) => void;
}

export function ReviewEditModal({
  open,
  onOpenChange,
  review,
  onEdit,
  onDelete,
}: ReviewEditModalProps) {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showEditConfirm, setShowEditConfirm] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    if (open && review) {
      setRating(review.rating);
      setContent(review.content);
    } else if (!open) {
      setShowDeleteConfirm(false);
      setShowEditConfirm(false);
      setShowWarning(false);
    }
  }, [open, review]);

  if (!review) return null;

  const handleEditClick = () => {
    if (rating < 0.5) {
      setShowWarning(true);
      return;
    }
    setShowEditConfirm(true);
  };

  const handleRealEdit = () => {
    onEdit?.(review.id, { rating, content });
    setShowEditConfirm(false);
    onOpenChange(false);
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleRealDelete = () => {
    if (review) {
      onDelete?.(review.id);
      onOpenChange(false);
      setShowDeleteConfirm(false);
    }
  };

  return (
    <>
      <ReviewModalBase
        open={open}
        onOpenChange={onOpenChange}
        title="리뷰 수정"
        description="작성하신 리뷰를 수정하거나 삭제할 수 있습니다."
        product={{
          imageUrl: review.product.imageUrl,
          name: review.product.name,
        }}
        seller={{
          avatarUrl: review.seller?.avatarUrl,
          name: review.seller?.name || "알 수 없음",
        }}
        rating={rating}
        onRatingChange={setRating}
        content={content}
        onContentChange={setContent}
        actions={
          <ReviewModalThreeActions
            onCancel={() => onOpenChange(false)}
            onDelete={handleDeleteClick}
            onEdit={handleEditClick}
          />
        }
      />

      <ConfirmDeleteModal
        open={showWarning}
        onOpenChange={setShowWarning}
        onConfirm={() => setShowWarning(false)}
        title="별점을 선택해주세요"
        description="최소 0.5점 이상의 별점을 선택해야 리뷰를 수정할 수 있습니다."
        confirmText="확인"
        cancelText="취소"
        variant="destructive"
      />

      <ConfirmDeleteModal
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
        onConfirm={handleRealDelete}
        title="리뷰를 삭제하시겠습니까?"
        description="삭제된 리뷰는 복구할 수 없습니다."
        confirmText="삭제하기"
        variant="destructive"
      />

      <ConfirmDeleteModal
        open={showEditConfirm}
        onOpenChange={setShowEditConfirm}
        onConfirm={handleRealEdit}
        title="리뷰를 수정하시겠습니까?"
        description="수정된 내용은 즉시 반영됩니다."
        confirmText="수정하기"
        cancelText="취소"
        variant="brand"
      />
    </>
  );
}
