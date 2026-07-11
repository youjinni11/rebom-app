const promises = [
  {
    num: "01",
    title: "5단계 신원 검증",
    description:
      "전화번호 인증, 얼굴 인식, 미혼 사실 인증, 직업·소득 인증까지 단계별로 본인을 확인합니다.",
  },
  {
    num: "02",
    title: "딥페이크 차단 기술",
    description:
      "AI 기반 얼굴 인증으로 가짜 사진, 딥페이크, 도용 이미지를 원천 차단합니다.",
  },
  {
    num: "03",
    title: "시니어 전용 UX",
    description:
      "50,60대가 편안하게 사용할 수 있는 큰 글씨, 직관적인 구성, 과하지 않은 세련된 디자인.",
  },
  {
    num: "04",
    title: "가치관·라이프스타일 기반 매칭",
    description:
      "나이와 지역만이 아니라 가치관, 생활 방식, 만남에 대한 생각이 맞는 분을 우선 연결합니다.",
  },
  {
    num: "05",
    title: "완전한 프라이버시",
    description:
      "프로필은 매칭 상대에게만 공개되며, 일반 검색은 차단됩니다. 원하는 정보만 선택적으로 공개할 수 있습니다.",
  },
  {
    num: "06",
    title: "피로 없는 만남 준비",
    description:
      "약속 조율 과정에서 귀찮을 일이 없습니다. 앱에서 일정과 장소까지 전부 정해 드려, 만남전부터 피로할 필요가 없습니다.",
  },
  {
    num: "07",
    title: "만남 당일 채팅",
    description:
      "채팅은 만남 당일에만 활성화됩니다. 그전까지 연락처를 주고받지 않아도 되어, 불필요한 개인정보 교환이나 온라인 사기로부터 안심할 수 있습니다.",
  },
];

export function PromisesSection() {
  return (
    <section className="py-24 md:py-32 px-6 bg-[#faf9f6]">
      <div className="max-w-3xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <p className="text-sm text-teal tracking-wide">리봄의 차별점</p>
          <h2 className="landing-heading text-2xl md:text-3xl font-semibold text-[#1a1a1a]">
            리봄만이 드릴 수 있는 약속
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
                <p className="text-sm md:text-base text-[#777]">
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
