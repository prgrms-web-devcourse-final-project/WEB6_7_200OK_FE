"use client";

import { useState } from "react";

import { Bell, BellRing } from "lucide-react";

import { httpClient } from "@/shared/api/client";
import { API_ENDPOINTS } from "@/shared/config/endpoints";
import { showToast } from "@/shared/lib/utils/toast/show-toast";
import Button from "@/shared/ui/button/button";

interface NotifyCtaButtonProps {
  auctionId: number | string;
}

export default function NotifyCtaButton({ auctionId }: NotifyCtaButtonProps) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleNotify = async () => {
    if (isEnabled || isLoading) return;

    setIsLoading(true);
    try {
      await httpClient<void, { auctionStart: boolean }>(
        API_ENDPOINTS.notificationSettings(auctionId),
        {
          method: "PUT",
          body: { auctionStart: true },
        }
      );
      setIsEnabled(true);
      showToast.success("알림이 설정되었습니다.");
    } catch (error) {
      const message =
        error instanceof Error && error.message ? error.message : "알림 설정에 실패했습니다.";
      showToast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  let label = "알림 받기";

  if (isLoading) {
    label = "설정 중...";
  } else if (isEnabled) {
    label = "알림 설정됨";
  }

  const ariaLabel = isEnabled ? "경매 시작 알림 설정됨" : "경매 시작 알림 받기";
  const Icon = isEnabled ? BellRing : Bell;

  return (
    <Button
      size="lg"
      className={`w-full font-semibold ${isEnabled ? "bg-brand text-brand-text" : ""}`}
      aria-label={ariaLabel}
      disabled={isLoading || isEnabled}
      onClick={handleNotify}
    >
      <Icon className="size-4" aria-hidden="true" />
      {label}
    </Button>
  );
}
