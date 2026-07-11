export const LIFESTYLE_CHIPS = [
  "산책·등산",
  "요리·맛집",
  "여행",
  "독서·영화",
  "음악·공연",
] as const;

export const FAMILY_CHIPS = [
  "자녀가 없어요",
  "자녀와 함께 살아요",
  "자녀가 독립했어요",
  "반려동물과 함께 살아요",
  "부모님과 함께 살아요",
] as const;

export const POLITICS_CHIPS = [
  "보수 성향",
  "진보 성향",
  "중도·실용",
  "정치에 관심 없어요",
  "대화 시 존중해요",
] as const;

export const RELIGION_CHIPS = [
  "기독교",
  "천주교",
  "불교",
  "무교",
  "종교에 관심 없어요",
  "대화 시 존중해요",
] as const;

export const SELF_CARE_CHIPS = [
  "꾸준히 헬스",
  "요가·필라테스",
  "꾸준히 독서",
  "외국어 학습",
  "투자 공부",
  "산책·러닝",
] as const;

export const DRINKING_CHIPS = [
  "안 마셔요",
  "가끔 (월 1~2회)",
  "주 1~2회",
  "주 3~4회",
  "거의 매일",
] as const;

export const SMOKING_CHIPS = [
  "안 해요",
  "가끔 (사교 자리만)",
  "하루 반 갑 이하",
  "하루 1갑",
  "하루 1갑 이상",
] as const;

export const VALUES_Q1_CHIPS = [
  "진솔한 대화",
  "서로 존중",
  "천천히 알아가기",
  "가족·인연 중시",
  "함께 성장",
] as const;

export const VALUES_Q2_CHIPS = [
  "결혼이 목표에요",
  "진지한 만남",
  "대화가 잘 통하는 친구같은 만남",
  "상황에 따라 달라질 수 있어요",
  "반드시 결혼이 목표인 것은 아니에요",
  "가벼운 관계는 싫어요",
] as const;

export const AVOID_FILTER_CHIPS = [
  "과한 음주",
  "흡연",
  "운동 부족",
  "대머리",
  "과체중",
  "과한 탈모",
  "결혼이 목적인 사람",
] as const;

/** @deprecated use AVOID_FILTER_CHIPS — 프로필 큐레이션 10번 화면 */
export const VALUES_Q3_CHIPS = AVOID_FILTER_CHIPS;
