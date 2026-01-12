"use client";

import { motion } from "motion/react";

import { KEYWORDS } from "../../model/guide-data";

export function GuidebookPage1() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-4 text-center sm:px-0">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="mb-4 sm:mb-6"
      >
        <motion.h1
          className="mb-2 text-3xl font-bold sm:mb-3 sm:text-4xl"
          style={{ color: "oklch(0.4758 0.2241 288.5)" }}
        >
          네덜란드 경매
        </motion.h1>
        <motion.p
          className="text-sm text-gray-600 sm:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          시간이 지날수록 가격이 <span className="text-red-500">내려가는</span> 독특한 경매 방식
        </motion.p>
      </motion.div>

      <motion.div
        className="mb-6 h-1 w-16 rounded-full sm:mb-8 sm:w-20"
        style={{ backgroundColor: "oklch(0.4758 0.2241 288.5 / 0.3)" }}
        initial={{ width: 0 }}
        animate={{ width: 96 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      />

      <div className="grid w-full max-w-3xl grid-cols-3 gap-2 sm:gap-4">
        {KEYWORDS.map((keyword, index) => (
          <motion.div
            key={keyword.label}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + index * 0.15, duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <motion.div
              className="mb-2 flex h-12 w-12 items-center justify-center rounded-full sm:mb-3 sm:h-16 sm:w-16"
              style={{ backgroundColor: "oklch(0.4758 0.2241 288.5 / 0.1)" }}
              whileHover={{ scale: 1.1, backgroundColor: "oklch(0.4758 0.2241 288.5 / 0.2)" }}
            >
              <keyword.icon
                className="h-6 w-6 sm:h-8 sm:w-8"
                style={{ color: "oklch(0.4758 0.2241 288.5)" }}
              />
            </motion.div>

            <motion.h3
              className="mb-1 text-sm font-semibold sm:text-lg"
              style={{ color: "oklch(0.4758 0.2241 288.5)" }}
            >
              {keyword.label}
            </motion.h3>

            <motion.div
              className="mb-1.5 h-0.5 w-0 sm:mb-2"
              style={{ backgroundColor: "oklch(0.4758 0.2241 288.5)" }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.8 + index * 0.15, duration: 0.6 }}
            />

            <p className="text-[11px] leading-snug text-gray-600 sm:text-xs sm:leading-normal">
              {keyword.description}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.p
        className="mt-5 max-w-2xl text-[11px] leading-snug text-gray-500 sm:mt-8 sm:text-xs sm:leading-normal"
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
