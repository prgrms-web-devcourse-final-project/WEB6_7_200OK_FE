"use client";

import { useCallback, useEffect, useRef } from "react";

interface UseSectionPagerOptions {
  pageCount: number;
  currentIndex: number;
  onChange: (nextIndex: number, direction: 1 | -1) => void;
  lockMs?: number;
  threshold?: number;
}

export function useSectionPager({
  pageCount,
  currentIndex,
  onChange,
  lockMs = 650,
  threshold = 70,
}: UseSectionPagerOptions) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lockRef = useRef(false);
  const accRef = useRef(0);

  const commit = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(pageCount - 1, next));
      if (clamped === currentIndex) return;

      const dir: 1 | -1 = clamped > currentIndex ? 1 : -1;
      lockRef.current = true;
      onChange(clamped, dir);

      window.setTimeout(() => {
        lockRef.current = false;
        accRef.current = 0;
      }, lockMs);
    },
    [currentIndex, lockMs, onChange, pageCount]
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const shouldIgnore = (target: EventTarget | null) => {
      if (!(target instanceof HTMLElement)) return false;

      const tag = target.tagName.toLowerCase();
      if (tag === "input" || tag === "textarea" || tag === "select") return true;
      if (target.isContentEditable) return true;
      if (target.closest('[data-allow-scroll="true"]')) return true;

      return false;
    };

    const onWheel = (e: WheelEvent) => {
      if (lockRef.current) return;
      if (shouldIgnore(e.target)) return;

      e.preventDefault();
      accRef.current += e.deltaY;

      if (Math.abs(accRef.current) < threshold) return;

      if (accRef.current > 0) {
        commit(currentIndex + 1);
      } else {
        commit(currentIndex - 1);
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (lockRef.current) return;
      if (shouldIgnore(document.activeElement)) return;

      if (e.key === "ArrowRight" || e.key === "PageDown") {
        e.preventDefault();
        commit(currentIndex + 1);
      }
      if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        commit(currentIndex - 1);
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      el.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [commit, currentIndex, threshold]);

  return {
    containerRef,
    goNext: () => commit(currentIndex + 1),
    goPrev: () => commit(currentIndex - 1),
    goTo: (i: number) => commit(i),
  };
}
