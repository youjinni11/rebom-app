import { Suspense } from "react";
import { DemoLifestyleCurationPlayer } from "./DemoLifestyleCurationPlayer";

export default function DemoLifestyleCurationPage() {
  return (
    <Suspense
      fallback={<div className="h-full w-full bg-background" aria-busy />}
    >
      <DemoLifestyleCurationPlayer />
    </Suspense>
  );
}
