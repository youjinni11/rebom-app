import Image from "next/image";
import { DemoAutoTap } from "@/components/demo/DemoAutoTap";
import { DemoBottomNav } from "@/components/demo/DemoBottomNav";
import { Button } from "@/components/ui/Button";

const DEMO_CANDIDATE = {
  name: "송혜진",
  age: 55,
  region: "서울 강남",
  bio: "압구정 미술관 관람과 전시회가 취미입니다.",
  photo:
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400",
};

type DemoHomeScreenProps = {
  onProfileClick?: () => void;
  profileTapVisible?: boolean;
};

export function DemoHomeScreen({
  onProfileClick,
  profileTapVisible = false,
}: DemoHomeScreenProps) {
  return (
    <div className="flex-1 flex flex-col min-h-0 relative animate-demo-fade-in">
      <div className="flex-1 min-h-0 flex flex-col pb-[4.75rem] overflow-hidden">
        <div className="shrink-0 mb-3 bg-primary-light border-2 border-primary/25 rounded-2xl px-4 py-3">
        <p className="text-sm font-extrabold text-primary leading-snug">
          미혼 상태 인증이 완료되지 않았습니다
        </p>
        <p className="text-sm font-semibold text-foreground/75 mt-1 leading-snug">
          인증을 완료해야 매칭 서비스를 이용할 수 있습니다
        </p>
      </div>

      <div className="relative flex-1 min-h-0 flex flex-col">
        <div
          className="flex-1 min-h-0 flex flex-col blur-[6px] opacity-55 select-none pointer-events-none"
          aria-hidden
        >
          <header className="shrink-0 mb-4">
            <h1 className="text-2xl font-bold text-primary">매칭</h1>
          </header>

          <div className="shrink-0 mb-3 pb-3 border-b border-border">
            <p className="text-primary text-xs font-semibold tracking-widest uppercase mb-1.5 opacity-80">
              Today&apos;s Pick
            </p>
            <h2 className="text-xl font-bold text-primary">오늘의 추천</h2>
            <p className="text-base text-foreground/65 mt-1">서울 강남 · 하루 1명</p>
          </div>

          <div className="flex-1 min-h-0 overflow-hidden">
            <div className="bg-white border-2 border-border rounded-2xl p-4 shadow-sm">
              <div className="relative w-full h-44 rounded-xl overflow-hidden mb-3">
                <Image
                  src={DEMO_CANDIDATE.photo}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="360px"
                />
              </div>
              <h3 className="text-xl font-bold text-primary">
                {DEMO_CANDIDATE.name}
                <span className="text-lg font-normal text-foreground/70">
                  {" "}
                  · {DEMO_CANDIDATE.age}세
                </span>
              </h3>
              <p className="text-base text-foreground/80 mt-1">
                📍 {DEMO_CANDIDATE.region}
              </p>
              <p className="text-base text-foreground/70 leading-snug mt-2 line-clamp-2">
                {DEMO_CANDIDATE.bio}
              </p>
              <div className="mt-4">
                <Button fullWidth variant="primary" className="min-h-12 text-lg font-bold">
                  관심 있어요
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center px-3 z-10 pointer-events-none">
          <div className="bg-primary-light/95 border-2 border-primary/30 rounded-2xl px-5 py-5 shadow-lg">
            <p className="text-center text-lg font-extrabold text-primary leading-snug">
              미혼 상태 인증이 완료된 회원만
              <br />
              정식으로 매칭서비스 이용이 가능합니다
            </p>
          </div>
        </div>
      </div>
      </div>

      <DemoBottomNav
        activeIndex={0}
        onItemClick={(index) => {
          if (index === 2) onProfileClick?.();
        }}
      />
      {profileTapVisible && (
        <div className="absolute bottom-4 right-[10%] z-30 w-[27%] h-14 pointer-events-none">
          <DemoAutoTap visible />
        </div>
      )}
    </div>
  );
}
