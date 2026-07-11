"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { DemoEditControls } from "@/components/demo/DemoEditControls";
import { LifestyleCurationSlides } from "@/components/demo/LifestyleCurationSlides";
import { useDemoAutoplay } from "@/components/demo/useDemoAutoplay";

/** 슬라이드별 표시 시간(ms) — 총 13초 */
const SLIDE_DURATIONS = [2500, 2750, 2500, 2750, 2500];

const PROFILE_SLIDE_INDEX = 0;
const LIFESTYLE_SLIDE_INDEX = 1;
const FAMILY_SLIDE_INDEX = 2;
const SELF_CARE_SLIDE_INDEX = 3;
const HABITS_SLIDE_INDEX = 4;

const LIFESTYLE_TAP_SHOW_MS = 800;
const LIFESTYLE_TAP_PRESS_MS = 1150;

const LIFESTYLE_SELECT_MS = [400, 1000, 1550];
const LIFESTYLE_SELECTION = [0, 2, 4];
const FAMILY_SELECT_MS = [500];
const FAMILY_SELECTION = [2];
const SELF_CARE_SELECT_MS = [400, 1050];
const SELF_CARE_SELECTION = [0, 2];
const DRINKING_SELECT_MS = 400;
const DRINKING_SELECTION = 2;
const SMOKING_SELECT_MS = 900;
const SMOKING_SELECTION = 0;

function parseSlideParam(value: string | null, total: number) {
  if (!value) return 0;
  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed)) return 0;
  return Math.min(Math.max(parsed - 1, 0), total - 1);
}

function getSlideSnapshot(index: number) {
  return {
    lifestyle: index >= LIFESTYLE_SLIDE_INDEX ? [...LIFESTYLE_SELECTION] : [],
    family: index >= FAMILY_SLIDE_INDEX ? [...FAMILY_SELECTION] : [],
    selfCare: index >= SELF_CARE_SLIDE_INDEX ? [...SELF_CARE_SELECTION] : [],
    drinking: index >= HABITS_SLIDE_INDEX ? [DRINKING_SELECTION] : [],
    smoking: index >= HABITS_SLIDE_INDEX ? [SMOKING_SELECTION] : [],
  };
}

export function DemoLifestyleCurationPlayer() {
  const searchParams = useSearchParams();
  const recordMode = searchParams.get("record") === "1";
  const designMode =
    searchParams.get("design") === "1" || searchParams.get("pause") === "1";

  const initialIndex = useMemo(
    () => parseSlideParam(searchParams.get("slide"), SLIDE_DURATIONS.length),
    [searchParams]
  );

  const initialSnapshot = useMemo(
    () => (designMode ? getSlideSnapshot(initialIndex) : null),
    [designMode, initialIndex]
  );

  const [loop, setLoop] = useState(false);
  const [lifestyleTapVisible, setLifestyleTapVisible] = useState(false);
  const [selectedLifestyle, setSelectedLifestyle] = useState<number[]>(
    () => initialSnapshot?.lifestyle ?? []
  );
  const [selectedFamily, setSelectedFamily] = useState<number[]>(
    () => initialSnapshot?.family ?? []
  );
  const [selectedSelfCare, setSelectedSelfCare] = useState<number[]>(
    () => initialSnapshot?.selfCare ?? []
  );
  const [selectedDrinking, setSelectedDrinking] = useState<number[]>(
    () => initialSnapshot?.drinking ?? []
  );
  const [selectedSmoking, setSelectedSmoking] = useState<number[]>(
    () => initialSnapshot?.smoking ?? []
  );

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

  const applySlideSnapshot = useCallback((index: number) => {
    const snapshot = getSlideSnapshot(index);
    setSelectedLifestyle(snapshot.lifestyle);
    setSelectedFamily(snapshot.family);
    setSelectedSelfCare(snapshot.selfCare);
    setSelectedDrinking(snapshot.drinking);
    setSelectedSmoking(snapshot.smoking);
    setLifestyleTapVisible(false);
  }, []);

  const handleLifestyleClick = useCallback(() => {
    if (currentIndex !== PROFILE_SLIDE_INDEX) return;
    setLifestyleTapVisible(false);
    goToSlide(1);
  }, [currentIndex, goToSlide]);

  function resetSelections() {
    setSelectedLifestyle([]);
    setSelectedFamily([]);
    setSelectedSelfCare([]);
    setSelectedDrinking([]);
    setSelectedSmoking([]);
    setLifestyleTapVisible(false);
  }

  function handleRestart() {
    resetSelections();
    restart();
  }

  function handleGoToSlide(index: number) {
    pause();
    applySlideSnapshot(index);
    goToSlide(index);
  }

  useEffect(() => {
    if (designMode) {
      applySlideSnapshot(initialIndex);
    }
  }, [applySlideSnapshot, designMode, initialIndex]);

  useEffect(() => {
    if (!isPlaying || currentIndex !== PROFILE_SLIDE_INDEX) {
      setLifestyleTapVisible(false);
      return;
    }

    setLifestyleTapVisible(false);

    const showTapTimer = window.setTimeout(
      () => setLifestyleTapVisible(true),
      LIFESTYLE_TAP_SHOW_MS
    );
    const pressTimer = window.setTimeout(() => {
      setLifestyleTapVisible(false);
      goToSlide(1);
    }, LIFESTYLE_TAP_PRESS_MS);

    return () => {
      window.clearTimeout(showTapTimer);
      window.clearTimeout(pressTimer);
    };
  }, [currentIndex, goToSlide, isPlaying]);

  useEffect(() => {
    if (!isPlaying || currentIndex !== LIFESTYLE_SLIDE_INDEX) return;

    setSelectedLifestyle([]);
    const timers = LIFESTYLE_SELECT_MS.map((delay, order) =>
      window.setTimeout(() => {
        setSelectedLifestyle((prev) => [...prev, LIFESTYLE_SELECTION[order]]);
      }, delay)
    );

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [currentIndex, isPlaying]);

  useEffect(() => {
    if (!isPlaying || currentIndex !== FAMILY_SLIDE_INDEX) return;

    setSelectedFamily([]);
    const timers = FAMILY_SELECT_MS.map((delay, order) =>
      window.setTimeout(() => {
        setSelectedFamily((prev) => [...prev, FAMILY_SELECTION[order]]);
      }, delay)
    );

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [currentIndex, isPlaying]);

  useEffect(() => {
    if (!isPlaying || currentIndex !== SELF_CARE_SLIDE_INDEX) return;

    setSelectedSelfCare([]);
    const timers = SELF_CARE_SELECT_MS.map((delay, order) =>
      window.setTimeout(() => {
        setSelectedSelfCare((prev) => [...prev, SELF_CARE_SELECTION[order]]);
      }, delay)
    );

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [currentIndex, isPlaying]);

  useEffect(() => {
    if (!isPlaying || currentIndex !== HABITS_SLIDE_INDEX) return;

    setSelectedDrinking([]);
    setSelectedSmoking([]);

    const drinkingTimer = window.setTimeout(
      () => setSelectedDrinking([DRINKING_SELECTION]),
      DRINKING_SELECT_MS
    );
    const smokingTimer = window.setTimeout(
      () => setSelectedSmoking([SMOKING_SELECTION]),
      SMOKING_SELECT_MS
    );

    return () => {
      window.clearTimeout(drinkingTimer);
      window.clearTimeout(smokingTimer);
    };
  }, [currentIndex, isPlaying]);

  return (
    <>
      <LifestyleCurationSlides
        currentIndex={currentIndex}
        isTransitioning={isTransitioning}
        selectedLifestyle={selectedLifestyle}
        selectedFamily={selectedFamily}
        selectedSelfCare={selectedSelfCare}
        selectedDrinking={selectedDrinking}
        selectedSmoking={selectedSmoking}
        lifestyleTapVisible={lifestyleTapVisible}
        onLifestyleClick={handleLifestyleClick}
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
