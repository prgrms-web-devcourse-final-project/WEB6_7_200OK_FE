"use client";

import { useState } from "react";

import { Bell, BellRing } from "lucide-react";

import { Button, Popover, PopoverContent, PopoverTrigger, Switch, Input } from "@/shared/ui";

export default function AuctionNotificationToggle() {
  const [open, setOpenChange] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpenChange}>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="h-auto flex-col gap-2 py-2 text-xs" size="sm">
          <Bell className="text-zinc-800 dark:text-zinc-300" />
          알림
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <form className="flex min-w-50 flex-col gap-2">
          <div className="mb-2 flex items-center gap-2">
            <BellRing className="text-brand size-4" />
            <h4 className="leading-none font-medium">경매 알림</h4>
          </div>
          <div className="bg-secondary flex items-center justify-between rounded-md p-4 select-none">
            <p className="text-sm">경매 시작 알림</p>
            <Switch />
          </div>
          <div className="bg-secondary flex items-center justify-between rounded-md p-4 select-none">
            <p className="text-sm">경매 종료 알림</p>
            <Switch />
          </div>
          <div className="bg-secondary flex flex-col gap-2 rounded-md p-4 select-none">
            <div className="flex justify-between">
              <p className="text-sm">가격 도달 알림</p>
              <Switch />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-muted-foreground text-xs">희망 가격</p>
              <div className="relative h-9">
                <Input
                  id="target-price"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  className="h-9 pr-9"
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
