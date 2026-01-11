"use client";

import { useMemo, useState, useEffect } from "react";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { BellOff } from "lucide-react";
import { useInView } from "react-intersection-observer";

import { UserItemCardFilter } from "@/entities/auction";
import { getAuctionNotificationSettings } from "@/entities/notification/api/notification-setting";
import {
  NotificationPreferenceItemCard,
  NotificationPreferenceItemType,
  NotificationPreferenceSettingsModal,
  useNotificationList,
  useUpdateNotificationSettings,
  notificationKeys,
} from "@/features/notification-preference";
import {
  filterItemsByStatus,
  generateFilterOptions,
  sortItemsByDateAndName,
} from "@/shared/lib/utils/filter/user-page-item-filter";
import { showToast } from "@/shared/lib/utils/toast/show-toast";
import { DashboardContentLayout, EmptyState, Spinner } from "@/shared/ui";
import { CommonItemListSkeleton } from "@/widgets/user/ui/skeletons";

const NOTI_STATUSES = ["판매중", "판매 완료", "경매 예정", "경매 종료"];

export function NotificationPreferenceList({ label }: { label?: React.ReactNode }) {
  const queryClient = useQueryClient();

  const {
    data,
    isPending: isListPending,
    isFetched,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useNotificationList();

  const [filterStatus, setFilterStatus] = useState("전체");
  const [selectedNoti, setSelectedNoti] = useState<NotificationPreferenceItemType | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  const { data: remoteSettings } = useQuery({
    queryKey: notificationKeys.settings(Number(selectedNoti?.id)),
    queryFn: () => getAuctionNotificationSettings(selectedNoti!.id),
    enabled: !!selectedNoti,
    staleTime: 1000 * 60,
  });

  const { mutate: updateSettings } = useUpdateNotificationSettings();

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "100px",
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleOpenSettings = async (item: NotificationPreferenceItemType) => {
    if (isFetching) return;

    setIsFetching(true);
    try {
      await queryClient.fetchQuery({
        queryKey: notificationKeys.settings(Number(item.id)),
        queryFn: () => getAuctionNotificationSettings(item.id),
      });

      setSelectedNoti(item);
    } catch {
      showToast.error("설정 정보를 불러오는 데 실패했습니다.");
    } finally {
      setIsFetching(false);
    }
  };

  const notifications = useMemo(() => data?.pages.flatMap((page) => page.slice) ?? [], [data]);

  const filteredNotis = useMemo(
    () => sortItemsByDateAndName(filterItemsByStatus(notifications, filterStatus)),
    [notifications, filterStatus]
  );

  const handleSaveSettings = (settingsData: Parameters<typeof updateSettings>[0]["data"]) => {
    if (!selectedNoti) return;

    updateSettings(
      { auctionId: Number(selectedNoti.id), data: settingsData },
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

  const renderContent = () => {
    if (isListPending) {
      return <CommonItemListSkeleton />;
    }

    if (isFetched && filteredNotis.length > 0) {
      return (
        <div className="flex flex-col gap-4">
          {filteredNotis.map((item) => (
            <NotificationPreferenceItemCard
              key={item.id}
              item={item}
              onSettingClick={handleOpenSettings}
            />
          ))}

          <div ref={ref} className="h-4 w-full">
            {isFetchingNextPage && (
              <div className="flex justify-center py-4">
                <Spinner className="text-brand-primary size-6" />
              </div>
            )}
          </div>
        </div>
      );
    }

    if (isFetched) {
      return (
        <EmptyState
          Icon={BellOff}
          title="알림 설정 내역이 없습니다."
          description="새로운 알림을 등록해보세요"
          className="py-20"
        />
      );
    }

    return null;
  };

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
        {renderContent()}
      </DashboardContentLayout>

      <NotificationPreferenceSettingsModal
        open={!!selectedNoti}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedNoti(null);
          }
        }}
        item={selectedNoti}
        initialSettings={remoteSettings ?? undefined}
        onSave={handleSaveSettings}
      />
    </>
  );
}
