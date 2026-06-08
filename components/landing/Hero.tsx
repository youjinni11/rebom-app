import Link from "next/link";

const badges = [
  {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    label: "5단계 본인 인증",
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    label: "검증 완료 회원만",
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: "운영팀 직접 검수",
  },
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 bg-[#faf9f6]">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(20,145,142,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-3xl mx-auto text-center space-y-8">
        <div className="flex items-center justify-center gap-4">
          <span className="h-px w-12 bg-[#d4d2cd]" />
          <span className="text-sm text-teal tracking-wide">프리미엄 시니어 멤버십</span>
          <span className="h-px w-12 bg-[#d4d2cd]" />
        </div>

        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium text-[#1a1a1a] leading-tight tracking-tight">
          다시, 봄이 옵니다
        </h1>

        <p className="text-sm tracking-[0.25em] text-[#888] uppercase">
          RE:BOM — SPRING RETURNS AGAIN
        </p>

        <div className="space-y-3 text-[#555] text-base md:text-lg leading-relaxed max-w-xl mx-auto pt-2">
          <p>검증된 인연만이 모이는 공간,</p>
          <p>리봄에서 새로운 시작을 경험하세요.</p>
          <p className="text-[#777] text-sm md:text-base pt-2">
            리봄은 50대 이상 성숙한 분들을 위해 다단계 신원 검증을 통과한
            회원만 입장 가능한 프리미엄 인연 플랫폼입니다.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 pt-4">
          {badges.map((badge) => (
            <span
              key={badge.label}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-light text-teal text-sm border border-teal/20"
            >
              {badge.icon}
              {badge.label}
            </span>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
          <Link
            href="/signup"
            className="inline-flex items-center justify-center px-10 py-4 bg-teal text-white text-base font-medium hover:bg-teal-hover transition-colors"
          >
            멤버십 신청하기
          </Link>
          <a
            href="#about"
            className="inline-flex items-center justify-center px-10 py-4 bg-white text-[#1a1a1a] text-base font-medium border border-[#d4d2cd] hover:border-teal hover:text-teal transition-colors"
          >
            서비스 둘러보기
          </a>
        </div>
      </div>
    </section>
  );
}
