import { RecommendationList } from "@/components/RecommendationList";
import { getCurrentUser } from "@/lib/auth-helpers";
import { getDailyRecommendations } from "@/lib/recommendations";
import { createServiceClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const supabase = createServiceClient();
  const { data: myProfile } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (!myProfile?.is_complete) redirect("/profile");

  const profiles = await getDailyRecommendations(user.id);

  return (
    <main className="px-6 py-8 max-w-lg mx-auto">
      <header className="mb-8 pb-6 border-b border-border">
        <p className="text-gold text-sm font-semibold tracking-widest uppercase mb-2">
          Today&apos;s Pick
        </p>
        <h1 className="text-3xl font-bold text-primary">오늘의 추천</h1>
        <p className="text-lg text-foreground/65 mt-2">
          {myProfile.region} · 하루 1명
        </p>
      </header>

      <RecommendationList initialProfiles={profiles} />
    </main>
  );
}
