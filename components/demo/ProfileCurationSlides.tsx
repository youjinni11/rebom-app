import type { ReactNode } from "react";
import { DemoAutoTap } from "@/components/demo/DemoAutoTap";
import { DemoHomeScreen } from "@/components/demo/DemoHomeScreen";
import {
  DemoMaritalVerificationComplete,
  DemoMaritalVerificationForm,
} from "@/components/demo/DemoMaritalVerificationScreen";
import { DemoMaritalImportanceScreen } from "@/components/demo/DemoMaritalImportanceScreen";
import { DemoProfileScreen } from "@/components/demo/DemoProfileScreen";
import { CheckCircleIcon, CompassIcon, HeartIcon, ShieldIcon } from "@/components/demo/DemoIcons";
import { DemoProgressDots } from "@/components/demo/DemoProgressDots";
import { Button } from "@/components/ui/Button";
import {
  POLITICS_CHIPS,
  RELIGION_CHIPS,
  AVOID_FILTER_CHIPS,
  VALUES_Q1_CHIPS,
  VALUES_Q2_CHIPS,
  VALUES_Q3_CHIPS,
} from "@/components/demo/curation-chips";

export {
  LIFESTYLE_CHIPS,
  POLITICS_CHIPS,
  RELIGION_CHIPS,
  AVOID_FILTER_CHIPS,
  VALUES_Q1_CHIPS,
  VALUES_Q2_CHIPS,
  VALUES_Q3_CHIPS,
} from "@/components/demo/curation-chips";

type ProfileCurationSlidesProps = {
  currentIndex: number;
  isTransitioning: boolean;
  selectedValuesQ1: number[];
  selectedValuesQ2: number[];
  selectedValuesQ3: number[];
  selectedPolitics: number[];
  selectedReligion: number[];
  autoTapVisible?: boolean;
  buttonPressed?: boolean;
  profileTapVisible?: boolean;
  valuesInputTapVisible?: boolean;
  maritalTapVisible?: boolean;
  maritalButtonPressed?: boolean;
  maritalDocTapVisible?: boolean;
  maritalDocButtonPressed?: boolean;
  onProfileClick?: () => void;
  onValuesInputClick?: () => void;
  onMaritalDocumentVerifyClick?: () => void;
};

const SLIDE_COUNT = 11;
const VALUES_STEP_TOTAL = 5;
const VALUES_STEP_MOTTO =
  "정확하고 솔직하게 응답할수록 회원님께 더욱 잘 맞는 상대를 추천해드릴 수 있어요";

function SlideShell({
  children,
  currentIndex,
  slideIndex,
  isTransitioning,
}: {
  children: ReactNode;
  currentIndex: number;
  slideIndex: number;
  isTransitioning: boolean;
}) {
  const isActive = currentIndex === slideIndex;

  return (
    <div
      className={`absolute inset-0 flex flex-col px-5 pt-12 pb-3 transition-all duration-300 ease-out ${
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

function StepBadge({ step, total, label }: { step: number; total: number; label: string }) {
  return (
    <div className="text-center space-y-2 mb-3 mt-1">
      <p className="text-base font-extrabold tracking-[0.2em] text-primary">
        STEP {step} / {total}
      </p>
      <h2 className="font-sans text-3xl font-black text-foreground leading-tight">
        {label}
      </h2>
      <p className="text-base font-bold text-foreground/75 leading-snug px-1">
        {VALUES_STEP_MOTTO}
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
              compact ? "min-h-10 text-sm leading-snug" : "min-h-11 text-lg"
            } ${
              isSelected
                ? "bg-primary text-cream border-primary scale-[1.02] shadow-md"
                : "bg-white text-foreground/80 border-border"
            }`}
          >
            {isSelected && (
              <span className={`mr-1.5 ${compact ? "text-sm" : "text-base"}`}>✓</span>
            )}
            {label}
          </span>
        );
      })}
    </div>
  );
}

function ValuesQuestionSlide({
  step,
  question,
  chips,
  selected,
  hint,
}: {
  step: number;
  question: ReactNode;
  chips: readonly string[];
  selected: number[];
  hint: string;
}) {
  return (
    <>
      <StepBadge step={step} total={VALUES_STEP_TOTAL} label="가치관" />
      <div className="flex-1 flex flex-col justify-center space-y-5">
        <div className="w-16 h-16 mx-auto rounded-full bg-primary-light flex items-center justify-center text-primary">
          <HeartIcon className="w-11 h-11" />
        </div>
        <p className="text-center text-2xl font-bold text-foreground/90 leading-snug">
          {question}
        </p>
        <ChipGrid chips={chips} selected={selected} />
        <p className="text-center text-lg font-semibold text-foreground/55">{hint}</p>
      </div>
    </>
  );
}

function SummaryTags({
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
      <p className="text-sm font-bold text-foreground/70">{title}</p>
      <div className="flex flex-wrap gap-1.5">
        {selected.map((index) => (
          <span
            key={`${title}-${index}`}
            className="px-2.5 py-1 rounded-lg bg-primary-light text-primary text-sm font-bold border border-primary/15"
          >
            {chips[index]}
          </span>
        ))}
      </div>
    </div>
  );
}

export function ProfileCurationSlides({
  currentIndex,
  isTransitioning,
  selectedValuesQ1,
  selectedValuesQ2,
  selectedValuesQ3,
  selectedPolitics,
  selectedReligion,
  autoTapVisible = false,
  buttonPressed = false,
  profileTapVisible = false,
  valuesInputTapVisible = false,
  maritalTapVisible = false,
  maritalButtonPressed = false,
  maritalDocTapVisible = false,
  maritalDocButtonPressed = false,
  onProfileClick,
  onValuesInputClick,
  onMaritalDocumentVerifyClick,
}: ProfileCurationSlidesProps) {
  return (
    <div className="relative h-full w-full bg-background overflow-hidden">
      <SlideShell currentIndex={currentIndex} slideIndex={0} isTransitioning={isTransitioning}>
        <DemoHomeScreen
          onProfileClick={onProfileClick}
          profileTapVisible={profileTapVisible}
        />
      </SlideShell>

      <SlideShell currentIndex={currentIndex} slideIndex={1} isTransitioning={isTransitioning}>
        <DemoMaritalVerificationForm
          autoTapVisible={maritalTapVisible}
          buttonPressed={maritalButtonPressed}
        />
      </SlideShell>

      <SlideShell currentIndex={currentIndex} slideIndex={2} isTransitioning={isTransitioning}>
        <DemoMaritalImportanceScreen
          autoTapVisible={maritalDocTapVisible}
          buttonPressed={maritalDocButtonPressed}
          onDocumentVerifyClick={onMaritalDocumentVerifyClick}
        />
      </SlideShell>

      <SlideShell currentIndex={currentIndex} slideIndex={3} isTransitioning={isTransitioning}>
        <DemoMaritalVerificationComplete />
      </SlideShell>

      <SlideShell currentIndex={currentIndex} slideIndex={4} isTransitioning={isTransitioning}>
        <DemoProfileScreen
          maritalVerified
          onValuesInputClick={onValuesInputClick}
          valuesInputTapVisible={valuesInputTapVisible}
        />
      </SlideShell>

      <SlideShell currentIndex={currentIndex} slideIndex={5} isTransitioning={isTransitioning}>
        <ValuesQuestionSlide
          step={1}
          question={
            <>
              만남에서 가장
              <br />
              중요한 것은?
            </>
          }
          chips={VALUES_Q1_CHIPS}
          selected={selectedValuesQ1}
          hint="복수 선택 가능"
        />
      </SlideShell>

      <SlideShell currentIndex={currentIndex} slideIndex={6} isTransitioning={isTransitioning}>
        <ValuesQuestionSlide
          step={2}
          question={
            <>
              목표로 하는
              <br />
              관계는 무엇인가요?
            </>
          }
          chips={VALUES_Q2_CHIPS}
          selected={selectedValuesQ2}
          hint="복수 선택 가능"
        />
      </SlideShell>

      <SlideShell currentIndex={currentIndex} slideIndex={7} isTransitioning={isTransitioning}>
        <StepBadge step={3} total={VALUES_STEP_TOTAL} label="정치성향" />
        <div className="flex-1 flex flex-col justify-center space-y-5">
          <div className="w-16 h-16 mx-auto rounded-full bg-primary-light flex items-center justify-center text-primary">
            <ShieldIcon className="w-11 h-11" />
          </div>
          <p className="text-center text-2xl font-bold text-foreground/90 leading-snug">
            정치·사회 이슈에 대한
            <br />
            생각은 어떠신가요?
          </p>
          <ChipGrid chips={POLITICS_CHIPS} selected={selectedPolitics} />
          <p className="text-center text-lg font-semibold text-foreground/55">
            나와 맞는 것을 골라 주세요
          </p>
        </div>
      </SlideShell>

      <SlideShell currentIndex={currentIndex} slideIndex={8} isTransitioning={isTransitioning}>
        <StepBadge step={4} total={VALUES_STEP_TOTAL} label="종교" />
        <div className="flex-1 flex flex-col justify-center space-y-5">
          <div className="w-16 h-16 mx-auto rounded-full bg-primary-light flex items-center justify-center text-primary">
            <CompassIcon className="w-11 h-11" />
          </div>
          <p className="text-center text-2xl font-bold text-foreground/90 leading-snug">
            종교·신앙에 대한
            <br />
            생각은 어떠신가요?
          </p>
          <ChipGrid chips={RELIGION_CHIPS} selected={selectedReligion} />
          <p className="text-center text-lg font-semibold text-foreground/55">
            나와 맞는 것을 골라 주세요
          </p>
        </div>
      </SlideShell>

      <SlideShell currentIndex={currentIndex} slideIndex={9} isTransitioning={isTransitioning}>
        <div className="flex-1 flex flex-col min-h-0">
          <div className="shrink-0">
            <StepBadge step={5} total={VALUES_STEP_TOTAL} label="필터" />
          </div>
          <div className="shrink-0 flex flex-col items-center space-y-2 mb-2">
            <div className="w-14 h-14 rounded-full bg-primary-light flex items-center justify-center text-primary">
              <ShieldIcon className="w-9 h-9" />
            </div>
            <p className="text-center text-xl font-bold text-foreground/90 leading-snug">
              이런 상대는
              <br />
              피하고 싶어요!
            </p>
          </div>
          <div className="flex-1 min-h-0 overflow-y-auto py-1">
            <ChipGrid chips={AVOID_FILTER_CHIPS} selected={selectedValuesQ3} compact />
          </div>
          <p className="shrink-0 text-center text-base font-semibold text-foreground/55 pt-1">
            복수 선택 가능
          </p>
          <div className="relative shrink-0 pt-1 pb-0.5">
            <Button
              variant="primary"
              fullWidth
              className={`min-h-12 text-lg font-black transition-transform duration-150 ${
                buttonPressed
                  ? "scale-[0.97] brightness-95 animate-none"
                  : "animate-demo-pulse-brand"
              }`}
            >
              가치관 등록 완료
            </Button>
            <DemoAutoTap visible={autoTapVisible} />
          </div>
        </div>
      </SlideShell>

      <SlideShell currentIndex={currentIndex} slideIndex={10} isTransitioning={isTransitioning}>
        <div className="flex-1 flex flex-col items-center justify-center space-y-4 px-1">
          <div className="w-20 h-20 rounded-full bg-primary-light flex items-center justify-center text-primary animate-demo-fade-in">
            <CheckCircleIcon className="w-14 h-14" />
          </div>
          <div className="text-center space-y-2 animate-demo-slide-up">
            <p className="text-sm font-extrabold tracking-[0.2em] text-primary">
              VALUES COMPLETE
            </p>
            <h2 className="font-sans text-3xl font-black text-foreground leading-tight">
              가치관 등록
              <br />
              완료
            </h2>
            <p className="text-lg font-bold text-foreground/80 leading-snug">
              매칭알고리즘에 가치관이
              <br />
              반영됩니다
            </p>
          </div>
          <div className="w-full bg-white border-2 border-primary/15 rounded-2xl px-4 py-3 space-y-3 animate-demo-slide-up max-h-44 overflow-y-auto">
            <SummaryTags title="만남에서 중요한 것" chips={VALUES_Q1_CHIPS} selected={selectedValuesQ1} />
            <SummaryTags title="목표 관계" chips={VALUES_Q2_CHIPS} selected={selectedValuesQ2} />
            <SummaryTags title="정치성향" chips={POLITICS_CHIPS} selected={selectedPolitics} />
            <SummaryTags title="종교·신앙" chips={RELIGION_CHIPS} selected={selectedReligion} />
            <SummaryTags title="피하고 싶은 상대" chips={AVOID_FILTER_CHIPS} selected={selectedValuesQ3} />
          </div>
        </div>
      </SlideShell>

      <div className="absolute bottom-3 left-0 right-0">
        <DemoProgressDots total={SLIDE_COUNT} current={currentIndex} />
      </div>
    </div>
  );
}
