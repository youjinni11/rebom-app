/** 확정 프레임워크 기준 유저 플로우 와이어프레임 스텝 */

export type WireframeStep = {
  id: string;
  title: string;
  section: string;
  note?: string;
};

export const WIREFRAME_STEPS: WireframeStep[] = [
  { id: "welcome", title: "웰컴", section: "① 진입" },
  { id: "onboarding", title: "온보딩", section: "① 진입" },
  { id: "login", title: "로그인", section: "① 진입", note: "카카오·구글·휴대폰" },
  { id: "consent", title: "약관 동의", section: "② 신원검증" },
  { id: "phone", title: "휴대폰 번호", section: "② 신원검증" },
  { id: "otp", title: "인증번호 입력", section: "② 신원검증" },
  {
    id: "phone-result",
    title: "본인 정보 확인",
    section: "② 신원검증",
    note: "이름·성별·나이·국적",
  },
  { id: "face", title: "얼굴 촬영", section: "② 신원검증" },
  { id: "face-done", title: "얼굴 인증 완료", section: "② 신원검증" },
  { id: "marital", title: "미혼 인증", section: "② 신원검증" },
  { id: "verify-done", title: "신원검증 완료", section: "② 신원검증" },
  {
    id: "signup-fee",
    title: "가입비 10만",
    section: "③ 결제·프로필",
    note: "스킵 가능 · 매칭에서 필수",
  },
  {
    id: "profile",
    title: "기본 프로필",
    section: "③ 결제·프로필",
    note: "사진 필수 · 성별·나이 자동",
  },
  { id: "values", title: "가치관 (예시 1단계)", section: "③ 결제·프로필" },
  { id: "lifestyle", title: "라이프스타일 (예시)", section: "③ 결제·프로필" },
  {
    id: "match-blur",
    title: "매칭 블러",
    section: "④ 매칭",
    note: "미혼/가입비 미충족",
  },
  {
    id: "match-proposal",
    title: "매칭 제안",
    section: "④ 매칭",
    note: "2일 1건 · 운영 짝짓기",
  },
  { id: "match-pay", title: "매칭비 결제", section: "④ 매칭", note: "3만 · 첫 1회 무료" },
  { id: "match-wait", title: "상대 결제 대기", section: "④ 매칭" },
  {
    id: "availability",
    title: "불가능 시간·장소",
    section: "⑤ 일정",
    note: "앞으로 10일 창",
  },
  { id: "schedule-proposal", title: "리봄 일정 제안", section: "⑤ 일정" },
  { id: "schedule-confirmed", title: "일정 확정", section: "⑤ 일정" },
  {
    id: "chat",
    title: "채팅",
    section: "⑥ 채팅",
    note: "만남 24h 전 ~ 만남 후 24h",
  },
  { id: "my", title: "내 정보", section: "⑦ 프로필" },
];
