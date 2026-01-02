export interface PaymentsConfirmRequest {
  paymentKey: string;
  orderId: string;
  amount: string;
  auctionId: string;
}

export interface PaymentsConfirmResponse {
  orderId: string;
  paymentKey: string;
  amount: string;
}
