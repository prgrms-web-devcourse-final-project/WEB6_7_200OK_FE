import {
  BadgeCheck,
  Bell,
  CheckCircle,
  Clock,
  CreditCard,
  Gavel,
  MessageCircle,
  Star,
  TrendingDown,
  TriangleAlert,
  XCircle,
} from "lucide-react";

import { ROUTES } from "@/shared/config/routes";

import type { NotificationTarget, NotificationType } from "./types";
import type { LucideIcon } from "lucide-react";

export function getNotificationIcon(type: NotificationType): LucideIcon {
  switch (type) {
    case "CHAT_MESSAGE":
      return MessageCircle;
    case "AUCTION_START_WISHLIST":
      return Clock;
    case "AUCTION_FAILED_SELLER":
    case "AUCTION_FAILED_BUYER":
      return XCircle;
    case "AUCTION_ENDED_OTHER":
      return Gavel;
    case "STOP_LOSS_TRIGGERED":
      return TriangleAlert;
    case "PRICE_DROP":
      return TrendingDown;
    case "SALE_SUCCESS_SELLER":
      return BadgeCheck;
    case "PAYMENT_SUCCESS_BUYER":
      return CreditCard;
    case "PURCHASE_CONFIRMED_SELLER":
      return CheckCircle;
    case "REVIEW_REGISTERED":
      return Star;
    default:
      return Bell;
  }
}

export function getNotificationTargetHref(target: NotificationTarget, targetId: number): string {
  switch (target) {
    case "chatRoom":
      return "/dm";
    case "auction":
      return ROUTES.auctionDetail(targetId);
    case "payment":
      return `/payments/${targetId}`;
    case "review":
      return ROUTES.userReview(targetId);
    default:
      return ROUTES.main;
  }
}
