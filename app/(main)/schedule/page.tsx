import { ScheduleCoordinationView } from "@/components/schedule/ScheduleCoordinationView";

export default function SchedulePage() {
  return (
    <main className="px-5 py-6 pb-28 max-w-lg mx-auto">
      <header className="mb-4">
        <h1 className="text-2xl font-bold text-primary">만남 일정</h1>
        <p className="text-sm font-semibold text-foreground/60 mt-1 leading-snug">
          리봄이 일정과 장소를 조율해 드립니다
        </p>
      </header>

      <ScheduleCoordinationView />
    </main>
  );
}
