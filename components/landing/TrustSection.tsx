const stats = [
  { value: "12,000+", label: "검증 완료 회원" },
  { value: "98.3%", label: "프로필 실명 인증률" },
  { value: "5단계", label: "다단계 검증 시스템" },
  { value: "4.9/5.0", label: "회원 만족도" },
];

export function TrustSection() {
  return (
    <section id="trust" className="py-24 md:py-32 px-6 bg-[#faf9f6]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <p className="text-xs tracking-[0.25em] text-teal uppercase">
            Trust &amp; Verification
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold text-[#1a1a1a]">
            검증된 신뢰로 시작하는 인연
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((item) => (
            <div
              key={item.label}
              className="bg-white border border-[#e8e6e1] py-10 px-6 text-center"
            >
              <p className="text-2xl md:text-3xl font-semibold text-teal mb-3">
                {item.value}
              </p>
              <p className="text-sm text-[#555]">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
