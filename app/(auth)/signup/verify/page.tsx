"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Card } from "@/components/ui/Card";

export default function VerifyPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!/^\d{6}$/.test(birthDate)) {
      setError("생년월일은 6자리(YYMMDD)로 입력해 주세요.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/verification/marital", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          birthDate,
          gender: gender || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "인증에 실패했습니다.");
        setLoading(false);
        return;
      }

      if (!data.approved) {
        setError(data.message ?? "혼인 기록이 확인되어 가입이 제한됩니다.");
        setLoading(false);
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/profile");
        router.refresh();
      }, 1500);
    } catch {
      setError("네트워크 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-12 bg-background">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold text-primary">미혼 인증</h1>
          <p className="text-lg text-foreground/70">
            가족관계등록부 기반 미혼 확인
          </p>
          <span className="inline-block bg-secondary/30 text-primary px-4 py-2 rounded-full text-base font-medium">
            🧪 테스트 데이터로 검증됩니다 (샌드박스)
          </span>
        </div>

        <Card>
          {success ? (
            <div className="text-center py-8 space-y-4">
              <p className="text-2xl">✅</p>
              <p className="text-xl font-semibold text-success">
                미혼 인증이 완료되었습니다!
              </p>
              <p className="text-lg text-foreground/70">프로필 등록으로 이동합니다...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="실명"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="홍길동"
                required
              />
              <Input
                label="생년월일 (6자리)"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder="예: 650315"
                inputMode="numeric"
                required
              />
              <Select
                label="성별 (선택)"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                options={[
                  { value: "", label: "선택 안 함" },
                  { value: "male", label: "남성" },
                  { value: "female", label: "여성" },
                ]}
              />
              {error && <p className="text-error text-lg">{error}</p>}
              <Button type="submit" fullWidth loading={loading}>
                미혼 인증하기
              </Button>
            </form>
          )}
        </Card>
      </div>
    </main>
  );
}
