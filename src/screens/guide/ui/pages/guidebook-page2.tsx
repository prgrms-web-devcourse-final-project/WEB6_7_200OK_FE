"use client";

import { useEffect, useState } from "react";

import { motion } from "motion/react";

import { priceData } from "../../model/guide-data";

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
    <div className="flex h-full flex-col items-center justify-center">
      <motion.div
        className="mb-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-muted-foreground text-lg">5분마다 일정 금액씩 가격이 하락합니다</p>
      </motion.div>

      <div className="w-full max-w-2xl">
        {priceData.map((point, index) => (
          <motion.div
            key={point.time}
            className="relative mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: index < visibleBars ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="mb-2 flex items-center gap-4">
              <motion.span
                className="w-16 text-sm text-gray-500"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: index < visibleBars ? 1 : 0, x: index < visibleBars ? 0 : -10 }}
                transition={{ delay: index * 0.5 + 0.2 }}
              >
                {point.time}
              </motion.span>

              {point.label && (
                <motion.span
                  className="rounded-full px-3 py-1 text-xs font-medium"
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
                    delay: index * 0.5 + 0.3,
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
              className="relative h-20 overflow-hidden rounded-2xl"
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
              transition={{ delay: index * 0.5 + 0.15, duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <motion.div
                className="absolute inset-0"
                style={{
                  background:
                    index === priceData.length - 1
                      ? "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)"
                      : "linear-gradient(90deg, transparent, rgba(136, 81, 237, 0.1), transparent)",
                }}
                initial={{ x: "-100%" }}
                animate={{ x: index < visibleBars ? "200%" : "-100%" }}
                transition={{ delay: index * 0.5 + 0.4, duration: 1.2, ease: "easeInOut" }}
              />

              <div className="absolute inset-0 flex items-center justify-between px-6">
                <motion.span
                  className="text-3xl font-bold"
                  style={{
                    color: index === priceData.length - 1 ? "white" : "oklch(0.4758 0.2241 288.5)",
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: index < visibleBars ? 1 : 0,
                    y: index < visibleBars ? 0 : 10,
                  }}
                  transition={{ delay: index * 0.5 + 0.4 }}
                >
                  ₩{point.price.toLocaleString()}
                </motion.span>

                {index > 0 && (
                  <motion.div
                    className="rounded-full px-3 py-1 text-sm font-semibold"
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
                    transition={{ delay: index * 0.5 + 0.6 }}
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
        className="mt-8 max-w-md rounded-xl px-6 py-3 text-center"
        style={{ backgroundColor: "oklch(0.4758 0.2241 288.5 / 0.05)" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.8, duration: 0.6 }}
      >
        <p className="text-brand text-sm font-medium">
          💡 원하는 가격이 되면 즉시 구매할 수 있습니다
        </p>
      </motion.div>
    </div>
  );
}
