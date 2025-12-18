"use client";

import { ReactNode } from "react";

import Image from "next/image";

import { Package, Star, User } from "lucide-react";

import { cn } from "@/shared/lib/utils/utils";
import Button from "@/shared/ui/button/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/dialog/dialog";
import { Rating, RatingButton } from "@/shared/ui/rating/rating";
import { Textarea } from "@/shared/ui/textarea/textarea";

interface ProductInfo {
  imageUrl?: string;
  name: string;
  price?: number;
}

interface SellerInfo {
  avatarUrl?: string;
  name: string;
}

interface ReviewModalBaseProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  product: ProductInfo;
  seller?: SellerInfo;
  rating: number;
  onRatingChange: (rating: number) => void;
  content: string;
  onContentChange: (content: string) => void;
  contentPlaceholder?: string;
  actions: ReactNode;
}

export function ReviewModalBase({
  open,
  onOpenChange,
  title,
  description,
  product,
  seller,
  rating,
  onRatingChange,
  content,
  onContentChange,
  contentPlaceholder = "리뷰 내용을 입력해주세요.",
  actions,
}: ReviewModalBaseProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[90%] gap-4 rounded-lg p-6 sm:max-w-lg">
        <DialogHeader className="flex flex-col gap-2 text-left">
          <div className="flex items-center gap-1.5">
            <Star className="h-5 w-5 fill-transparent text-yellow-400" strokeWidth={2.5} />
            <DialogTitle className="text-foreground text-lg font-semibold">{title}</DialogTitle>
          </div>
          <p className="text-muted-foreground text-sm font-normal">{description}</p>
        </DialogHeader>

        <div className="flex flex-col gap-3">
          {/* 상품 정보 */}
          <div className="bg-muted flex w-full items-center gap-3 rounded-lg px-3 py-3">
            <div className="bg-secondary relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
              {product.imageUrl ? (
                <Image src={product.imageUrl} alt={product.name} fill className="object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <Package className="text-muted-foreground h-6 w-6" />
                </div>
              )}
            </div>

            <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
              <span className="text-foreground truncate text-sm font-medium">{product.name}</span>
              {product.price !== undefined ? (
                <span className="text-brand text-xs leading-4 font-medium">
                  {product.price.toLocaleString()}원
                </span>
              ) : (
                <span className="text-muted-foreground text-xs leading-4 font-normal">
                  구매 상품
                </span>
              )}
            </div>
          </div>

          {/* 판매자 정보 */}
          {seller && (
            <div className="bg-muted flex w-full items-center gap-3 rounded-lg px-3 py-3">
              <div className="bg-background ring-border relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-1">
                {seller.avatarUrl ? (
                  <Image src={seller.avatarUrl} alt={seller.name} fill className="object-cover" />
                ) : (
                  <div className="bg-secondary flex h-full w-full items-center justify-center">
                    <User className="text-muted-foreground h-6 w-6" />
                  </div>
                )}
              </div>

              <div className="flex flex-col">
                <span className="text-muted-foreground text-xs font-normal">판매자</span>
                <span className="text-foreground text-sm leading-5 font-medium">{seller.name}</span>
              </div>
            </div>
          )}
        </div>

        {/* 별점 및 내용 입력 */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="rating" className="text-foreground text-sm font-medium">
              별점
            </label>
            <div id="rating" className="flex justify-center py-2">
              <Rating value={rating} onValueChange={onRatingChange} className="gap-2">
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
              <Textarea
                id="review-content"
                className="h-32 resize-none rounded-lg"
                placeholder={contentPlaceholder}
                value={content}
                onChange={(e) => {
                  if (e.target.value.length <= 500) onContentChange(e.target.value);
                }}
              />
              <div className="text-muted-foreground mt-1.5 text-right text-xs leading-4 font-normal">
                {content.length} / 500자
              </div>
            </div>
          </div>
        </div>

        {/* 액션 버튼들 */}
        <div className="mt-2 flex w-full gap-2">{actions}</div>
      </DialogContent>
    </Dialog>
  );
}

// 공통 액션 컴포넌트들
interface ReviewModalActionsProps {
  onCancel: () => void;
  onSubmit: () => void;
  submitText?: string;
  cancelText?: string;
  variant?: "default" | "destructive" | "brand";
}

export function ReviewModalActions({
  onCancel,
  onSubmit,
  submitText = "등록하기",
  cancelText = "취소",
  variant = "brand",
}: ReviewModalActionsProps) {
  return (
    <>
      <Button type="button" variant="outline" onClick={onCancel} className="h-9 flex-1">
        {cancelText}
      </Button>
      <Button
        type="button"
        onClick={onSubmit}
        className={cn(
          "h-9 flex-1",
          variant === "brand" && "bg-brand text-brand-contrast hover:bg-brand/90",
          variant === "destructive" &&
            "bg-destructive text-destructive-foreground hover:bg-destructive/90"
        )}
      >
        {submitText}
      </Button>
    </>
  );
}

export function ReviewModalThreeActions({
  onCancel,
  onDelete,
  onEdit,
}: {
  onCancel: () => void;
  onDelete: () => void;
  onEdit: () => void;
}) {
  return (
    <>
      <Button type="button" variant="outline" onClick={onCancel} className="h-9 flex-1">
        취소
      </Button>
      <Button
        type="button"
        onClick={onDelete}
        className="bg-destructive hover:bg-destructive/90 h-9 flex-1 border text-white"
      >
        삭제하기
      </Button>
      <Button
        type="button"
        onClick={onEdit}
        className="bg-brand text-brand-contrast hover:bg-brand/90 h-9 flex-1"
      >
        수정하기
      </Button>
    </>
  );
}
