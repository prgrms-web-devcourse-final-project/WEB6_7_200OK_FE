"use client";

import { useEffect, useMemo, useState } from "react";

import { useRouter } from "next/navigation";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import {
  GuidebookPage1,
  GuidebookPage2,
  GuidebookPage3,
  GuidebookPage4,
  GuidebookPage5,
} from "./guide-pages";
import { useSectionPager } from "../hooks/use-section-pager";
import { GUIDE_STORAGE_KEY } from "../model/guide-constants";

export function Guidebook() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const pages = useMemo(
    () => [
      { title: "네덜란드 경매란?", node: <GuidebookPage1 /> },
      { title: "가격은 이렇게 내려갑니다", node: <GuidebookPage2 /> },
      { title: "구매자의 선택", node: <GuidebookPage3 /> },
      { title: "구매자 가이드", node: <GuidebookPage4 /> },
      { title: "판매자 가이드", node: <GuidebookPage5 /> },
    ],
    []
  );

  const totalPages = pages.length;

  const { containerRef, goNext, goPrev, goTo } = useSectionPager({
    pageCount: totalPages,
    currentIndex: currentPage,
    onChange: (next, dir) => {
      setDirection(dir);
      setCurrentPage(next);
    },
    lockMs: 650,
    threshold: 70,
  });

  const pageVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 1000 : -1000, opacity: 0, scale: 0.95 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -1000 : 1000, opacity: 0, scale: 0.95 }),
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(GUIDE_STORAGE_KEY, "true");
  }, []);

  return (
    <div ref={containerRef} className="bg-background fixed inset-0 overflow-hidden outline-none">
      <div className="flex h-full items-center justify-center px-6">
        <div className="relative w-full max-w-5xl">
          <motion.button
            type="button"
            className="absolute top-0 right-0 z-50 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              if (typeof window !== "undefined") {
                window.localStorage.setItem(GUIDE_STORAGE_KEY, "true");
              }
              router.replace("/");
            }}
          >
            Skip
          </motion.button>
          <motion.div
            className="mb-8 text-center"
            key={`title-${currentPage}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="mb-2 text-sm text-gray-500">
              Chapter {currentPage + 1} / {totalPages}
            </p>
            <h2 className="text-2xl font-semibold">{pages[currentPage].title}</h2>
          </motion.div>

          <div className="bg-card relative overflow-hidden rounded-3xl shadow-2xl">
            <div className="h-[min(70dvh,820px)] min-h-[600px]">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentPage}
                  custom={direction}
                  variants={pageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.3 },
                    scale: { duration: 0.3 },
                  }}
                  className="h-full p-12"
                >
                  {pages[currentPage].node}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <motion.button
              onClick={goPrev}
              disabled={currentPage === 0}
              className="flex items-center gap-2 rounded-full px-6 py-3 transition-all disabled:cursor-not-allowed disabled:opacity-30"
              style={{
                backgroundColor: currentPage === 0 ? "#F3F4F6" : "oklch(0.4758 0.2241 288.5 / 0.1)",
                color: currentPage === 0 ? "#9CA3AF" : "oklch(0.4758 0.2241 288.5)",
              }}
              whileHover={currentPage !== 0 ? { scale: 1.05, x: -5 } : {}}
              whileTap={currentPage !== 0 ? { scale: 0.95 } : {}}
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="font-medium">이전</span>
            </motion.button>

            <div className="flex items-center gap-2">
              {pages.map((page, index) => (
                <motion.button
                  key={page.title}
                  onClick={() => goTo(index)}
                  className="rounded-full transition-all"
                  style={{
                    width: index === currentPage ? "32px" : "8px",
                    height: "8px",
                    backgroundColor:
                      index === currentPage ? "oklch(0.4758 0.2241 288.5)" : "#D1D5DB",
                  }}
                  whileHover={{ scale: 1.2 }}
                  layout
                  aria-label={`페이지 ${index + 1}로 이동`}
                />
              ))}
            </div>

            <motion.button
              onClick={goNext}
              disabled={currentPage === totalPages - 1}
              className="flex items-center gap-2 rounded-full px-6 py-3 transition-all disabled:cursor-not-allowed disabled:opacity-30"
              style={{
                backgroundColor:
                  currentPage === totalPages - 1 ? "#F3F4F6" : "oklch(0.4758 0.2241 288.5)",
                color: currentPage === totalPages - 1 ? "#9CA3AF" : "white",
              }}
              whileHover={currentPage !== totalPages - 1 ? { scale: 1.05, x: 5 } : {}}
              whileTap={currentPage !== totalPages - 1 ? { scale: 0.95 } : {}}
            >
              <span className="font-medium">다음</span>
              <ChevronRight className="h-5 w-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
