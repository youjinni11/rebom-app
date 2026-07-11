const steps = [
  { step: "STEP 1", label: "전화번호 인증" },
  { step: "STEP 2", label: "얼굴 생체 인증" },
  { step: "STEP 3", label: "미혼 상태 인증" },
  { step: "STEP 4", label: "직업·소득 인증" },
  { step: "STEP 5", label: "프로필 최종 확인", highlight: true },
];

export function VerificationSection() {
  return (
    <section className="py-24 md:py-32 px-6 bg-[#f5f4f0]">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-sm text-teal tracking-wide mb-4">검증 시스템</p>

        <h2 className="landing-heading text-2xl md:text-3xl font-semibold text-[#1a1a1a] mb-6">
          리봄의 문은 아무에게나 열리지 않습니다.
        </h2>

        <div className="space-y-2 text-[#666] text-sm md:text-base mb-14 max-w-xl mx-auto">
          <p>
            5단계 검증 과정을 통과한 회원만 리봄 커뮤니티에 입장할 수 있습니다.
          </p>
          <p>만나는 모든 분은 사전에 본인 확인을 마친 검증된 회원입니다.</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-0 mb-12">
          {steps.map((item, i) => (
            <div key={item.step} className="flex items-center">
              <div
                className={`px-4 py-5 md:px-5 md:py-6 border text-center min-w-[120px] md:min-w-[140px] ${
                  item.highlight
                    ? "bg-teal-light border-teal/30"
                    : "bg-white border-[#e0ded9]"
                }`}
              >
                <p className="text-xs text-teal tracking-wider mb-2">{item.step}</p>
                <p className="text-sm md:text-base font-medium text-[#1a1a1a] whitespace-nowrap">
                  {item.label}
                </p>
              </div>
              {i < steps.length - 1 && (
                <span className="hidden md:block text-[#ccc] px-1 text-lg select-none">
                  &rsaquo;
                </span>
              )}
            </div>
          ))}
        </div>

        <a
          href="#trust"
          className="inline-flex items-center justify-center px-8 py-3.5 bg-teal text-white text-sm font-medium hover:bg-teal-hover transition-colors"
        >
          검증 시스템 자세히 보기
        </a>
      </div>
    </section>
  );
}
