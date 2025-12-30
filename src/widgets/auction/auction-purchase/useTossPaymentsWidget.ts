import { useState } from "react";

import { type TossPaymentsWidgets, loadTossPayments } from "@tosspayments/tosspayments-sdk";

// TODO: clientKey는 개발자센터의 결제위젯 연동 키 > 클라이언트 키로 바꾸세요.
// TODO: server.js 의 secretKey 또한 결제위젯 연동 키가 아닌 API 개별 연동 키의 시크릿 키로 변경해야 합니다.
// TODO: 구매자의 고유 아이디를 불러와서 customerKey로 설정하세요. 이메일・전화번호와 같이 유추가 가능한 값은 안전하지 않습니다.
// @docs https://docs.tosspayments.com/sdk/v2/js#토스페이먼츠-초기화
const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
const currency = "KRW";

export const useTossPaymentsWidget = (customerKey: string) => {
  const [ready, setReady] = useState(false);
  const [widgets, setWidgets] = useState<TossPaymentsWidgets | null>(null);

  function resetPaymentWidgets() {
    setReady(false);
    setWidgets(null);
  }

  async function fetchPaymentWidgets() {
    try {
      const tossPayments = await loadTossPayments(clientKey);

      // 회원 결제
      // @docs https://docs.tosspayments.com/sdk/v2/js#tosspaymentswidgets
      const widget = tossPayments.widgets({
        customerKey,
      });

      // 비회원 결제
      // const widgets = tossPayments.widgets({ customerKey: ANONYMOUS });

      setWidgets(widget);
    } catch (error) {
      console.error("Error fetching payment widget:", error);
    }
  }

  async function renderPaymentWidgets(open: boolean) {
    if (widgets == null || !open) {
      return;
    }
    // ------  주문서의 결제 금액 설정 ------
    // TODO: 위젯의 결제금액을 결제하려는 금액으로 초기화하세요.
    // TODO: renderPaymentMethods, renderAgreement, requestPayment 보다 반드시 선행되어야 합니다.
    // @docs https://docs.tosspayments.com/sdk/v2/js#widgetssetamount
    const value = 10000; // TODO: 금액 가져오기
    await widgets.setAmount({ currency, value });

    await Promise.all([
      // ------  결제 UI 렌더링 ------
      // @docs https://docs.tosspayments.com/sdk/v2/js#widgetsrenderpaymentmethods
      widgets.renderPaymentMethods({
        selector: "#payment-method",
        // 렌더링하고 싶은 결제 UI의 variantKey
        // 결제 수단 및 스타일이 다른 멀티 UI를 직접 만들고 싶다면 계약이 필요해요.
        // @docs https://docs.tosspayments.com/guides/v2/payment-widget/admin#새로운-결제-ui-추가하기
        variantKey: "DEFAULT",
      }),
      // ------  이용약관 UI 렌더링 ------
      // @docs https://docs.tosspayments.com/sdk/v2/js#widgetsrenderagreement
      widgets.renderAgreement({
        selector: "#agreement",
        variantKey: "AGREEMENT",
      }),
    ]);

    setReady(true);
  }

  return { ready, widgets, resetPaymentWidgets, fetchPaymentWidgets, renderPaymentWidgets };
};
