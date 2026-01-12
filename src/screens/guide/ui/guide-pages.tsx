"use client";

import React, { useEffect, useState } from "react";

import Image from "next/image";

import { Calendar, CheckCircle, ChevronRight, Clock, TrendingDown } from "lucide-react";
import { motion } from "motion/react";

import { KEYWORDS, guideImages, messages, priceData, priceSteps, steps } from "../model/guide-data";

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
              className="mb-4 min-h-[96px] rounded-lg p-4"
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

            <div className="bg-card mb-4 min-h-[96px] rounded-lg border border-white/10 p-4">
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

export function GuidebookPage5() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const handleComplete = () => {
    setCompletedSteps((prev) => (prev.includes(currentStep) ? prev : [...prev, currentStep]));
    if (currentStep < steps.length - 1) setCurrentStep((s) => s + 1);
  };

  return (
    <div className="flex h-full flex-col justify-center">
      <motion.div
        className="mb-10 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-muted-foreground text-lg">5단계로 간편하게 경매를 등록하세요</p>
      </motion.div>

      <div className="mb-12 flex items-center justify-center gap-4">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(index);
          const isCurrent = index === currentStep;
          const borderColor = isCompleted || isCurrent ? "oklch(0.4758 0.2241 288.5)" : "#E5E7EB";
          let backgroundColor = "white";

          if (isCompleted) {
            backgroundColor = "oklch(0.4758 0.2241 288.5)";
          } else if (isCurrent) {
            backgroundColor = "oklch(0.4758 0.2241 288.5 / 0.1)";
          }

          const labelColor = isCompleted || isCurrent ? "oklch(0.4758 0.2241 288.5)" : "#9CA3AF";
          const iconColor = isCurrent ? "oklch(0.4758 0.2241 288.5)" : "#9CA3AF";

          return (
            <React.Fragment key={step.id}>
              <motion.button
                onClick={() => setCurrentStep(index)}
                className="flex flex-col items-center gap-2 transition-all"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="flex h-16 w-16 items-center justify-center rounded-full border-2 transition-all"
                  style={{
                    borderColor,
                    backgroundColor,
                  }}
                  animate={
                    isCurrent && !isCompleted
                      ? {
                          boxShadow: [
                            "0 0 0 0 oklch(0.4758 0.2241 288.5 / 0.4)",
                            "0 0 0 8px oklch(0.4758 0.2241 288.5 / 0)",
                          ],
                        }
                      : {}
                  }
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  {isCompleted ? (
                    <CheckCircle className="h-8 w-8 text-white" />
                  ) : (
                    React.createElement(step.icon, {
                      className: "w-7 h-7",
                      style: {
                        color: iconColor,
                      },
                    })
                  )}
                </motion.div>
                <span className="text-sm font-medium" style={{ color: labelColor }}>
                  Step {index + 1}
                </span>
              </motion.button>

              {index < steps.length - 1 && (
                <div
                  className="-mt-5 h-0.5 w-12"
                  style={{
                    backgroundColor: isCompleted ? "oklch(0.4758 0.2241 288.5)" : "#E5E7EB",
                  }}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="mx-auto w-full max-w-xl flex-1"
      >
        <div className="bg-card rounded-2xl p-8">
          <div className="mb-6 flex items-center gap-3">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-full"
              style={{ backgroundColor: "oklch(0.4758 0.2241 288.5 / 0.1)" }}
            >
              {React.createElement(steps[currentStep].icon, {
                className: "w-6 h-6",
                style: { color: "oklch(0.4758 0.2241 288.5)" },
              })}
            </div>
            <div>
              <h3 className="text-xl font-semibold">{steps[currentStep].label}</h3>
              <p className="text-muted-foreground text-sm">{steps[currentStep].description}</p>
            </div>
          </div>

          <motion.input
            type="text"
            placeholder={steps[currentStep].placeholder}
            className="w-full rounded-lg border-2 px-6 py-4 transition-all outline-none"
            style={{
              borderColor: "oklch(0.4758 0.2241 288.5)",
              boxShadow: "0 0 0 4px oklch(0.4758 0.2241 288.5 / 0.1)",
            }}
            autoFocus
            initial={{ scale: 0.98 }}
            animate={{ scale: 1 }}
          />

          <motion.button
            onClick={handleComplete}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg py-4 font-semibold text-white"
            style={{ backgroundColor: "oklch(0.4758 0.2241 288.5)" }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {currentStep < steps.length - 1 ? "다음 단계" : "경매 등록하기"}
            <ChevronRight className="h-5 w-5" />
          </motion.button>
        </div>
      </motion.div>

      {completedSteps.length === steps.length && (
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-white"
            style={{ backgroundColor: "oklch(0.4758 0.2241 288.5)" }}
          >
            <CheckCircle className="h-5 w-5" />
            모든 단계 완료!
          </div>
        </motion.div>
      )}
    </div>
  );
}
