"use client";

import { useEffect, useState } from "react";

import { loadTossPayments, TossPaymentsPayment } from "@tosspayments/tosspayments-sdk";
import { nanoid } from "nanoid";

import { useAuctionPriceStore } from "@/widgets/auction/auction-detail/provider/auction-price-store-provider";

// ------  SDK 초기화 ------
// @docs https://docs.tosspayments.com/sdk/v2/js#토스페이먼츠-초기화
const clientKey = "test_ck_PBal2vxj81NqeKXKeQPK35RQgOAN";
const customerKey = nanoid();
const orderId = nanoid();

export const useTossPayments = (auctionId: string, title: string, userName: string) => {
  const [payment, setPayment] = useState<TossPaymentsPayment | null>(null);
  const price = useAuctionPriceStore((state) => state.price);

  useEffect(() => {
    async function fetchPayment() {
      try {
        const tossPayments = await loadTossPayments(clientKey);
        const syncPayment = tossPayments.payment({
          customerKey,
        });
        setPayment(syncPayment);
      } catch (error) {
        console.error("Error fetching payment:", error);
      }
    }
    fetchPayment();
  }, []);

  // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
  // @docs https://docs.tosspayments.com/sdk/v2/js#paymentrequestpayment
  async function requestPayment() {
    // 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
    // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
    if (payment === null) return;

    await payment.requestPayment({
      method: "CARD", // 카드 및 간편결제
      amount: { currency: "KRW", value: price },
      orderId, // 고유 주문번호
      orderName: title,
      successUrl: `${window.location.origin}/payments/${auctionId}`, // 결제 요청이 성공하면 리다이렉트되는 URL
      failUrl: `${window.location.origin}/payments/${auctionId}/fail`, // 결제 요청이 실패하면 리다이렉트되는 URL
      customerName: userName,
      // 카드 결제에 필요한 정보
      card: {
        useEscrow: false,
        flowMode: "DEFAULT", // 통합결제창 여는 옵션
        useCardPoint: false,
        useAppCardOnly: false,
      },
    });
  }

  return { requestPayment };
};
