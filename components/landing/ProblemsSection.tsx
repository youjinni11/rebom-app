const problems = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
    ),
    title: "허위 프로필과 사기",
    description: "검증 없는 프로필, 사진 도용, 금전 사기 등 믿을 수 없는 환경",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      </svg>
    ),
    title: "맞지 않는 문화",
    description: "20~30대 중심 UI, 스와이프 문화, 가벼운 분위기에서 오는 피로감",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    title: "프라이버시 무방비",
    description: "개인정보가 무분별하게 노출되는 구조, 나이 정보 왜곡",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
    title: "중요한 정보 부재",
    description: "미혼 사실 여부, 자녀 유무, 직업 등 현실적 정보 확인 불가",
  },
];

export function ProblemsSection() {
  return (
    <section id="philosophy" className="py-24 md:py-32 px-6 bg-[#f5f4f0]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <p className="text-sm text-[#888] tracking-wide">기존 서비스의 한계</p>
          <h2 className="landing-heading text-2xl md:text-3xl font-semibold text-[#1a1a1a]">
            왜 시니어를 위한 제대로 된 서비스가 없었을까요?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {problems.map((item) => (
            <div
              key={item.title}
              className="bg-white border border-[#e8e6e1] p-8 text-center space-y-4"
            >
              <div className="flex justify-center text-[#999]">{item.icon}</div>
              <h3 className="font-semibold text-[#1a1a1a] text-base">{item.title}</h3>
              <p className="text-sm text-[#777]">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
