"use client";

import React, { useState } from "react";

import { CheckCircle, ChevronRight } from "lucide-react";
import { motion } from "motion/react";

import { steps } from "../../model/guide-data";

export function GuidebookPage5() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const handleComplete = () => {
    setCompletedSteps((prev) => (prev.includes(currentStep) ? prev : [...prev, currentStep]));
    if (currentStep < steps.length - 1) setCurrentStep((s) => s + 1);
  };

  return (
    <section className="flex h-full min-h-full w-full flex-col items-center justify-center">
      <motion.div
        className="mb-6 text-center max-[1024px]:mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-muted-foreground text-base max-[1024px]:text-sm">
          5단계로 간편하게 경매를 등록하세요
        </p>
      </motion.div>

      <div className="mb-8 flex flex-wrap items-center justify-center gap-3 max-[1024px]:mb-6 max-[1024px]:gap-2.5">
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
                  className="flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all max-[1024px]:h-10 max-[1024px]:w-10"
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
                    <CheckCircle className="h-6 w-6 text-white max-[1024px]:h-5 max-[1024px]:w-5" />
                  ) : (
                    React.createElement(step.icon, {
                      className: "h-5 w-5 max-[1024px]:h-4 max-[1024px]:w-4",
                      style: {
                        color: iconColor,
                      },
                    })
                  )}
                </motion.div>
                <span
                  className="text-xs font-medium max-[1024px]:text-[11px]"
                  style={{ color: labelColor }}
                >
                  Step {index + 1}
                </span>
              </motion.button>

              {index < steps.length - 1 && (
                <div
                  className="-mt-4 h-0.5 w-8 max-[1024px]:w-6"
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
        className="mx-auto w-full max-w-xl"
      >
        <div className="bg-card rounded-2xl p-6 max-[1024px]:p-5">
          <div className="mb-6 flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-full max-[1024px]:h-9 max-[1024px]:w-9"
              style={{ backgroundColor: "oklch(0.4758 0.2241 288.5 / 0.1)" }}
            >
              {React.createElement(steps[currentStep].icon, {
                className: "h-5 w-5 max-[1024px]:h-4 max-[1024px]:w-4",
                style: { color: "oklch(0.4758 0.2241 288.5)" },
              })}
            </div>
            <div>
              <h3 className="text-lg font-semibold max-[1024px]:text-base">
                {steps[currentStep].label}
              </h3>
              <p className="text-muted-foreground text-xs max-[1024px]:text-[11px]">
                {steps[currentStep].description}
              </p>
            </div>
          </div>

          <motion.input
            type="text"
            placeholder={steps[currentStep].placeholder}
            className="w-full rounded-lg border-2 px-4 py-3 text-sm transition-all outline-none max-[1024px]:px-3 max-[1024px]:py-2.5 max-[1024px]:text-xs"
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
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold text-white max-[1024px]:py-2.5 max-[1024px]:text-xs"
            style={{ backgroundColor: "oklch(0.4758 0.2241 288.5)" }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {currentStep < steps.length - 1 ? "다음 단계" : "경매 등록하기"}
            <ChevronRight className="h-4 w-4 max-[1024px]:h-3.5 max-[1024px]:w-3.5" />
          </motion.button>
        </div>
      </motion.div>

      {completedSteps.length === steps.length && (
        <motion.div
          className="mt-6 text-center max-[1024px]:mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white max-[1024px]:px-4 max-[1024px]:py-2 max-[1024px]:text-xs"
            style={{ backgroundColor: "oklch(0.4758 0.2241 288.5)" }}
          >
            <CheckCircle className="h-4 w-4 max-[1024px]:h-3.5 max-[1024px]:w-3.5" />
            모든 단계 완료!
          </div>
        </motion.div>
      )}
    </section>
  );
}
