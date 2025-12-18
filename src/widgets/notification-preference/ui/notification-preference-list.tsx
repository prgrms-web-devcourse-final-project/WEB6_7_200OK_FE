"use client";

import { useState, useMemo, useCallback } from "react";

import { ItemCardFilter } from "@/entities/item/ui/item-card-filter";
import { MOCK_NOTIFICATIONS } from "@/features/notification-preference/api/mocks";
import { NotificationPreferenceItem } from "@/features/notification-preference/model/types";
import { NotificationPreferenceItemCard } from "@/features/notification-preference/ui/notification-preference-item-card";
import { NotificationPreferenceSettingsModal } from "@/features/notification-preference/ui/notification-preference-settings-modal";
import {
  filterItemsByStatus,
  generateFilterOptions,
  sortItemsByDateAndName,
} from "@/shared/lib/utils/filter/user-page-item-filter";
import { DashboardContentLayout } from "@/shared/ui/layout/dashboard-content-layout";

const NOTI_STATUSES = ["판매중", "판매 완료", "경매 예정", "경매 종료"];

interface NotificationPreferenceListProps {
  labelNode?: React.ReactNode;
}

export function NotificationPreferenceList({ labelNode }: NotificationPreferenceListProps) {
  const [filterStatus, setFilterStatus] = useState("전체");
  const [selectedNotificationPreference, setSelectedNotificationPreference] =
    useState<NotificationPreferenceItem | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const filterOptions = useMemo(() => generateFilterOptions(NOTI_STATUSES), []);

  const filteredNotificationPreference = useMemo(
    () => sortItemsByDateAndName(filterItemsByStatus(MOCK_NOTIFICATIONS, filterStatus)),
    [filterStatus]
  );

  const handleNotificationPreferenceSettingClick = useCallback(
    (item: NotificationPreferenceItem) => {
      setSelectedNotificationPreference(item);
      setIsSettingsOpen(true);
    },
    []
  );

  return (
    <>
      <DashboardContentLayout
        labelNode={labelNode}
        filterNode={
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
