"use client";

import { useEffect, useState } from "react";

import { z } from "zod";

import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
} from "@/shared/ui";

interface ChangeNameModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentName: string;
  onSave: (newName: string) => void;
}

const nameSchema = z
  .string()
  .trim()
  .min(2, { message: "2자 이상 입력해주세요." })
  .max(20, { message: "20자 이내로 입력해주세요." })
  .regex(/^[가-힣a-zA-Z0-9]+$/, { message: "한글, 영문, 숫자만 사용 가능합니다." });

export function ChangeNameModal({ open, onOpenChange, currentName, onSave }: ChangeNameModalProps) {
  const [name, setName] = useState(currentName);

  const validationResult = nameSchema.safeParse(name);
  const isValid = validationResult.success;
  const errorMessage = !isValid ? validationResult.error.issues[0].message : null;

  const isChanged = name.trim() !== currentName.trim();

  useEffect(() => {
    if (open) {
      setName(currentName);
    }
  }, [open, currentName]);

  const handleSave = () => {
    const result = nameSchema.safeParse(name);
    if (!result.success) return;

    onSave(result.data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>프로필 이름 변경</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="변경할 이름을 입력해주세요"
            maxLength={20}
            className="w-full"
            autoFocus
          />
          <p
            className={`mt-2 text-xs ${!isValid && name.length > 0 ? "text-red-500" : "text-muted-foreground"}`}
          >
            {!isValid && name.length > 0
              ? errorMessage
              : "한글, 영문, 숫자 포함 2-20자 이내로 입력해주세요."}
          </p>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button onClick={handleSave} disabled={!isValid || !isChanged} variant="primary">
            저장
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
