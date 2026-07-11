"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import {
  allRequiredConsentsChecked,
  VerificationConsentChecklist,
} from "@/components/consent/VerificationConsentChecklist";
import {
  CertificateIcon,
  CheckCircleIcon,
  FaceIcon,
  PhoneIcon,
} from "@/components/demo/DemoIcons";
import { DemoProgressDots } from "@/components/demo/DemoProgressDots";
import { VERIFICATION_CONSENT_HEADING } from "@/lib/demo/verification-consent";
import { VERIFICATION_CONSENT_ITEMS } from "@/lib/demo/verification-consent";

const STEP_COUNT = 8;

function StepBadge({ step, label }: { step: number; label: string }) {
  return (
    <div className="text-center space-y-2 mb-4">
      <p className="text-base font-extrabold tracking-[0.2em] text-primary">
        STEP {step}
      </p>
      <h2 className="font-sans text-3xl font-black text-foreground leading-tight">
        {label}
      </h2>
    </div>
  );
}

function DataRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-border last:border-0">
      <span className="text-xl font-semibold text-foreground/75">{label}</span>
      <span className="text-2xl font-black text-foreground">{value}</span>
    </div>
  );
}

export function VerificationFlow() {
  const router = useRouter();
  const supabase = createClient();

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [consents, setConsents] = useState<Record<string, boolean>>({});
  const [phone, setPhone] = useState("");
  const [verifiedAge, setVerifiedAge] = useState("");
  const [verifiedGender, setVerifiedGender] = useState("");

  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");

  function toggleConsent(id: string) {
    setConsents((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function toggleAllConsents() {
    const allChecked = allRequiredConsentsChecked(consents) && consents.marketing;
    if (allChecked) {
      setConsents({});
    } else {
      const next: Record<string, boolean> = {};
      VERIFICATION_CONSENT_ITEMS.forEach((item) => {
        next[item.id] = true;
      });
      setConsents(next);
    }
  }

  async function savePhoneVerification() {
    setLoading(true);
    setError("");
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("로그인이 필요합니다.");

      const now = new Date().toISOString();
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          phone: phone.trim(),
          phone_verified_at: now,
        })
        .eq("user_id", user.id);

      if (updateError) throw updateError;

      const age = "58세";
      const gen = "남성";
      setVerifiedAge(age);
      setVerifiedGender(gen);
      setStep(2);
    } catch (err) {
      setError(err instanceof Error ? err.message : "인증에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  }

  async function saveFaceVerification() {
    setLoading(true);
    setError("");
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("로그인이 필요합니다.");

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ face_verified_at: new Date().toISOString() })
        .eq("user_id", user.id);

      if (updateError) throw updateError;
      setStep(4);
    } catch (err) {
      setError(err instanceof Error ? err.message : "인증에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  }

  const [maritalDone, setMaritalDone] = useState(false);

  async function submitMaritalVerification() {
    setLoading(true);
    setError("");

    if (!/^\d{6}$/.test(birthDate)) {
      setError("생년월일은 6자리(YYMMDD)로 입력해 주세요.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/verification/marital", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, birthDate, gender: gender || undefined }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "인증에 실패했습니다.");
        return;
      }

      if (!data.approved) {
        setError(data.message ?? "혼인 기록이 확인되어 가입이 제한됩니다.");
        return;
      }

      setMaritalDone(true);
      setStep(7);
    } catch {
      setError("네트워크 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }

  async function deferMarital() {
    setLoading(true);
    setError("");
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("로그인이 필요합니다.");

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ marital_deferred: true })
        .eq("user_id", user.id);

      if (updateError) throw updateError;
      setMaritalDone(false);
      setStep(6);
    } catch (err) {
      setError(err instanceof Error ? err.message : "저장에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  }

  function finishVerification() {
    router.push("/profile");
    router.refresh();
  }

  return (
    <div className="relative min-h-dvh max-w-lg mx-auto bg-background flex flex-col">
      <div className="flex-1 px-5 pt-6 pb-16 overflow-y-auto">
        {step === 0 && (
          <div className="space-y-4">
            <div className="text-center space-y-2">
              <h2 className="font-sans text-3xl font-black text-foreground leading-tight">
                {VERIFICATION_CONSENT_HEADING.title}
              </h2>
              <p className="text-lg font-bold text-foreground/70 leading-snug">
                {VERIFICATION_CONSENT_HEADING.subtitle}
              </p>
            </div>
            <VerificationConsentChecklist
              checked={consents}
              onToggle={toggleConsent}
              onToggleAll={toggleAllConsents}
            />
            {error && <p className="text-error text-base">{error}</p>}
            <Button
              fullWidth
              className="min-h-14 text-xl font-black"
              disabled={!allRequiredConsentsChecked(consents)}
              onClick={() => setStep(1)}
            >
              {VERIFICATION_CONSENT_HEADING.cta}
            </Button>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-6">
            <StepBadge step={1} label="전화번호 본인인증" />
            <div className="w-20 h-20 mx-auto rounded-full bg-primary-light flex items-center justify-center text-primary">
              <PhoneIcon className="w-14 h-14" />
            </div>
            <p className="text-center text-xl font-bold text-foreground/90 leading-snug">
              휴대폰 번호로 본인을 확인하고
              <br />
              기본 정보를 안전하게 가져옵니다
            </p>
            <Input
              label="휴대폰 번호"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="010-0000-0000"
            />
            <span className="inline-block bg-secondary/30 text-primary px-3 py-1.5 rounded-full text-sm font-medium">
              🧪 MVP: 번호 입력 후 바로 인증됩니다
            </span>
            {error && <p className="text-error text-base">{error}</p>}
            <Button
              fullWidth
              loading={loading}
              disabled={phone.trim().length < 10}
              onClick={savePhoneVerification}
              className="min-h-14 text-xl font-bold"
            >
              본인인증 하기
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <StepBadge step={1} label="본인인증 완료" />
            <div className="bg-white border-2 border-primary/20 rounded-2xl px-5 py-2 shadow-sm">
              <DataRow label="나이" value={verifiedAge} />
              <DataRow label="성별" value={verifiedGender} />
              <DataRow label="국적" value="대한민국" />
            </div>
            <p className="text-center text-lg font-bold text-foreground/80 leading-snug">
              통신사 인증을 통해 확인된 정보입니다
            </p>
            <Button fullWidth onClick={() => setStep(3)} className="min-h-14 text-xl font-bold">
              다음
            </Button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <StepBadge step={2} label="얼굴 인증" />
            <p className="text-center text-xl font-bold text-foreground/90 leading-snug">
              실제 본인 여부를 확인하기 위해
              <br />
              얼굴을 촬영합니다
            </p>
            <div className="relative mx-auto w-56 h-72 rounded-[2rem] border-4 border-primary/30 bg-[#1a2522] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-primary/10" />
              <div className="absolute inset-x-6 top-14 bottom-20 border-2 border-dashed border-white/40 rounded-[50%]" />
              <div className="absolute inset-0 flex items-center justify-center text-white/25">
                <FaceIcon className="w-24 h-24" />
              </div>
              <p className="absolute bottom-4 left-0 right-0 text-center text-lg font-bold text-white">
                얼굴을 원 안에 맞춰 주세요
              </p>
            </div>
            {error && <p className="text-error text-base">{error}</p>}
            <Button
              fullWidth
              loading={loading}
              onClick={saveFaceVerification}
              className="min-h-14 text-xl font-bold"
            >
              얼굴 촬영하기
            </Button>
          </div>
        )}

        {step === 4 && (
          <div className="flex flex-col items-center justify-center text-center space-y-5 py-8">
            <StepBadge step={2} label="얼굴 인증 완료" />
            <div className="w-28 h-28 rounded-full bg-primary-light flex items-center justify-center text-primary">
              <CheckCircleIcon className="w-20 h-20" />
            </div>
            <p className="text-3xl font-black text-foreground">얼굴 인증 완료</p>
            <Button fullWidth onClick={() => setStep(5)} className="min-h-14 text-xl font-bold">
              다음
            </Button>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-5">
            <StepBadge step={3} label="미혼 상태 인증" />
            <div className="w-20 h-20 mx-auto rounded-full bg-primary-light flex items-center justify-center text-primary">
              <CertificateIcon className="w-14 h-14" />
            </div>
            <p className="text-center text-xl font-bold text-foreground/90 leading-snug">
              혼인관계증명서(일반)으로
              <br />
              미혼 상태를 확인합니다
            </p>
            <Input
              label="실명"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="홍길동"
            />
            <Input
              label="생년월일 (6자리)"
              value={birthDate}
              onChange={(e) =>
                setBirthDate(e.target.value.replace(/\D/g, "").slice(0, 6))
              }
              placeholder="예: 650315"
              inputMode="numeric"
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
            {error && <p className="text-error text-base">{error}</p>}
            <Button
              fullWidth
              loading={loading}
              onClick={submitMaritalVerification}
              className="min-h-14 text-xl font-bold"
            >
              미혼 인증하기
            </Button>
            <Button
              fullWidth
              variant="outline"
              loading={loading}
              onClick={deferMarital}
              className="min-h-14 text-xl font-bold border-2"
            >
              나중에 하기
            </Button>
          </div>
        )}

        {step === 6 && (
          <div className="space-y-6 py-4">
            <StepBadge step={3} label="미혼 상태 인증" />
            <div className="w-24 h-24 mx-auto rounded-full bg-primary-light flex items-center justify-center text-primary">
              <CertificateIcon className="w-16 h-16" />
            </div>
            <div className="space-y-4 text-center">
              <p className="text-2xl font-black text-foreground leading-snug">
                나중에 인증하기를
                <br />
                선택하셨습니다
              </p>
              <div className="bg-white border-2 border-primary/20 rounded-2xl px-5 py-5">
                <p className="text-lg font-bold text-foreground/90 leading-relaxed">
                  <span className="text-primary">미혼 상태 인증</span>을 해야만
                  <br />
                  매칭 서비스를 이용할 수 있습니다.
                </p>
              </div>
            </div>
            <Button fullWidth onClick={() => setStep(7)} className="min-h-14 text-xl font-bold">
              다음
            </Button>
          </div>
        )}

        {step === 7 && (
          <div className="flex flex-col items-center text-center space-y-6 py-4">
            <div className="w-28 h-28 rounded-full bg-primary-light flex items-center justify-center text-primary">
              <CheckCircleIcon className="w-20 h-20" />
            </div>
            <div className="space-y-3">
              <p className="text-base font-extrabold tracking-[0.2em] text-primary">
                {maritalDone ? "3 OF 3 COMPLETE" : "2 OF 3 COMPLETE"}
              </p>
              <h2 className="font-sans text-4xl font-black text-foreground leading-tight">
                3단계 중
                <br />
                {maritalDone ? "3단계 완료" : "2단계 완료"}
              </h2>
              <p className="text-xl font-bold text-foreground/90 leading-snug">
                {maritalDone ? (
                  "모든 인증이 완료되었습니다"
                ) : (
                  <>
                    전화번호 · 얼굴 인증을
                    <br />
                    완료했습니다
                  </>
                )}
              </p>
              {!maritalDone && (
                <p className="text-lg font-bold text-foreground/65 leading-snug">
                  미혼 상태 인증은 아직 남아 있습니다
                </p>
              )}
            </div>
            <div className="w-full grid grid-cols-3 gap-2">
              {[
                { label: "본인인증", done: true },
                { label: "미혼인증", done: maritalDone },
                { label: "얼굴인증", done: true },
              ].map(({ label, done }) => (
                <div
                  key={label}
                  className={`rounded-xl py-4 px-1 border text-center ${
                    done
                      ? "bg-primary-light border-primary/15"
                      : "bg-muted border-border"
                  }`}
                >
                  <p
                    className={`text-lg font-black mb-1.5 ${
                      done ? "text-primary" : "text-foreground/35"
                    }`}
                  >
                    {done ? "✓" : "—"}
                  </p>
                  <p
                    className={`text-sm font-bold ${
                      done ? "text-foreground" : "text-foreground/50"
                    }`}
                  >
                    {label}
                  </p>
                </div>
              ))}
            </div>
            <Button
              fullWidth
              onClick={finishVerification}
              className="min-h-16 text-2xl font-black"
            >
              서비스 둘러보기
            </Button>
          </div>
        )}
      </div>

      <div className="absolute bottom-4 left-0 right-0">
        <DemoProgressDots total={STEP_COUNT} current={step} />
      </div>
    </div>
  );
}
