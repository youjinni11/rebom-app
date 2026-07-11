import { MatchingHomeScreen } from "@/components/matching/MatchingHomeScreen";
import { getCurrentUser } from "@/lib/auth-helpers";
import { getDailyRecommendations } from "@/lib/recommendations";
import { createServiceClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function MatchesPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const supabase = createServiceClient();
  const { data: myProfile } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (!myProfile?.is_complete) redirect("/profile");
  if (!myProfile?.values_complete) redirect("/values");
  if (!myProfile?.lifestyle_complete) redirect("/lifestyle");

  const { data: verification } = await supabase
    .from("verifications")
    .select("status")
    .eq("user_id", user.id)
    .eq("type", "marital")
    .maybeSingle();

  const maritalVerified = verification?.status === "approved";
  const profiles = maritalVerified
    ? await getDailyRecommendations(user.id)
    : [];

  return (
    <MatchingHomeScreen
      region={myProfile.region}
      initialProfiles={profiles}
      maritalVerified={maritalVerified}
    />
  );
}
