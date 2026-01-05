"use client";

import { useState, useMemo, useCallback } from "react";

import { UserItemCardFilter } from "@/entities/auction";
import {
  MOCK_NOTIFICATIONS,
  NotificationPreferenceItemType,
  NotificationPreferenceItemCard,
  NotificationPreferenceSettingsModal,
} from "@/features/notification-preference";
import {
  filterItemsByStatus,
  generateFilterOptions,
  sortItemsByDateAndName,
} from "@/shared/lib/utils/filter/user-page-item-filter";
import { DashboardContentLayout } from "@/shared/ui";

const NOTI_STATUSES = ["판매중", "판매 완료", "경매 예정", "경매 종료"];

interface NotificationPreferenceListProps {
  label?: React.ReactNode;
}

export function NotificationPreferenceList({ label }: NotificationPreferenceListProps) {
  const [filterStatus, setFilterStatus] = useState("전체");
  const [selectedNotificationPreference, setSelectedNotificationPreference] =
    useState<NotificationPreferenceItemType | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const filterOptions = useMemo(() => generateFilterOptions(NOTI_STATUSES), []);

  const filteredNotificationPreference = useMemo(
    () => sortItemsByDateAndName(filterItemsByStatus(MOCK_NOTIFICATIONS, filterStatus)),
    [filterStatus]
  );

  const handleNotificationPreferenceSettingClick = useCallback(
    (item: NotificationPreferenceItemType) => {
      setSelectedNotificationPreference(item);
      setIsSettingsOpen(true);
    },
    []
  );

  return (
    <>
      <DashboardContentLayout
        label={label}
        filters={
          <UserItemCardFilter
            value={filterStatus}
            options={filterOptions}
            onChange={setFilterStatus}
          />
        }
      >
        {filteredNotificationPreference.map((item) => (
          <NotificationPreferenceItemCard
            key={item.id}
            item={item}
            onSettingClick={handleNotificationPreferenceSettingClick}
          />
        ))}
      </DashboardContentLayout>

      <NotificationPreferenceSettingsModal
        open={isSettingsOpen}
        onOpenChange={setIsSettingsOpen}
        item={selectedNotificationPreference}
      />
    </>
  );
}
