"use client";

import type { ReactNode } from "react";
import { WIREFRAME_STEPS } from "@/lib/wireframe-steps";

type WireframeShellProps = {
  stepIndex: number;
  children: ReactNode;
  onPrev: () => void;
  onNext: () => void;
  hideFooterNav?: boolean;
};

export function WireframeShell({
  stepIndex,
  children,
  onPrev,
  onNext,
  hideFooterNav = false,
}: WireframeShellProps) {
  const step = WIREFRAME_STEPS[stepIndex];
  const total = WIREFRAME_STEPS.length;
  const isFirst = stepIndex === 0;
  const isLast = stepIndex === total - 1;

  return (
    <div className="relative flex h-full min-h-0 w-full flex-col bg-background">
      <header className="shrink-0 border-b border-border bg-surface/95 px-3 py-2 backdrop-blur-md">
        <p className="text-[10px] font-bold tracking-[0.18em] text-primary/60 uppercase">
          RE:BOM WIREFRAME · {step.section}
        </p>
        <div className="mt-0.5 flex items-baseline justify-between gap-2">
          <h2 className="text-sm font-bold text-foreground">{step.title}</h2>
          <span className="shrink-0 text-xs text-foreground/45">
            {stepIndex + 1}/{total}
          </span>
        </div>
        {step.note ? (
          <p className="mt-0.5 text-[11px] leading-snug text-foreground/50">{step.note}</p>
        ) : null}
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain">{children}</div>

      {!hideFooterNav ? (
        <footer className="shrink-0 border-t border-border bg-surface px-3 py-2.5">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onPrev}
              disabled={isFirst}
              className="min-h-11 flex-1 rounded-xl border-2 border-border text-sm font-semibold text-foreground disabled:opacity-30"
            >
              이전
            </button>
            <button
              type="button"
              onClick={onNext}
              disabled={isLast}
              className="min-h-11 flex-[1.4] rounded-xl bg-primary text-sm font-bold text-cream disabled:opacity-30"
            >
              {isLast ? "끝" : "다음 화면"}
            </button>
          </div>
        </footer>
      ) : null}
    </div>
  );
}
