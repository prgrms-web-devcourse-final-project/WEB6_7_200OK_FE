"use client";

import { useEffect, useState } from "react";

import { PurchaseButton } from "@/features/auction/auction-purchase";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/shared/ui";
import { useTossPaymentsWidget } from "@/widgets/auction/auction-purchase/useTossPaymentsWidget";

interface PurchaseWidgetProps {
  customerKey: string;
}

export default function PurchaseWidget({ customerKey }: PurchaseWidgetProps) {
  const [open, setOpenChange] = useState(false);
  const { ready, widgets, fetchPaymentWidgets, renderPaymentWidgets, resetPaymentWidgets } =
    useTossPaymentsWidget(customerKey);

  useEffect(() => {
    renderPaymentWidgets(open);
  }, [renderPaymentWidgets, open]);

  const handleDialogHandler = async () => {
    if (!open) {
      await fetchPaymentWidgets();
      setOpenChange(true);
    } else {
      // dialog 창 닫을 경우 결제 위젯 초기화
      resetPaymentWidgets();
      setOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogHandler}>
      <DialogTrigger asChild>
        <PurchaseButton onClick={() => setOpenChange(true)} />
      </DialogTrigger>
      <DialogContent className="min-w-sm bg-white [&>button]:hidden">
        <DialogTitle className="text-zinc-900">결제</DialogTitle>
        <div className="wrapper">
          <div className="box-section">
            {/* 결제 UI */}
            <div id="payment-method" />
            {/* 이용약관 UI */}
            <div id="agreement" />

            {/* 결제하기 버튼 */}
            <div className="px-[15px]">
              <button
                className="mt-[30px] w-full cursor-pointer rounded-[7px] border-0 border-transparent bg-[#3182f6] px-4 py-[11px] text-center text-[15px] leading-[18px] font-semibold whitespace-nowrap text-[#f9fafb] no-underline transition-[background,color] duration-200 ease-in select-none"
                disabled={!ready}
                type="button"
                // ----- '결제하기' 버튼을 누르면 결제창 띄우기 -----
                // @docs https://docs.tosspayments.com/sdk/v2/js#widgetsrequestpayment
                onClick={async () => {
                  try {
                    // 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
                    // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
                    await widgets?.requestPayment({
                      orderId: customerKey, // 고유 주문 번호
                      orderName: "토스 티셔츠 외 2건",
                      successUrl: `${window.location}/success`, // 결제 요청이 성공하면 리다이렉트되는 URL
                      failUrl: `${window.location}/fail`, // 결제 요청이 실패하면 리다이렉트되는 URL
                      customerEmail: "customer123@gmail.com",
                      customerName: "김토스",
                      // 가상계좌 안내, 퀵계좌이체 휴대폰 번호 자동 완성에 사용되는 값입니다. 필요할 경우 주석을 해체해 주세요.
                      // customerMobilePhone: "01012341234"
                    });
                  } catch (error) {
                    // 에러 처리하기
                    console.error(error);
                  }
                }}
              >
                결제하기
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
