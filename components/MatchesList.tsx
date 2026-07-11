"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import type { Profile } from "@/types/database";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { AppointmentForm } from "@/components/AppointmentForm";

interface MatchItem {
  id: string;
  partner: Profile;
  created_at: string;
}

interface MatchesListProps {
  refreshTrigger?: number;
  onCountChange?: (count: number) => void;
}

export function MatchesList({
  refreshTrigger = 0,
  onCountChange,
}: MatchesListProps) {
  const [matches, setMatches] = useState<MatchItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [proposingMatchId, setProposingMatchId] = useState<string | null>(null);

  const loadMatches = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/matches");
      const data = await res.json();
      const nextMatches = data.matches ?? [];
      setMatches(nextMatches);
      onCountChange?.(nextMatches.length);
    } catch {
      setMatches([]);
      onCountChange?.(0);
    } finally {
      setLoading(false);
    }
  }, [onCountChange]);

  useEffect(() => {
    loadMatches();
  }, [loadMatches, refreshTrigger]);

  if (loading) {
    return <p className="text-xl text-center text-foreground/70">불러오는 중...</p>;
  }

  if (matches.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-xl text-foreground/70">
          아직 매칭이 없습니다.
          <br />
          오늘의 추천에서 관심을 표현해 보세요!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {matches.map((match) => {
        const photoUrl =
          match.partner.photo_urls?.[0] ??
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400";

        return (
          <Card key={match.id}>
            {proposingMatchId === match.id ? (
              <AppointmentForm
                matchId={match.id}
                partnerName={match.partner.display_name}
                onSuccess={() => {
                  setProposingMatchId(null);
                  alert("만남 일정이 제안되었습니다! 일정 탭에서 확인하세요.");
                }}
                onCancel={() => setProposingMatchId(null)}
              />
            ) : (
              <div className="flex gap-4 items-center">
                <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                  <Image
                    src={photoUrl}
                    alt={match.partner.display_name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold">{match.partner.display_name}</h3>
                  <p className="text-lg text-foreground/70">📍 {match.partner.region}</p>
                </div>
                <Button onClick={() => setProposingMatchId(match.id)}>
                  만남 제안
                </Button>
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
}
