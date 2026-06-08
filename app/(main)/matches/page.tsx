"use client";

import { useEffect, useState } from "react";
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

export default function MatchesPage() {
  const [matches, setMatches] = useState<MatchItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [proposingMatchId, setProposingMatchId] = useState<string | null>(null);

  async function loadMatches() {
    setLoading(true);
    try {
      const res = await fetch("/api/matches");
      const data = await res.json();
      setMatches(data.matches ?? []);
    } catch {
      setMatches([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMatches();
  }, []);

  if (loading) {
    return (
      <main className="px-6 py-8 max-w-lg mx-auto">
        <p className="text-xl text-center text-foreground/70">불러오는 중...</p>
      </main>
    );
  }

  return (
    <main className="px-6 py-8 max-w-lg mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-primary">맞관심 매칭</h1>
        <p className="text-lg text-foreground/70 mt-2">
          서로 관심을 표현한 분들
        </p>
      </header>

      {matches.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-foreground/70">
            아직 매칭이 없습니다.
            <br />
            추천 탭에서 관심을 표현해 보세요!
          </p>
        </div>
      ) : (
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
      )}
    </main>
  );
}
