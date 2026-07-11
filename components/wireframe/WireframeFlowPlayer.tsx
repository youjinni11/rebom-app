"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { WireframeShell } from "@/components/wireframe/WireframeShell";
import {
  WfAvailability,
  WfChat,
  WfConsent,
  WfFace,
  WfFaceDone,
  WfLifestyle,
  WfLogin,
  WfMarital,
  WfMatchBlur,
  WfMatchPay,
  WfMatchProposal,
  WfMatchWait,
  WfMy,
  WfOnboarding,
  WfOtp,
  WfPhone,
  WfPhoneResult,
  WfProfile,
  WfScheduleConfirmed,
  WfScheduleProposal,
  WfSignupFee,
  WfValues,
  WfVerifyDone,
  WfWelcome,
} from "@/components/wireframe/WireframeScreens";
import { WIREFRAME_STEPS } from "@/lib/wireframe-steps";

function parseStep(value: string | null) {
  if (!value) return 0;
  const n = Number.parseInt(value, 10);
  if (Number.isNaN(n)) return 0;
  return Math.min(Math.max(n - 1, 0), WIREFRAME_STEPS.length - 1);
}

export function WireframeFlowPlayer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [index, setIndex] = useState(() => parseStep(searchParams.get("step")));

  useEffect(() => {
    setIndex(parseStep(searchParams.get("step")));
  }, [searchParams]);

  const syncUrl = useCallback(
    (next: number) => {
      setIndex(next);
      router.replace(`/wireframe/flow?step=${next + 1}`, { scroll: false });
    },
    [router]
  );

  const goPrev = () => {
    if (index <= 0) return;
    syncUrl(index - 1);
  };

  const goNext = () => {
    if (index >= WIREFRAME_STEPS.length - 1) return;
    syncUrl(index + 1);
  };

  const id = WIREFRAME_STEPS[index]?.id;
  const cta = goNext;

  let body: ReactNode = null;
  switch (id) {
    case "welcome":
      body = <WfWelcome onCta={cta} />;
      break;
    case "onboarding":
      body = <WfOnboarding onCta={cta} />;
      break;
    case "login":
      body = <WfLogin onCta={cta} />;
      break;
    case "consent":
      body = <WfConsent onCta={cta} />;
      break;
    case "phone":
      body = <WfPhone onCta={cta} />;
      break;
    case "otp":
      body = <WfOtp onCta={cta} />;
      break;
    case "phone-result":
      body = <WfPhoneResult onCta={cta} />;
      break;
    case "face":
      body = <WfFace onCta={cta} />;
      break;
    case "face-done":
      body = <WfFaceDone onCta={cta} />;
      break;
    case "marital":
      body = <WfMarital onCta={cta} />;
      break;
    case "verify-done":
      body = <WfVerifyDone onCta={cta} />;
      break;
    case "signup-fee":
      body = <WfSignupFee onCta={cta} onSkip={cta} />;
      break;
    case "profile":
      body = <WfProfile onCta={cta} />;
      break;
    case "values":
      body = <WfValues onCta={cta} />;
      break;
    case "lifestyle":
      body = <WfLifestyle onCta={cta} />;
      break;
    case "match-blur":
      body = <WfMatchBlur onCta={cta} />;
      break;
    case "match-proposal":
      body = <WfMatchProposal onCta={cta} />;
      break;
    case "match-pay":
      body = <WfMatchPay onCta={cta} />;
      break;
    case "match-wait":
      body = <WfMatchWait onCta={cta} />;
      break;
    case "availability":
      body = <WfAvailability onCta={cta} />;
      break;
    case "schedule-proposal":
      body = <WfScheduleProposal onCta={cta} />;
      break;
    case "schedule-confirmed":
      body = <WfScheduleConfirmed onCta={cta} />;
      break;
    case "chat":
      body = <WfChat onCta={cta} />;
      break;
    case "my":
      body = <WfMy />;
      break;
    default:
      body = null;
  }

  return (
    <WireframeShell stepIndex={index} onPrev={goPrev} onNext={goNext}>
      {body}
    </WireframeShell>
  );
}
