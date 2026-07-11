import Link from "next/link";
import { DemoRecordWindowButton } from "@/components/demo/DemoRecordWindowButton";

const DEMOS = [
  {
    title: "웰컴 랜딩 — 앱 첫 화면",
    description: "공감 훅 → 페인포인트 → 솔루션 → 가입 CTA",
    href: "/demo/welcome",
    recordHref: "/demo/welcome?record=1",
    designHref: "/demo/welcome?design=1",
    duration: "슬라이드 3장",
  },
  {
    title: "GIF 1 — 온보딩",
    description: "로고 소개 → 검증 안내 → 시작하기",
    href: "/demo/onboarding",
    recordHref: "/demo/onboarding?record=1",
    designHref: "/demo/onboarding?design=1&slide=1",
    duration: "약 20초",
  },
  {
    title: "GIF 2 — 3단계 신원검증",
    description: "전화번호 → 얼굴 → 미혼 인증",
    href: "/demo/verification",
    recordHref: "/demo/verification?record=1",
    designHref: "/demo/verification?design=1&slide=1",
    duration: "약 15초",
  },
  {
    title: "GIF 3 — 가치관 큐레이션",
    description: "홈 → 미혼 안내 → 서류 인증 → 프로필 → 가치관 5단계 → 등록 완료",
    href: "/demo/profile-curation",
    recordHref: "/demo/profile-curation?record=1",
    designHref: "/demo/profile-curation?design=1&slide=1",
    duration: "약 20초",
  },
  {
    title: "GIF 4 — 라이프스타일 큐레이션",
    description: "프로필 → 4단계 질문(활동·가족·자기관리·음주흡연)",
    href: "/demo/lifestyle-curation",
    recordHref: "/demo/lifestyle-curation?record=1",
    designHref: "/demo/lifestyle-curation?design=1&slide=2",
    duration: "약 13초",
  },
  {
    title: "매칭 홈 — 인증 완료 후",
    description: "미혼 인증 완료 → 이경희 프로필 · 학력·소득 뱃지 · 편하신 시간을 알려주세요",
    href: "/demo/matching",
    recordHref: "/demo/matching",
    designHref: "/demo/matching",
    duration: "정적 화면",
  },
  {
    title: "만남 일정 — 리봄 조율",
    description: "가능 시간 전달 → 리봄 조율 → 일정·장소 제안 → 확정 · 만남 당일 채팅",
    href: "/demo/schedule",
    recordHref: "/demo/schedule",
    designHref: "/demo/schedule",
    duration: "정적 화면",
  },
] as const;

export default function DemoIndexPage() {
  return (
    <div className="min-h-screen bg-background px-6 py-10">
      <div className="max-w-lg mx-auto space-y-8">
        <div className="text-center space-y-2">
          <p className="text-sm font-bold tracking-[0.2em] text-primary/70">RE:BOM DEMO</p>
          <h1 className="text-3xl font-extrabold text-foreground">GIF 녹화 데모</h1>
          <p className="text-foreground/70 leading-relaxed">
            GIF 녹화는 <span className="font-semibold text-primary">9:16 녹화 창</span>을
            쓰면 화면 비율이 맞습니다.
          </p>
        </div>

        <ul className="space-y-4">
          {DEMOS.map((demo) => (
            <li
              key={demo.href}
              className="bg-white border-2 border-border rounded-2xl p-5 space-y-4"
            >
              <div>
                <h2 className="text-xl font-bold text-foreground">{demo.title}</h2>
                <p className="text-foreground/65 mt-1">{demo.description}</p>
                <p className="text-sm text-foreground/45 mt-1">{demo.duration}</p>
              </div>
              <div className="flex flex-col gap-2">
                <DemoRecordWindowButton href={demo.recordHref} />
                <Link
                  href={demo.recordHref}
                  className="flex items-center justify-center min-h-11 px-4 py-2 bg-primary text-cream font-bold rounded-xl hover:bg-primary-hover transition-colors text-sm"
                >
                  녹화용 (현재 탭)
                </Link>
                <Link
                  href={demo.href}
                  className="flex items-center justify-center min-h-11 px-4 py-2 border-2 border-border text-foreground font-medium rounded-xl hover:bg-muted transition-colors text-sm"
                >
                  미리보기 (일시정지·화면 선택)
                </Link>
                {"designHref" in demo && (
                  <Link
                    href={demo.designHref}
                    className="flex items-center justify-center min-h-11 px-4 py-2 border-2 border-primary/30 text-primary font-medium rounded-xl hover:bg-primary-light transition-colors text-sm"
                  >
                    디자인 모드 (멈춘 상태)
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ul>

        <p className="text-center text-sm text-foreground/50 leading-relaxed">
          서버가 안 열리면 터미널에서{" "}
          <code className="bg-muted px-1.5 py-0.5 rounded text-foreground/80">
            npm run dev
          </code>{" "}
          실행 후 이 페이지를 새로고침하세요.
        </p>
      </div>
    </div>
  );
}
