"use client";

import { useState, useRef, type KeyboardEvent } from "react";

import { Camera, PenLine } from "lucide-react";

import {
  UserProfileType,
  UserProfileLayout,
  UserAvatar,
  UserName,
  UserEmail,
  UserRatingInfo,
} from "@/entities/user";
import { showToast } from "@/shared/lib/utils/toast/show-toast";
import { Button, Input, FileInput } from "@/shared/ui";

interface UserProfileCardProps {
  profile: UserProfileType;
  isOwn?: boolean;
}

export function UserProfileCard({ profile, isOwn = false }: UserProfileCardProps) {
  const [isEditingName, setIsEditingName] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleAvatarChange = async (file: File) => {
    try {
      // TODO: 실제 아바타 변경 API 호출
      showToast.success("프로필 이미지가 변경되었습니다.");
    } catch (error) {
      console.error(error);
      showToast.error("이미지 변경에 실패했습니다.");
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleNameSave = async (newName: string) => {
    try {
      // TODO: 실제 닉네임 변경 API 호출
      showToast.success("닉네임이 수정되었습니다.");
      setIsEditingName(false);
    } catch (error) {
      console.error(error);
      showToast.error("닉네임 수정에 실패했습니다.");
    }
  };

  return (
    <UserProfileLayout>
      <UserAvatar src={profile.avatarUrl} alt={profile.name}>
        {isOwn && (
          <>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="bg-brand absolute right-0 bottom-0 flex size-7 items-center justify-center rounded-full shadow-xs transition-transform hover:scale-105"
              aria-label="프로필 사진 변경"
            >
              <Camera className="text-brand-contrast size-3.5" />
            </button>
            <FileInput
              ref={fileInputRef}
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleAvatarChange(file);
              }}
              className="hidden"
              Icon={Camera}
            />
          </>
        )}
      </UserAvatar>

      <div className="flex flex-1 flex-col gap-1">
        <div className="flex h-9 items-center gap-1">
          {isEditingName ? (
            <EditNameForm
              initialName={profile.name}
              onSave={handleNameSave}
              onCancel={() => setIsEditingName(false)}
            />
          ) : (
            <>
              <UserName>{profile.name}</UserName>
              {isOwn && (
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => setIsEditingName(true)}
                  className="text-muted-foreground hover:text-foreground ml-1 size-6"
                  aria-label="이름 수정"
                >
                  <PenLine className="size-4" />
                </Button>
              )}
            </>
          )}
        </div>

        <UserEmail email={profile.email} />

        <UserRatingInfo rating={profile.rating} reviewCount={profile.reviewCount} />
      </div>
    </UserProfileLayout>
  );
}

function EditNameForm({
  initialName,
  onSave,
  onCancel,
}: {
  initialName: string;
  onSave: (name: string) => void;
  onCancel: () => void;
}) {
  const [value, setValue] = useState(initialName);

  const handleSave = () => {
    const trimmed = value.trim();
    // 값이 존재하고, 기존 값과 다를 때만 저장 실행
    if (trimmed && trimmed !== initialName) {
      onSave(trimmed);
    } else {
      // 변경사항 없으면 그냥 닫기
      onCancel();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      onCancel();
    }
  };

  return (
    <div className="animate-in fade-in flex items-center duration-200">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={onCancel} // 포커스를 잃으면 저장하지 않고 취소, Enter로 저장
        className="h-8 max-w-50 text-lg"
        autoFocus
      />
    </div>
  );
}
