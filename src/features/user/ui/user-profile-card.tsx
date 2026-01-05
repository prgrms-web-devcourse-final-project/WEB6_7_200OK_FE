"use client";

import { useState } from "react";

import { UserProfile } from "@/entities/user";
import { ChangeNameModal } from "@/features/user/ui/change-name-modal";

import { useUserProfile, useUpdateUserImage, useUpdateUserName } from "../api/use-my-profile";

interface UserProfileCardProps {
  userId: number;
}

export function UserProfileCard({ userId }: UserProfileCardProps) {
  const { data: profile } = useUserProfile(userId);
  const { mutate: changeImage } = useUpdateUserImage(userId);
  const { mutate: changeName, isPending: isSavingName } = useUpdateUserName(userId);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  if (!profile) return null;
  const isOwn = profile.isOwner;

  const handleSaveName = (newName: string) => {
    changeName(newName, {
      onSuccess: () => setIsEditModalOpen(false),
    });
  };

  const handleAvatarChange = (file: File) => {
    changeImage(file);
  };

  return (
    <div className="w-full">
      <UserProfile
        profile={profile}
        isOwn={isOwn}
        onEditNameClick={() => isOwn && setIsEditModalOpen(true)}
        onAvatarChange={handleAvatarChange}
      />

      {isOwn && (
        <ChangeNameModal
          open={isEditModalOpen}
          onOpenChange={setIsEditModalOpen}
          currentName={profile.name}
          onSave={handleSaveName}
          isLoading={isSavingName}
        />
      )}
    </div>
  );
}
