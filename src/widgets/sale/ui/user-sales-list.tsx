"use client";

import { useState, useMemo } from "react";

import { PackageOpen } from "lucide-react";

import { UserSellingItemType, UserItemCardFilter } from "@/entities/auction";
import { UserSellingItemCard, useSales } from "@/features/auction/auction-sale";
import {
  filterItemsByStatus,
  generateFilterOptions,
  sortItemsByDateAndName,
} from "@/shared/lib/utils/filter/user-page-item-filter";
import { DashboardContentLayout, ConfirmDeleteModal, EmptyState } from "@/shared/ui";
import { CommonItemListSkeleton } from "@/widgets/user/ui/skeletons";

const SALES_STATUSES = ["판매중", "판매 완료", "경매 예정", "경매 종료"];

export function UserSalesList({
  isOwn,
  label,
  userId,
}: {
  isOwn: boolean;
  label: React.ReactNode;
  userId: number;
}) {
  const { data: salesItems = [], isPending, isFetched } = useSales(userId);
  const [filterStatus, setFilterStatus] = useState("전체");
  const [deleteItem, setDeleteItem] = useState<UserSellingItemType | null>(null);

  const filteredSales = useMemo(
    () => sortItemsByDateAndName(filterItemsByStatus(salesItems, filterStatus)),
    [salesItems, filterStatus]
  );

  const renderContent = () => {
    if (isPending) {
      return <CommonItemListSkeleton />;
    }

    if (isFetched && filteredSales.length > 0) {
      return filteredSales.map((item) => (
        <UserSellingItemCard key={item.id} item={item} onDelete={setDeleteItem} isOwn={isOwn} />
      ));
    }

    if (isFetched) {
      return (
        <EmptyState
          Icon={PackageOpen}
          title="판매 내역이 없습니다."
          description="새로운 상품을 등록하여 판매를 시작해보세요."
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
            options={generateFilterOptions(SALES_STATUSES)}
            onChange={setFilterStatus}
          />
        }
      >
        {renderContent()}
      </DashboardContentLayout>

      <ConfirmDeleteModal
        open={!!deleteItem}
        onOpenChange={(open) => !open && setDeleteItem(null)}
        onConfirm={() => setDeleteItem(null)}
        title="판매글 삭제"
        description="해당 판매글을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."
        confirmText="삭제하기"
        variant="destructive"
      />
    </>
  );
}
