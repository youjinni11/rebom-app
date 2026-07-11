import type { Metadata } from "next";
import { OnboardingFlow } from "@/components/onboarding/OnboardingFlow";

export const metadata: Metadata = {
  title: "리봄 시작하기",
  description: "50대 이상을 위한 프리미엄 인연 멤버십, 리봄",
};

export default function OnboardingPage() {
  return <OnboardingFlow />;
}
