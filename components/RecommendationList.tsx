"use client";

import { useState } from "react";
import type { Profile } from "@/types/database";
import { ProfileCard } from "@/components/ProfileCard";

interface RecommendationListProps {
  initialProfiles: Profile[];
  compact?: boolean;
  onMatched?: () => void;
}

export function RecommendationList({
  initialProfiles,
  compact = false,
  onMatched,
}: RecommendationListProps) {
  const [profiles] = useState(initialProfiles);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [sentIds, setSentIds] = useState<Set<string>>(new Set());
  const [matchMessage, setMatchMessage] = useState<string | null>(null);

  async function handleInterest(candidateId: string) {
    setLoadingId(candidateId);
    setMatchMessage(null);

    try {
      const res = await fetch("/api/interests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ toUserId: candidateId }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error ?? "관심 표시에 실패했습니다.");
        return;
      }

      setSentIds((prev) => new Set(prev).add(candidateId));

      if (data.matched) {
        setMatchMessage("🎉 맞관심 매칭이 성사되었습니다! 맞관심 탭에서 확인하세요.");
        onMatched?.();
      }
    } catch {
      alert("네트워크 오류가 발생했습니다.");
    } finally {
      setLoadingId(null);
    }
  }

  if (profiles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-foreground/70">
          오늘의 추천이 없습니다.
          <br />
          내일 다시 확인해 주세요.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {matchMessage && (
        <div className="bg-success/10 border border-success text-success rounded-xl p-4 text-lg">
          {matchMessage}
        </div>
      )}
      {profiles.map((profile) => (
        <ProfileCard
          key={profile.user_id}
          profile={profile}
          compact={compact}
          onInterest={() => handleInterest(profile.user_id)}
          interestLoading={loadingId === profile.user_id}
          interestSent={sentIds.has(profile.user_id)}
        />
      ))}
    </div>
  );
}
