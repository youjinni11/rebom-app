import { Suspense } from "react";
import { DemoProfileCurationPlayer } from "./DemoProfileCurationPlayer";

export default function DemoProfileCurationPage() {
  return (
    <Suspense
      fallback={<div className="h-full w-full bg-background" aria-busy />}
    >
      <DemoProfileCurationPlayer />
    </Suspense>
  );
}
