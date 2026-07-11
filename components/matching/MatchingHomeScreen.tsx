"use client";

import type { Profile } from "@/types/database";
import { EnhancedProfileCard } from "@/components/matching/EnhancedProfileCard";
import { MaritalRequiredOverlay } from "@/components/matching/MaritalRequiredOverlay";
import { VerificationBadge } from "@/components/matching/VerificationBadge";
import { VerificationPendingBadge } from "@/components/matching/VerificationPendingBadge";
import { useState } from "react";

interface MatchingHomeScreenProps {
  region: string;
  initialProfiles: Profile[];
  maritalVerified: boolean;
}

export function MatchingHomeScreen({
  region,
  initialProfiles,
  maritalVerified,
}: MatchingHomeScreenProps) {
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
        setMatchMessage("🎉 맞관심 매칭이 성사되었습니다!");
      }
    } catch {
      alert("네트워크 오류가 발생했습니다.");
    } finally {
      setLoadingId(null);
    }
  }

  return (
    <main className="px-5 py-6 pb-28 max-w-lg mx-auto">
      <header className="mb-4">
        <h1 className="text-2xl font-bold text-primary">매칭</h1>
      </header>

      {maritalVerified ? <VerificationBadge /> : <VerificationPendingBadge />}

      {!maritalVerified ? (
        <section className="mt-5">
          <MaritalRequiredOverlay region={region} />
        </section>
      ) : (
        <section className="mt-5">
          <header className="mb-4 pb-3 border-b border-border">
            <p className="text-primary text-xs font-semibold tracking-widest uppercase mb-1.5 opacity-80">
              Today&apos;s Pick
            </p>
            <h2 className="text-xl font-bold text-primary">오늘의 추천</h2>
            <p className="text-base text-foreground/65 mt-1">{region}</p>
          </header>

          {matchMessage && (
            <div className="bg-success/10 border border-success text-success rounded-xl p-4 text-base mb-4">
              {matchMessage}
            </div>
          )}

          {profiles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-foreground/70">
                오늘의 추천이 없습니다.
                <br />
                내일 다시 확인해 주세요.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {profiles.map((profile) => (
                <EnhancedProfileCard
                  key={profile.user_id}
                  profile={profile}
                  onInterest={() => handleInterest(profile.user_id)}
                  interestLoading={loadingId === profile.user_id}
                  interestSent={sentIds.has(profile.user_id)}
                />
              ))}
            </div>
          )}
        </section>
      )}
    </main>
  );
}
