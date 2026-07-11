"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { DemoEditControls } from "@/components/demo/DemoEditControls";
import { OnboardingSlides } from "@/components/demo/OnboardingSlides";
import { useDemoAutoplay } from "@/components/demo/useDemoAutoplay";

const SLIDE_DURATIONS = [3000, 3500, 3500, 7000];

/** 마지막 슬라이드 진입 후 자동 탭·클릭 타이밍(ms) */
const AUTO_TAP_SHOW_MS = 2200;
const AUTO_TAP_PRESS_MS = 3000;

function parseSlideParam(value: string | null, total: number) {
  if (!value) return 0;
  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed)) return 0;
  return Math.min(Math.max(parsed - 1, 0), total - 1);
}

export function DemoOnboardingPlayer() {
  const searchParams = useSearchParams();
  const recordMode = searchParams.get("record") === "1";
  const designMode =
    searchParams.get("design") === "1" || searchParams.get("pause") === "1";
  const initialIndex = parseSlideParam(searchParams.get("slide"), SLIDE_DURATIONS.length);

  const [loop, setLoop] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [autoTapVisible, setAutoTapVisible] = useState(false);
  const [startButtonPressed, setStartButtonPressed] = useState(false);

  const {
    currentIndex,
    isPlaying,
    isComplete,
    isTransitioning,
    restart,
    pause,
    resume,
    goToSlide,
    setIsPlaying,
  } = useDemoAutoplay({
    durations: SLIDE_DURATIONS,
    loop,
    autoStart: !designMode,
    initialIndex,
  });

  const handleStart = useCallback(() => {
    setAutoTapVisible(false);
    setStartButtonPressed(true);
    setFadeOut(true);
    setIsPlaying(false);
  }, [setIsPlaying]);

  function handleRestart() {
    setFadeOut(false);
    setAutoTapVisible(false);
    setStartButtonPressed(false);
    restart();
  }

  function handleGoToSlide(index: number) {
    setFadeOut(false);
    pause();
    setAutoTapVisible(false);
    setStartButtonPressed(false);
    goToSlide(index);
  }

  useEffect(() => {
    if (!isPlaying || currentIndex !== 3 || loop || fadeOut) return;

    setAutoTapVisible(false);
    setStartButtonPressed(false);

    const showTapTimer = window.setTimeout(
      () => setAutoTapVisible(true),
      AUTO_TAP_SHOW_MS
    );
    const pressTimer = window.setTimeout(() => {
      handleStart();
    }, AUTO_TAP_PRESS_MS);

    return () => {
      window.clearTimeout(showTapTimer);
      window.clearTimeout(pressTimer);
    };
  }, [currentIndex, loop, fadeOut, handleStart, isPlaying]);

  return (
    <>
      <div
        className={`h-full w-full transition-opacity duration-700 ${
          fadeOut ? "opacity-0" : "opacity-100"
        }`}
      >
        <OnboardingSlides
          currentIndex={currentIndex}
          isTransitioning={isTransitioning}
          onStart={handleStart}
          autoTapVisible={autoTapVisible}
          startButtonPressed={startButtonPressed}
        />
      </div>

      {!recordMode && (
        <DemoEditControls
          totalSlides={SLIDE_DURATIONS.length}
          currentIndex={currentIndex}
          isPlaying={isPlaying}
          isComplete={isComplete || fadeOut}
          loop={loop}
          onLoopChange={setLoop}
          onPause={pause}
          onResume={resume}
          onRestart={handleRestart}
          onGoToSlide={handleGoToSlide}
        />
      )}

      {fadeOut && (
        <div className="absolute inset-0 flex items-center justify-center bg-primary/5">
          <p className="font-sans text-2xl text-primary font-bold animate-demo-fade-in">
            신원 검증을 시작합니다...
          </p>
        </div>
      )}
    </>
  );
}
