"use client";

import type { ReactNode } from "react";
import { CertificateIcon, CompassIcon, LockIcon } from "@/components/demo/DemoIcons";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/Logo";

type WelcomeSlidesProps = {
  fill?: "screen" | "parent";
  currentIndex: number;
  isTransitioning: boolean;
  onStart: () => void;
  onAdvance: () => void;
  isLastSlide: boolean;
};

const SLIDE_COUNT = 3;

const painPoints = [
  "조건만 따지는 만남에 지쳤을 때",
  "내 개인정보가 여기저기 떠도는 게 불안할 때",
  "어색한 연락처 교환과 약속 잡는 과정이 귀찮을 때",
  "혼자 살기엔 적적하지만, 아무나 만나고 싶지는 않을 때",
];

const solutions = [
  {
    icon: <CertificateIcon className="w-11 h-11" />,
    title: "철저한 검증",
    description:
      "직업, 학력, 혼인 여부까지. 확실하게 검증된 분들만 매칭해 드립니다.",
  },
  {
    icon: <CompassIcon className="w-11 h-11" />,
    title: "가치관 기반",
    description:
      "단순한 조건이 아닌, 취미와 라이프스타일, 대화의 수준이 맞는 사람을 찾아드려요.",
  },
  {
    icon: <LockIcon className="w-11 h-11" />,
    title: "프라이버시 보호",
    description:
      "연락처 교환 없이, 앱 내에서 원하는 정보만 안전하게 선택해서 보여주세요.",
  },
];

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
      className={`absolute inset-0 flex flex-col px-6 pt-14 pb-28 transition-all duration-300 ease-out ${
        isActive
          ? isTransitioning
            ? "opacity-0 translate-y-2"
            : "opacity-100 translate-y-0"
          : "opacity-0 pointer-events-none translate-y-3"
      }`}
      aria-hidden={!isActive}
    >
      {children}
    </div>
  );
}

function PainIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6v6m0 6h.008M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

export function WelcomeSlides({
  fill = "screen",
  currentIndex,
  isTransitioning,
  onStart,
  onAdvance,
  isLastSlide,
}: WelcomeSlidesProps) {
  const heightClass = fill === "parent" ? "h-full" : "min-h-dvh h-full";

  return (
    <div className={`relative w-full overflow-hidden bg-cream ${heightClass}`}>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 55% at 50% 0%, rgba(201,169,98,0.07) 0%, transparent 65%)",
        }}
      />

      {/* Section 1 — Hero */}
      <SlideShell
        currentIndex={currentIndex}
        slideIndex={0}
        isTransitioning={isTransitioning}
      >
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <div className="mb-8 flex items-center gap-3 animate-welcome-fade-in">
            <span className="h-px w-10 bg-gold/50" />
            <Logo size="sm" href="" textClassName="text-primary" />
            <span className="h-px w-10 bg-gold/50" />
          </div>

          <div className="max-w-sm space-y-6 animate-welcome-slide-up">
            <h1 className="font-serif text-[1.65rem] font-medium leading-snug tracking-tight text-foreground sm:text-3xl">
              결혼은 부담스럽고,
              <br />
              가벼운 만남은 싫은
              <br />
              <span className="text-primary">당신에게.</span>
            </h1>

            <p className="text-base leading-relaxed text-foreground/70 sm:text-lg">
              수백만 원의 가입비도, 부담스러운 매니저도 필요 없습니다. 남은
              인생을 친구처럼 함께할 &lsquo;대화가 통하는 동반자&rsquo;를
              만나보세요.
            </p>
          </div>
        </div>
      </SlideShell>

      {/* Section 2 — Pain Point */}
      <SlideShell
        currentIndex={currentIndex}
        slideIndex={1}
        isTransitioning={isTransitioning}
      >
        <div className="flex flex-1 flex-col justify-center">
          <div className="mb-8 space-y-3 text-center animate-welcome-fade-in">
            <p className="text-sm font-medium tracking-wide text-gold">
              혹시 이런 마음이신가요
            </p>
            <h2 className="font-serif text-2xl font-medium leading-snug text-foreground sm:text-[1.75rem]">
              새로운 사람을 알아가는 일,
              <br />
              이제 피곤하지 않으신가요?
            </h2>
          </div>

          <ul className="space-y-3">
            {painPoints.map((point, index) => (
              <li
                key={point}
                className="animate-welcome-slide-up flex items-start gap-3 rounded-2xl border border-border/80 bg-surface/80 px-4 py-3.5 shadow-sm shadow-primary/5 backdrop-blur-sm"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary">
                  <PainIcon />
                </span>
                <p className="pt-1 text-left text-base leading-snug text-foreground/85">
                  {point}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </SlideShell>

      {/* Section 3 — Solution + CTA */}
      <SlideShell
        currentIndex={currentIndex}
        slideIndex={2}
        isTransitioning={isTransitioning}
      >
        <div className="flex flex-1 flex-col justify-center">
          <div className="mb-7 space-y-3 text-center animate-welcome-fade-in">
            <p className="text-sm font-medium tracking-wide text-primary">
              리봄이 해결해 드립니다
            </p>
            <h2 className="font-serif text-2xl font-medium leading-snug text-foreground sm:text-[1.75rem]">
              당신은 그저 대화에만 집중하세요.
              <br />
              <span className="text-primary/90">
                나머지는 저희가 다 알아서 할게요.
              </span>
            </h2>
          </div>

          <ul className="mb-8 space-y-3">
            {solutions.map((item, index) => (
              <li
                key={item.title}
                className="animate-welcome-slide-up flex items-start gap-3.5 rounded-2xl border border-primary/10 bg-surface px-4 py-4 shadow-sm"
                style={{ animationDelay: `${index * 90}ms` }}
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
                  {item.icon}
                </span>
                <div className="space-y-1 pt-0.5 text-left">
                  <h3 className="text-base font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-foreground/70">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <Button
            variant="gold"
            fullWidth
            className="min-h-14 animate-demo-pulse text-lg font-bold"
            onClick={onStart}
          >
            무료로 시작하기
          </Button>
          <p className="mt-3 text-center text-sm text-foreground/50">
            가입비 없음 · 검증된 회원만 이용
          </p>
        </div>
      </SlideShell>

      {/* Progress + next control */}
      <div className="absolute bottom-0 left-0 right-0 px-6 pb-8 pt-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2" aria-hidden>
            {Array.from({ length: SLIDE_COUNT }).map((_, index) => (
              <span
                key={index}
                className={`rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "h-2 w-6 bg-primary"
                    : "h-2 w-2 bg-border"
                }`}
              />
            ))}
          </div>

          {!isLastSlide && (
            <button
              type="button"
              onClick={onAdvance}
              className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
            >
              다음
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
