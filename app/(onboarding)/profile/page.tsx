"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Card } from "@/components/ui/Card";
import { DEFAULT_REGION, REGIONS } from "@/lib/regions";

export default function ProfilePage() {
  const router = useRouter();
  const supabase = createClient();

  const [displayName, setDisplayName] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [gender, setGender] = useState("");
  const [region, setRegion] = useState(DEFAULT_REGION);
  const [bio, setBio] = useState("");
  const [phone, setPhone] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []).slice(0, 3);
    setPhotos(files);
    setPhotoPreviews(files.map((f) => URL.createObjectURL(f)));
  }

  async function uploadPhotos(userId: string): Promise<string[]> {
    const urls: string[] = [];

    for (let i = 0; i < photos.length; i++) {
      const file = photos[i];
      const ext = file.name.split(".").pop() ?? "jpg";
      const path = `${userId}/${Date.now()}-${i}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("profile-photos")
        .upload(path, file, { upsert: true });

      if (uploadError) {
        throw new Error(`사진 업로드 실패: ${uploadError.message}`);
      }

      const { data } = supabase.storage.from("profile-photos").getPublicUrl(path);
      urls.push(data.publicUrl);
    }

    return urls;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!displayName.trim()) {
      setError("닉네임을 입력해 주세요.");
      return;
    }

    if (!birthYear || !gender) {
      setError("출생연도와 성별을 선택해 주세요.");
      return;
    }

    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setError("로그인이 필요합니다.");
        setLoading(false);
        return;
      }

      let photoUrls: string[] = [];
      if (photos.length > 0) {
        photoUrls = await uploadPhotos(user.id);
      }

      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          display_name: displayName.trim(),
          birth_year: parseInt(birthYear, 10),
          gender,
          region,
          bio: bio.trim() || null,
          phone: phone.trim() || null,
          photo_urls: photoUrls,
          is_complete: true,
        })
        .eq("user_id", user.id);

      if (updateError) {
        setError(updateError.message);
        setLoading(false);
        return;
      }

      router.push("/home");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "프로필 저장에 실패했습니다.");
      setLoading(false);
    }
  }

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 50 }, (_, i) => {
    const year = currentYear - 50 - i;
    return { value: String(year), label: `${year}년` };
  });

  return (
    <main className="min-h-screen px-6 py-12 pb-24 bg-background">
      <div className="max-w-md mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary">프로필 등록</h1>
          <p className="text-lg text-foreground/70 mt-2">
            나를 소개해 주세요
          </p>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-3">
              <label className="text-lg font-medium">프로필 사진 (최대 3장)</label>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                onChange={handlePhotoChange}
                className="text-lg w-full"
              />
              {photoPreviews.length > 0 && (
                <div className="flex gap-3 flex-wrap">
                  {photoPreviews.map((src, i) => (
                    <div key={i} className="relative w-24 h-24 rounded-xl overflow-hidden">
                      <Image src={src} alt={`미리보기 ${i + 1}`} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Input
              label="닉네임 (표시 이름)"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="예: 미영"
              required
            />

            <Select
              label="출생연도"
              value={birthYear}
              onChange={(e) => setBirthYear(e.target.value)}
              options={[{ value: "", label: "선택" }, ...yearOptions]}
              required
            />

            <Select
              label="성별"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              options={[
                { value: "", label: "선택" },
                { value: "male", label: "남성" },
                { value: "female", label: "여성" },
              ]}
              required
            />

            <Select
              label="지역"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              options={REGIONS.map((r) => ({ value: r, label: r }))}
            />

            <Textarea
              label="자기소개"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="취미, 관심사, 원하는 만남 등을 적어주세요"
            />

            <Input
              label="연락처"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="010-0000-0000"
            />

            {error && <p className="text-error text-lg">{error}</p>}

            <Button type="submit" fullWidth loading={loading}>
              프로필 완료
            </Button>
          </form>
        </Card>
      </div>
    </main>
  );
}
