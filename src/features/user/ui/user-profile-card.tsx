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

  // TODO: 실제 이름 변경 API 연동 및 에러 처리 추가
  const handleSaveName = async () => {
    try {
      // TODO: newName을 사용하여 실제 이름 변경 API를 호출하고,
      //       성공 시 상위 상태나 전역 상태에 프로필 정보를 반영하세요.
      // 임시 동작: 모달만 닫습니다.
      setIsEditModalOpen(false);
    } catch (error) {
      // TODO: 사용자에게 에러 메시지를 보여줄 UI 에러 처리 로직을 추가하세요.
      console.error("Failed to save user name", error);
    }
  };

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
