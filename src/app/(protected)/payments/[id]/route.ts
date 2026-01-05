import { NextResponse } from "next/server";

import type { PaymentsConfirmResponse } from "@/features/auction/auction-purchase/model/type";
import { fetch } from "@/shared/api/server";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const url = new URL(req.url);
  const paymentKey = url.searchParams.get("paymentKey") ?? "";
  const orderId = url.searchParams.get("orderId") ?? "";
  const amount = url.searchParams.get("amount") ?? "";

  const failUrl = new URL(`/payments/${id}/fail`, url.origin);

  if (!paymentKey || !orderId || !amount) {
    failUrl.searchParams.set("code", "MISS_ACCESS");
    return NextResponse.redirect(failUrl);
  }

  try {
    const response = await fetch<PaymentsConfirmResponse>("/api/v1/payments/confirm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: {
        paymentKey,
        orderId,
        amount,
        auctionId: id,
      },
    });
    if (response.code === 200) {
      const successUrl = new URL(`/payments/${id}/success`, url.origin);
      successUrl.searchParams.set("paymentKey", response.data.paymentKey);
      successUrl.searchParams.set("amount", response.data.amount);
      successUrl.searchParams.set("orderId", response.data.orderId);
      return NextResponse.redirect(successUrl);
    }
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(failUrl);
  }

  return NextResponse.redirect(failUrl);
}
