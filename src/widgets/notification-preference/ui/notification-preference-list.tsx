"use client";

import { useState, useMemo } from "react";

import { MOCK_NOTIFICATIONS } from "@/features/notification-preference/api/mocks";
import { NotificationPreferenceItem } from "@/features/notification-preference/model/types";
import { NotificationPreferenceItemCard } from "@/features/notification-preference/ui/notification-preference-item-card";
import { NotificationPreferenceSettingsModal } from "@/features/notification-preference/ui/notification-preference-settings-modal";
import {
  filterItemsByStatus,
  generateFilterOptions,
  sortItemsByDateAndName,
} from "@/shared/lib/utils/filter/user-page-item-filter";
import { ItemCardFilter } from "@/shared/ui/item-card-filter/item-card-filter";

const NOTI_STATUSES = ["판매중", "판매 완료", "경매 예정", "경매 종료"];

export function NotificationPreferenceList() {
  const [filterStatus, setFilterStatus] = useState("전체");
  const [selectedNotificationPreference, setSelectedNotificationPreference] =
    useState<NotificationPreferenceItem | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const filterOptions = useMemo(() => generateFilterOptions(NOTI_STATUSES), []);

  const filteredNotificationPreference = useMemo(
    () => sortItemsByDateAndName(filterItemsByStatus(MOCK_NOTIFICATIONS, filterStatus)),
    [filterStatus]
  );
  const handleNotificationPreferenceSettingClick = (item: NotificationPreferenceItem) => {
    setSelectedNotificationPreference(item);
    setIsSettingsOpen(true);
  };

  return (
    <>
      <div className="flex h-9 w-full flex-col items-end justify-center gap-2.5">
        <ItemCardFilter value={filterStatus} options={filterOptions} onChange={setFilterStatus} />
      </div>

      <div className="flex flex-col gap-4">
        {filteredNotificationPreference.map((item) => (
          <NotificationPreferenceItemCard
            key={item.id}
            item={item}
            onSettingClick={handleNotificationPreferenceSettingClick}
          />
        ))}
      </div>

      <NotificationPreferenceSettingsModal
        open={isSettingsOpen}
        onOpenChange={setIsSettingsOpen}
        item={selectedNotificationPreference}
      />
    </>
  );
}
