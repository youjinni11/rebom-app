"use client";

import { useRouter } from "next/navigation";
import { OnboardingSlides } from "@/components/demo/OnboardingSlides";
import { useWelcomeCarousel } from "@/components/welcome/useWelcomeCarousel";

const SLIDE_COUNT = 4;

export function OnboardingFlow() {
  const router = useRouter();
  const {
    currentIndex,
    isTransitioning,
    advance,
    onTouchStart,
    onTouchEnd,
  } = useWelcomeCarousel(SLIDE_COUNT);

  function handleStart() {
    router.push("/signup");
  }

  return (
    <div
      className="relative mx-auto min-h-dvh h-dvh w-full max-w-lg bg-background"
      onTouchStart={(e) => onTouchStart(e.touches[0]?.clientX ?? 0)}
      onTouchEnd={(e) => onTouchEnd(e.changedTouches[0]?.clientX ?? 0)}
      onClick={() => {
        if (currentIndex < SLIDE_COUNT - 1) advance();
      }}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handleStart();
        }}
        className="absolute right-5 top-5 z-10 rounded-full px-3 py-1.5 text-sm text-foreground/45 transition-colors hover:text-foreground/70"
      >
        건너뛰기
      </button>

      <OnboardingSlides
        currentIndex={currentIndex}
        isTransitioning={isTransitioning}
        onStart={handleStart}
      />
    </div>
  );
}
