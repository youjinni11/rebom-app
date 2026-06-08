const steps = [
  {
    num: "01",
    title: "멤버십 신청",
    description:
      "기본 정보를 입력하고 멤버십 플랜을 선택하세요. 신청 후 영업일 1-2일 이내 검토가 시작됩니다.",
  },
  {
    num: "02",
    title: "검증 진행",
    description:
      "5단계 본인 인증 과정을 순차적으로 완료합니다. 안내에 따라 진행하시면 어렵지 않습니다.",
  },
  {
    num: "03",
    title: "프로필 설정",
    description:
      "공개를 원하는 정보만 선택하여 프로필을 완성합니다. 매니저가 완성도를 함께 도와드립니다.",
  },
  {
    num: "04",
    title: "인연 시작",
    description:
      "큐레이션 매칭과 직접 탐색 두 가지 방식으로 소중한 인연을 만나보세요.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="membership" className="py-24 md:py-32 px-6 bg-[#f5f4f0]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <p className="text-sm text-teal tracking-wide">이용 방법</p>
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-[#1a1a1a]">
            리봄, 이렇게 시작하세요
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {steps.map((item) => (
            <div
              key={item.num}
              className="bg-white border border-[#e8e6e1] p-8 space-y-4"
            >
              <div className="flex items-center gap-4">
                <span className="shrink-0 w-10 h-10 rounded-full border border-teal/40 flex items-center justify-center text-sm text-teal font-medium">
                  {item.num}
                </span>
                <h3 className="font-semibold text-[#1a1a1a] text-lg">{item.title}</h3>
              </div>
              <p className="text-sm text-[#777] leading-relaxed pl-14">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
