import ProductNotificationToggle from "@/entities/notification/ui/product-notification-toggle";
import ProductLikeToggle from "@/features/like/ui/product-like-toggle";
import PurchaseButton from "@/features/purchase/ui/purchase-button";

export default function ProductUserActions() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        <ProductNotificationToggle />
        <ProductLikeToggle />
      </div>
      <PurchaseButton />
    </div>
  );
}
