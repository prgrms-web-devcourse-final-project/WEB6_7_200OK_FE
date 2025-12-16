"use client";

import { UserProfile as UserProfileType } from "@/entities/user/model/types";
import { UserProfile } from "@/entities/user/ui/user-profile";

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
