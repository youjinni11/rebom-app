import { Suspense } from "react";
import { DemoVerificationPlayer } from "./DemoVerificationPlayer";

export default function DemoVerificationPage() {
  return (
    <Suspense
      fallback={<div className="h-full w-full bg-background" aria-busy />}
    >
      <DemoVerificationPlayer />
    </Suspense>
  );
}
