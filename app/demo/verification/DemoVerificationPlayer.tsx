"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { DemoEditControls } from "@/components/demo/DemoEditControls";
import { VerificationSlides } from "@/components/demo/VerificationSlides";
import { useDemoAutoplay } from "@/components/demo/useDemoAutoplay";

/** 슬라이드별 표시 시간(ms) — 총 약 15초 */
const SLIDE_DURATIONS = [2000, 1600, 1600, 1600, 1600, 1600, 2000, 3000];

/** 자동 탭: 약관 동의(0) · 나중에 하기(5) */
const AUTO_TAP_SLIDE_INDICES = new Set([0, 5]);

const AUTO_TAP_SHOW_MS = 900;
const AUTO_TAP_PRESS_MS = 1400;

function parseSlideParam(value: string | null, total: number) {
  if (!value) return 0;
  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed)) return 0;
  return Math.min(Math.max(parsed - 1, 0), total - 1);
}

export function DemoVerificationPlayer() {
  const searchParams = useSearchParams();
  const recordMode = searchParams.get("record") === "1";
  const designMode =
    searchParams.get("design") === "1" || searchParams.get("pause") === "1";

  const initialIndex = useMemo(
    () => parseSlideParam(searchParams.get("slide"), SLIDE_DURATIONS.length),
    [searchParams]
  );

  const [loop, setLoop] = useState(false);
  const [autoTapVisible, setAutoTapVisible] = useState(false);
  const [buttonPressed, setButtonPressed] = useState(false);
  const [laterButtonPressed, setLaterButtonPressed] = useState(false);

  const {
    currentIndex,
    isPlaying,
    isComplete,
    isTransitioning,
    pause,
    resume,
    restart,
    goToSlide,
  } = useDemoAutoplay({
    durations: SLIDE_DURATIONS,
    loop,
    autoStart: !designMode,
    initialIndex,
  });

  function handleRestart() {
    setAutoTapVisible(false);
    setButtonPressed(false);
    setLaterButtonPressed(false);
    restart();
  }

  function handleGoToSlide(index: number) {
    pause();
    setAutoTapVisible(false);
    setButtonPressed(false);
    setLaterButtonPressed(false);
    goToSlide(index);
  }

  useEffect(() => {
    if (!isPlaying || !AUTO_TAP_SLIDE_INDICES.has(currentIndex)) {
      setAutoTapVisible(false);
      if (!isPlaying) return;
      if (!AUTO_TAP_SLIDE_INDICES.has(currentIndex)) {
        setButtonPressed(false);
        setLaterButtonPressed(false);
      }
      return;
    }

    setAutoTapVisible(false);
    setButtonPressed(false);
    setLaterButtonPressed(false);

    const showTapTimer = window.setTimeout(
      () => setAutoTapVisible(true),
      AUTO_TAP_SHOW_MS
    );
    const pressTimer = window.setTimeout(() => {
      setAutoTapVisible(false);
      if (currentIndex === 0) {
        setButtonPressed(true);
      }
      if (currentIndex === 5) {
        setLaterButtonPressed(true);
      }
    }, AUTO_TAP_PRESS_MS);

    return () => {
      window.clearTimeout(showTapTimer);
      window.clearTimeout(pressTimer);
    };
  }, [currentIndex, isPlaying]);

  return (
    <>
      <VerificationSlides
        currentIndex={currentIndex}
        isTransitioning={isTransitioning}
        autoTapVisible={autoTapVisible}
        buttonPressed={buttonPressed}
        laterButtonPressed={laterButtonPressed}
      />

      {!recordMode && (
        <DemoEditControls
          totalSlides={SLIDE_DURATIONS.length}
          currentIndex={currentIndex}
          isPlaying={isPlaying}
          isComplete={isComplete}
          loop={loop}
          onLoopChange={setLoop}
          onPause={pause}
          onResume={resume}
          onRestart={handleRestart}
          onGoToSlide={handleGoToSlide}
        />
      )}
    </>
  );
}
