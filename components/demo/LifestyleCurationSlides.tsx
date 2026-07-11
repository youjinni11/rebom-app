import type { ReactNode } from "react";
import { DemoProfileScreen } from "@/components/demo/DemoProfileScreen";
import {
  CompassIcon,
  HeartIcon,
  SproutIcon,
} from "@/components/demo/DemoIcons";
import { DemoProgressDots } from "@/components/demo/DemoProgressDots";
import {
  DRINKING_CHIPS,
  FAMILY_CHIPS,
  LIFESTYLE_CHIPS,
  SELF_CARE_CHIPS,
  SMOKING_CHIPS,
} from "@/components/demo/curation-chips";

type LifestyleCurationSlidesProps = {
  currentIndex: number;
  isTransitioning: boolean;
  selectedLifestyle: number[];
  selectedFamily: number[];
  selectedSelfCare: number[];
  selectedDrinking: number[];
  selectedSmoking: number[];
  lifestyleTapVisible?: boolean;
  onLifestyleClick?: () => void;
};

const SLIDE_COUNT = 5;
const STEP_TOTAL = 4;

const STEP_HONESTY_HINT = (
  <>
    정확하고 솔직하게 응답할수록
    <br />
    회원님께 더욱 잘 맞는 상대를 추천해드릴 수 있어요
  </>
);

function SlideShell({
  children,
  currentIndex,
  slideIndex,
  isTransitioning,
  extraTopPadding = false,
}: {
  children: ReactNode;
  currentIndex: number;
  slideIndex: number;
  isTransitioning: boolean;
  extraTopPadding?: boolean;
}) {
  const isActive = currentIndex === slideIndex;

  return (
    <div
      className={`absolute inset-0 flex flex-col px-5 ${
        extraTopPadding ? "pt-16" : "pt-12"
      } pb-3 transition-all duration-300 ease-out ${
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

function StepBadge({ step, label }: { step: number; label: string }) {
  return (
    <div className="text-center space-y-1.5 mb-2 mt-1">
      <p className="text-base font-extrabold tracking-[0.2em] text-primary">
        STEP {step} / {STEP_TOTAL}
      </p>
      <h2 className="font-sans text-3xl font-black text-foreground leading-tight">
        {label}
      </h2>
      <p className="text-center text-xl font-bold text-foreground/90 leading-snug px-1">
        {STEP_HONESTY_HINT}
      </p>
    </div>
  );
}

function ChipGrid({
  chips,
  selected,
  compact = false,
}: {
  chips: readonly string[];
  selected: number[];
  compact?: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {chips.map((label, index) => {
        const isSelected = selected.includes(index);

        return (
          <span
            key={label}
            className={`inline-flex items-center px-3 py-2 rounded-2xl font-bold border-2 transition-all duration-300 ${
              compact ? "min-h-11 text-base" : "min-h-12 text-lg"
            } ${
              isSelected
                ? "bg-primary text-cream border-primary scale-[1.02] shadow-md"
                : "bg-white text-foreground/80 border-border"
            }`}
          >
            {isSelected && <span className="mr-1 text-sm">✓</span>}
            {label}
          </span>
        );
      })}
    </div>
  );
}

function HabitsChipSection({
  title,
  chips,
  selected,
}: {
  title: string;
  chips: readonly string[];
  selected: number[];
}) {
  return (
    <div className="space-y-2">
      <p className="text-center text-base font-bold text-primary">{title}</p>
      <ChipGrid chips={chips} selected={selected} compact />
    </div>
  );
}
function StepSlide({
  step,
  label,
  question,
  chips,
  selected,
  icon,
  compact = false,
}: {
  step: number;
  label: string;
  question: ReactNode;
  chips: readonly string[];
  selected: number[];
  icon: ReactNode;
  compact?: boolean;
}) {
  return (
    <>
      <StepBadge step={step} label={label} />
      <div className="flex-1 flex flex-col justify-center space-y-5">
        <div className="w-14 h-14 mx-auto rounded-full bg-primary-light flex items-center justify-center text-primary">
          {icon}
        </div>
        <p className="text-center text-xl font-bold text-foreground/90 leading-snug">
          {question}
        </p>
        <ChipGrid chips={chips} selected={selected} compact={compact} />
        <p className="text-center text-base font-semibold text-foreground/55">
          복수 선택 가능
        </p>
      </div>
    </>
  );
}

export function LifestyleCurationSlides({
  currentIndex,
  isTransitioning,
  selectedLifestyle,
  selectedFamily,
  selectedSelfCare,
  selectedDrinking,
  selectedSmoking,
  lifestyleTapVisible = false,
  onLifestyleClick,
}: LifestyleCurationSlidesProps) {
  return (
    <div className="relative h-full w-full bg-background overflow-hidden">
      <SlideShell
        currentIndex={currentIndex}
        slideIndex={0}
        isTransitioning={isTransitioning}
      >
        <DemoProfileScreen
          onLifestyleClick={onLifestyleClick}
          lifestyleTapVisible={lifestyleTapVisible}
        />
      </SlideShell>

      <SlideShell
        currentIndex={currentIndex}
        slideIndex={1}
        isTransitioning={isTransitioning}
        extraTopPadding
      >
        <StepSlide
          step={1}
          label="라이프스타일"
          question={
            <>
              평소 어떤 시간을
              <br />
              보내시나요?
            </>
          }
          chips={LIFESTYLE_CHIPS}
          selected={selectedLifestyle}
          icon={<CompassIcon className="w-10 h-10" />}
        />
      </SlideShell>

      <SlideShell
        currentIndex={currentIndex}
        slideIndex={2}
        isTransitioning={isTransitioning}
        extraTopPadding
      >
        <StepSlide
          step={2}
          label="가족관계"
          question={
            <>
              현재 가족·생활 형태는
              <br />
              어떠신가요?
            </>
          }
          chips={FAMILY_CHIPS}
          selected={selectedFamily}
          icon={<HeartIcon className="w-10 h-10" />}
          compact
        />
      </SlideShell>

      <SlideShell
        currentIndex={currentIndex}
        slideIndex={3}
        isTransitioning={isTransitioning}
        extraTopPadding
      >
        <StepSlide
          step={3}
          label="운동·자기관리"
          question={
            <>
              꾸준히 하고 있는
              <br />
              운동이나 자기관리는?
            </>
          }
          chips={SELF_CARE_CHIPS}
          selected={selectedSelfCare}
          icon={<SproutIcon className="w-10 h-10" />}
          compact
        />
      </SlideShell>

      <SlideShell
        currentIndex={currentIndex}
        slideIndex={4}
        isTransitioning={isTransitioning}
        extraTopPadding
      >
        <StepBadge step={4} label="음주·흡연" />
        <div className="flex-1 flex flex-col justify-center space-y-4">
          <p className="text-center text-xl font-bold text-foreground/90 leading-snug">
            음주와 흡연 습관은
            <br />
            어떠신가요?
          </p>
          <HabitsChipSection title="음주" chips={DRINKING_CHIPS} selected={selectedDrinking} />
          <HabitsChipSection title="흡연" chips={SMOKING_CHIPS} selected={selectedSmoking} />
          <p className="text-center text-sm font-semibold text-foreground/55">
            각 항목에서 해당하는 것을 골라 주세요
          </p>
        </div>
      </SlideShell>

      <div className="absolute bottom-3 left-0 right-0">
        <DemoProgressDots total={SLIDE_COUNT} current={currentIndex} />
      </div>
    </div>
  );
}
