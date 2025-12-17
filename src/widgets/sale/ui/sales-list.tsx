"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";

import { MOCK_SELLING_ITEMS } from "@/entities/item/api/mocks";
import { SellingItem } from "@/entities/item/model/types";
import { ItemCardFilter } from "@/entities/item/ui/item-card-filter";
import { SellingItemCard } from "@/features/sale/ui/selling-item-card";
import {
  filterItemsByStatus,
  generateFilterOptions,
  sortItemsByDateAndName,
} from "@/shared/lib/utils/filter/user-page-item-filter";
import { DashboardListLayout } from "@/shared/ui/layout/dashboard-list-layout";
import { ConfirmDeleteModal } from "@/shared/ui/modal/confirm-delete-modal";

const SALES_STATUSES = ["판매중", "판매 완료", "경매 예정", "경매 종료"];

interface SalesListProps {
  isOwn?: boolean;
}

export function SalesList({ isOwn = false }: SalesListProps) {
  const [filterStatus, setFilterStatus] = useState("전체");

  const [deleteItem, setDeleteItem] = useState<SellingItem | null>(null);

  const deleteItemRef = useRef<SellingItem | null>(null);

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
      <DashboardListLayout
        filterNode={
          <ItemCardFilter value={filterStatus} options={filterOptions} onChange={setFilterStatus} />
        }
      >
        {filteredSales.map((item) => (
          <SellingItemCard key={item.id} item={item} onDelete={setDeleteItem} isOwn={isOwn} />
        ))}
      </DashboardListLayout>

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
