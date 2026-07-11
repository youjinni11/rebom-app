"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import type { Profile } from "@/types/database";
import { VerificationMedallions } from "@/components/matching/VerificationMedallions";
import { Button } from "@/components/ui/Button";
import { parseLifestyleData } from "@/lib/curation";

interface EnhancedProfileCardProps {
  profile: Profile;
  onSchedule?: () => void;
  onInterest?: () => void;
  interestLoading?: boolean;
  interestSent?: boolean;
  showScheduleCta?: boolean;
}

export function EnhancedProfileCard({
  profile,
  onSchedule,
  onInterest,
  interestLoading = false,
  interestSent = false,
  showScheduleCta = true,
}: EnhancedProfileCardProps) {
  const router = useRouter();
  const photoUrl =
    profile.photo_urls?.[0] ??
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400";

  const age = profile.birth_year
    ? new Date().getFullYear() - profile.birth_year
    : null;

  const lifestyleData = parseLifestyleData(profile.lifestyle_data);
  const hobbies = lifestyleData.activities.length > 0
    ? lifestyleData.activities
    : profile.bio
      ? [profile.bio.slice(0, 20)]
      : [];

  const badges = [
    { id: "education" as const, label: "학력", earned: true },
    { id: "income" as const, label: "소득", earned: true },
  ];

  return (
    <div className="bg-white border-2 border-border rounded-2xl p-3.5 shadow-sm">
      <div className="relative w-full h-40 rounded-xl overflow-hidden mb-2.5">
        <Image
          src={photoUrl}
          alt={profile.display_name}
          fill
          className="object-cover object-top"
          sizes="360px"
        />
      </div>

      <h3 className="text-xl font-bold text-primary">
        {profile.display_name}
        {age && (
          <span className="text-lg font-normal text-foreground/70"> · {age}세</span>
        )}
      </h3>
      <p className="text-base text-foreground/80 mt-0.5">📍 {profile.region}</p>

      {hobbies.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2.5">
          {hobbies.map((hobby) => (
            <span
              key={hobby}
              className="px-2.5 py-1 rounded-lg bg-primary-light text-primary text-sm font-bold border border-primary/15"
            >
              {hobby}
            </span>
          ))}
        </div>
      )}

      <div className="mt-3 pt-3 border-t border-border/80">
        <VerificationMedallions badges={badges} />

        <div className="mt-2.5 grid grid-cols-2 gap-2">
          <div className="rounded-xl bg-primary-light/60 border border-primary/10 px-3 py-2 text-center">
            <p className="text-[10px] font-extrabold tracking-wide text-primary/60 mb-0.5">
              학력
            </p>
            <p className="text-sm font-bold text-primary">4년제 졸업</p>
          </div>
          <div className="rounded-xl bg-primary-light/60 border border-primary/10 px-3 py-2 text-center">
            <p className="text-[10px] font-extrabold tracking-wide text-primary/60 mb-0.5">
              소득
            </p>
            <p className="text-sm font-bold text-primary">비공개</p>
          </div>
        </div>
      </div>

      {showScheduleCta && (
        <div className="mt-3">
          <Button
            fullWidth
            variant="primary"
            className="min-h-12 text-base font-bold"
            onClick={() => {
              onSchedule?.();
              router.push("/schedule");
            }}
          >
            편하신 시간을 알려주세요
          </Button>
        </div>
      )}

      {onInterest && (
        <div className="mt-2">
          <Button
            fullWidth
            onClick={onInterest}
            loading={interestLoading}
            disabled={interestSent}
            variant={interestSent ? "secondary" : "gold"}
            className="min-h-12 text-base font-bold"
          >
            {interestSent ? "관심 표시 완료" : "관심 있어요"}
          </Button>
        </div>
      )}
    </div>
  );
}
