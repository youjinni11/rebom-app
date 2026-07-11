"use client";

import { Suspense } from "react";
import { DemoViewport } from "@/components/demo/DemoViewport";
import { WireframeFlowPlayer } from "@/components/wireframe/WireframeFlowPlayer";

export default function WireframeFlowPage() {
  return (
    <DemoViewport>
      <Suspense
        fallback={
          <div className="flex h-full items-center justify-center text-sm text-foreground/50">
            불러오는 중…
          </div>
        }
      >
        <WireframeFlowPlayer />
      </Suspense>
    </DemoViewport>
  );
}
