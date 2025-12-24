"use client";

import { useState, useMemo, useCallback, useRef, useEffect, ReactNode } from "react";

import { SellingItemType, ItemCardFilter } from "@/entities/item";
import { SellingItemCard } from "@/features/sale";
import { useSalesList } from "@/features/sale/api/use-sales";
import {
  filterItemsByStatus,
  generateFilterOptions,
  sortItemsByDateAndName,
} from "@/shared/lib/utils/filter/user-page-item-filter";
import { DashboardContentLayout, ConfirmDeleteModal, Skeleton } from "@/shared/ui";

const SALES_STATUSES = ["판매중", "판매 완료", "경매 예정", "경매 종료"];

interface SalesListProps {
  isOwn?: boolean;
  label?: ReactNode;
}

export function SalesList({ isOwn = false, label }: SalesListProps) {
  const { data: salesItems = [], isLoading } = useSalesList();

  const [filterStatus, setFilterStatus] = useState("전체");

  const [deleteItem, setDeleteItem] = useState<SellingItemType | null>(null);

  const deleteItemRef = useRef<SellingItemType | null>(null);

  useEffect(() => {
    deleteItemRef.current = deleteItem;
  }, [deleteItem]);

  const filterOptions = useMemo(() => generateFilterOptions(SALES_STATUSES), []);

  const filteredSales = useMemo(
    () => sortItemsByDateAndName(filterItemsByStatus(salesItems, filterStatus)),
    [filterStatus, salesItems]
  );

  const handleDelete = useCallback(() => {
    const targetItem = deleteItemRef.current;
    if (!targetItem) return;
    // TODO: API 삭제 요청
    setDeleteItem(null);
  }, []);

  if (isLoading) {
    return (
      <DashboardContentLayout label={label}>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-40 w-full rounded-xl" />
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
        {filteredSales.map((item) => (
          <SellingItemCard key={item.id} item={item} onDelete={setDeleteItem} isOwn={isOwn} />
        ))}
      </DashboardContentLayout>

      <ConfirmDeleteModal
        open={!!deleteItem}
        onOpenChange={(open) => !open && setDeleteItem(null)}
        onConfirm={handleDelete}
        title="판매글 삭제"
        description="해당 판매글을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."
        confirmText="삭제하기"
        variant="destructive"
      />
    </>
  );
}
