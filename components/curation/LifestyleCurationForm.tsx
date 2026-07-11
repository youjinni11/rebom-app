"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  CurationChipGrid,
  toggleSelection,
} from "@/components/curation/CurationChipGrid";
import {
  DRINKING_CHIPS,
  FAMILY_CHIPS,
  LIFESTYLE_CHIPS,
  SELF_CARE_CHIPS,
  SMOKING_CHIPS,
} from "@/components/demo/curation-chips";
import {
  CheckCircleIcon,
  CompassIcon,
  HeartIcon,
  SproutIcon,
} from "@/components/demo/DemoIcons";
import { DemoProgressDots } from "@/components/demo/DemoProgressDots";
import { Button } from "@/components/ui/Button";
import { selectionsToLifestyleData } from "@/lib/curation";

const STEP_COUNT = 5;
const STEP_TOTAL = 4;

const HONESTY_HINT = (
  <>
    정확하고 솔직하게 응답할수록
    <br />
    회원님께 더욱 잘 맞는 상대를 추천해드릴 수 있어요
  </>
);

function StepBadge({ step, label }: { step: number; label: string }) {
  return (
    <div className="text-center space-y-1.5 mb-4">
      <p className="text-base font-extrabold tracking-[0.2em] text-primary">
        STEP {step} / {STEP_TOTAL}
      </p>
      <h2 className="font-sans text-3xl font-black text-foreground leading-tight">
        {label}
      </h2>
      <p className="text-center text-lg font-bold text-foreground/90 leading-snug px-1">
        {HONESTY_HINT}
      </p>
    </div>
  );
}

function HabitsSection({
  title,
  chips,
  selected,
  onToggle,
}: {
  title: string;
  chips: readonly string[];
  selected: number[];
  onToggle: (index: number) => void;
}) {
  return (
    <div className="space-y-2">
      <p className="text-center text-base font-bold text-primary">{title}</p>
      <CurationChipGrid
        chips={chips}
        selected={selected}
        onToggle={onToggle}
        compact
        multi={false}
      />
    </div>
  );
}

export function LifestyleCurationForm() {
  const router = useRouter();
  const supabase = createClient();

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [lifestyle, setLifestyle] = useState<number[]>([]);
  const [family, setFamily] = useState<number[]>([]);
  const [selfCare, setSelfCare] = useState<number[]>([]);
  const [drinking, setDrinking] = useState<number[]>([]);
  const [smoking, setSmoking] = useState<number[]>([]);

  async function handleComplete() {
    setLoading(true);
    setError("");
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("로그인이 필요합니다.");

      const lifestyleData = selectionsToLifestyleData({
        lifestyle,
        family,
        selfCare,
        drinking,
        smoking,
      });

      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          lifestyle_data: lifestyleData,
          lifestyle_complete: true,
        })
        .eq("user_id", user.id);

      if (updateError) throw updateError;
      setStep(4);
    } catch (err) {
      setError(err instanceof Error ? err.message : "저장에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-dvh max-w-lg mx-auto bg-background flex flex-col">
      <div className="flex-1 px-5 pt-8 pb-16 overflow-y-auto">
        {step === 0 && (
          <div className="space-y-5">
            <StepBadge step={1} label="라이프스타일" />
            <div className="w-14 h-14 mx-auto rounded-full bg-primary-light flex items-center justify-center text-primary">
              <CompassIcon className="w-10 h-10" />
            </div>
            <p className="text-center text-xl font-bold text-foreground/90 leading-snug">
              평소 어떤 시간을
              <br />
              보내시나요?
            </p>
            <CurationChipGrid
              chips={LIFESTYLE_CHIPS}
              selected={lifestyle}
              onToggle={(i) => setLifestyle((prev) => toggleSelection(prev, i))}
            />
            <Button
              fullWidth
              disabled={lifestyle.length === 0}
              onClick={() => setStep(1)}
              className="min-h-14 text-xl font-bold"
            >
              다음
            </Button>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-5">
            <StepBadge step={2} label="가족관계" />
            <div className="w-14 h-14 mx-auto rounded-full bg-primary-light flex items-center justify-center text-primary">
              <HeartIcon className="w-10 h-10" />
            </div>
            <p className="text-center text-xl font-bold text-foreground/90 leading-snug">
              현재 가족·생활 형태는
              <br />
              어떠신가요?
            </p>
            <CurationChipGrid
              chips={FAMILY_CHIPS}
              selected={family}
              onToggle={(i) => setFamily((prev) => toggleSelection(prev, i))}
              compact
            />
            <Button
              fullWidth
              disabled={family.length === 0}
              onClick={() => setStep(2)}
              className="min-h-14 text-xl font-bold"
            >
              다음
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <StepBadge step={3} label="운동·자기관리" />
            <div className="w-14 h-14 mx-auto rounded-full bg-primary-light flex items-center justify-center text-primary">
              <SproutIcon className="w-10 h-10" />
            </div>
            <p className="text-center text-xl font-bold text-foreground/90 leading-snug">
              꾸준히 하고 있는
              <br />
              운동이나 자기관리는?
            </p>
            <CurationChipGrid
              chips={SELF_CARE_CHIPS}
              selected={selfCare}
              onToggle={(i) => setSelfCare((prev) => toggleSelection(prev, i))}
              compact
            />
            <Button
              fullWidth
              disabled={selfCare.length === 0}
              onClick={() => setStep(3)}
              className="min-h-14 text-xl font-bold"
            >
              다음
            </Button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <StepBadge step={4} label="음주·흡연" />
            <p className="text-center text-xl font-bold text-foreground/90 leading-snug">
              음주와 흡연 습관은
              <br />
              어떠신가요?
            </p>
            <HabitsSection
              title="음주"
              chips={DRINKING_CHIPS}
              selected={drinking}
              onToggle={(i) => setDrinking((prev) => toggleSelection(prev, i, false))}
            />
            <HabitsSection
              title="흡연"
              chips={SMOKING_CHIPS}
              selected={smoking}
              onToggle={(i) => setSmoking((prev) => toggleSelection(prev, i, false))}
            />
            {error && <p className="text-error text-base">{error}</p>}
            <Button
              fullWidth
              loading={loading}
              disabled={drinking.length === 0 || smoking.length === 0}
              onClick={handleComplete}
              className="min-h-14 text-xl font-bold"
            >
              라이프스타일 등록 완료
            </Button>
          </div>
        )}

        {step === 4 && (
          <div className="flex flex-col items-center text-center space-y-5 py-8">
            <div className="w-20 h-20 rounded-full bg-primary-light flex items-center justify-center text-primary">
              <CheckCircleIcon className="w-14 h-14" />
            </div>
            <h2 className="font-sans text-3xl font-black text-foreground leading-tight">
              라이프스타일 등록
              <br />
              완료
            </h2>
            <p className="text-lg font-bold text-foreground/80 leading-snug">
              이제 오늘의 추천을
              <br />
              확인해 보세요
            </p>
            <Button
              fullWidth
              onClick={() => {
                router.push("/matches");
                router.refresh();
              }}
              className="min-h-16 text-2xl font-black"
            >
              매칭 시작하기
            </Button>
          </div>
        )}
      </div>

      {step < 4 && (
        <div className="absolute bottom-4 left-0 right-0">
          <DemoProgressDots total={STEP_COUNT - 1} current={step} />
        </div>
      )}
    </div>
  );
}
