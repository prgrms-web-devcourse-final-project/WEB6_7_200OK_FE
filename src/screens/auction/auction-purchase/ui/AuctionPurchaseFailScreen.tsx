"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function AuctionPurchaseFailScreen() {
  const searchParams = useSearchParams();

  return (
    <div
      id="info"
      className="mx-auto mt-7.5 items-center rounded-md p-12.5 text-center whitespace-nowrap"
      style={{ width: "600px" }}
    >
      <Image
        src="https://static.toss.im/lotties/error-spot-no-loop-space-apng.png"
        alt="에러 이미지"
        width={100}
        height={100}
        className="mx-auto"
        unoptimized
        priority
      />
      <h2 className="text-foreground mt-7.5 text-2xl font-medium">결제를 실패했어요</h2>

      <div className="-mr-6 flex h-full flex-wrap text-base" style={{ marginTop: "50px" }}>
        <div className="text-muted-foreground flex-1 pr-6 text-left">
          <b>에러메시지</b>
        </div>
        <div
          className="flex-1 pr-6 text-right"
          id="message"
        >{`${searchParams.get("message")}`}</div>
      </div>
      <div className="-mr-6 flex h-full flex-wrap text-base" style={{ marginTop: "10px" }}>
        <div className="text-muted-foreground flex-1 pr-6 text-left">
          <b>에러코드</b>
        </div>
        <div className="flex-1 pr-6 text-right" id="code">{`${searchParams.get("code")}`}</div>
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
  );
}
