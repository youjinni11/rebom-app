"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { DemoBottomNav } from "@/components/demo/DemoBottomNav";
import { VerificationBadge } from "@/components/matching/VerificationBadge";
import { VerificationMedallions } from "@/components/matching/VerificationMedallions";
import { Button } from "@/components/ui/Button";

const DEMO_CANDIDATE = {
  name: "이경희",
  age: 55,
  region: "서울 강남",
  photo: "/images/candidates/lee-kyung-hee.png",
  hobbies: ["미술관 관람", "전시회", "필라테스"],
  education: "4년제 졸업",
  income: "비공개",
};

const CANDIDATE_BADGES = [
  { id: "education" as const, label: "학력", earned: true },
  { id: "income" as const, label: "소득", earned: true },
];

type DemoVerifiedMatchingScreenProps = {
  scheduleTapVisible?: boolean;
  schedulePressed?: boolean;
  onScheduleClick?: () => void;
};

export function DemoVerifiedMatchingScreen({
  scheduleTapVisible = false,
  schedulePressed = false,
  onScheduleClick,
}: DemoVerifiedMatchingScreenProps) {
  const router = useRouter();

  return (
    <div className="absolute inset-0 flex flex-col min-h-0 animate-demo-fade-in">
      <div className="flex-1 min-h-0 overflow-y-auto overscroll-y-contain px-5 pt-2 pb-3">
        <header className="mb-2">
          <h1 className="text-2xl font-bold text-primary">매칭</h1>
        </header>

        <div className="mb-3">
          <VerificationBadge />
        </div>

        <div className="mb-3 pb-2.5 border-b border-border">
          <p className="text-primary text-xs font-semibold tracking-widest uppercase mb-1 opacity-80">
            Today&apos;s Pick
          </p>
          <h2 className="text-xl font-bold text-primary">오늘의 추천</h2>
          <p className="text-base text-foreground/65 mt-0.5">{DEMO_CANDIDATE.region}</p>
        </div>

        <div className="bg-white border-2 border-border rounded-2xl p-3.5 shadow-sm">
          <div className="relative w-full h-40 rounded-xl overflow-hidden mb-2.5">
            <Image
              src={DEMO_CANDIDATE.photo}
              alt={DEMO_CANDIDATE.name}
              fill
              className="object-cover object-top"
              sizes="360px"
              priority
            />
          </div>

          <h3 className="text-xl font-bold text-primary">
            {DEMO_CANDIDATE.name}
            <span className="text-lg font-normal text-foreground/70">
              {" "}
              · {DEMO_CANDIDATE.age}세
            </span>
          </h3>
          <p className="text-base text-foreground/80 mt-0.5">📍 {DEMO_CANDIDATE.region}</p>

          <div className="flex flex-wrap gap-1.5 mt-2.5">
            {DEMO_CANDIDATE.hobbies.map((hobby) => (
              <span
                key={hobby}
                className="px-2.5 py-1 rounded-lg bg-primary-light text-primary text-sm font-bold border border-primary/15"
              >
                {hobby}
              </span>
            ))}
          </div>

          <div className="mt-3 pt-3 border-t border-border/80">
            <VerificationMedallions badges={CANDIDATE_BADGES} />

            <div className="mt-2.5 grid grid-cols-2 gap-2">
              <div className="rounded-xl bg-primary-light/60 border border-primary/10 px-3 py-2 text-center">
                <p className="text-[10px] font-extrabold tracking-wide text-primary/60 mb-0.5">
                  학력
                </p>
                <p className="text-sm font-bold text-primary">{DEMO_CANDIDATE.education}</p>
              </div>
              <div className="rounded-xl bg-primary-light/60 border border-primary/10 px-3 py-2 text-center">
                <p className="text-[10px] font-extrabold tracking-wide text-primary/60 mb-0.5">
                  소득
                </p>
                <p className="text-sm font-bold text-primary">{DEMO_CANDIDATE.income}</p>
              </div>
            </div>
          </div>

          <div className="relative mt-3">
            <Button
              fullWidth
              variant="primary"
              className={`min-h-12 text-base font-bold transition-transform duration-150 ${
                schedulePressed
                  ? "scale-[0.97] brightness-95 animate-none"
                  : scheduleTapVisible
                    ? "animate-demo-pulse-brand"
                    : ""
              }`}
              onClick={() => {
                onScheduleClick?.();
                router.push("/demo/schedule");
              }}
            >
              편하신 시간을 알려주세요
            </Button>
          </div>
        </div>
      </div>

      <DemoBottomNav activeIndex={0} docked={false} demoLinks />
    </div>
  );
}
