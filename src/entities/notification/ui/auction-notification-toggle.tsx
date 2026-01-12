"use client";

import { useEffect, useState } from "react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Bell, BellRing } from "lucide-react";
import { Controller, useForm } from "react-hook-form";

import {
  getAuctionNotificationSettings,
  updateAuctionNotificationSettings,
} from "@/entities/notification/api/notification-setting";
import type { NotificationSettingsType } from "@/entities/notification/model/types";
import { auctionNotificationSettingsKey } from "@/entities/notification/model/use-auction-notification-setting-query";
import { useIsAuthenticated } from "@/features/auth/api/use-is-authenticated";
import {
  getAuctionsCacheSnapshot,
  restoreAuctionsCache,
  updateAuctionsCache,
} from "@/shared/lib/query/update-auctions-cache";
import { showToast } from "@/shared/lib/utils/toast/show-toast";
import { Button, Popover, PopoverContent, PopoverTrigger, Switch, Input } from "@/shared/ui";

interface AuctionNotificationToggleProps {
  auctionId: string | number;
}

export default function AuctionNotificationToggle({ auctionId }: AuctionNotificationToggleProps) {
  const qc = useQueryClient();
  const user = useIsAuthenticated();
  const [open, setOpenChange] = useState(false);

  const settingQuery = useQuery({
    queryKey: auctionNotificationSettingsKey(auctionId),
    queryFn: () => getAuctionNotificationSettings(auctionId),
    enabled: open && !!user,
  });
  const { control, register, reset, handleSubmit, watch } = useForm<NotificationSettingsType>({
    defaultValues: {
      auctionStart: false,
      auctionEnd: false,
      priceReached: false,
      price: 0,
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (!settingQuery.data) return;
    reset(settingQuery.data);
  }, [settingQuery.data, reset]);

  const updateMutation = useMutation({
    mutationFn: (body: NotificationSettingsType) =>
      updateAuctionNotificationSettings(auctionId, body),
    onMutate: (body) => {
      const snapshot = getAuctionsCacheSnapshot(qc);
      const isNotification = body.auctionStart || body.auctionEnd || body.priceReached;
      updateAuctionsCache(qc, auctionId, { isNotification });
      return { snapshot };
    },
    onSuccess: async () => {
      showToast.success("알림 설정이 저장되었습니다.");
      await qc.invalidateQueries({ queryKey: auctionNotificationSettingsKey(auctionId) });
      await qc.invalidateQueries({ queryKey: ["user", "notifications"] });
      setOpenChange(false);
    },
    onError: (_err, _vars, ctx) => {
      restoreAuctionsCache(qc, ctx?.snapshot);
      showToast.error("저장에 실패했습니다. 잠시 후 다시 시도해 주세요.");
    },
  });

  const priceReached = watch("priceReached");

  const onSubmit = (value: NotificationSettingsType) => {
    const payload: NotificationSettingsType = {
      ...value,
      price: value.priceReached ? value.price : 0,
    };
    updateMutation.mutate(payload);
  };

  const handleToggleButton = () => {
    if (user) {
      setOpenChange((prev) => !prev);
    } else {
      showToast.error("로그인 후 이용 가능합니다.");
    }
  };

  return (
    <Popover open={open} onOpenChange={handleToggleButton}>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="h-auto flex-col gap-2 py-2 text-xs" size="sm">
          <Bell className="text-zinc-800 dark:text-zinc-300" />
          알림
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <form className="flex min-w-50 flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-2 flex items-center gap-2">
            <BellRing className="text-brand size-4" />
            <h4 className="leading-none font-medium">경매 알림</h4>
          </div>
          <div className="bg-secondary flex items-center justify-between rounded-md p-4 select-none">
            <p className="text-sm">경매 시작 알림</p>
            <Controller
              control={control}
              name="auctionStart"
              render={({ field }) => (
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              )}
            />
          </div>
          <div className="bg-secondary flex items-center justify-between rounded-md p-4 select-none">
            <p className="text-sm">경매 종료 알림</p>
            <Controller
              control={control}
              name="auctionEnd"
              render={({ field }) => (
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              )}
            />
          </div>
          <div className="bg-secondary flex flex-col gap-2 rounded-md p-4 select-none">
            <div className="flex justify-between">
              <p className="text-sm">가격 도달 알림</p>
              <Controller
                control={control}
                name="priceReached"
                render={({ field }) => (
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                )}
              />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-muted-foreground text-xs">희망 가격</p>
              <div className="relative h-9">
                <Input
                  id="target-price"
                  type="number"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  className="h-9 pr-9"
                  disabled={!priceReached}
                  {...register("price", { valueAsNumber: true, min: 0 })}
                />
                <span className="text-muted-foreground absolute top-1/2 right-3 -translate-y-1/2 text-sm">
                  원
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setOpenChange(false)} className="flex-1" variant="outline">
              취소
            </Button>
            <Button className="flex-1">저장</Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
