"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

const GENDER_OPTIONS = [
  { value: "", label: "선택해 주세요" },
  { value: "male", label: "남성" },
  { value: "female", label: "여성" },
];

const AGE_RANGE_OPTIONS = [
  { value: "", label: "선택해 주세요" },
  { value: "50-54", label: "50–54세" },
  { value: "55-59", label: "55–59세" },
  { value: "60-64", label: "60–64세" },
  { value: "65-69", label: "65–69세" },
];

export default function PreRegisterPage() {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [ageRange, setAgeRange] = useState("");
  const [phone, setPhone] = useState("");
  const [consentRequired, setConsentRequired] = useState(false);
  const [consentMarketing, setConsentMarketing] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/pre-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          gender,
          ageRange,
          phone,
          consentRequired,
          consentMarketing,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "접수에 실패했습니다. 잠시 후 다시 시도해 주세요.");
        return;
      }

      setSubmitted(true);
    } catch {
      setError("네트워크 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-[#faf9f6] flex items-center justify-center px-6 py-16">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-full bg-teal-light flex items-center justify-center text-teal text-2xl">
            ✓
          </div>
          <h1 className="text-2xl font-semibold text-[#1a1a1a]">사전예약이 접수되었습니다</h1>
          <p className="text-[#666] leading-relaxed">
            리봄 정식 오픈 시 입력하신 연락처로
            <br />
            안내 문자를 보내드리겠습니다.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-3 bg-teal text-white font-medium hover:bg-teal-hover transition-colors"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf9f6]">
      <header className="border-b border-[#e8e6e1] bg-[#faf9f6]/90">
        <div className="max-w-lg mx-auto px-6 h-14 flex items-center justify-between">
          <Logo size="sm" />
          <Link href="/" className="text-sm text-[#888] hover:text-teal">
            홈으로
          </Link>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-6 py-12 space-y-8">
        <div className="text-center space-y-4">
          <p className="text-sm text-teal tracking-wide">정식 오픈 전 사전예약</p>
          <h1 className="text-2xl md:text-3xl font-semibold text-[#1a1a1a] leading-snug">
            리봄 사전예약 신청
          </h1>
          <p className="text-[#666] text-sm leading-relaxed">
            사전예약을 남겨주시면 오픈 소식을 가장 먼저 안내해 드립니다.
          </p>
        </div>

        <div className="bg-teal-light/50 border border-teal/20 px-5 py-4 text-sm text-[#555] leading-relaxed">
          <p className="font-medium text-teal mb-1">수집 목적 안내</p>
          <p>
            입력하신 정보는 리봄 서비스 오픈 안내 및 사전예약 확인 목적으로만
            사용됩니다. 연령대는 만 나이 기준 구간으로 수집합니다.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-[#e8e6e1] p-6 md:p-8 space-y-5"
        >
          <Input
            label="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="홍길동"
            required
            autoComplete="name"
          />

          <Select
            label="성별"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            options={GENDER_OPTIONS}
            required
          />

          <Select
            label="연령대"
            value={ageRange}
            onChange={(e) => setAgeRange(e.target.value)}
            options={AGE_RANGE_OPTIONS}
            required
          />

          <Input
            label="휴대폰 번호"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="010-1234-5678"
            required
            autoComplete="tel"
          />

          <div className="space-y-4 pt-2 border-t border-[#eee]">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={consentRequired}
                onChange={(e) => setConsentRequired(e.target.checked)}
                className="mt-1 w-5 h-5 accent-teal shrink-0"
                required
              />
              <span className="text-sm text-[#555] leading-relaxed">
                <span className="text-teal font-medium">[필수]</span> 개인정보 수집·이용에
                동의합니다.{" "}
                <Link href="/privacy" className="text-teal underline underline-offset-2">
                  처리방침 보기
                </Link>
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={consentMarketing}
                onChange={(e) => setConsentMarketing(e.target.checked)}
                className="mt-1 w-5 h-5 accent-teal shrink-0"
              />
              <span className="text-sm text-[#555] leading-relaxed">
                <span className="text-[#999]">[선택]</span> 오픈 안내·이벤트 소식을 문자(SMS)로
                받는 것에 동의합니다.
              </span>
            </label>
          </div>

          {error && (
            <p className="text-error text-base bg-red-50 border border-red-100 px-4 py-3">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full min-h-12 px-6 py-3 bg-teal text-white text-lg font-medium hover:bg-teal-hover transition-colors disabled:opacity-50"
          >
            {loading ? "접수 중..." : "사전예약 신청하기"}
          </button>
        </form>

        <p className="text-center text-xs text-[#999] leading-relaxed">
          문의: primesenior0530@gmail.com
          <br />
          사업자 정보는 정식 오픈 시 공개됩니다.
        </p>
      </div>
    </main>
  );
}
