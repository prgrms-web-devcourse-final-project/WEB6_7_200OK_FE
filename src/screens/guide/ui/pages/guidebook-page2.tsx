"use client";

import { useEffect, useState } from "react";

import { motion } from "motion/react";

import { priceData } from "@/screens/guide/model/guide-data";

export function GuidebookPage2() {
  const [visibleBars, setVisibleBars] = useState(0);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    priceData.forEach((_, index) => {
      const timer = setTimeout(() => setVisibleBars(index + 1), index * 500 + 400);
      timers.push(timer);
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section className="flex h-full flex-col items-center justify-center gap-6 lg:gap-8 xl:gap-12">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-muted-foreground text-base">
          판매자가 정한 <strong>Stop Loss</strong>까지
          <br />
          <span className="font-semibold text-red-500">5분</span>
          마다 가격이 하락합니다
        </h2>
      </motion.div>

      <div className="flex w-full max-w-lg flex-col gap-3">
        {priceData.map((point, index) => (
          <motion.div
            key={point.time}
            className="flex flex-col gap-2 px-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: index < visibleBars ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center gap-4">
              <motion.span
                className="w-16 text-xs text-gray-500 sm:text-sm"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: index < visibleBars ? 1 : 0, x: index < visibleBars ? 0 : -10 }}
                transition={{ delay: 0.08, duration: 0.25 }}
              >
                {point.time}
              </motion.span>

              {point.label && (
                <motion.span
                  className="rounded-full px-2.5 py-0.5 text-xs font-medium"
                  style={{
                    backgroundColor:
                      index === priceData.length - 1
                        ? "oklch(0.4758 0.2241 288.5)"
                        : "oklch(0.4758 0.2241 288.5 / 0.2)",
                    color: index === priceData.length - 1 ? "white" : "oklch(0.4758 0.2241 288.5)",
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: index < visibleBars ? 1 : 0,
                    opacity: index < visibleBars ? 1 : 0,
                  }}
                  transition={{
                    delay: 0.12,
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                >
                  {point.label}
                </motion.span>
              )}
            </div>

            <motion.div
              className="h-fit rounded-lg py-2"
              style={{
                backgroundColor:
                  index === priceData.length - 1
                    ? "oklch(0.4758 0.2241 288.5)"
                    : "oklch(0.4758 0.2241 288.5 / 0.08)",
                boxShadow:
                  index === priceData.length - 1
                    ? "0 8px 24px oklch(0.4758 0.2241 288.5 / 0.3)"
                    : "0 2px 8px rgba(0,0,0,0.04)",
              }}
              initial={{ width: "100%", scale: 0.95 }}
              animate={{
                width:
                  index < visibleBars ? `${(point.price / priceData[0].price) * 100}%` : "100%",
                scale: index < visibleBars ? 1 : 0.95,
              }}
              transition={{ duration: 0.65, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <div className="flex items-center justify-between px-3">
                <motion.span
                  className="text-md font-bold"
                  style={{
                    color: index === priceData.length - 1 ? "white" : "oklch(0.4758 0.2241 288.5)",
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: index < visibleBars ? 1 : 0,
                    y: index < visibleBars ? 0 : 10,
                  }}
                  transition={{ delay: 0.12, duration: 0.28 }}
                >
                  ₩{point.price.toLocaleString()}
                </motion.span>

                {index > 0 && (
                  <motion.div
                    className="rounded-full px-2 py-0.5 text-xs font-semibold"
                    style={{
                      backgroundColor:
                        index === priceData.length - 1
                          ? "rgba(255,255,255,0.2)"
                          : "oklch(0.4758 0.2241 288.5 / 0.15)",
                      color:
                        index === priceData.length - 1 ? "white" : "oklch(0.4758 0.2241 288.5)",
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: index < visibleBars ? 1 : 0,
                      scale: index < visibleBars ? 1 : 0.8,
                    }}
                    transition={{ delay: 0.18, duration: 0.28 }}
                  >
                    -{Math.round((1 - point.price / priceData[0].price) * 100)}%
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="rounded-xl px-3 py-2.5 text-center"
        style={{ backgroundColor: "oklch(0.4758 0.2241 288.5 / 0.15)" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
      >
        <p className="text-brand-text text-xs font-semibold">
          💡 원하는 가격이 되면 즉시 구매할 수 있습니다
        </p>
      </motion.div>
    </section>
  );
}
