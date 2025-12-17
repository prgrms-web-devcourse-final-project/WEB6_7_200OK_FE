import { Bell, ShoppingBag, type LucideIcon } from "lucide-react";

import Button from "@/shared/ui/button/button";

export type CtaButtonType = "buy" | "notify";

const CTA_BUTTON_MAP: Record<
  CtaButtonType,
  {
    label: string;
    ariaLabel: string;
    Icon: LucideIcon;
  }
> = {
  buy: {
    label: "구매하기",
    ariaLabel: "경매 상품 구매하기",
    Icon: ShoppingBag,
  },
  notify: {
    label: "알림 받기",
    ariaLabel: "경매 시작 알림 받기",
    Icon: Bell,
  },
};

interface CtaButtonProps {
  type: CtaButtonType;
}

export default function CtaButton({ type }: CtaButtonProps) {
  const { label, ariaLabel, Icon } = CTA_BUTTON_MAP[type];

  return (
    <Button size="lg" className="w-full font-semibold" aria-label={ariaLabel}>
      <Icon className="size-4" aria-hidden="true" />
      {label}
    </Button>
  );
}
