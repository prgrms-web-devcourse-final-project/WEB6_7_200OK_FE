"use client";

import { useState, useRef } from "react";

import Image from "next/image";

import { Camera, User, PenLine } from "lucide-react";

import Button from "@/shared/ui/button/button";
import FileInput from "@/shared/ui/input/file-input";
import Input from "@/shared/ui/input/input";
import { Rating, RatingButton } from "@/shared/ui/rating/rating";

import { UserProfile as UserProfileType } from "../model/types";

interface UserProfileProps {
  profile: UserProfileType;
  isOwn?: boolean;
  onAvatarChange?: (file: File) => void;
  onNameChange?: (newName: string) => void;
}

export function UserProfile({
  profile,
  isOwn = false,
  onAvatarChange,
  onNameChange,
}: UserProfileProps) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(profile.name);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleNameSave = () => {
    const trimmedName = editedName.trim();
    if (trimmedName && trimmedName !== profile.name) {
      onNameChange?.(trimmedName);
    }
    setIsEditingName(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleNameSave();
    } else if (e.key === "Escape") {
      setIsEditingName(false);
    }
  };

  return (
    <div className="bg-card border-border flex w-full flex-col gap-6 rounded-lg border p-4">
      <div className="flex items-center gap-6">
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

        <div className="flex flex-1 flex-col gap-1">
          <div className="flex items-center gap-1">
            {isEditingName ? (
              <Input
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={handleNameSave}
                className="h-7 max-w-25 px-2 py-1 text-xl"
                autoFocus
              />
            ) : (
              <>
                <h2 className="text-foreground text-xl">{profile.name}</h2>

                {isOwn && (
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => {
                      setIsEditingName(true);
                      setEditedName(profile.name);
                    }}
                    className="text-muted-foreground size-5"
                    aria-label="이름 수정"
                  >
                    <PenLine className="text-foreground size-4" />
                  </Button>
                )}
              </>
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
