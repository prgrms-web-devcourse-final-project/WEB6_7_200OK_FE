"use client";

import { useMemo, useState } from "react";

import { BellOff } from "lucide-react";

import { UserItemCardFilter } from "@/entities/auction";
import {
  NotificationPreferenceItemCard,
  NotificationPreferenceItemType,
  NotificationPreferenceSettingsModal,
  useNotificationList,
  useNotificationSettings,
  useUpdateNotificationSettings,
} from "@/features/notification-preference";
import {
  filterItemsByStatus,
  generateFilterOptions,
  sortItemsByDateAndName,
} from "@/shared/lib/utils/filter/user-page-item-filter";
import { showToast } from "@/shared/lib/utils/toast/show-toast";
import { DashboardContentLayout, EmptyState } from "@/shared/ui";
import { CommonItemListSkeleton } from "@/widgets/user/ui/skeletons";

const NOTI_STATUSES = ["판매중", "판매 완료", "경매 예정", "경매 종료"];

export function NotificationPreferenceList({ label }: { label?: React.ReactNode }) {
  const { data: notifications = [], isPending: isListPending, isFetched } = useNotificationList();

  const [filterStatus, setFilterStatus] = useState("전체");
  const [selectedNoti, setSelectedNoti] = useState<NotificationPreferenceItemType | null>(null);

  const activeAuctionId = selectedNoti ? Number(selectedNoti.id) : 0;
  const { data: currentSettings } = useNotificationSettings(activeAuctionId);

  const { mutate: updateSettings } = useUpdateNotificationSettings();

  const filteredNotis = useMemo(
    () => sortItemsByDateAndName(filterItemsByStatus(notifications, filterStatus)),
    [notifications, filterStatus]
  );

  const handleSaveSettings = (data: Parameters<typeof updateSettings>[0]["data"]) => {
    if (!activeAuctionId) return;

    updateSettings(
      { auctionId: activeAuctionId, data },
      {
        onSuccess: () => {
          showToast.success("알림 설정이 저장되었습니다.");
        },
        onError: () => {
          showToast.error("설정 저장 중 오류가 발생했습니다.");
        },
      }
    );
  };

  let content: React.ReactNode = null;

  if (isListPending) {
    content = <CommonItemListSkeleton />;
  } else if (isFetched && filteredNotis.length > 0) {
    content = filteredNotis.map((item) => (
      <NotificationPreferenceItemCard key={item.id} item={item} onSettingClick={setSelectedNoti} />
    ));
  } else if (isFetched) {
    content = (
      <EmptyState
        Icon={BellOff}
        title="알림 설정 내역이 없습니다."
        description="새로운 알림을 등록해보세요"
        className="py-20"
      />
    );
  }

  return (
    <>
      <DashboardContentLayout
        label={label}
        filters={
          <UserItemCardFilter
            value={filterStatus}
            options={generateFilterOptions(NOTI_STATUSES)}
            onChange={setFilterStatus}
          />
        }
      >
        {content}
      </DashboardContentLayout>

      <NotificationPreferenceSettingsModal
        open={!!selectedNoti}
        onOpenChange={(open) => {
          if (!open) setSelectedNoti(null);
        }}
        item={selectedNoti}
        initialSettings={currentSettings}
        onSave={handleSaveSettings}
      />
    </>
  );
}
