"use client";

import Image from "next/image";

import { Camera, User, PenLine } from "lucide-react";

import Button from "@/shared/ui/button/button";
import { Rating, RatingButton } from "@/shared/ui/rating/rating";

import { UserProfile as UserProfileType } from "../model/types";

interface UserProfileProps {
  profile: UserProfileType;
  isOwn?: boolean;
}

export function UserProfile({ profile, isOwn = false }: UserProfileProps) {
  return (
    <div className="bg-card border-border flex w-full flex-col gap-6 rounded-lg border px-4 py-6">
      <div className="flex items-center gap-6">
        <div className="relative h-20 w-20 shrink-0">
          <div className="bg-secondary flex h-full w-full items-center justify-center overflow-hidden rounded-full">
            {profile.avatarUrl ? (
              <Image src={profile.avatarUrl} alt={profile.name} fill className="object-cover" />
            ) : (
              <User className="text-foreground h-10 w-10" />
            )}
          </div>

          {isOwn && (
            <button
              type="button"
              className="bg-brand absolute right-0 bottom-0 flex h-7 w-7 items-center justify-center rounded-full shadow-xs transition-transform hover:scale-105"
              aria-label="프로필 수정"
            >
              <Camera className="text-brand-contrast h-3.5 w-3.5" />
            </button>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-1">
          <div className="flex items-center gap-1">
            <h2 className="text-foreground text-xl font-medium tracking-tight">{profile.name}</h2>

            {isOwn && (
              <Button variant="ghost" size="icon-sm" className="text-muted-foreground h-5 w-5">
                <PenLine className="text-foreground h-4 w-4" />
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
                <span className="hidden min-[400px]:inline">개의 후기</span>)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
