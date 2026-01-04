"use client";

import { useEffect, useState } from "react";

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

const NAME_REGEX = /^[가-힣a-zA-Z0-9]+$/;

export function ChangeNameModal({ open, onOpenChange, currentName, onSave }: ChangeNameModalProps) {
  const [name, setName] = useState(currentName);

  const isValidLength = name.trim().length >= 2 && name.trim().length <= 20;
  const isValidPattern = NAME_REGEX.test(name.trim());
  const isValid = isValidLength && isValidPattern;

  const isChanged = name.trim() !== currentName.trim();

  useEffect(() => {
    if (open) {
      setName(currentName);
    }
  }, [open, currentName]);

  const handleSave = () => {
    if (!isValid) return;
    onSave(name);
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
            한글, 영문, 숫자 포함 2-20자 이내로 입력해주세요.
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
