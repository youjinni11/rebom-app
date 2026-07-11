import type { Metadata } from "next";
import { WelcomeLanding } from "@/components/welcome/WelcomeLanding";

export const metadata: Metadata = {
  title: "리봄에 오신 것을 환영합니다",
  description:
    "결혼은 부담스럽고, 가벼운 만남은 싫은 당신을 위한 프리미엄 동반자 매칭.",
};

export default function WelcomePage() {
  return <WelcomeLanding />;
}
