"use client";

import { useState } from "react";

import Image from "next/image";

import { Package, Star, User } from "lucide-react";

import { PurchaseItem } from "@/entities/item/model/types";
import { cn } from "@/shared/lib/utils/utils";
import Button from "@/shared/ui/button/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/dialog/dialog";
import { ConfirmDeleteModal } from "@/shared/ui/modal/confirm-delete-modal";
import { Rating, RatingButton } from "@/shared/ui/rating/rating";

interface ReviewWriteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: PurchaseItem | null;
  onSubmit?: (data: { rating: number; content: string }) => void;
}

export function ReviewWriteModal({ open, onOpenChange, item, onSubmit }: ReviewWriteModalProps) {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");

  const [showWarning, setShowWarning] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  if (!item) return null;

  const handleAttemptSubmit = () => {
    if (rating === 0) {
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
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="rounded-2.5 w-[90%] gap-4 p-6 sm:max-w-lg">
          <DialogHeader className="flex flex-col gap-2 text-left">
            <div className="flex items-center gap-1.5">
              <Star className="h-5 w-5 fill-transparent text-yellow-400" strokeWidth={2.5} />
              <DialogTitle className="text-foreground text-lg font-semibold">리뷰 작성</DialogTitle>
            </div>
            <p className="text-muted-foreground text-sm font-normal">구매하신 상품은 어떠셨나요?</p>
          </DialogHeader>

          <div className="flex flex-col gap-3">
            <div className="bg-muted flex w-full items-center gap-3 rounded-lg px-3 py-3">
              <div className="bg-secondary relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                {item.imageUrl ? (
                  <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <Package className="text-muted-foreground h-6 w-6" />
                  </div>
                )}
              </div>

              <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
                <span className="text-foreground truncate text-sm font-medium">{item.name}</span>
                <span className="text-brand text-xs leading-4 font-medium">
                  {item.price.toLocaleString()}원
                </span>
              </div>
            </div>

            {item.seller && (
              <div className="bg-muted flex w-full items-center gap-3 rounded-lg px-3 py-3">
                <div className="bg-background ring-border relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-1">
                  {item.seller.avatarUrl ? (
                    <Image
                      src={item.seller.avatarUrl}
                      alt={item.seller.name}
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
                  <span className="text-muted-foreground text-xs font-normal">판매자</span>
                  <span className="text-foreground text-sm leading-5 font-medium">
                    {item.seller.name}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="rating" className="text-foreground text-sm font-medium">
                별점
              </label>
              <div id="rating" className="flex justify-center py-2">
                <Rating value={rating} onValueChange={setRating} className="gap-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <RatingButton
                      key={i}
                      size={40}
                      className="data-[state=active]:fill-brand data-[state=active]:text-brand p-1 text-zinc-200 transition-colors"
                    />
                  ))}
                </Rating>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="review-content"
                className="text-foreground text-sm leading-5 font-medium"
              >
                리뷰 내용
              </label>
              <div className="relative">
                <textarea
                  id="review-content"
                  className={cn(
                    "border-input bg-background text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex h-[116px] w-full resize-none rounded-lg border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                  )}
                  placeholder="거래에 대한 솔직한 리뷰를 작성해주세요.&#13;&#10;• 상품의 상태는 어떠셨나요?&#13;&#10;• 판매자와의 거래는 만족스러우셨나요?&#13;&#10;• 다른 구매자분들께 도움이 될 내용을 작성해주세요."
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
              onClick={handleAttemptSubmit}
              className="bg-brand text-brand-contrast hover:bg-brand/90 h-9 flex-1"
            >
              등록하기
            </Button>
          </div>
        </DialogContent>
      </Dialog>

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
