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

export function ChangeNameModal({ open, onOpenChange, currentName, onSave }: ChangeNameModalProps) {
  const [name, setName] = useState(currentName);

  useEffect(() => {
    if (open) {
      setName(currentName);
    }
  }, [open, currentName]);

  const handleSave = () => {
    if (!name.trim()) return;
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
          <p className="text-muted-foreground mt-2 text-xs">
            한글, 영문, 숫자 포함 2-20자 이내로 입력해주세요.
          </p>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            onClick={handleSave}
            disabled={!name.trim() || name === currentName}
            variant="primary"
          >
            저장
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
