"use client";

import { useState, useMemo, useCallback, useRef, useEffect, ReactNode } from "react";

import { MOCK_SELLING_ITEMS, SellingItemType, ItemCardFilter } from "@/entities/item";
import { SellingItemCard } from "@/features/sale";
import {
  filterItemsByStatus,
  generateFilterOptions,
  sortItemsByDateAndName,
} from "@/shared/lib/utils/filter/user-page-item-filter";
import { DashboardContentLayout, ConfirmDeleteModal } from "@/shared/ui";

const SALES_STATUSES = ["판매중", "판매 완료", "경매 예정", "경매 종료"];

interface SalesListProps {
  isOwn?: boolean;
  label?: ReactNode;
}

export function SalesList({ isOwn = false, label }: SalesListProps) {
  const [filterStatus, setFilterStatus] = useState("전체");

  const [deleteItem, setDeleteItem] = useState<SellingItemType | null>(null);

  const deleteItemRef = useRef<SellingItemType | null>(null);

  useEffect(() => {
    deleteItemRef.current = deleteItem;
  }, [deleteItem]);

  const filterOptions = useMemo(() => generateFilterOptions(SALES_STATUSES), []);

  const filteredSales = useMemo(
    () => sortItemsByDateAndName(filterItemsByStatus(MOCK_SELLING_ITEMS, filterStatus)),
    [filterStatus]
  );

  const handleDelete = useCallback(() => {
    const targetItem = deleteItemRef.current;

    if (!targetItem) return;

    // TODO: API 삭제 요청 (targetItem.id 사용)

    setDeleteItem(null);
  }, []);

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
