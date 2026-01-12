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
    <section className="flex h-full min-h-full w-full flex-col items-center justify-start gap-2 overflow-y-auto px-4 py-4 sm:justify-center sm:gap-3 sm:overflow-visible sm:px-0 sm:py-0 lg:gap-4 xl:gap-6">
      <motion.div
        className="mb-3 text-center sm:mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-muted-foreground text-sm sm:text-base">간편하게 경매를 등록하세요</h2>
      </motion.div>

      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
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
                className="flex flex-col items-center gap-1.5 transition-all sm:gap-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all sm:h-12 sm:w-12"
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
                    <CheckCircle className="size-5 text-white sm:size-6" />
                  ) : (
                    React.createElement(step.icon, {
                      className: "size-4 sm:size-5",
                      style: {
                        color: iconColor,
                      },
                    })
                  )}
                </motion.div>
                <span className="text-xs font-medium sm:text-xs" style={{ color: labelColor }}>
                  Step {index + 1}
                </span>
              </motion.button>

              {index < steps.length - 1 && (
                <div
                  className="-mt-3 h-0.5 w-3 sm:-mt-4 sm:w-4"
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
        <div className="bg-card rounded-2xl p-4 sm:p-6">
          <div className="mb-4 flex items-center gap-2 sm:mb-6 sm:gap-3">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full sm:h-10 sm:w-10"
              style={{ backgroundColor: "oklch(0.4758 0.2241 288.5 / 0.1)" }}
            >
              {React.createElement(steps[currentStep].icon, {
                className: "size-5",
                style: { color: "oklch(0.4758 0.2241 288.5)" },
              })}
            </div>
            <div>
              <h3 className="font-semibold">{steps[currentStep].label}</h3>
              <p className="text-muted-foreground text-[11px] sm:text-xs">
                {steps[currentStep].description}
              </p>
            </div>
          </div>

          <motion.input
            type="text"
            placeholder={steps[currentStep].placeholder}
            className="w-full rounded-lg border-2 px-3 py-2 text-xs transition-all outline-none sm:px-4 sm:py-3 sm:text-sm"
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
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-semibold text-white sm:mt-4 sm:py-3 sm:text-sm"
            style={{ backgroundColor: "oklch(0.4758 0.2241 288.5)" }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {currentStep < steps.length - 1 ? "다음 단계" : "경매 등록하기"}
            <ChevronRight className="size-4" />
          </motion.button>
        </div>
      </motion.div>

      <div className="h-11 text-center sm:h-11">
        <motion.div
          initial={false}
          animate={
            completedSteps.length === steps.length ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
          }
          transition={{ duration: 0.25 }}
          className="flex justify-center"
          style={{ pointerEvents: completedSteps.length === steps.length ? "auto" : "none" }}
        >
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-white sm:px-5 sm:py-2.5 sm:text-sm"
            style={{ backgroundColor: "oklch(0.4758 0.2241 288.5)" }}
            aria-hidden={completedSteps.length !== steps.length}
          >
            <CheckCircle className="size-3.5 sm:size-4" />
            모든 단계 완료!
          </div>
        </motion.div>
      </div>
    </section>
  );
}
