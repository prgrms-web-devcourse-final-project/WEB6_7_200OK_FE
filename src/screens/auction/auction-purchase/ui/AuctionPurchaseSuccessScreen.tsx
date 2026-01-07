"use client";

import { useEffect } from "react"; // users 구매 목록 갱신

import Image from "next/image";
import { useSearchParams } from "next/navigation";

import { useQueryClient } from "@tanstack/react-query"; // users 구매 목록 갱신

import { purchaseKeys } from "@/features/purchase/api/use-purchases"; // users 구매 목록 갱신
import { useNavigation } from "@/shared/lib/utils/navigation/navigation";

export default function AuctionPurchaseSuccessScreen() {
  const searchParams = useSearchParams();
  const { navigateToHome, navigateToPrev } = useNavigation();

  // users 구매 목록 갱신
  const queryClient = useQueryClient();
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: purchaseKeys.all });
  }, [queryClient]);

  return (
    <div>
      <div
        className="mx-auto mt-7.5 items-center rounded-md p-12.5 text-center whitespace-nowrap"
        style={{ width: "600px" }}
      >
        <Image
          width={100}
          height={100}
          className="mx-auto"
          src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png"
          alt="toss-im"
          unoptimized
          priority
        />
        <h2 className="text-foreground mt-7.5 text-2xl font-medium">결제를 완료했어요</h2>
        <div className="-mr-6 flex h-full flex-wrap text-base" style={{ marginTop: "50px" }}>
          <div className="text-muted-foreground flex-1 pr-6 text-left">
            <b>결제금액</b>
          </div>
          <div className="text-foreground flex-1 pr-6 text-right" id="amount">
            {`${Number(searchParams?.get("amount") ?? 0).toLocaleString()}원`}
          </div>
        </div>
        <div
          className="text-muted-foreground -mr-6 flex h-full flex-wrap text-base"
          style={{ marginTop: "10px" }}
        >
          <div className="flex-1 pr-6 text-left">
            <b>주문번호</b>
          </div>
          <div className="text-foreground flex-1 pr-6 text-right" id="orderId">
            {searchParams?.get("orderId") ?? ""}
          </div>
        </div>
        <div
          className="text-muted-foreground -mr-6 flex h-full flex-wrap text-base"
          style={{ marginTop: "10px" }}
        >
          <div className="flex-1 pr-6 text-left">
            <b>paymentKey</b>
          </div>
          <div
            className="text-foreground flex-1 pr-6 text-right"
            id="paymentKey"
            style={{ whiteSpace: "initial", width: "250px" }}
          >
            {searchParams?.get("paymentKey") ?? ""}
          </div>
        </div>
        <div className="flex flex-1 justify-center gap-2 pr-6">
          <button
            className="mt-[30px] w-[250px] max-w-[41.66667%] flex-[0_0_41.66667%] cursor-pointer rounded-[7px] border-0 border-transparent bg-[#3182f6] px-4 py-[11px] text-center text-[15px] leading-[18px] font-semibold whitespace-nowrap text-[#f9fafb] no-underline transition-[background,color] duration-200 ease-in select-none"
            type="button"
            onClick={() => navigateToPrev()}
          >
            이전으로
          </button>
          <button
            type="button"
            onClick={() => navigateToHome()}
            className="mt-[30px] w-[250px] max-w-[41.66667%] flex-[0_0_41.66667%] cursor-pointer rounded-[7px] border-0 border-transparent bg-[#3182f6] px-4 py-[11px] text-center text-[15px] leading-[18px] font-semibold whitespace-nowrap text-[#f9fafb] no-underline transition-[background,color] duration-200 ease-in select-none"
            style={{ backgroundColor: "#e8f3ff", color: "#1b64da" }}
          >
            홈으로
          </button>
        </div>
      </div>
    </div>
  );
}
