"use client";

import { useState } from "react";

import { ChevronDown, Clock } from "lucide-react";

import { TIME_SELECTOR_CLASSES } from "@/entities/date-modal/model/time-selector-constants";
import { HOURS, MINUTES, TIMEZONES } from "@/entities/item/model/registration-constants";
import { cn } from "@/shared/lib/utils/utils";
import Button from "@/shared/ui/button/button";
import { ScrollArea } from "@/shared/ui/scroll-area/scroll-area";

export function TimeSelector() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="relative w-full">
      {/* 시간 표시 버튼 */}
      <Button
        type="button"
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="border-input focus-visible:border-ring focus-visible:ring-ring/50 dark:bg-input/30 flex h-12 w-full items-center justify-between gap-2 rounded-md border bg-transparent px-3 shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px]"
      >
        <div className="flex items-center gap-2">
          <Clock className="text-muted-foreground size-4" />
          <span className="text-base">오전 09:00</span>
        </div>
        <ChevronDown
          className={cn(
            "text-muted-foreground size-4 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </Button>

      {/* 시간 선택 */}
      <div
        className={cn(
          "bg-popover text-popover-foreground relative z-50 mt-2 w-full overflow-hidden rounded-md border shadow-md transition-all duration-200",
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="divide-border grid grid-cols-3 divide-x">
          {/* 오전/오후 */}
          <div className={TIME_SELECTOR_CLASSES.column}>
            <div className={TIME_SELECTOR_CLASSES.header}>
              <span className={TIME_SELECTOR_CLASSES.headerText}>오전/오후</span>
            </div>
            <div>
              {TIMEZONES.map((timezone) => (
                <Button
                  key={timezone}
                  type="button"
                  variant="ghost"
                  className={TIME_SELECTOR_CLASSES.button}
                >
                  {timezone}
                </Button>
              ))}
            </div>
          </div>

          {/* 시 */}
          <div className={TIME_SELECTOR_CLASSES.column}>
            <div className={TIME_SELECTOR_CLASSES.header}>
              <span className={TIME_SELECTOR_CLASSES.headerText}>시</span>
            </div>
            <ScrollArea className="h-32">
              <div>
                {HOURS.map((hour) => (
                  <Button
                    key={hour}
                    type="button"
                    variant="ghost"
                    className={TIME_SELECTOR_CLASSES.button}
                  >
                    {hour}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* 분 */}
          <div className={TIME_SELECTOR_CLASSES.column}>
            <div className={TIME_SELECTOR_CLASSES.header}>
              <span className={TIME_SELECTOR_CLASSES.headerText}>분</span>
            </div>
            <ScrollArea className="h-32">
              <div>
                {MINUTES.map((minute) => (
                  <Button
                    key={minute}
                    type="button"
                    variant="ghost"
                    className={TIME_SELECTOR_CLASSES.button}
                  >
                    {String(minute).padStart(2, "0")}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} aria-hidden="true" />
      )}
    </div>
  );
}
