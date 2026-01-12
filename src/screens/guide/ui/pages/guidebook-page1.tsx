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
        className="mb-8"
      >
        <motion.h1
          className="mb-4 text-5xl font-bold"
          style={{ color: "oklch(0.4758 0.2241 288.5)" }}
        >
          네덜란드 경매
        </motion.h1>
        <motion.p
          className="text-xl text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          시간이 지날수록 가격이 내려가는 독특한 경매 방식
        </motion.p>
      </motion.div>

      <motion.div
        className="mb-12 h-1 w-24 rounded-full"
        style={{ backgroundColor: "oklch(0.4758 0.2241 288.5 / 0.3)" }}
        initial={{ width: 0 }}
        animate={{ width: 96 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      />

      <div className="grid w-full max-w-3xl grid-cols-3 gap-8">
        {KEYWORDS.map((keyword, index) => (
          <motion.div
            key={keyword.label}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + index * 0.15, duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <motion.div
              className="mb-4 flex h-20 w-20 items-center justify-center rounded-full"
              style={{ backgroundColor: "oklch(0.4758 0.2241 288.5 / 0.1)" }}
              whileHover={{ scale: 1.1, backgroundColor: "oklch(0.4758 0.2241 288.5 / 0.2)" }}
            >
              <keyword.icon className="h-10 w-10" style={{ color: "oklch(0.4758 0.2241 288.5)" }} />
            </motion.div>

            <motion.h3
              className="mb-2 text-xl font-semibold"
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

            <p className="text-sm text-gray-600">{keyword.description}</p>
          </motion.div>
        ))}
      </div>

      <motion.p
        className="mt-12 max-w-2xl text-sm text-gray-500"
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
