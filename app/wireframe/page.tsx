import Link from "next/link";
import { WIREFRAME_STEPS } from "@/lib/wireframe-steps";

export default function WireframeIndexPage() {
  return (
    <div className="min-h-screen bg-background px-5 py-10">
      <div className="mx-auto max-w-lg space-y-8">
        <div className="space-y-2 text-center">
          <p className="text-sm font-bold tracking-[0.2em] text-primary/70">
            RE:BOM WIREFRAME
          </p>
          <h1 className="text-3xl font-extrabold text-foreground">유저 플로우</h1>
          <p className="leading-relaxed text-foreground/65">
            확정 프레임워크 기준 · 모바일(9:16) · 데모와 같은 톤.
            <br />
            화면을 눌러 처음부터 끝까지 따라가 보세요.
          </p>
        </div>

        <Link
          href="/wireframe/flow?step=1"
          className="flex min-h-14 items-center justify-center rounded-2xl bg-primary text-lg font-bold text-cream shadow-md shadow-primary/20"
        >
          처음부터 클릭해 보기
        </Link>

        <div>
          <h2 className="mb-3 text-sm font-bold text-foreground/50">화면 목록</h2>
          <ul className="space-y-2">
            {WIREFRAME_STEPS.map((step, i) => (
              <li key={step.id}>
                <Link
                  href={`/wireframe/flow?step=${i + 1}`}
                  className="flex items-center gap-3 rounded-xl border-2 border-border bg-surface px-4 py-3 transition-colors hover:border-primary/30 hover:bg-primary-light/40"
                >
                  <span className="w-7 shrink-0 text-center text-sm font-bold text-primary/50">
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-foreground">{step.title}</p>
                    <p className="truncate text-xs text-foreground/45">
                      {step.section}
                      {step.note ? ` · ${step.note}` : ""}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-center text-sm leading-relaxed text-foreground/45">
          제품 규칙 문서: GitHub{" "}
          <span className="font-medium text-foreground/60">docs/FLOWCHART.md</span>
        </p>
      </div>
    </div>
  );
}
