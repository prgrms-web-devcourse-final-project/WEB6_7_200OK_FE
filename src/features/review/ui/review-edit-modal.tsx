"use client";

import { useState, useEffect } from "react";

import Image from "next/image";

import { Package, Star, User } from "lucide-react";

import { Review } from "@/entities/review/model/types";
import { cn } from "@/shared/lib/utils/utils";
import Button from "@/shared/ui/button/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/dialog/dialog";
import { ConfirmDeleteModal } from "@/shared/ui/modal/confirm-delete-modal";
import { Rating, RatingButton } from "@/shared/ui/rating/rating";

interface ReviewEditModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  review: Review | null;
  onEdit?: (id: string, data: { rating: number; content: string }) => void;
  onDelete?: (id: string) => void;
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
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="w-[90%] gap-4 rounded-lg p-6 sm:max-w-lg">
          <DialogHeader className="flex flex-col gap-2 text-left">
            <div className="flex items-center gap-1.5">
              <Star className="h-5 w-5 fill-transparent text-yellow-400" strokeWidth={2.5} />
              <DialogTitle className="text-foreground text-lg font-semibold">리뷰 수정</DialogTitle>
            </div>
            <p className="text-muted-foreground text-sm leading-5 font-normal">
              작성하신 리뷰를 수정하거나 삭제할 수 있습니다.
            </p>
          </DialogHeader>

          <div className="flex flex-col gap-3">
            <div className="bg-muted flex w-full items-center gap-3 rounded-lg px-3 py-3">
              <div className="bg-secondary relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                {review.product.imageUrl ? (
                  <Image
                    src={review.product.imageUrl}
                    alt={review.product.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <Package className="text-muted-foreground h-6 w-6" />
                  </div>
                )}
              </div>

              <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
                <span className="text-foreground truncate text-sm leading-5 font-medium">
                  {review.product.name}
                </span>
                <span className="text-muted-foreground text-xs leading-4 font-normal">
                  구매 상품
                </span>
              </div>
            </div>

            {review.seller && (
              <div className="bg-muted flex w-full items-center gap-3 rounded-lg px-3 py-3">
                <div className="bg-background ring-border relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-1">
                  {review.seller.avatarUrl ? (
                    <Image
                      src={review.seller.avatarUrl}
                      alt={review.seller.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="bg-secondary flex h-full w-full items-center justify-center">
                      <User className="text-muted-foreground h-6 w-6" />
                    </div>
                  )}
                </div>

                <div className="flex flex-col">
                  <span className="text-muted-foreground text-xs leading-4 font-normal">
                    판매자
                  </span>
                  <span className="text-foreground text-sm leading-5 font-medium">
                    {review.seller.name}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="edit-rating"
                className="text-foreground text-sm leading-5 font-medium"
              >
                별점
              </label>
              <div id="edit-rating" className="flex justify-center py-2">
                <Rating value={rating} onValueChange={setRating} className="gap-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <RatingButton
                      key={i}
                      size={40}
                      className="data-[state=active]:fill-brand data-[state=active]:text-brand text-muted p-1 transition-colors"
                    />
                  ))}
                </Rating>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="edit-review-content"
                className="text-foreground text-sm leading-5 font-medium"
              >
                리뷰 내용
              </label>
              <div className="relative">
                <textarea
                  id="edit-review-content"
                  className={cn(
                    "border-input bg-background text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex h-32 w-full resize-none rounded-lg border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                  )}
                  placeholder="리뷰 내용을 입력해주세요."
                  value={content}
                  onChange={(e) => {
                    if (e.target.value.length <= 500) setContent(e.target.value);
                  }}
                />
                <div className="text-muted-foreground mt-1.5 text-right text-xs leading-4 font-normal">
                  {content.length} / 500자
                </div>
              </div>
            </div>
          </div>

          <div className="mt-2 flex w-full gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="h-9 flex-1"
            >
              취소
            </Button>
            <Button
              type="button"
              onClick={handleDeleteClick}
              className="border-destructive bg-background text-destructive hover:bg-destructive/10 h-9 flex-1 border"
            >
              삭제하기
            </Button>
            <Button
              type="button"
              onClick={handleEditClick}
              className="bg-brand text-brand-contrast hover:bg-brand/90 h-9 flex-1"
            >
              수정하기
            </Button>
          </div>
        </DialogContent>
      </Dialog>

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
