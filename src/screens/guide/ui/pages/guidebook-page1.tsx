"use client";

import { motion } from "motion/react";

import { KEYWORDS } from "../../model/guide-data";

export function GuidebookPage1() {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="mb-6 max-[1024px]:mb-4"
      >
        <motion.h1
          className="mb-3 text-4xl font-bold max-[1024px]:text-3xl"
          style={{ color: "oklch(0.4758 0.2241 288.5)" }}
        >
          네덜란드 경매
        </motion.h1>
        <motion.p
          className="text-base text-gray-600 max-[1024px]:text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          시간이 지날수록 가격이 내려가는 독특한 경매 방식
        </motion.p>
      </motion.div>

      <motion.div
        className="mb-8 h-1 w-20 rounded-full max-[1024px]:mb-6 max-[1024px]:w-16"
        style={{ backgroundColor: "oklch(0.4758 0.2241 288.5 / 0.3)" }}
        initial={{ width: 0 }}
        animate={{ width: 96 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      />

      <div className="grid w-full max-w-3xl grid-cols-1 gap-4 max-[1024px]:gap-3 sm:grid-cols-3">
        {KEYWORDS.map((keyword, index) => (
          <motion.div
            key={keyword.label}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + index * 0.15, duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <motion.div
              className="mb-3 flex h-16 w-16 items-center justify-center rounded-full max-[1024px]:h-14 max-[1024px]:w-14"
              style={{ backgroundColor: "oklch(0.4758 0.2241 288.5 / 0.1)" }}
              whileHover={{ scale: 1.1, backgroundColor: "oklch(0.4758 0.2241 288.5 / 0.2)" }}
            >
              <keyword.icon
                className="h-8 w-8 max-[1024px]:h-7 max-[1024px]:w-7"
                style={{ color: "oklch(0.4758 0.2241 288.5)" }}
              />
            </motion.div>

            <motion.h3
              className="mb-1 text-lg font-semibold max-[1024px]:text-base"
              style={{ color: "oklch(0.4758 0.2241 288.5)" }}
            >
              {keyword.label}
            </motion.h3>

            <motion.div
              className="mb-2 h-0.5 w-0"
              style={{ backgroundColor: "oklch(0.4758 0.2241 288.5)" }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.8 + index * 0.15, duration: 0.6 }}
            />

            <p className="text-xs text-gray-600 max-[1024px]:text-[11px]">{keyword.description}</p>
          </motion.div>
        ))}
      </div>

      <motion.p
        className="mt-8 max-w-2xl text-xs text-gray-500 max-[1024px]:mt-6 max-[1024px]:text-[11px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        일반 경매와 달리, 높은 가격에서 시작해 점점 낮아집니다.
        <br />
        원하는 가격이 되면 빠르게 구매 결정을 내려야 합니다.
      </motion.p>
    </div>
  );
}
