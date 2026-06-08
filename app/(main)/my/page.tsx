"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import type { Profile } from "@/types/database";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Card } from "@/components/ui/Card";
import { REGIONS } from "@/lib/regions";

export default function MyPage() {
  const router = useRouter();
  const supabase = createClient();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function load() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

      setProfile(data as Profile);
      setLoading(false);
    }
    load();
  }, [supabase]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!profile) return;

    setSaving(true);
    setMessage("");

    const { error } = await supabase
      .from("profiles")
      .update({
        display_name: profile.display_name,
        region: profile.region,
        bio: profile.bio,
        phone: profile.phone,
      })
      .eq("user_id", profile.user_id);

    if (error) {
      setMessage("저장에 실패했습니다.");
    } else {
      setMessage("저장되었습니다.");
    }
    setSaving(false);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  if (loading || !profile) {
    return (
      <main className="px-6 py-8 max-w-lg mx-auto">
        <p className="text-xl text-center">불러오는 중...</p>
      </main>
    );
  }

  const photoUrl =
    profile.photo_urls?.[0] ??
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400";

  return (
    <main className="px-6 py-8 max-w-lg mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-primary">내 정보</h1>
      </header>

      <Card className="space-y-5">
        <div className="relative w-32 h-32 mx-auto rounded-2xl overflow-hidden">
          <Image src={photoUrl} alt={profile.display_name} fill className="object-cover" />
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <Input
            label="닉네임"
            value={profile.display_name}
            onChange={(e) =>
              setProfile({ ...profile, display_name: e.target.value })
            }
          />

          <Select
            label="지역"
            value={profile.region}
            onChange={(e) => setProfile({ ...profile, region: e.target.value })}
            options={REGIONS.map((r) => ({ value: r, label: r }))}
          />

          <Textarea
            label="자기소개"
            value={profile.bio ?? ""}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
          />

          <Input
            label="연락처"
            type="tel"
            value={profile.phone ?? ""}
            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
          />

          {message && (
            <p className={`text-lg ${message.includes("실패") ? "text-error" : "text-success"}`}>
              {message}
            </p>
          )}

          <Button type="submit" fullWidth loading={saving}>
            저장
          </Button>
        </form>

        <Button variant="outline" fullWidth onClick={handleLogout}>
          로그아웃
        </Button>
      </Card>
    </main>
  );
}
