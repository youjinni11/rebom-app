"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { DemoEditControls } from "@/components/demo/DemoEditControls";
import { ProfileCurationSlides } from "@/components/demo/ProfileCurationSlides";
import { useDemoAutoplay } from "@/components/demo/useDemoAutoplay";

/** 슬라이드별 표시 시간(ms) — 총 20초 */
const SLIDE_DURATIONS = [1800, 1900, 1900, 1300, 1800, 1800, 1800, 1700, 1700, 2100, 2200];

const HOME_SLIDE_INDEX = 0;
const MARITAL_FORM_SLIDE_INDEX = 1;
const MARITAL_IMPORTANCE_SLIDE_INDEX = 2;
const MARITAL_COMPLETE_SLIDE_INDEX = 3;
const PROFILE_SLIDE_INDEX = 4;
const VALUES_Q1_SLIDE_INDEX = 5;
const VALUES_Q2_SLIDE_INDEX = 6;
const POLITICS_SLIDE_INDEX = 7;
const RELIGION_SLIDE_INDEX = 8;
const VALUES_Q3_SLIDE_INDEX = 9;

const PROFILE_NAV_TAP_SHOW_MS = 800;
const PROFILE_NAV_TAP_PRESS_MS = 1100;

const MARITAL_DOC_TAP_SHOW_MS = 900;
const MARITAL_DOC_TAP_PRESS_MS = 1250;

const MARITAL_TAP_SHOW_MS = 800;
const MARITAL_TAP_PRESS_MS = 1100;

const VALUES_INPUT_TAP_SHOW_MS = 850;
const VALUES_INPUT_TAP_PRESS_MS = 1100;

const VALUES_Q1_SELECT_MS = [350, 700, 1100];
const VALUES_Q1_SELECTION = [0, 2, 4];
const VALUES_Q2_SELECT_MS = [350, 700, 1050];
const VALUES_Q2_SELECTION = [1, 4, 5];
const VALUES_Q3_SELECT_MS = [350, 700, 1100];
const VALUES_Q3_SELECTION = [0, 1, 6];
const POLITICS_SELECT_MS = [500];
const POLITICS_SELECTION = [2];
const RELIGION_SELECT_MS = [500];
const RELIGION_SELECTION = [3];

const AUTO_TAP_SLIDE_INDEX = VALUES_Q3_SLIDE_INDEX;
const AUTO_TAP_SHOW_MS = 1200;
const AUTO_TAP_PRESS_MS = 1700;

function parseSlideParam(value: string | null, total: number) {
  if (!value) return 0;
  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed)) return 0;
  return Math.min(Math.max(parsed - 1, 0), total - 1);
}

export function DemoProfileCurationPlayer() {
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
  const [profileTapVisible, setProfileTapVisible] = useState(false);
  const [maritalDocTapVisible, setMaritalDocTapVisible] = useState(false);
  const [maritalTapVisible, setMaritalTapVisible] = useState(false);
  const [valuesInputTapVisible, setValuesInputTapVisible] = useState(false);
  const [buttonPressed, setButtonPressed] = useState(false);
  const [maritalDocButtonPressed, setMaritalDocButtonPressed] = useState(false);
  const [maritalButtonPressed, setMaritalButtonPressed] = useState(false);
  const [selectedValuesQ1, setSelectedValuesQ1] = useState<number[]>([]);
  const [selectedValuesQ2, setSelectedValuesQ2] = useState<number[]>([]);
  const [selectedValuesQ3, setSelectedValuesQ3] = useState<number[]>([]);
  const [selectedPolitics, setSelectedPolitics] = useState<number[]>([]);
  const [selectedReligion, setSelectedReligion] = useState<number[]>([]);

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
    setSelectedValuesQ1(index >= VALUES_Q1_SLIDE_INDEX ? [...VALUES_Q1_SELECTION] : []);
    setSelectedValuesQ2(index >= VALUES_Q2_SLIDE_INDEX ? [...VALUES_Q2_SELECTION] : []);
    setSelectedValuesQ3(index >= VALUES_Q3_SLIDE_INDEX ? [...VALUES_Q3_SELECTION] : []);
    setSelectedPolitics(index >= POLITICS_SLIDE_INDEX ? [...POLITICS_SELECTION] : []);
    setSelectedReligion(index >= RELIGION_SLIDE_INDEX ? [...RELIGION_SELECTION] : []);
    setAutoTapVisible(false);
    setProfileTapVisible(false);
    setMaritalDocTapVisible(false);
    setMaritalTapVisible(false);
    setValuesInputTapVisible(false);
    setButtonPressed(index >= AUTO_TAP_SLIDE_INDEX);
    setMaritalButtonPressed(index >= MARITAL_IMPORTANCE_SLIDE_INDEX);
    setMaritalDocButtonPressed(index >= MARITAL_COMPLETE_SLIDE_INDEX);
  }, []);

  const handleProfileClick = useCallback(() => {
    if (currentIndex !== HOME_SLIDE_INDEX) return;
    setProfileTapVisible(false);
    goToSlide(MARITAL_FORM_SLIDE_INDEX);
  }, [currentIndex, goToSlide]);

  const handleMaritalDocumentVerifyClick = useCallback(() => {
    if (currentIndex !== MARITAL_IMPORTANCE_SLIDE_INDEX) return;
    setMaritalDocTapVisible(false);
    goToSlide(MARITAL_COMPLETE_SLIDE_INDEX);
  }, [currentIndex, goToSlide]);

  const handleValuesInputClick = useCallback(() => {
    if (currentIndex !== PROFILE_SLIDE_INDEX) return;
    setValuesInputTapVisible(false);
    goToSlide(VALUES_Q1_SLIDE_INDEX);
  }, [currentIndex, goToSlide]);

  function resetSelections() {
    setSelectedValuesQ1([]);
    setSelectedValuesQ2([]);
    setSelectedValuesQ3([]);
    setSelectedPolitics([]);
    setSelectedReligion([]);
    setAutoTapVisible(false);
    setProfileTapVisible(false);
    setMaritalDocTapVisible(false);
    setMaritalTapVisible(false);
    setValuesInputTapVisible(false);
    setButtonPressed(false);
    setMaritalDocButtonPressed(false);
    setMaritalButtonPressed(false);
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
    if (!isPlaying || currentIndex !== HOME_SLIDE_INDEX) {
      setProfileTapVisible(false);
      return;
    }

    setProfileTapVisible(false);
    const showTapTimer = window.setTimeout(
      () => setProfileTapVisible(true),
      PROFILE_NAV_TAP_SHOW_MS
    );
    const pressTimer = window.setTimeout(() => {
      setProfileTapVisible(false);
      goToSlide(MARITAL_FORM_SLIDE_INDEX);
    }, PROFILE_NAV_TAP_PRESS_MS);

    return () => {
      window.clearTimeout(showTapTimer);
      window.clearTimeout(pressTimer);
    };
  }, [currentIndex, goToSlide, isPlaying]);

  useEffect(() => {
    if (!isPlaying || currentIndex !== MARITAL_FORM_SLIDE_INDEX) {
      setMaritalTapVisible(false);
      return;
    }

    setMaritalTapVisible(false);
    setMaritalButtonPressed(false);
    const showTapTimer = window.setTimeout(
      () => setMaritalTapVisible(true),
      MARITAL_TAP_SHOW_MS
    );
    const pressTimer = window.setTimeout(() => {
      setMaritalTapVisible(false);
      setMaritalButtonPressed(true);
      goToSlide(MARITAL_IMPORTANCE_SLIDE_INDEX);
    }, MARITAL_TAP_PRESS_MS);

    return () => {
      window.clearTimeout(showTapTimer);
      window.clearTimeout(pressTimer);
    };
  }, [currentIndex, goToSlide, isPlaying]);

  useEffect(() => {
    if (!isPlaying || currentIndex !== MARITAL_IMPORTANCE_SLIDE_INDEX) {
      setMaritalDocTapVisible(false);
      return;
    }

    setMaritalDocTapVisible(false);
    setMaritalDocButtonPressed(false);
    const showTapTimer = window.setTimeout(
      () => setMaritalDocTapVisible(true),
      MARITAL_DOC_TAP_SHOW_MS
    );
    const pressTimer = window.setTimeout(() => {
      setMaritalDocTapVisible(false);
      setMaritalDocButtonPressed(true);
      goToSlide(MARITAL_COMPLETE_SLIDE_INDEX);
    }, MARITAL_DOC_TAP_PRESS_MS);

    return () => {
      window.clearTimeout(showTapTimer);
      window.clearTimeout(pressTimer);
    };
  }, [currentIndex, goToSlide, isPlaying]);

  useEffect(() => {
    if (!isPlaying || currentIndex !== PROFILE_SLIDE_INDEX) {
      setValuesInputTapVisible(false);
      return;
    }

    setValuesInputTapVisible(false);
    const showTapTimer = window.setTimeout(
      () => setValuesInputTapVisible(true),
      VALUES_INPUT_TAP_SHOW_MS
    );
    const pressTimer = window.setTimeout(() => {
      setValuesInputTapVisible(false);
      goToSlide(VALUES_Q1_SLIDE_INDEX);
    }, VALUES_INPUT_TAP_PRESS_MS);

    return () => {
      window.clearTimeout(showTapTimer);
      window.clearTimeout(pressTimer);
    };
  }, [currentIndex, goToSlide, isPlaying]);

  useEffect(() => {
    if (!isPlaying || currentIndex !== VALUES_Q1_SLIDE_INDEX) return;

    setSelectedValuesQ1([]);
    const timers = VALUES_Q1_SELECT_MS.map((delay, order) =>
      window.setTimeout(() => {
        setSelectedValuesQ1((prev) => [...prev, VALUES_Q1_SELECTION[order]]);
      }, delay)
    );

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [currentIndex, isPlaying]);

  useEffect(() => {
    if (!isPlaying || currentIndex !== VALUES_Q2_SLIDE_INDEX) return;

    setSelectedValuesQ2([]);
    const timers = VALUES_Q2_SELECT_MS.map((delay, order) =>
      window.setTimeout(() => {
        setSelectedValuesQ2((prev) => [...prev, VALUES_Q2_SELECTION[order]]);
      }, delay)
    );

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [currentIndex, isPlaying]);

  useEffect(() => {
    if (!isPlaying || currentIndex !== POLITICS_SLIDE_INDEX) return;

    setSelectedPolitics([]);
    const timers = POLITICS_SELECT_MS.map((delay, order) =>
      window.setTimeout(() => {
        setSelectedPolitics((prev) => [...prev, POLITICS_SELECTION[order]]);
      }, delay)
    );

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [currentIndex, isPlaying]);

  useEffect(() => {
    if (!isPlaying || currentIndex !== RELIGION_SLIDE_INDEX) return;

    setSelectedReligion([]);
    const timers = RELIGION_SELECT_MS.map((delay, order) =>
      window.setTimeout(() => {
        setSelectedReligion((prev) => [...prev, RELIGION_SELECTION[order]]);
      }, delay)
    );

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [currentIndex, isPlaying]);

  useEffect(() => {
    if (!isPlaying || currentIndex !== VALUES_Q3_SLIDE_INDEX) return;

    setSelectedValuesQ3([]);
    setAutoTapVisible(false);
    setButtonPressed(false);

    const chipTimers = VALUES_Q3_SELECT_MS.map((delay, order) =>
      window.setTimeout(() => {
        setSelectedValuesQ3((prev) => [...prev, VALUES_Q3_SELECTION[order]]);
      }, delay)
    );
    const showTapTimer = window.setTimeout(
      () => setAutoTapVisible(true),
      AUTO_TAP_SHOW_MS
    );
    const pressTimer = window.setTimeout(() => {
      setAutoTapVisible(false);
      setButtonPressed(true);
    }, AUTO_TAP_PRESS_MS);

    return () => {
      chipTimers.forEach((timer) => window.clearTimeout(timer));
      window.clearTimeout(showTapTimer);
      window.clearTimeout(pressTimer);
    };
  }, [currentIndex, isPlaying]);

  useEffect(() => {
    if (currentIndex === AUTO_TAP_SLIDE_INDEX) return;
    setAutoTapVisible(false);
    setButtonPressed(false);
  }, [currentIndex]);

  useEffect(() => {
    if (currentIndex >= MARITAL_IMPORTANCE_SLIDE_INDEX) return;
    setMaritalButtonPressed(false);
  }, [currentIndex]);

  useEffect(() => {
    if (currentIndex >= MARITAL_COMPLETE_SLIDE_INDEX) return;
    setMaritalDocButtonPressed(false);
  }, [currentIndex]);

  return (
    <>
      <ProfileCurationSlides
        currentIndex={currentIndex}
        isTransitioning={isTransitioning}
        selectedValuesQ1={selectedValuesQ1}
        selectedValuesQ2={selectedValuesQ2}
        selectedValuesQ3={selectedValuesQ3}
        selectedPolitics={selectedPolitics}
        selectedReligion={selectedReligion}
        autoTapVisible={autoTapVisible}
        buttonPressed={buttonPressed}
        profileTapVisible={profileTapVisible}
        maritalDocTapVisible={maritalDocTapVisible}
        maritalDocButtonPressed={maritalDocButtonPressed}
        maritalTapVisible={maritalTapVisible}
        maritalButtonPressed={maritalButtonPressed}
        valuesInputTapVisible={valuesInputTapVisible}
        onProfileClick={handleProfileClick}
        onMaritalDocumentVerifyClick={handleMaritalDocumentVerifyClick}
        onValuesInputClick={handleValuesInputClick}
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
