import { createServiceClient } from "@/lib/supabase/server";
import type { Profile } from "@/types/database";

export async function getDailyRecommendations(userId: string): Promise<Profile[]> {
  const supabase = createServiceClient();
  const today = new Date().toISOString().split("T")[0];

  const { data: myProfile } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (!myProfile?.is_complete) return [];

  const { data: existing } = await supabase
    .from("daily_recommendations")
    .select("candidate_id")
    .eq("user_id", userId)
    .eq("recommend_date", today);

  const candidateIds = [...(existing?.map((r) => r.candidate_id) ?? [])];

  if (candidateIds.length < 1) {
    const { data: candidates } = await supabase
      .from("profiles")
      .select("*")
      .eq("is_complete", true)
      .eq("region", myProfile.region)
      .neq("user_id", userId);

    const { data: alreadyInterested } = await supabase
      .from("interests")
      .select("to_user_id")
      .eq("from_user_id", userId);

    const excludeIds = new Set([
      ...candidateIds,
      ...(alreadyInterested?.map((i) => i.to_user_id) ?? []),
      userId,
    ]);

    const approvedCandidates: Profile[] = [];

    for (const c of candidates ?? []) {
      if (excludeIds.has(c.user_id)) continue;

      const { data: v } = await supabase
        .from("verifications")
        .select("status")
        .eq("user_id", c.user_id)
        .eq("type", "marital")
        .maybeSingle();

      if (v?.status === "approved") {
        approvedCandidates.push(c as Profile);
      }
    }

    const needed = 1 - candidateIds.length;
    const newCandidates = approvedCandidates.slice(0, needed);

    for (const candidate of newCandidates) {
      await supabase.from("daily_recommendations").upsert({
        user_id: userId,
        candidate_id: candidate.user_id,
        recommend_date: today,
      });
      candidateIds.push(candidate.user_id);
    }
  }

  if (candidateIds.length === 0) return [];

  const { data: profiles } = await supabase
    .from("profiles")
    .select("*")
    .in("user_id", candidateIds.slice(0, 1));

  return (profiles ?? []) as Profile[];
}
