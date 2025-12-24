"use client";

import { useState, useMemo, useCallback } from "react";

import { ItemCardFilter } from "@/entities/item";
import {
  NotificationPreferenceItemType,
  NotificationPreferenceItemCard,
  NotificationPreferenceSettingsModal,
} from "@/features/notification-preference";
import { useNotificationPreferences } from "@/features/notification-preference/api/use-notification-preferences";
import {
  filterItemsByStatus,
  generateFilterOptions,
  sortItemsByDateAndName,
} from "@/shared/lib/utils/filter/user-page-item-filter";
import { DashboardContentLayout, Skeleton } from "@/shared/ui";

const NOTI_STATUSES = ["판매중", "판매 완료", "경매 예정", "경매 종료"];

interface NotificationPreferenceListProps {
  label?: React.ReactNode;
}

export function NotificationPreferenceList({ label }: NotificationPreferenceListProps) {
  const { data: notifications = [], isLoading } = useNotificationPreferences();

  const [filterStatus, setFilterStatus] = useState("전체");
  const [selectedNotificationPreference, setSelectedNotificationPreference] =
    useState<NotificationPreferenceItemType | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const filterOptions = useMemo(() => generateFilterOptions(NOTI_STATUSES), []);

  const filteredNotificationPreference = useMemo(
    () => sortItemsByDateAndName(filterItemsByStatus(notifications, filterStatus)),
    [filterStatus, notifications]
  );

  const handleNotificationPreferenceSettingClick = useCallback(
    (item: NotificationPreferenceItemType) => {
      setSelectedNotificationPreference(item);
      setIsSettingsOpen(true);
    },
    []
  );

  if (isLoading) {
    return (
      <DashboardContentLayout label={label}>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24 w-full rounded-xl" />
          ))}
        </div>
      </DashboardContentLayout>
    );
  }

  return (
    <>
      <DashboardContentLayout
        label={label}
        filters={
          <ItemCardFilter value={filterStatus} options={filterOptions} onChange={setFilterStatus} />
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
