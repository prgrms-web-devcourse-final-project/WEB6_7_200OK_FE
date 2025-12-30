"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function AuctionPurchaseSuccessScreen() {
  const searchParams = useSearchParams();
  const responseData = null;

  return (
    <>
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
        <div className="flex-1 pr-6">
          <Link href="https://docs.tosspayments.com/guides/v2/payment-widget/integration">
            <button
              className="mt-[30px] w-[250px] max-w-[41.66667%] flex-[0_0_41.66667%] cursor-pointer rounded-[7px] border-0 border-transparent bg-[#3182f6] px-4 py-[11px] text-center text-[15px] leading-[18px] font-semibold whitespace-nowrap text-[#f9fafb] no-underline transition-[background,color] duration-200 ease-in select-none"
              type="button"
            >
              연동 문서
            </button>
          </Link>
          <Link href="https://discord.gg/A4fRFXQhRu">
            <button
              type="button"
              className="mt-[30px] w-[250px] max-w-[41.66667%] flex-[0_0_41.66667%] cursor-pointer rounded-[7px] border-0 border-transparent bg-[#3182f6] px-4 py-[11px] text-center text-[15px] leading-[18px] font-semibold whitespace-nowrap text-[#f9fafb] no-underline transition-[background,color] duration-200 ease-in select-none"
              style={{ backgroundColor: "#e8f3ff", color: "#1b64da" }}
            >
              실시간 문의
            </button>
          </Link>
        </div>
      </div>
      <div
        className="text-muted-foreground mx-auto mt-7.5 items-center rounded-md p-12.5 text-left whitespace-nowrap"
        style={{ width: "600px" }}
      >
        <b>Response Data :</b>
        <div id="response" style={{ whiteSpace: "initial" }} className="text-foreground text-base">
          {responseData && <pre>{JSON.stringify(responseData, null, 4)}</pre>}
        </div>
      </div>
    </>
  );
}
