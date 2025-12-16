import ProductNotificationToggle from "@/entities/notification/ui/product-notification-toggle";
import PurchaseButton from "@/features/purchase/ui/purchase-button";
import ProductWishToggle from "@/features/wishlist/ui/product-wish-toggle";

export default function ProductUserActions() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        <ProductNotificationToggle />
        <ProductWishToggle />
      </div>
      <PurchaseButton />
    </div>
  );
}
