"use client";

import { DemoBottomNav } from "@/components/demo/DemoBottomNav";
import { ScheduleCoordinationView } from "@/components/schedule/ScheduleCoordinationView";

export function DemoScheduleScreen() {
  return (
    <div className="absolute inset-0 flex flex-col min-h-0 bg-background">
      <div className="flex-1 min-h-0 overflow-y-auto overscroll-y-contain bg-background px-5 pt-2 pb-6">
        <header className="mb-3">
          <h1 className="text-2xl font-bold text-primary">만남 일정</h1>
          <p className="text-sm font-semibold text-foreground/60 mt-1 leading-snug">
            리봄이 일정과 장소를 조율해 드립니다
          </p>
        </header>

        <ScheduleCoordinationView />
      </div>

      <DemoBottomNav activeIndex={1} docked={false} demoLinks />
    </div>
  );
}
