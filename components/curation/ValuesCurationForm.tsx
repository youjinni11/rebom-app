"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  CurationChipGrid,
  toggleSelection,
} from "@/components/curation/CurationChipGrid";
import {
  AVOID_FILTER_CHIPS,
  POLITICS_CHIPS,
  RELIGION_CHIPS,
  VALUES_Q1_CHIPS,
  VALUES_Q2_CHIPS,
} from "@/components/demo/curation-chips";
import {
  CheckCircleIcon,
  CompassIcon,
  HeartIcon,
  ShieldIcon,
} from "@/components/demo/DemoIcons";
import { DemoProgressDots } from "@/components/demo/DemoProgressDots";
import { Button } from "@/components/ui/Button";
import { selectionsToValuesData } from "@/lib/curation";

const STEP_COUNT = 6;
const VALUES_STEP_TOTAL = 5;
const MOTTO =
  "정확하고 솔직하게 응답할수록 회원님께 더욱 잘 맞는 상대를 추천해드릴 수 있어요";

function StepBadge({ step, label }: { step: number; label: string }) {
  return (
    <div className="text-center space-y-2 mb-4">
      <p className="text-base font-extrabold tracking-[0.2em] text-primary">
        STEP {step} / {VALUES_STEP_TOTAL}
      </p>
      <h2 className="font-sans text-3xl font-black text-foreground leading-tight">
        {label}
      </h2>
      <p className="text-base font-bold text-foreground/75 leading-snug px-1">
        {MOTTO}
      </p>
    </div>
  );
}

function SummaryTags({
  title,
  labels,
}: {
  title: string;
  labels: string[];
}) {
  if (labels.length === 0) return null;
  return (
    <div className="space-y-2">
      <p className="text-sm font-bold text-foreground/70">{title}</p>
      <div className="flex flex-wrap gap-1.5">
        {labels.map((label) => (
          <span
            key={label}
            className="px-2.5 py-1 rounded-lg bg-primary-light text-primary text-sm font-bold border border-primary/15"
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

export function ValuesCurationForm() {
  const router = useRouter();
  const supabase = createClient();

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [q1, setQ1] = useState<number[]>([]);
  const [q2, setQ2] = useState<number[]>([]);
  const [politics, setPolitics] = useState<number[]>([]);
  const [religion, setReligion] = useState<number[]>([]);
  const [avoid, setAvoid] = useState<number[]>([]);

  async function handleComplete() {
    setLoading(true);
    setError("");
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("로그인이 필요합니다.");

      const valuesData = selectionsToValuesData({ q1, q2, politics, religion, avoid });

      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          values_data: valuesData,
          values_complete: true,
        })
        .eq("user_id", user.id);

      if (updateError) throw updateError;
      setStep(5);
    } catch (err) {
      setError(err instanceof Error ? err.message : "저장에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  }

  function goNext() {
    setStep((s) => s + 1);
  }

  const valuesData = selectionsToValuesData({ q1, q2, politics, religion, avoid });

  return (
    <div className="relative min-h-dvh max-w-lg mx-auto bg-background flex flex-col">
      <div className="flex-1 px-5 pt-8 pb-16 overflow-y-auto">
        {step === 0 && (
          <div className="space-y-5">
            <StepBadge step={1} label="가치관" />
            <div className="w-16 h-16 mx-auto rounded-full bg-primary-light flex items-center justify-center text-primary">
              <HeartIcon className="w-11 h-11" />
            </div>
            <p className="text-center text-2xl font-bold text-foreground/90 leading-snug">
              만남에서 가장
              <br />
              중요한 것은?
            </p>
            <CurationChipGrid
              chips={VALUES_Q1_CHIPS}
              selected={q1}
              onToggle={(i) => setQ1((prev) => toggleSelection(prev, i))}
            />
            <p className="text-center text-lg font-semibold text-foreground/55">
              복수 선택 가능
            </p>
            <Button
              fullWidth
              disabled={q1.length === 0}
              onClick={goNext}
              className="min-h-14 text-xl font-bold"
            >
              다음
            </Button>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-5">
            <StepBadge step={2} label="가치관" />
            <div className="w-16 h-16 mx-auto rounded-full bg-primary-light flex items-center justify-center text-primary">
              <HeartIcon className="w-11 h-11" />
            </div>
            <p className="text-center text-2xl font-bold text-foreground/90 leading-snug">
              목표로 하는
              <br />
              관계는 무엇인가요?
            </p>
            <CurationChipGrid
              chips={VALUES_Q2_CHIPS}
              selected={q2}
              onToggle={(i) => setQ2((prev) => toggleSelection(prev, i))}
            />
            <Button
              fullWidth
              disabled={q2.length === 0}
              onClick={goNext}
              className="min-h-14 text-xl font-bold"
            >
              다음
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <StepBadge step={3} label="정치성향" />
            <div className="w-16 h-16 mx-auto rounded-full bg-primary-light flex items-center justify-center text-primary">
              <ShieldIcon className="w-11 h-11" />
            </div>
            <p className="text-center text-2xl font-bold text-foreground/90 leading-snug">
              정치·사회 이슈에 대한
              <br />
              생각은 어떠신가요?
            </p>
            <CurationChipGrid
              chips={POLITICS_CHIPS}
              selected={politics}
              onToggle={(i) => setPolitics((prev) => toggleSelection(prev, i))}
            />
            <Button
              fullWidth
              disabled={politics.length === 0}
              onClick={goNext}
              className="min-h-14 text-xl font-bold"
            >
              다음
            </Button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <StepBadge step={4} label="종교" />
            <div className="w-16 h-16 mx-auto rounded-full bg-primary-light flex items-center justify-center text-primary">
              <CompassIcon className="w-11 h-11" />
            </div>
            <p className="text-center text-2xl font-bold text-foreground/90 leading-snug">
              종교·신앙에 대한
              <br />
              생각은 어떠신가요?
            </p>
            <CurationChipGrid
              chips={RELIGION_CHIPS}
              selected={religion}
              onToggle={(i) => setReligion((prev) => toggleSelection(prev, i))}
            />
            <Button
              fullWidth
              disabled={religion.length === 0}
              onClick={goNext}
              className="min-h-14 text-xl font-bold"
            >
              다음
            </Button>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <StepBadge step={5} label="필터" />
            <p className="text-center text-xl font-bold text-foreground/90 leading-snug">
              이런 상대는
              <br />
              피하고 싶어요!
            </p>
            <CurationChipGrid
              chips={AVOID_FILTER_CHIPS}
              selected={avoid}
              onToggle={(i) => setAvoid((prev) => toggleSelection(prev, i))}
              compact
            />
            {error && <p className="text-error text-base">{error}</p>}
            <Button
              fullWidth
              loading={loading}
              onClick={handleComplete}
              className="min-h-14 text-xl font-black"
            >
              가치관 등록 완료
            </Button>
          </div>
        )}

        {step === 5 && (
          <div className="flex flex-col items-center space-y-4 py-4">
            <div className="w-20 h-20 rounded-full bg-primary-light flex items-center justify-center text-primary">
              <CheckCircleIcon className="w-14 h-14" />
            </div>
            <div className="text-center space-y-2">
              <p className="text-sm font-extrabold tracking-[0.2em] text-primary">
                VALUES COMPLETE
              </p>
              <h2 className="font-sans text-3xl font-black text-foreground leading-tight">
                가치관 등록
                <br />
                완료
              </h2>
            </div>
            <div className="w-full bg-white border-2 border-primary/15 rounded-2xl px-4 py-3 space-y-3 max-h-48 overflow-y-auto">
              <SummaryTags title="만남에서 중요한 것" labels={valuesData.meeting_priorities} />
              <SummaryTags title="목표 관계" labels={valuesData.relationship_goals} />
              <SummaryTags title="정치성향" labels={valuesData.politics} />
              <SummaryTags title="종교·신앙" labels={valuesData.religion} />
              <SummaryTags title="피하고 싶은 상대" labels={valuesData.avoid_filters} />
            </div>
            <Button
              fullWidth
              onClick={() => {
                router.push("/lifestyle");
                router.refresh();
              }}
              className="min-h-14 text-xl font-bold"
            >
              라이프스타일 등록하기
            </Button>
          </div>
        )}
      </div>

      {step < 5 && (
        <div className="absolute bottom-4 left-0 right-0">
          <DemoProgressDots total={STEP_COUNT - 1} current={step} />
        </div>
      )}
    </div>
  );
}
