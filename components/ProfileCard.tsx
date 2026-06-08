"use client";

import Image from "next/image";
import type { Profile } from "@/types/database";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

interface ProfileCardProps {
  profile: Profile;
  onInterest?: () => void;
  interestLoading?: boolean;
  showInterestButton?: boolean;
  interestSent?: boolean;
}

export function ProfileCard({
  profile,
  onInterest,
  interestLoading = false,
  showInterestButton = true,
  interestSent = false,
}: ProfileCardProps) {
  const photoUrl =
    profile.photo_urls?.[0] ??
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400";

  const age = profile.birth_year
    ? new Date().getFullYear() - profile.birth_year
    : null;

  return (
    <Card className="overflow-hidden ring-1 ring-border/80">
      <div className="relative w-full h-72 rounded-2xl overflow-hidden mb-5">
        <Image
          src={photoUrl}
          alt={profile.display_name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 400px"
        />
      </div>
      <div className="space-y-2">
        <h3 className="text-2xl font-bold text-primary">
          {profile.display_name}
          {age && <span className="text-xl font-normal text-foreground/70"> · {age}세</span>}
        </h3>
        <p className="text-lg text-foreground/80">📍 {profile.region}</p>
        {profile.bio && (
          <p className="text-lg text-foreground/70 leading-relaxed">{profile.bio}</p>
        )}
      </div>
      {showInterestButton && onInterest && (
        <div className="mt-6">
          <Button
            fullWidth
            onClick={onInterest}
            loading={interestLoading}
            disabled={interestSent}
            variant={interestSent ? "secondary" : "gold"}
          >
            {interestSent ? "관심 표시 완료" : "관심 있어요"}
          </Button>
        </div>
      )}
    </Card>
  );
}
