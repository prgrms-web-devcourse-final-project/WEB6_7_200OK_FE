"use client";

import { useState } from "react";

import { UserProfile } from "@/entities/user";
import { UserProfileType } from "@/entities/user/model/types";
import { ChangeNameModal } from "@/features/user/ui/change-name-modal";

interface UserProfileCardProps {
  profile: UserProfileType;
  isOwn?: boolean;
}

export function UserProfileCard({ profile, isOwn }: UserProfileCardProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // TODO: 실제 이름 변경 API 연동
  const handleSaveName = () => {};

  // TODO: 실제 아바타 이미지 변경 API 연동
  const handleAvatarChange = () => {};

  return (
    <div className="w-full">
      <UserProfile
        profile={profile}
        isOwn={isOwn}
        onEditNameClick={() => setIsEditModalOpen(true)}
        onAvatarChange={handleAvatarChange}
      />

      <ChangeNameModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        currentName={profile.name}
        onSave={handleSaveName}
      />
    </div>
  );
}
