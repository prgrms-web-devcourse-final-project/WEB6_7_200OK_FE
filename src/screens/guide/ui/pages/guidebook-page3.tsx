"use client";

import { useEffect, useState } from "react";

import { motion } from "motion/react";

import { messages, priceSteps } from "../../model/guide-data";

export function GuidebookPage3() {
  const [visibleMessages, setVisibleMessages] = useState(0);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    messages.forEach((_, index) => {
      const timer = setTimeout(() => setVisibleMessages(index + 1), index * 600 + 400);
      timers.push(timer);
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="relative grid h-full items-center gap-12 pb-10 md:grid-cols-2">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-foreground mb-6 text-lg font-semibold">실시간 가격 변동</h3>
        <div className="space-y-3">
          {priceSteps.map((step, index) => (
            <motion.div
              key={step.time}
              className="rounded-lg border-2 p-4 transition-all"
              style={{
                borderColor: index === 2 ? "oklch(0.4758 0.2241 288.5)" : "#E5E7EB",
                backgroundColor: index === 2 ? "oklch(0.4758 0.2241 288.5 / 0.05)" : "white",
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 + 0.3 }}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{step.time}</span>
                <span
                  className="text-xl font-bold"
                  style={{ color: index === 2 ? "oklch(0.4758 0.2241 288.5)" : "#1F2937" }}
                >
                  ₩{step.price.toLocaleString()}
                </span>
              </div>

              {index === 2 && (
                <motion.div
                  className="mt-2 text-xs font-semibold"
                  style={{ color: "oklch(0.4758 0.2241 288.5)" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                >
                  구매 가능한 가격!
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h3 className="text-foreground mb-6 text-lg font-semibold">구매자의 고민</h3>
        <div className="min-h-60 space-y-3">
          {messages.map((message, idx) => {
            const isVisible = idx < visibleMessages;
            let backgroundColor = "#F3F4F6";
            let textColor = "#1F2937";

            if (message.type === "success") {
              backgroundColor = "oklch(0.4758 0.2241 288.5)";
              textColor = "white";
            } else if (message.type === "waiting") {
              backgroundColor = "#FEF3C7";
            }

            return (
              <motion.div
                key={message.id}
                className="flex justify-end"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 20 }}
                transition={{ duration: 0.3 }}
                style={{ visibility: isVisible ? "visible" : "hidden" }}
              >
                <motion.div
                  className="max-w-[85%] rounded-2xl rounded-tr-sm px-5 py-3 shadow-md"
                  style={{ backgroundColor, color: textColor }}
                  whileHover={{ scale: 1.02 }}
                >
                  <p className="text-base">{message.text}</p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {visibleMessages === messages.length && (
          <motion.div
            className="absolute bottom-0 left-1/2 w-fit -translate-x-1/2 rounded-xl px-6 py-3 text-center"
            style={{ backgroundColor: "oklch(0.4758 0.2241 288.5 / 0.05)" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-brand shrink-0 text-sm font-medium whitespace-nowrap">
              💡 타이밍을 잘 잡으면 원하는 가격에 구매할 수 있습니다
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
