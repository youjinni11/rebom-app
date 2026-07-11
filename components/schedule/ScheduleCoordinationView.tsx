"use client";

import Image from "next/image";

const PARTNER = {
  name: "이경희",
  age: 55,
  photo: "/images/candidates/lee-kyung-hee.png",
};

type StepStatus = "done" | "current" | "upcoming" | "locked";

type CoordinationStep = {
  id: string;
  title: string;
  description: string;
  status: StepStatus;
  detail?: string;
};

const STEPS: CoordinationStep[] = [
  {
    id: "availability",
    title: "가능 시간 전달",
    description: "회원님이 편하신 시간을 알려주셨어요.",
    status: "done",
    detail: "6월 28일(토) 오후 · 6월 30일(월) 오전 · 7월 1일(수) 오후",
  },
  {
    id: "coordination",
    title: "리봄 조율",
    description: "리봄이 양쪽 일정을 확인하고 있어요.",
    status: "done",
    detail: "상대방 가능 시간과 맞춰 조율 중이었습니다",
  },
  {
    id: "proposal",
    title: "일정·장소 제안",
    description: "리봄이 만남 일정과 장소를 제안했어요.",
    status: "current",
    detail: "7월 1일(수) 오후 12:30\n경희다이닝 강남역점",
  },
  {
    id: "confirmed",
    title: "일정 확정",
    description: "확정되면 만남 안내를 보내드려요.",
    status: "upcoming",
  },
  {
    id: "meeting-day",
    title: "만남 당일 채팅",
    description: "만남 당일에만 채팅이 열립니다.",
    status: "locked",
  },
];

function StepIndicator({ status }: { status: StepStatus }) {
  if (status === "done") {
    return (
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-cream text-sm font-bold">
        ✓
      </span>
    );
  }

  if (status === "current") {
    return (
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold text-primary ring-4 ring-gold/25 text-xs font-extrabold">
        ···
      </span>
    );
  }

  if (status === "locked") {
    return (
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-foreground/35">
        <LockMiniIcon />
      </span>
    );
  }

  return (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-border bg-white text-foreground/30 text-xs font-bold">
      ·
    </span>
  );
}

function LockMiniIcon() {
  return (
    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
      <rect x="6" y="11" width="12" height="9" rx="2" />
      <path strokeLinecap="round" d="M9 11V8a3 3 0 016 0v3" />
    </svg>
  );
}

export function ScheduleCoordinationView() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 bg-white border-2 border-border rounded-2xl p-3 shadow-sm">
        <div className="relative h-14 w-14 shrink-0 rounded-xl overflow-hidden">
          <Image
            src={PARTNER.photo}
            alt={PARTNER.name}
            fill
            className="object-cover object-top"
            sizes="56px"
          />
        </div>
        <div className="min-w-0">
          <p className="text-lg font-bold text-primary leading-tight">
            {PARTNER.name}
            <span className="text-base font-normal text-foreground/70"> · {PARTNER.age}세</span>
          </p>
          <p className="text-sm font-semibold text-foreground/60 mt-0.5">
            리봄 조율로 일정을 맞추고 있어요
          </p>
        </div>
      </div>

      <div className="bg-white border-2 border-border rounded-2xl p-4 shadow-sm">
        <p className="text-xs font-extrabold tracking-[0.15em] text-primary mb-3">
          일정 조율 과정
        </p>

        <ol className="space-y-0">
          {STEPS.map((step, index) => {
            const isLast = index === STEPS.length - 1;
            const isCurrent = step.status === "current";

            return (
              <li key={step.id} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <StepIndicator status={step.status} />
                  {!isLast && (
                    <span
                      className={`w-0.5 flex-1 min-h-6 my-1 rounded-full ${
                        step.status === "done" ? "bg-primary/35" : "bg-border"
                      }`}
                    />
                  )}
                </div>

                <div className={`pb-4 min-w-0 flex-1 ${isLast ? "pb-0" : ""}`}>
                  <p
                    className={`text-base font-bold leading-tight ${
                      isCurrent ? "text-primary" : "text-foreground/85"
                    }`}
                  >
                    {step.title}
                  </p>
                  <p className="text-sm font-semibold text-foreground/60 mt-0.5 leading-snug">
                    {step.description}
                  </p>
                  {step.detail && (
                    <p
                      className={`mt-2 rounded-xl px-3 py-2 text-sm font-bold leading-snug whitespace-pre-line ${
                        isCurrent
                          ? "bg-gold/15 border border-gold/30 text-primary"
                          : "bg-muted/70 text-foreground/75"
                      }`}
                    >
                      {step.detail}
                    </p>
                  )}

                  {isCurrent && (
                    <div className="mt-3 flex gap-2">
                      <button
                        type="button"
                        className="flex-1 min-h-10 rounded-xl border-2 border-border bg-white text-sm font-bold text-foreground/75"
                      >
                        다른 시간 요청
                      </button>
                      <button
                        type="button"
                        className="flex-1 min-h-10 rounded-xl bg-primary text-cream text-sm font-bold shadow-sm shadow-primary/15"
                      >
                        이 일정으로 확정
                      </button>
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="bg-muted/80 border-2 border-dashed border-border rounded-xl px-3 py-2 text-center">
        <div className="mx-auto mb-1 flex h-8 w-8 items-center justify-center rounded-full bg-foreground/5 text-foreground/35">
          <LockMiniIcon />
        </div>
        <p className="text-sm font-extrabold text-foreground/55 leading-tight">채팅 잠금</p>
        <p className="text-sm font-semibold text-foreground/45 mt-0.5 leading-snug">
          일정이 확정되어도 만남 당일 전까지는 채팅을 사용할 수 없습니다
        </p>
      </div>
    </div>
  );
}
