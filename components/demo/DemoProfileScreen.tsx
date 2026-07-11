import Image from "next/image";
import { DemoAutoTap } from "@/components/demo/DemoAutoTap";
import { DemoBottomNav } from "@/components/demo/DemoBottomNav";
import { DEMO_USER } from "@/components/demo/demo-user";

const VERIFY_BUTTONS = [
  { id: "marital", label: "미혼상태 인증하기", required: true },
  { id: "education", label: "학력인증하기", optional: true },
  { id: "income", label: "직업/소득 인증하기", optional: true },
] as const;

const PROFILE_BADGES = [
  { id: "education", label: "학력", earned: true },
  { id: "income", label: "소득", earned: false },
] as const;

type DemoProfileScreenProps = {
  onValuesInputClick?: () => void;
  valuesInputTapVisible?: boolean;
  onLifestyleClick?: () => void;
  lifestyleTapVisible?: boolean;
  lifestyleTags?: string[];
  maritalVerified?: boolean;
  /** 완료 화면: 헤더·가치관·인증 버튼 생략, 하단 탭을 흐름 안에 배치 */
  variant?: "default" | "completion";
};

export function DemoProfileScreen({
  onValuesInputClick,
  valuesInputTapVisible = false,
  onLifestyleClick,
  lifestyleTapVisible = false,
  lifestyleTags = [],
  maritalVerified = false,
  variant = "default",
}: DemoProfileScreenProps) {
  const hasLifestyle = lifestyleTags.length > 0;
  const isCompletion = variant === "completion";

  return (
    <div className="flex-1 flex flex-col min-h-0 relative animate-demo-fade-in">
      <div
        className={`flex-1 min-h-0 flex flex-col overflow-hidden ${
          isCompletion ? "gap-1.5 pb-2" : "gap-2 pb-[4.75rem]"
        }`}
      >
        {!isCompletion && (
          <header className="shrink-0 mb-1">
            <h1 className="text-xl font-bold text-primary">프로필</h1>
          </header>
        )}

        <section
          className={`flex flex-col bg-white border-2 border-border rounded-2xl shadow-sm ${
            isCompletion
              ? "shrink-0 p-2.5"
              : "flex-[1.15] min-h-0 p-3"
          }`}
        >
          {!isCompletion && (
            <p className="text-xs font-extrabold tracking-[0.15em] text-primary mb-2">
              내 프로필 정보
            </p>
          )}

          <div className={`flex items-start gap-2 ${isCompletion ? "" : "mb-2.5"}`}>
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div
                className={`relative shrink-0 rounded-xl overflow-hidden ${
                  isCompletion ? "w-12 h-12" : "w-16 h-16"
                }`}
              >
                <Image
                  src={DEMO_USER.photo}
                  alt={DEMO_USER.name}
                  fill
                  className="object-cover"
                  sizes={isCompletion ? "48px" : "64px"}
                />
              </div>
              <div className="min-w-0">
                <p
                  className={`font-bold text-primary leading-tight ${
                    isCompletion ? "text-base" : "text-lg"
                  }`}
                >
                  {DEMO_USER.name}
                  <span className="text-sm font-semibold text-foreground/70">
                    {" "}
                    · {DEMO_USER.age}세
                  </span>
                </p>
                <p className="text-xs font-semibold text-foreground/75 mt-0.5">
                  📍 {DEMO_USER.region}
                </p>
              </div>
            </div>

            {!isCompletion && <ProfileBadgeStatus />}
          </div>

          {!isCompletion && (
            <div className="flex-1 min-h-0 flex flex-col gap-1.5 justify-end">
              {VERIFY_BUTTONS.map((button) => (
                <VerifyButton
                  key={button.id}
                  label={
                    button.id === "marital" && maritalVerified
                      ? "인증완료"
                      : button.label
                  }
                  required={"required" in button ? button.required : false}
                  optional={"optional" in button ? button.optional : false}
                  completed={button.id === "marital" && maritalVerified}
                />
              ))}
            </div>
          )}
        </section>

        {!isCompletion && (
          <section className="flex-1 min-h-0 flex flex-col bg-white border-2 border-border rounded-2xl p-3 shadow-sm">
            <p className="text-xs font-extrabold tracking-[0.15em] text-primary mb-2">
              가치관
            </p>
            <div className="relative flex-1 flex items-center justify-center">
              <button
                type="button"
                onClick={onValuesInputClick}
                className="w-full min-h-12 rounded-xl bg-primary text-cream text-sm font-bold shadow-sm shadow-primary/20 animate-demo-pulse-brand"
              >
                가치관 입력하기
              </button>
              {valuesInputTapVisible && (
                <div className="absolute inset-0 pointer-events-none">
                  <DemoAutoTap visible />
                </div>
              )}
            </div>
          </section>
        )}

        <section
          className={`flex flex-col bg-white border-2 border-border rounded-2xl shadow-sm ${
            isCompletion ? "flex-1 min-h-0 p-3" : "flex-1 min-h-0 p-3"
          }`}
        >
          <p
            className={`text-xs font-extrabold text-primary mb-1.5 ${
              isCompletion ? "tracking-[0.12em] px-0.5" : "tracking-[0.15em]"
            }`}
          >
            라이프스타일
          </p>
          <div className="relative flex-1 min-h-0 flex items-start justify-center">
            {hasLifestyle ? (
              <div className="w-full flex flex-wrap gap-1.5 justify-center content-start max-h-full overflow-y-auto">
                {lifestyleTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-lg bg-primary-light text-primary text-xs font-bold border border-primary/15"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : (
              <button
                type="button"
                onClick={onLifestyleClick}
                className={`w-full flex-1 flex items-center justify-center rounded-xl border-2 border-dashed px-3 transition-colors ${
                  lifestyleTapVisible
                    ? "border-primary/40 bg-primary-light/60 animate-demo-pulse-brand"
                    : "border-primary/20 bg-primary-light/40"
                }`}
              >
                <p className="text-center text-sm font-semibold text-foreground/55 leading-snug">
                  큐레이션으로
                  <br />
                  라이프스타일을 등록해 주세요
                </p>
              </button>
            )}
            {lifestyleTapVisible && !hasLifestyle && (
              <div className="absolute inset-0 pointer-events-none">
                <DemoAutoTap visible />
              </div>
            )}
          </div>
        </section>
      </div>

      {!isCompletion && (
        <DemoBottomNav activeIndex={2} docked />
      )}
    </div>
  );
}

function VerifyButton({
  label,
  required,
  optional,
  completed = false,
}: {
  label: string;
  required?: boolean;
  optional?: boolean;
  completed?: boolean;
}) {
  return (
    <div
      className={`min-h-9 flex items-center justify-center rounded-xl px-3 text-sm font-bold leading-tight ${
        completed
          ? "bg-primary-light text-primary border border-primary/25"
          : required
            ? "bg-primary text-cream shadow-sm shadow-primary/20"
            : "bg-primary-light text-primary border border-primary/20"
      }`}
    >
      {completed && <span className="mr-1.5 text-xs">✓</span>}
      {label}
      {optional && (
        <span className="ml-1 text-xs font-semibold opacity-75">(선택)</span>
      )}
    </div>
  );
}

function ProfileBadgeStatus() {
  const earnedCount = PROFILE_BADGES.filter((badge) => badge.earned).length;

  return (
    <div className="shrink-0 w-[5.5rem] pt-0.5">
      <div className="flex items-center justify-between mb-2 px-0.5">
        <p className="text-[9px] font-extrabold tracking-[0.14em] text-primary/70">
          인증 뱃지
        </p>
        <span className="text-[9px] font-bold text-gold tabular-nums">
          {earnedCount}/{PROFILE_BADGES.length}
        </span>
      </div>
      <div className="flex justify-end gap-2">
        {PROFILE_BADGES.map((badge) => (
          <VerificationBadgeMedallion key={badge.id} {...badge} />
        ))}
      </div>
    </div>
  );
}

function VerificationBadgeMedallion({
  id,
  label,
  earned,
}: {
  id: string;
  label: string;
  earned: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-1 w-[2.35rem]">
      <div
        className={`relative h-11 w-11 rounded-full flex items-center justify-center transition-all ${
          earned
            ? "bg-gradient-to-br from-gold/30 via-primary-light to-primary/10 shadow-[0_4px_14px_rgba(201,169,98,0.28)] ring-2 ring-gold/55"
            : "bg-muted/90 ring-1 ring-border/90"
        }`}
      >
        <span
          className={`flex h-7 w-7 items-center justify-center rounded-full ${
            earned
              ? "bg-primary/10 text-primary"
              : "bg-foreground/[0.04] text-foreground/30"
          }`}
        >
          {id === "education" ? (
            <GraduationBadgeIcon className="h-4 w-4" />
          ) : (
            <IncomeBadgeIcon className="h-4 w-4" />
          )}
        </span>

        {earned ? (
          <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-cream border-2 border-white shadow-sm">
            <CheckIcon className="h-2 w-2" />
          </span>
        ) : (
          <span className="absolute inset-0 flex items-center justify-center rounded-full bg-background/45 backdrop-blur-[1px]">
            <LockIcon className="h-3 w-3 text-foreground/40" />
          </span>
        )}
      </div>
      <span
        className={`text-[9px] font-bold leading-none text-center ${
          earned ? "text-primary" : "text-foreground/35"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.5 6l2.5 2.5 5-5" />
    </svg>
  );
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
      <rect x="6" y="11" width="12" height="9" rx="2" />
      <path strokeLinecap="round" d="M9 11V8a3 3 0 016 0v3" />
    </svg>
  );
}

function GraduationBadgeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4L3 9l9 5 9-5-9-5z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 11v4c0 2 3.5 4 6 4s6-2 6-4v-4" />
    </svg>
  );
}

function IncomeBadgeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
      <circle cx="12" cy="12" r="8" />
      <path strokeLinecap="round" d="M12 8v8M9.5 10.5h4a1.5 1.5 0 010 3h-4" />
    </svg>
  );
}
