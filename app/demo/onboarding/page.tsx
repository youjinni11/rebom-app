import { Suspense } from "react";
import { DemoOnboardingPlayer } from "./DemoOnboardingPlayer";

export default function DemoOnboardingPage() {
  return (
    <Suspense
      fallback={<div className="h-full w-full bg-background" aria-busy />}
    >
      <DemoOnboardingPlayer />
    </Suspense>
  );
}
