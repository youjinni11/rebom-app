"use client";

import { useCallback, useEffect, useState } from "react";

type UseDemoAutoplayOptions = {
  durations: number[];
  loop?: boolean;
  autoStart?: boolean;
  initialIndex?: number;
};

export function useDemoAutoplay({
  durations,
  loop = true,
  autoStart = true,
  initialIndex = 0,
}: UseDemoAutoplayOptions) {
  const safeInitialIndex = Math.min(
    Math.max(initialIndex, 0),
    durations.length - 1
  );

  const [currentIndex, setCurrentIndex] = useState(safeInitialIndex);
  const [isPlaying, setIsPlaying] = useState(autoStart);
  const [isComplete, setIsComplete] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const totalSlides = durations.length;
  const isLastSlide = currentIndex === totalSlides - 1;

  const goToSlide = useCallback(
    (index: number) => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(index);
        setIsTransitioning(false);
      }, 200);
    },
    []
  );

  const restart = useCallback(() => {
    setIsComplete(false);
    setIsPlaying(true);
    goToSlide(0);
  }, [goToSlide]);

  const pause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const resume = useCallback(() => {
    setIsComplete(false);
    setIsPlaying(true);
  }, []);

  const advance = useCallback(() => {
    if (isLastSlide) {
      if (loop) {
        goToSlide(0);
      } else {
        setIsPlaying(false);
        setIsComplete(true);
      }
      return;
    }
    goToSlide(currentIndex + 1);
  }, [currentIndex, goToSlide, isLastSlide, loop]);

  useEffect(() => {
    if (!isPlaying || isComplete) return;

    const duration = durations[currentIndex] ?? 3000;
    const timer = window.setTimeout(advance, duration);
    return () => window.clearTimeout(timer);
  }, [advance, currentIndex, durations, isComplete, isPlaying]);

  return {
    currentIndex,
    isPlaying,
    isComplete,
    isTransitioning,
    isLastSlide,
    totalSlides,
    setIsPlaying,
    pause,
    resume,
    restart,
    goToSlide,
  };
}
