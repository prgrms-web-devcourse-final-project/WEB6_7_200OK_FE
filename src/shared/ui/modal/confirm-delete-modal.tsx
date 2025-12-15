"use client";

import { cn } from "@/shared/lib/utils/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/ui/alert-dialog/alert-dialog";

interface ConfirmDeleteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "brand" | "destructive";
}

export function ConfirmDeleteModal({
  open,
  onOpenChange,
  onConfirm,
  title = "항목을 삭제하시겠습니까?",
  description = "이 작업은 되돌릴 수 없으며, 삭제된 데이터는 복구되지 않습니다.",
  confirmText = "삭제",
  cancelText = "취소",
  variant = "destructive",
}: ConfirmDeleteModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="w-[90%] rounded-lg sm:max-w-[400px]">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-foreground">{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-4 gap-2 sm:gap-0">
          <AlertDialogCancel className="bg-background text-foreground border-input hover:bg-secondary">
            {cancelText}
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleConfirm}
            className={cn(
              "w-full sm:w-auto",
              variant === "destructive" && "bg-destructive hover:bg-destructive/90 text-white",
              variant === "brand" && "bg-brand text-brand-contrast hover:bg-brand/90"
            )}
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
