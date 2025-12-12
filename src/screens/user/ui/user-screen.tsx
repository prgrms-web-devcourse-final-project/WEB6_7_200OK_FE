"use client";

import { useState } from "react";

import {
  MOCK_USER_PROFILE,
  MOCK_NOTIFICATIONS,
  MOCK_PURCHASES,
  MOCK_REVIEWS,
  MOCK_SELLING_ITEMS,
  MOCK_WATCHLIST_ITEMS,
  MOCK_RECENT_ITEMS,
} from "../model/mocks";
import { NotificationItemCard } from "./notification-tab/notification-item-card";
import { UserProfile } from "./profile/user-profile";
import { PurchasedItemCard } from "./purchase-tab/purchased-item-card";
import { RecentItemCard } from "./recent-tab/recent-item-card";
import { ReviewCard } from "./review-tab/review-card";
import { SellingItemCard } from "./sale-teb/selling-item-card";
import { UserTabs } from "./user-tabs";
import { WatchlistItemCard } from "./watchlist-tab/watchlist-item-card";

export function UserScreen() {
  const [activeTab, setActiveTab] = useState("notifications");

  return (
    <main className="bg-background mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center gap-4 px-4 py-6 md:px-0">
      <UserProfile profile={MOCK_USER_PROFILE} />

      <UserTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <section className="flex w-full flex-col gap-4">
        {activeTab === "notifications" && (
          <div className="flex flex-col gap-4">
            {MOCK_NOTIFICATIONS.map((item) => (
              <NotificationItemCard key={item.id} item={item} />
            ))}
          </div>
        )}

        {activeTab === "sales" && (
          <div className="flex flex-col gap-4">
            {MOCK_SELLING_ITEMS.map((item) => (
              <SellingItemCard key={item.id} item={item} />
            ))}
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="flex flex-col gap-4">
            {MOCK_REVIEWS.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}

        {activeTab === "purchases" && (
          <div className="flex flex-col gap-4">
            {MOCK_PURCHASES.map((item) => (
              <PurchasedItemCard key={item.id} item={item} />
            ))}
          </div>
        )}

        {activeTab === "watchlist" && (
          <div className="flex flex-col gap-4">
            {MOCK_WATCHLIST_ITEMS.map((item) => (
              <WatchlistItemCard key={item.id} item={item} />
            ))}
          </div>
        )}

        {activeTab === "recent" && (
          <div className="flex flex-col gap-4">
            {MOCK_RECENT_ITEMS.map((item) => (
              <RecentItemCard key={item.id} item={item} />
            ))}
          </div>
        )}

        {!["notifications", "sales", "reviews", "purchases", "watchlist", "recent"].includes(
          activeTab
        ) && (
          <div className="border-border text-muted-foreground flex h-60 w-full items-center justify-center rounded-lg border border-dashed">
            준비 중인 기능입니다.
          </div>
        )}
      </section>
    </main>
  );
}
