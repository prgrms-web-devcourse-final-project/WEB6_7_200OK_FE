import type { LucideIcon } from "lucide-react";

export interface UserProfileType {
  name: string;
  email: string;
  avatarUrl?: string;
  rating: number;
  reviewCount: number;
  isOwner: boolean;
}

export interface UserBasicInfoResponseType {
  status: string;
  message: string;
  data: {
    userId: number;
    userEmail: string;
    username: string;
    userProfileUrl: string;
  };
}
export type TabIdType =
  | "calendar"
  | "sales"
  | "purchases"
  | "auctionLike"
  | "notifications"
  | "recent"
  | "reviews";

export interface TabConfig {
  id: TabIdType;
  label: string;
  icon: LucideIcon;
  isPublic?: boolean;
}
