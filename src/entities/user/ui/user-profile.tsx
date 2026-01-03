"use client";

import { useRef } from "react";

import Image from "next/image";

import { Camera, User, PenLine } from "lucide-react";

import { Button, FileInput, Rating, RatingButton } from "@/shared/ui";

import { UserProfileType } from "../model/types";

interface UserProfileProps {
  profile: UserProfileType;
  isOwn?: boolean;
  onAvatarChange?: (file: File) => void;
  onEditNameClick?: () => void; // [변경] 이름 수정 클릭 이벤트로 변경
}

export function UserProfile({
  profile,
  isOwn = false,
  onAvatarChange,
  onEditNameClick,
}: UserProfileProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="bg-card border-border flex w-full flex-col gap-6 rounded-lg border p-4">
      <div className="flex items-center gap-6">
        {/* 아바타 영역 */}
        <div className="relative size-20 shrink-0">
          <div className="bg-secondary flex h-full w-full items-center justify-center overflow-hidden rounded-full">
            {profile.avatarUrl ? (
              <Image
                src={profile.avatarUrl}
                alt={profile.name}
                fill
                className="rounded-full object-cover"
              />
            ) : (
              <User className="text-foreground size-10" />
            )}
          </div>

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
                  if (file) onAvatarChange?.(file);
                }}
                className="hidden"
                Icon={Camera}
              />
            </>
          )}
        </div>

        {/* 정보 영역 */}
        <div className="flex flex-1 flex-col gap-1">
          <div className="flex items-center gap-1">
            <h2 className="text-foreground text-xl">{profile.name}</h2>

            {isOwn && (
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={onEditNameClick} // [변경] 클릭 시 부모에게 알림
                className="text-muted-foreground size-5"
                aria-label="이름 수정"
              >
                <PenLine className="text-foreground size-4" />
              </Button>
            )}
          </div>

          <p className="text-muted-foreground text-base">{profile.email}</p>

          <div className="mt-1 flex items-center gap-1">
            <Rating value={profile.rating} readOnly className="gap-0">
              {[1, 2, 3, 4, 5].map((i) => (
                <RatingButton key={i} size={20} className="text-brand" />
              ))}
            </Rating>

            <div className="flex items-center gap-1">
              <span className="text-foreground text-base">{profile.rating}</span>
              <span className="text-muted-foreground text-sm">
                ({profile.reviewCount}
                <span className="hidden min-[400]:inline">개의 후기</span>)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
