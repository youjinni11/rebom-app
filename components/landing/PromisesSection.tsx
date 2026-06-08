const promises = [
  {
    num: "01",
    title: "5단계 신원 검증",
    description:
      "신분증, 얼굴 인식, 가족관계증명서, 직업·소득 인증, 운영팀 최종 검수까지 철저한 다단계 검증 시스템",
  },
  {
    num: "02",
    title: "딥페이크 차단 기술",
    description:
      "AI 기반 얼굴 인증으로 가짜 사진, 딥페이크, 도용 이미지를 원천 차단합니다",
  },
  {
    num: "03",
    title: "시니어 전용 UX",
    description:
      "50대가 편안하게 사용할 수 있는 큰 글씨, 직관적인 구성, 과하지 않은 세련된 디자인",
  },
  {
    num: "04",
    title: "큐레이션 매칭",
    description:
      "알고리즘에만 맡기지 않고, 전문 매니저가 직접 검토한 인연을 연결해드립니다",
  },
  {
    num: "05",
    title: "완전한 프라이버시",
    description:
      "프로필은 매칭 상대에게만 공개, 일반 검색 차단, 원하는 정보만 선택적으로 공개",
  },
];

export function PromisesSection() {
  return (
    <section className="py-24 md:py-32 px-6 bg-[#faf9f6]">
      <div className="max-w-3xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <p className="text-sm text-teal tracking-wide">리봄의 차별점</p>
          <h2 className="text-2xl md:text-3xl font-semibold text-[#1a1a1a] leading-snug">
            리봄만이 드릴 수 있는
            <br />
            다섯 가지 약속
          </h2>
        </div>

        <div className="space-y-4">
          {promises.map((item) => (
            <div
              key={item.num}
              className="flex gap-5 items-start bg-white border border-[#e8e6e1] px-6 py-7 md:px-8 md:py-8"
            >
              <span className="shrink-0 w-10 h-10 rounded-full border border-teal/40 flex items-center justify-center text-sm text-teal font-medium">
                {item.num}
              </span>
              <div className="space-y-2 pt-1">
                <h3 className="font-semibold text-[#1a1a1a] text-base md:text-lg">
                  {item.title}
                </h3>
                <p className="text-sm md:text-base text-[#777] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
