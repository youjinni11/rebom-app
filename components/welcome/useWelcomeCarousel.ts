"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const SWIPE_THRESHOLD = 48;

export function useWelcomeCarousel(totalSlides: number) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const isLastSlide = currentIndex === totalSlides - 1;

  const goToSlide = useCallback(
    (index: number) => {
      const next = Math.min(Math.max(index, 0), totalSlides - 1);
      if (next === currentIndex) return;

      setIsTransitioning(true);
      window.setTimeout(() => {
        setCurrentIndex(next);
        setIsTransitioning(false);
      }, 220);
    },
    [currentIndex, totalSlides]
  );

  const advance = useCallback(() => {
    if (!isLastSlide) goToSlide(currentIndex + 1);
  }, [currentIndex, goToSlide, isLastSlide]);

  const retreat = useCallback(() => {
    if (currentIndex > 0) goToSlide(currentIndex - 1);
  }, [currentIndex, goToSlide]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowRight" || event.key === "ArrowDown") advance();
      if (event.key === "ArrowLeft" || event.key === "ArrowUp") retreat();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [advance, retreat]);

  function onTouchStart(clientX: number) {
    touchStartX.current = clientX;
  }

  function onTouchEnd(clientX: number) {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - clientX;
    touchStartX.current = null;

    if (delta > SWIPE_THRESHOLD) advance();
    else if (delta < -SWIPE_THRESHOLD) retreat();
  }

  return {
    currentIndex,
    isTransitioning,
    isLastSlide,
    advance,
    retreat,
    goToSlide,
    onTouchStart,
    onTouchEnd,
  };
}
