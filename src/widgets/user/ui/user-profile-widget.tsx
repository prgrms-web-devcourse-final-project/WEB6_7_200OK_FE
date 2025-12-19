"use client";

import { UserProfile, UserProfileType } from "@/entities/user";

interface UserProfileWidgetProps {
  profile: UserProfileType;
  isOwn?: boolean;
}

export function UserProfileWidget({ profile, isOwn }: UserProfileWidgetProps) {
  return (
    <div className="w-full">
      <UserProfile profile={profile} isOwn={isOwn} />
    </div>
  );
}
