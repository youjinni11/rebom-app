import type { ReactNode } from "react";
import { DemoConsentChecklist } from "@/components/demo/DemoConsentChecklist";
import { DemoAutoTap } from "@/components/demo/DemoAutoTap";
import {
  CertificateIcon,
  CheckCircleIcon,
  FaceIcon,
  PhoneIcon,
} from "@/components/demo/DemoIcons";
import { DemoProgressDots } from "@/components/demo/DemoProgressDots";
import { Button } from "@/components/ui/Button";
import { VERIFICATION_CONSENT_HEADING } from "@/lib/demo/verification-consent";

type VerificationSlidesProps = {
  currentIndex: number;
  isTransitioning: boolean;
  autoTapVisible?: boolean;
  buttonPressed?: boolean;
  laterButtonPressed?: boolean;
};

const SLIDE_COUNT = 8;

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
      className={`absolute inset-0 flex flex-col px-5 pt-4 pb-3 transition-all duration-300 ease-out ${
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
    <div className="absolute top-28 left-5 right-5 z-10 text-center space-y-2">
      <p className="text-base font-extrabold tracking-[0.2em] text-primary">
        STEP {step}
      </p>
      <h2 className="font-sans text-4xl font-black text-foreground leading-tight">
        {label}
      </h2>
    </div>
  );
}

function DataRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-border last:border-0">
      <span className="text-xl font-semibold text-foreground/75">{label}</span>
      <span className="text-2xl font-black text-foreground">{value}</span>
    </div>
  );
}

function SuccessPanel({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center space-y-5 animate-demo-fade-in">
      <div className="w-28 h-28 rounded-full bg-primary-light flex items-center justify-center text-primary">
        <CheckCircleIcon className="w-20 h-20" />
      </div>
      <div className="space-y-3">
        <p className="text-3xl font-black text-foreground">{title}</p>
        <p className="text-xl font-bold text-foreground/80">{subtitle}</p>
      </div>
    </div>
  );
}

export function VerificationSlides({
  currentIndex,
  isTransitioning,
  autoTapVisible = false,
  buttonPressed = false,
  laterButtonPressed = false,
}: VerificationSlidesProps) {
  return (
    <div className="relative h-full w-full bg-background overflow-hidden">
      <SlideShell
        currentIndex={currentIndex}
        slideIndex={0}
        isTransitioning={isTransitioning}
      >
        <div className="absolute top-20 left-5 right-5 z-10 text-center space-y-2">
          <h2 className="font-sans text-3xl font-black text-foreground leading-tight">
            {VERIFICATION_CONSENT_HEADING.title}
          </h2>
          <p className="text-lg font-bold text-foreground/70 leading-snug">
            {VERIFICATION_CONSENT_HEADING.subtitle}
          </p>
        </div>
        <div className="flex-1 flex flex-col justify-center space-y-4 pt-16">
          <DemoConsentChecklist demoChecked compact />
          <div className="relative">
            <Button
              variant="primary"
              fullWidth
              className={`min-h-14 text-xl font-black transition-transform duration-150 ${
                buttonPressed
                  ? "scale-[0.97] brightness-95 animate-none"
                  : "animate-demo-pulse-brand"
              }`}
            >
              {VERIFICATION_CONSENT_HEADING.cta}
            </Button>
            <DemoAutoTap visible={autoTapVisible} />
          </div>
        </div>
      </SlideShell>

      <SlideShell
        currentIndex={currentIndex}
        slideIndex={1}
        isTransitioning={isTransitioning}
      >
        <StepBadge step={1} label="전화번호 본인인증" />
        <div className="flex-1 flex flex-col justify-center space-y-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-primary-light flex items-center justify-center text-primary">
            <PhoneIcon className="w-14 h-14" />
          </div>
          <p className="text-center text-2xl font-bold text-foreground/90 leading-snug">
            휴대폰 번호로 본인을 확인하고
            <br />
            기본 정보를 안전하게 가져옵니다
          </p>
          <div className="bg-white border-2 border-border rounded-2xl px-5 py-5 space-y-2">
            <p className="text-xl font-bold text-foreground/70">휴대폰 번호</p>
            <p className="text-3xl font-black text-foreground tracking-wide">
              010-2172-5003
              <span className="inline-block w-0.5 h-8 bg-primary ml-1 align-middle animate-demo-type-cursor" />
            </p>
          </div>
        </div>
      </SlideShell>

      <SlideShell
        currentIndex={currentIndex}
        slideIndex={2}
        isTransitioning={isTransitioning}
      >
        <StepBadge step={1} label="본인인증 완료" />
        <div className="flex-1 flex flex-col justify-center space-y-5 animate-demo-slide-up">
          <div className="bg-white border-2 border-primary/20 rounded-2xl px-5 py-2 shadow-sm">
            <DataRow label="나이" value="58세" />
            <DataRow label="성별" value="남성" />
            <DataRow label="국적" value="대한민국" />
          </div>
          <p className="text-center text-xl font-bold text-foreground/80 leading-snug">
            통신사 인증을 통해 확인된 정보입니다
          </p>
        </div>
      </SlideShell>

      <SlideShell
        currentIndex={currentIndex}
        slideIndex={3}
        isTransitioning={isTransitioning}
      >
        <StepBadge step={2} label="얼굴 인증" />
        <div className="flex-1 flex flex-col justify-center space-y-5">
          <p className="text-center text-2xl font-bold text-foreground/90 leading-snug">
            실제 본인 여부를 확인하기 위해
            <br />
            얼굴을 촬영합니다
          </p>
          <div className="relative mx-auto w-56 h-72 rounded-[2rem] border-4 border-primary/30 bg-[#1a2522] overflow-hidden animate-demo-scan-pulse">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-primary/10" />
            <div className="absolute inset-x-6 top-14 bottom-20 border-2 border-dashed border-white/40 rounded-[50%]" />
            <div className="absolute inset-0 flex items-center justify-center text-white/25">
              <FaceIcon className="w-24 h-24" />
            </div>
            <div className="absolute left-4 right-4 h-0.5 bg-teal/80 shadow-[0_0_12px_rgba(20,145,142,0.8)] animate-demo-scan-line" />
            <p className="absolute bottom-4 left-0 right-0 text-center text-lg font-bold text-white">
              얼굴을 원 안에 맞춰 주세요
            </p>
          </div>
          <p className="text-center text-xl font-bold text-foreground/75">
            가짜 사진·도용을 차단합니다
          </p>
        </div>
      </SlideShell>

      <SlideShell
        currentIndex={currentIndex}
        slideIndex={4}
        isTransitioning={isTransitioning}
      >
        <StepBadge step={2} label="얼굴 인증 완료" />
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-5 animate-demo-fade-in">
          <div className="w-28 h-28 rounded-full bg-primary-light flex items-center justify-center text-primary">
            <CheckCircleIcon className="w-20 h-20" />
          </div>
          <div className="space-y-3">
            <p className="text-3xl font-black text-foreground">얼굴 인증 완료</p>
            <p className="text-xl font-bold text-foreground/80 leading-snug">
              본인 확인이 완료되었습니다
            </p>
          </div>
        </div>
      </SlideShell>

      <SlideShell
        currentIndex={currentIndex}
        slideIndex={5}
        isTransitioning={isTransitioning}
      >
        <StepBadge step={3} label="미혼 상태 인증" />
        <div className="flex-1 flex flex-col justify-center space-y-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-primary-light flex items-center justify-center text-primary">
            <CertificateIcon className="w-14 h-14" />
          </div>
          <p className="text-center text-2xl font-bold text-foreground/90 leading-snug">
            혼인관계증명서(일반)으로
            <br />
            미혼 상태를 확인합니다
          </p>
          <div className="bg-white border-2 border-border rounded-2xl px-5 py-5 space-y-4">
            <div className="flex justify-between text-xl">
              <span className="font-semibold text-foreground/75">이름</span>
              <span className="text-2xl font-black">김영호</span>
            </div>
            <div className="flex justify-between text-xl">
              <span className="font-semibold text-foreground/75">생년월일</span>
              <span className="text-2xl font-black">1967.03.15</span>
            </div>
          </div>
          <div className="space-y-3">
            <Button
              variant="primary"
              fullWidth
              className="min-h-14 text-xl font-bold"
            >
              미혼 인증하기
            </Button>
            <div className="relative">
              <Button
                variant="outline"
                fullWidth
                className={`min-h-14 text-xl font-bold border-2 transition-transform duration-150 ${
                  laterButtonPressed
                    ? "scale-[0.97] brightness-95 bg-primary-light animate-none"
                    : autoTapVisible
                      ? "animate-demo-pulse-brand"
                      : ""
                }`}
              >
                나중에 하기
              </Button>
              <DemoAutoTap visible={autoTapVisible} />
            </div>
          </div>
        </div>
      </SlideShell>

      <SlideShell
        currentIndex={currentIndex}
        slideIndex={6}
        isTransitioning={isTransitioning}
      >
        <StepBadge step={3} label="미혼 상태 인증" />
        <div className="flex-1 flex flex-col justify-center space-y-6 px-1 animate-demo-fade-in">
          <div className="w-24 h-24 mx-auto rounded-full bg-primary-light flex items-center justify-center text-primary">
            <CertificateIcon className="w-16 h-16" />
          </div>
          <div className="space-y-4 text-center">
            <p className="text-3xl font-black text-foreground leading-snug">
              나중에 인증하기를
              <br />
              선택하셨습니다
            </p>
            <div className="bg-white border-2 border-primary/20 rounded-2xl px-5 py-5 text-center space-y-3">
              <p className="text-xl font-bold text-foreground/90 leading-relaxed">
                <span className="text-primary">미혼 상태 인증</span>을 해야만
                <br />
                매칭 서비스를 이용할 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </SlideShell>

      <SlideShell
        currentIndex={currentIndex}
        slideIndex={7}
        isTransitioning={isTransitioning}
      >
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 px-2">
          <div className="w-28 h-28 rounded-full bg-primary-light flex items-center justify-center text-primary animate-demo-fade-in">
            <CheckCircleIcon className="w-20 h-20" />
          </div>
          <div className="space-y-4 animate-demo-slide-up">
            <p className="text-base font-extrabold tracking-[0.2em] text-primary">
              2 OF 3 COMPLETE
            </p>
            <h2 className="font-sans text-5xl font-black text-foreground leading-tight">
              3단계 중
              <br />
              2단계 완료
            </h2>
            <p className="text-2xl font-bold text-foreground/90 leading-snug">
              전화번호 · 얼굴 인증을
              <br />
              완료했습니다
            </p>
            <p className="text-lg font-bold text-foreground/65 leading-snug">
              미혼 상태 인증은 아직 남아 있습니다
            </p>
          </div>
          <div className="w-full max-w-xs grid grid-cols-3 gap-2 pt-2">
            {[
              { label: "본인인증", done: true },
              { label: "미혼인증", done: false },
              { label: "얼굴인증", done: true },
            ].map(({ label, done }) => (
              <div
                key={label}
                className={`rounded-xl py-4 px-1 border text-center flex flex-col items-center justify-center ${
                  done
                    ? "bg-primary-light border-primary/15"
                    : "bg-muted border-border"
                }`}
              >
                <p
                  className={`text-lg font-black mb-1.5 ${
                    done ? "text-primary" : "text-foreground/35"
                  }`}
                >
                  {done ? "✓" : "—"}
                </p>
                <p
                  className={`text-base font-bold leading-tight ${
                    done ? "text-foreground" : "text-foreground/50"
                  }`}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>
          <div className="w-full max-w-xs pt-2">
            <Button
              variant="primary"
              fullWidth
              className="min-h-16 text-2xl font-black animate-demo-pulse-brand"
            >
              서비스 둘러보기
            </Button>
          </div>
        </div>
      </SlideShell>

      <div className="absolute bottom-3 left-0 right-0">
        <DemoProgressDots total={SLIDE_COUNT} current={currentIndex} />
      </div>
    </div>
  );
}
