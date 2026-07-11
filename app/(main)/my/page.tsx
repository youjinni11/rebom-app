"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Profile } from "@/types/database";
import { ProfileHomeScreen } from "@/components/profile/ProfileHomeScreen";

export default function MyPage() {
  const supabase = createClient();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [maritalVerified, setMaritalVerified] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

      const { data: verification } = await supabase
        .from("verifications")
        .select("status")
        .eq("user_id", user.id)
        .eq("type", "marital")
        .maybeSingle();

      setProfile(profileData as Profile);
      setMaritalVerified(verification?.status === "approved");
      setLoading(false);
    }
    load();
  }, [supabase]);

  if (loading || !profile) {
    return (
      <main className="px-6 py-8 max-w-lg mx-auto">
        <p className="text-xl text-center">불러오는 중...</p>
      </main>
    );
  }

  return <ProfileHomeScreen profile={profile} maritalVerified={maritalVerified} />;
}
