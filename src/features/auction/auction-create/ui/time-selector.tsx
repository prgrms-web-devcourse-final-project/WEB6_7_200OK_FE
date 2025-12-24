import { useState } from "react";

import { cva } from "class-variance-authority";
import { ChevronDown, Clock } from "lucide-react";

import { HOURS, MINUTES, TIMEZONES } from "@/entities/auction";
import Button from "@/shared/ui/button/button";
import { ScrollArea } from "@/shared/ui/scroll-area/scroll-area";

import { type TimeSelection } from "../model/types";

const columnClass = cva("flex flex-col");
const headerClass = cva("bg-muted/30 text-center");
const headerClassText = cva("text-muted-foreground text-xs font-medium");
const timeButtonClass = cva("w-full rounded-none border-none shadow-none", {
  variants: {
    selected: {
      true: "bg-brand text-accent dark:text-accent-foreground hover:!bg-brand hover:!text-accent dark:hover:!text-accent-foreground",
    },
    disabled: {
      true: "cursor-not-allowed opacity-50",
    },
  },
});

interface TimeSelectorProps {
  selectedTime: TimeSelection;
  onTimeChange: (time: TimeSelection) => void;
  isTimeDisabled?: (hour: number, minute: number, timezone: string) => boolean;
}

export function TimeSelector({ selectedTime, onTimeChange, isTimeDisabled }: TimeSelectorProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="relative w-full">
      {/* 시간 표시 버튼 */}
      <Button
        type="button"
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="시간 선택"
        className="border-input focus-visible:border-ring focus-visible:ring-ring/50 dark:bg-input/30 flex h-12 w-full items-center justify-between gap-2 rounded-md border bg-transparent px-3 shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px]"
      >
        <div className="flex items-center gap-2">
          <Clock className="text-muted-foreground size-4" />
          <span className="text-base">
            <span>{selectedTime.timezone}&nbsp;</span>
            <span>{String(selectedTime.hour).padStart(2, "0")}:</span>
            <span>{String(selectedTime.minute).padStart(2, "0")}</span>
          </span>
        </div>
        <ChevronDown
          className={`text-muted-foreground size-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </Button>

      {/* 시간 선택 */}
      <div
        className={`bg-popover text-popover-foreground relative z-50 mt-2 w-full overflow-hidden rounded-md border shadow-md transition-all duration-200 ${isOpen ? "max-h-96 opacity-100" : "pointer-events-none max-h-0 opacity-0"}`}
      >
        <div className="divide-border grid grid-cols-3 divide-x">
          {/* 오전/오후 */}
          <div className={columnClass()}>
            <div className={headerClass()}>
              <span className={headerClassText()}>오전/오후</span>
            </div>
            <div>
              {TIMEZONES.map((timezone) => {
                // 오전/오후 disabled 체크
                const isDisabled =
                  isTimeDisabled &&
                  isTimeDisabled(selectedTime.hour, selectedTime.minute, timezone);
                return (
                  <Button
                    key={timezone}
                    type="button"
                    variant="ghost"
                    disabled={isDisabled}
                    className={timeButtonClass({
                      ...(selectedTime.timezone === timezone && { selected: true }),
                      ...(isDisabled && { disabled: true }),
                    })}
                    onClick={() => onTimeChange({ ...selectedTime, timezone })}
                  >
                    {timezone}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* 시 */}
          <div className={columnClass()}>
            <div className={headerClass()}>
              <span className={headerClassText()}>시</span>
            </div>
            <ScrollArea className="h-32">
              <div>
                {HOURS.map((hour) => {
                  // hour disabled 체크
                  const isDisabled =
                    isTimeDisabled &&
                    isTimeDisabled(hour, selectedTime.minute, selectedTime.timezone);
                  return (
                    <Button
                      key={hour}
                      type="button"
                      variant="ghost"
                      disabled={isDisabled}
                      className={timeButtonClass({
                        ...(selectedTime.hour === hour && { selected: true }),
                        ...(isDisabled && { disabled: true }),
                      })}
                      onClick={() => onTimeChange({ ...selectedTime, hour })}
                    >
                      {hour}
                    </Button>
                  );
                })}
              </div>
            </ScrollArea>
          </div>

          {/* 분 */}
          <div className={columnClass()}>
            <div className={headerClass()}>
              <span className={headerClassText()}>분</span>
            </div>
            <ScrollArea className="h-32">
              <div>
                {MINUTES.map((minute) => {
                  // minute disabled 체크
                  const isDisabled =
                    isTimeDisabled &&
                    isTimeDisabled(selectedTime.hour, minute, selectedTime.timezone);
                  return (
                    <Button
                      key={minute}
                      type="button"
                      variant="ghost"
                      disabled={isDisabled}
                      className={timeButtonClass({
                        ...(selectedTime.minute === minute && { selected: true }),
                        ...(isDisabled && { disabled: true }),
                      })}
                      onClick={() => onTimeChange({ ...selectedTime, minute })}
                    >
                      {String(minute).padStart(2, "0")}
                    </Button>
                  );
                })}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
          role="presentation"
        />
      )}
    </div>
  );
}
