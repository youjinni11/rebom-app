const pillars = [
  {
    title: "5단계 검증",
    description:
      "전화번호·얼굴 인식·미혼 확인·직업·소득 확인 등 단계별 본인 인증을 거칩니다.",
  },
  {
    title: "개인정보 보호",
    description:
      "주요 금융기관이 사용하는 최고 수준의 데이터 연동 기술(Codef API) 적용 예정",
  },
  {
    title: "5060대 맞춤",
    description:
      "50·60대가 편안하게 쓸 수 있도록 큰 글씨, 단순한 화면, 여유 있는 구성으로 설계했습니다.",
  },
  {
    title: "가치관·라이프스타일 기반 매칭",
    description:
      "나이와 지역만이 아니라 가치관, 생활 방식, 만남에 대한 생각이 맞는 분을 우선 추천합니다.",
  },
];

export function TrustSection() {
  return (
    <section id="trust" className="py-24 md:py-32 px-6 bg-[#faf9f6]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <p className="text-xs tracking-[0.25em] text-teal uppercase">
            Trust &amp; Verification
          </p>
          <h2 className="landing-heading text-2xl md:text-3xl font-semibold text-[#1a1a1a]">
            검증과 신뢰를 바탕으로 설계했습니다
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {pillars.map((item) => (
            <div
              key={item.title}
              className="bg-white border border-[#e8e6e1] py-10 px-6 md:px-8 text-center"
            >
              <h3 className="text-lg font-semibold text-teal mb-3">{item.title}</h3>
              <p className="text-sm text-[#555]">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
