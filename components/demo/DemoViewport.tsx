"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { DEMO_ASPECT, DEMO_VIEWPORT } from "@/lib/demo-viewport";

function DemoViewportInner({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const recordMode = searchParams.get("record") === "1";
  const designMode =
    searchParams.get("design") === "1" || searchParams.get("pause") === "1";

  const frameClass =
    "demo-screen relative overflow-hidden bg-background font-sans";

  const previewWidth = `min(${DEMO_VIEWPORT.width}px, calc(100vw - 1rem), calc((100vh - 1rem) * 9 / 16))`;

  /** 녹화: 세로 9:16이 화면에 꽉 차게 */
  const recordFrameStyle = {
    height: "100dvh",
    width: "calc(100dvh * 9 / 16)",
    maxWidth: "100vw",
    maxHeight: "calc(100vw * 16 / 9)",
  } as const;

  useEffect(() => {
    if (!recordMode) return;

    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyBg = document.body.style.background;
    const prevHtmlBg = document.documentElement.style.background;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.style.background = "#faf8f4";
    document.documentElement.style.background = "#faf8f4";

    return () => {
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.background = prevBodyBg;
      document.documentElement.style.background = prevHtmlBg;
    };
  }, [recordMode]);

  if (recordMode) {
    return (
      <div className="fixed inset-0 flex items-center justify-center overflow-hidden bg-background">
        <div className={frameClass} style={recordFrameStyle}>
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen bg-[#1a2522] flex items-center justify-center p-2 ${
        designMode ? "pl-[12.5rem]" : ""
      }`}
    >
      <div
        className={`${frameClass} shadow-2xl shrink-0 max-h-[calc(100vh-1rem)] flex flex-col`}
        style={{ width: previewWidth, aspectRatio: DEMO_ASPECT }}
      >
        {children}
      </div>
    </div>
  );
}

export function DemoViewport({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#1a2522] flex items-center justify-center">
          <div
            className="demo-screen w-64 bg-background"
            style={{ aspectRatio: DEMO_ASPECT }}
          />
        </div>
      }
    >
      <DemoViewportInner>{children}</DemoViewportInner>
    </Suspense>
  );
}
