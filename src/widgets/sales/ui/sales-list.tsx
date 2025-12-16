"use client";

import { useState, useMemo, useCallback } from "react";

import { MOCK_SELLING_ITEMS } from "@/entities/item/api/mocks";
import { SellingItem } from "@/entities/item/model/types";
import { SellingItemCard } from "@/features/sales/ui/selling-item-card";
import {
  filterItemsByStatus,
  generateFilterOptions,
  sortItemsByDateAndName,
} from "@/shared/lib/utils/filter/user-page-item-filter";
import { ItemCardFilter } from "@/shared/ui/item-card-filter/item-card-filter";
import { DashboardListLayout } from "@/shared/ui/layout/dashboard-list-layout";
import { ConfirmDeleteModal } from "@/shared/ui/modal/confirm-delete-modal";

const SALES_STATUSES = ["판매중", "판매 완료", "경매 예정", "경매 종료"];

interface SalesListProps {
  isOwn?: boolean;
}

export function SalesList({ isOwn = false }: SalesListProps) {
  const [filterStatus, setFilterStatus] = useState("전체");
  const [deleteItem, setDeleteItem] = useState<SellingItem | null>(null);

  const filterOptions = useMemo(() => generateFilterOptions(SALES_STATUSES), []);

  const filteredSales = useMemo(
    () => sortItemsByDateAndName(filterItemsByStatus(MOCK_SELLING_ITEMS, filterStatus)),
    [filterStatus]
  );

  const handleDelete = useCallback(() => {
    if (!deleteItem) return;
    // TODO: API 실제 판매글 삭제 요청 로직 구현 필요
    setDeleteItem(null);
  }, [deleteItem]);

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
