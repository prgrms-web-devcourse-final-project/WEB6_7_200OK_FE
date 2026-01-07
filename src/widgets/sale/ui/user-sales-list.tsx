"use client";

import { useState, useMemo, useEffect } from "react";

import { PackageOpen } from "lucide-react";
import { useInView } from "react-intersection-observer";

import { type UserSellingItemType, UserItemCardFilter } from "@/entities/auction";
import {
  UserSellingItemCard,
  useUserSalesList,
  useCancelSale,
} from "@/features/auction/auction-sale";
import {
  filterItemsByStatus,
  generateFilterOptions,
  sortItemsByDateAndName,
} from "@/shared/lib/utils/filter/user-page-item-filter";
import { DashboardContentLayout, ConfirmDeleteModal, EmptyState, Spinner } from "@/shared/ui";
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
  const { data, isPending, isFetched, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useUserSalesList(userId);

  const { mutate: cancelSale } = useCancelSale(userId);
  const [filterStatus, setFilterStatus] = useState("전체");
  const [deleteItem, setDeleteItem] = useState<UserSellingItemType | null>(null);

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "100px",
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const salesItems = useMemo(() => data?.pages.flatMap((page) => page.slice) ?? [], [data]);

  const filteredSales = useMemo(
    () => sortItemsByDateAndName(filterItemsByStatus(salesItems, filterStatus)),
    [salesItems, filterStatus]
  );

  const handleDeleteConfirm = () => {
    if (deleteItem) {
      cancelSale(deleteItem.id);
      setDeleteItem(null);
    }
  };

  const renderContent = () => {
    if (isPending) {
      return <CommonItemListSkeleton />;
    }

    if (isFetched && filteredSales.length > 0) {
      return (
        <div className="flex flex-col gap-4">
          {filteredSales.map((item) => (
            <UserSellingItemCard key={item.id} item={item} onDelete={setDeleteItem} isOwn={isOwn} />
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
        onConfirm={handleDeleteConfirm}
        title="경매 종료"
        description="해당 경매를 종료하시겠습니까? 이 작업은 되돌릴 수 없습니다."
        confirmText="종료하기"
        variant="destructive"
      />
    </>
  );
}
