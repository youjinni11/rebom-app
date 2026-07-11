import type { ReactNode } from "react";
import { DemoAutoTap } from "@/components/demo/DemoAutoTap";
import { DemoLogoCircle } from "@/components/demo/DemoLogoCircle";
import { Button } from "@/components/ui/Button";
import { LockIcon, ShieldIcon } from "@/components/demo/DemoIcons";
import { DemoProgressDots } from "@/components/demo/DemoProgressDots";

type OnboardingSlidesProps = {
  currentIndex: number;
  isTransitioning: boolean;
  onStart?: () => void;
  autoTapVisible?: boolean;
  startButtonPressed?: boolean;
};

const SLIDE_COUNT = 4;

function SlideShell({
  children,
  currentIndex,
  slideIndex,
  isTransitioning,
  horizontalPadding = "px-6",
}: {
  children: ReactNode;
  currentIndex: number;
  slideIndex: number;
  isTransitioning: boolean;
  horizontalPadding?: string;
}) {
  const isActive = currentIndex === slideIndex;

  return (
    <div
      className={`absolute inset-0 flex flex-col pt-3 pb-3 ${horizontalPadding} transition-all duration-300 ease-out ${
        isActive
          ? isTransitioning
            ? "opacity-0 translate-y-2"
            : "opacity-100 translate-y-0"
          : "opacity-0 pointer-events-none translate-y-4"
      }`}
      aria-hidden={!isActive}
    >
      {children}
    </div>
  );
}

export function OnboardingSlides({
  currentIndex,
  isTransitioning,
  onStart,
  autoTapVisible = false,
  startButtonPressed = false,
}: OnboardingSlidesProps) {
  return (
    <div className="relative h-full w-full bg-background overflow-hidden">
      <SlideShell
        currentIndex={currentIndex}
        slideIndex={0}
        isTransitioning={isTransitioning}
      >
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
          <div className="animate-demo-fade-in">
            <DemoLogoCircle />
          </div>
          <div className="space-y-3 animate-demo-slide-up">
            <h1 className="font-sans text-5xl font-extrabold text-foreground leading-tight tracking-tight">
              다시, 봄이 옵니다
            </h1>
            <p className="text-base font-bold tracking-[0.25em] text-foreground/60 uppercase">
              RE:BOM
            </p>
            <p className="text-2xl font-semibold text-foreground/85 leading-snug">
              50대 이상을 위한
              <br />
              프리미엄 인연 멤버십
            </p>
          </div>
        </div>
      </SlideShell>

      <SlideShell
        currentIndex={currentIndex}
        slideIndex={1}
        isTransitioning={isTransitioning}
        horizontalPadding="px-2"
      >
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 w-full">
          <div className="w-28 h-28 rounded-full bg-primary-light flex items-center justify-center text-primary">
            <ShieldIcon />
          </div>
          <div className="space-y-3">
            <h2 className="font-sans text-4xl font-extrabold text-foreground leading-snug tracking-tight">
              검증된 분만
              <br />
              함께합니다
            </h2>
            <p className="text-2xl font-semibold text-foreground/85 leading-snug">
              3단계 본인 인증을
              <br />
              통과한 회원만 이용
            </p>
          </div>
        </div>
      </SlideShell>

      <SlideShell
        currentIndex={currentIndex}
        slideIndex={2}
        isTransitioning={isTransitioning}
        horizontalPadding="px-2"
      >
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 w-full">
          <div className="w-28 h-28 rounded-full bg-primary-light flex items-center justify-center text-primary">
            <LockIcon />
          </div>
          <div className="space-y-3">
            <h2 className="font-sans text-4xl font-extrabold text-foreground leading-snug tracking-tight">
              소중한 정보는
              <br />
              안전하게 보호됩니다
            </h2>
            <p className="text-2xl font-semibold text-foreground/85 leading-snug">
              원하는 정보만 공개하고
              <br />
              불필요한 모든 연락은 차단
            </p>
          </div>
        </div>
      </SlideShell>

      <SlideShell
        currentIndex={currentIndex}
        slideIndex={3}
        isTransitioning={isTransitioning}
      >
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
          <DemoLogoCircle />
          <div className="space-y-3">
            <h2 className="font-sans text-4xl font-extrabold text-foreground leading-snug tracking-tight">
              품격있는 만남,
              <br />
              리봄과 함께
            </h2>
          </div>
          <div className="relative w-full max-w-xs">
            <Button
              variant="primary"
              fullWidth
              className={`min-h-14 text-xl font-bold transition-transform duration-150 ${
                startButtonPressed
                  ? "scale-[0.97] brightness-95 animate-none"
                  : "animate-demo-pulse-brand"
              }`}
              onClick={onStart}
            >
              시작하기
            </Button>
            <DemoAutoTap visible={autoTapVisible} />
          </div>
        </div>
      </SlideShell>

      <div className="absolute bottom-3 left-0 right-0">
        <DemoProgressDots total={SLIDE_COUNT} current={currentIndex} />
      </div>
    </div>
  );
}
