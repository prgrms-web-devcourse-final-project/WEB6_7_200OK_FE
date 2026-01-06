"use client";

import { useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Bell, BellRing } from "lucide-react";

import { toggleAuctionNotificationSettingStart } from "@/entities/notification/api/notification-setting";
import { useIsAuthenticated } from "@/features/auth/api/use-is-authenticated";
import { showToast } from "@/shared/lib/utils/toast/show-toast";
import Button from "@/shared/ui/button/button";

interface NotifyCtaButtonProps {
  auctionId: number | string;
  initialEnabled?: boolean;
}

export default function NotifyCtaButton({ auctionId, initialEnabled }: NotifyCtaButtonProps) {
  const isAuth = useIsAuthenticated();

  const queryClient = useQueryClient();
  const queryKey = ["auction-notify", auctionId] as const;

  const [isEnabled, setIsEnabled] = useState<boolean>(initialEnabled ?? false);

  const { mutate, isPending } = useMutation({
    mutationFn: (nextEnabled: boolean) =>
      toggleAuctionNotificationSettingStart(auctionId, {
        auctionStart: nextEnabled,
      }),

    onMutate: (nextEnabled: boolean) => {
      const prev = isEnabled;
      setIsEnabled(nextEnabled);
      return { prev };
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey });
    },

    onError: (_err, _vars, ctx) => {
      if (ctx?.prev !== undefined) setIsEnabled(ctx.prev);
      showToast.error("경매 시작 알림 설정에 실패했습니다. 잠시 후 다시 시도해주세요.");
    },
  });

  const handleNotify = () => {
    if (!isAuth) {
      showToast.error("로그인한 회원만 알림을 설정할 수 있어요");
      return;
    }

    mutate(!isEnabled);
  };

  const ariaLabel = isEnabled ? "경매 시작 알림 설정됨" : "경매 시작 알림 받기";
  const label = isEnabled ? "알림 설정됨" : "시작 알림 받기";
  const Icon = isEnabled ? BellRing : Bell;

  return (
    <Button
      size="lg"
      className="w-full font-semibold"
      variant={isEnabled ? "secondary" : "primary"}
      aria-label={ariaLabel}
      disabled={isPending}
      onClick={handleNotify}
    >
      <Icon className="size-4" aria-hidden="true" />
      {label}
    </Button>
  );
}
