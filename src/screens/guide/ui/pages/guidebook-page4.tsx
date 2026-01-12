"use client";

import Image from "next/image";

import { Calendar, Clock, TrendingDown } from "lucide-react";
import { motion } from "motion/react";

import { guideImages } from "../../model/guide-data";

export function GuidebookPage4() {
  return (
    <div className="flex h-full flex-col justify-center">
      <motion.div
        className="mb-10 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-muted-foreground text-lg">
          경매 상태를 확인하고 적절한 타이밍에 참여하세요
        </p>
      </motion.div>

      <div className="mx-auto grid w-full max-w-xl justify-items-stretch gap-8 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-secondary/60 border-border/60 overflow-hidden rounded-2xl border shadow-lg"
        >
          <div className="bg-muted relative h-48 overflow-hidden">
            <Image
              src={guideImages.liveAuction}
              alt="Live Auction"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <motion.div
              className="absolute top-4 left-4 flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white"
              style={{ backgroundColor: "oklch(0.4758 0.2241 288.5)" }}
              animate={{
                boxShadow: [
                  "0 0 0 0 oklch(0.4758 0.2241 288.5 / 0.7)",
                  "0 0 0 8px oklch(0.4758 0.2241 288.5 / 0)",
                ],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <motion.span
                className="h-2 w-2 rounded-full bg-white"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              LIVE
            </motion.div>
          </div>

          <div className="p-6">
            <h3 className="mb-4 text-lg font-semibold">프리미엄 무선 이어폰</h3>

            <motion.div
              className="mb-4 min-h-24 rounded-lg p-4"
              style={{ backgroundColor: "oklch(0.4758 0.2241 288.5 / 0.1)" }}
              animate={{
                backgroundColor: [
                  "oklch(0.4758 0.2241 288.5 / 0.1)",
                  "oklch(0.4758 0.2241 288.5 / 0.15)",
                  "oklch(0.4758 0.2241 288.5 / 0.1)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="mb-1 flex items-center gap-2">
                <span className="text-muted-foreground text-xs">현재 가격</span>
                <TrendingDown className="h-3 w-3" style={{ color: "oklch(0.4758 0.2241 288.5)" }} />
              </div>
              <div className="text-2xl font-bold" style={{ color: "oklch(0.4758 0.2241 288.5)" }}>
                ₩85,000
              </div>
              <div className="text-muted-foreground mt-1 text-xs line-through">₩120,000</div>
            </motion.div>

            <div className="text-muted-foreground mb-4 flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4" />
              <span>다음 가격 하락: 00:04:30</span>
            </div>

            <motion.button
              className="w-full rounded-lg py-3 font-semibold text-white"
              style={{ backgroundColor: "oklch(0.4758 0.2241 288.5)" }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              지금 구매하기
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-secondary/60 border-border/60 overflow-hidden rounded-2xl border shadow-lg"
        >
          <div className="bg-muted relative h-48 overflow-hidden">
            <Image
              src={guideImages.upcomingAuction}
              alt="Upcoming Auction"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <motion.div
              className="absolute top-4 left-4 rounded-full bg-gray-800 px-4 py-2 text-sm font-semibold text-white"
              animate={{ opacity: [1, 0.6, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              COMING SOON
            </motion.div>
          </div>

          <div className="p-6">
            <h3 className="mb-4 text-lg font-semibold">스마트 워치 프로</h3>

            <div className="bg-card mb-4 min-h-24 rounded-lg border border-white/10 p-4">
              <div className="text-muted-foreground mb-1 text-xs">시작 가격</div>
              <div className="text-foreground text-2xl font-bold">₩450,000</div>
            </div>

            <div className="text-muted-foreground mb-4 flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4" />
              <span>시작: 2026-01-15 14:00</span>
            </div>

            <motion.button
              className="w-full rounded-lg py-3 font-semibold text-white"
              style={{ backgroundColor: "oklch(0.4758 0.2241 288.5)" }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              알림 받기
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
