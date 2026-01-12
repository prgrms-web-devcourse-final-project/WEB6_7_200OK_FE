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
    <section className="flex h-full flex-col items-center justify-center gap-12">
      <h2 className="text-muted-foreground text-base">
        StopLoss에 언제 도달할지, 누가 먼저 구매할지 <strong>예측할 수 없습니다</strong>
      </h2>
      <div className="grid items-center gap-12 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-foreground mb-4 text-base font-semibold">실시간 가격 변동</h3>
          <div className="space-y-3">
            {priceSteps.map((step, index) => (
              <motion.div
                key={step.time}
                className="rounded-lg border-2 p-3 transition-all"
                style={{
                  borderColor: index === 2 ? "oklch(0.4758 0.2241 288.5)" : "#E5E7EB",
                  backgroundColor: index === 2 ? "oklch(0.4758 0.2241 288.5 / 0.15)" : "white",
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 + 0.3 }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm text-zinc-500">{step.time}</span>
                  <span
                    className="text-lg font-bold"
                    style={{ color: index === 2 ? "var(--color-brand-text)" : "#1F2937" }}
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
                    <span className="text-red-500">원하는 가격!</span>
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
          className="flex h-full w-full flex-col"
        >
          <h3 className="text-foreground mb-4 flex justify-end text-base font-semibold">
            구매자의 고민
          </h3>
          <div className="min-h-48 flex-1 space-y-3 max-[1024px]:min-h-40">
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
                    className="max-w-[85%] rounded-2xl rounded-tr-sm px-4 py-2 shadow-md max-[1024px]:px-3 max-[1024px]:py-1.5"
                    style={{ backgroundColor, color: textColor }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <p className="text-sm max-[1024px]:text-xs">{message.text}</p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      <motion.div
        className="w-fit rounded-xl px-3 py-2.5 text-center"
        style={{ backgroundColor: "oklch(0.4758 0.2241 288.5 / 0.15)" }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 0.6 }}
      >
        <p className="text-brand-text text-xs font-semibold">
          💡 타이밍을 잘 잡으면 원하는 가격에 구매할 수 있습니다
        </p>
      </motion.div>
    </section>
  );
}
