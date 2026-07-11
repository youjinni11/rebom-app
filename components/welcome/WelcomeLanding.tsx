"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { WelcomeSlides } from "@/components/welcome/WelcomeSlides";
import { useWelcomeCarousel } from "@/components/welcome/useWelcomeCarousel";

const WELCOME_SEEN_KEY = "rebom-welcome-seen";
const SLIDE_COUNT = 3;

type WelcomeLandingProps = {
  /** 데모 폰 프레임 안에서는 parent, 앱 첫 화면에서는 screen */
  fill?: "screen" | "parent";
};

export function WelcomeLanding({ fill = "screen" }: WelcomeLandingProps) {
  const router = useRouter();
  const {
    currentIndex,
    isTransitioning,
    isLastSlide,
    advance,
    onTouchStart,
    onTouchEnd,
  } = useWelcomeCarousel(SLIDE_COUNT);

  const completeWelcome = useCallback(() => {
    try {
      localStorage.setItem(WELCOME_SEEN_KEY, "1");
    } catch {
      /* storage unavailable */
    }
    router.push("/onboarding");
  }, [router]);

  const shellClass =
    fill === "parent"
      ? "relative mx-auto h-full w-full max-w-lg bg-cream"
      : "relative mx-auto min-h-dvh h-dvh w-full max-w-lg bg-cream";

  return (
    <div
      className={shellClass}
      onTouchStart={(event) => onTouchStart(event.touches[0]?.clientX ?? 0)}
      onTouchEnd={(event) => onTouchEnd(event.changedTouches[0]?.clientX ?? 0)}
    >
      <button
        type="button"
        onClick={completeWelcome}
        className="absolute right-5 top-5 z-10 rounded-full px-3 py-1.5 text-sm text-foreground/45 transition-colors hover:text-foreground/70"
      >
        건너뛰기
      </button>

      <WelcomeSlides
        fill={fill}
        currentIndex={currentIndex}
        isTransitioning={isTransitioning}
        isLastSlide={isLastSlide}
        onAdvance={advance}
        onStart={completeWelcome}
      />
    </div>
  );
}
