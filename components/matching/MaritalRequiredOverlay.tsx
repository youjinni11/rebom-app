"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const PLACEHOLDER_CANDIDATE = {
  name: "추천 회원",
  age: 55,
  region: "서울",
  bio: "미혼 인증 후 프로필이 공개됩니다.",
  photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400",
};

export function MaritalRequiredOverlay({ region }: { region: string }) {
  return (
    <div className="space-y-3">
      <div className="bg-primary-light border-2 border-primary/25 rounded-2xl px-4 py-3">
        <p className="text-sm font-extrabold text-primary leading-snug">
          미혼 상태 인증이 완료되지 않았습니다
        </p>
        <p className="text-sm font-semibold text-foreground/75 mt-1 leading-snug">
          인증을 완료해야 매칭 서비스를 이용할 수 있습니다
        </p>
      </div>

      <div className="relative">
        <div
          className="flex flex-col blur-[6px] opacity-55 select-none pointer-events-none"
          aria-hidden
        >
          <div className="mb-3 pb-3 border-b border-border">
            <p className="text-primary text-xs font-semibold tracking-widest uppercase mb-1.5 opacity-80">
              Today&apos;s Pick
            </p>
            <h2 className="text-xl font-bold text-primary">오늘의 추천</h2>
            <p className="text-base text-foreground/65 mt-1">{region}</p>
          </div>

          <div className="bg-white border-2 border-border rounded-2xl p-4 shadow-sm">
            <div className="relative w-full h-44 rounded-xl overflow-hidden mb-3">
              <Image
                src={PLACEHOLDER_CANDIDATE.photo}
                alt=""
                fill
                className="object-cover"
                sizes="360px"
              />
            </div>
            <h3 className="text-xl font-bold text-primary">
              {PLACEHOLDER_CANDIDATE.name}
              <span className="text-lg font-normal text-foreground/70">
                {" "}
                · {PLACEHOLDER_CANDIDATE.age}세
              </span>
            </h3>
            <p className="text-base text-foreground/80 mt-1">
              📍 {PLACEHOLDER_CANDIDATE.region}
            </p>
            <div className="mt-4">
              <Button fullWidth variant="primary" className="min-h-12 text-lg font-bold">
                관심 있어요
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center px-3 z-10">
          <div className="bg-primary-light/95 border-2 border-primary/30 rounded-2xl px-5 py-5 shadow-lg text-center space-y-3">
            <p className="text-lg font-extrabold text-primary leading-snug">
              미혼 상태 인증이 완료된 회원만
              <br />
              정식으로 매칭서비스 이용이 가능합니다
            </p>
            <Link href="/signup/verify">
              <Button fullWidth className="min-h-12 text-base font-bold">
                미혼 인증하러 가기
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
