"use client";

import { useState, useMemo } from "react";

import { History } from "lucide-react";

import { type UserRecentlyViewedItemType, UserItemCardFilter } from "@/entities/auction";
import {
  UserRecentViewedItemCard,
  useRecentViewedItems,
  useDeleteRecentView,
} from "@/features/recent-viewed";
import {
  filterItemsByStatus,
  generateFilterOptions,
  sortItemsByDateAndName,
} from "@/shared/lib/utils/filter/user-page-item-filter";
import { DashboardContentLayout, ConfirmDeleteModal, EmptyState } from "@/shared/ui";
import { CommonItemListSkeleton } from "@/widgets/user/ui/skeletons";

const RECENT_STATUSES = ["판매중", "판매 완료", "경매 예정", "경매 종료"];

type RecentItemWithId = UserRecentlyViewedItemType & { recentViewId: number };

export function UserRecentViewedList({ label }: { label?: React.ReactNode }) {
  const { data: recentItems = [], isPending, isFetched } = useRecentViewedItems();
  const { mutate: deleteRecentView } = useDeleteRecentView();

  const [filterStatus, setFilterStatus] = useState("전체");
  const [deleteItem, setDeleteItem] = useState<RecentItemWithId | null>(null);

  const filteredRecent = useMemo(
    () => sortItemsByDateAndName(filterItemsByStatus(recentItems, filterStatus)),
    [recentItems, filterStatus]
  );

  const handleDeleteConfirm = () => {
    if (!deleteItem) return;
    deleteRecentView(deleteItem.recentViewId);
    setDeleteItem(null);
  };

  const hasItems = isFetched && filteredRecent.length > 0;
  const isEmpty = isFetched && filteredRecent.length === 0;

  const renderContent = () => {
    if (isPending) {
      return <CommonItemListSkeleton />;
    }

    if (hasItems) {
      return filteredRecent.map((item) => (
        <UserRecentViewedItemCard
          key={item.id}
          item={item}
          onRemove={() => setDeleteItem(item as RecentItemWithId)}
        />
      ));
    }

    if (isEmpty) {
      return (
        <EmptyState
          Icon={History}
          title="최근 본 상품이 없습니다."
          description="다양한 경매 물건들을 둘러보세요."
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
            options={generateFilterOptions(RECENT_STATUSES)}
            onChange={setFilterStatus}
          />
        }
      >
        {renderContent()}
      </DashboardContentLayout>

      <ConfirmDeleteModal
        open={!!deleteItem}
        onOpenChange={(open) => !open && setDeleteItem(null)}
        onConfirm={handleDeleteConfirm}
        title="최근 기록 삭제"
        description="이 상품을 목록에서 지우시겠습니까?"
        confirmText="지우기"
        variant="destructive"
      />
    </>
  );
}
