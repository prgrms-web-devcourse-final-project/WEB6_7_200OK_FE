"use client";

import { UserProfile, UserProfileType } from "@/entities/user";

interface UserProfileCardProps {
  profile: UserProfileType;
  isOwn?: boolean;
}

export function UserProfileCard({ profile, isOwn }: UserProfileCardProps) {
  return (
    <div className="w-full">
      <UserProfile profile={profile} isOwn={isOwn} />
    </div>
  );
}
