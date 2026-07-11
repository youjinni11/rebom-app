/** GIF2·실서비스 공통 — 번호 인증 직전 동의 항목 (문구 초안) */

export type VerificationConsentItem = {
  id: string;
  required: boolean;
  label: string;
  /** 체크박스 옆 링크 */
  linkText?: string;
  href?: string;
  /** [보기] 눌렀을 때 보여줄 요약 (모달·상세용) */
  summary?: string;
};

export const VERIFICATION_CONSENT_ITEMS: VerificationConsentItem[] = [
  {
    id: "terms",
    required: true,
    label: "이용약관에 동의합니다.",
    linkText: "전문 보기",
    href: "/terms",
    summary:
      "리봄 서비스 이용 조건, 회원의 권리·의무, 이용 제한, 분쟁 해결 등 서비스 이용에 필요한 사항을 규정합니다.",
  },
  {
    id: "privacy",
    required: true,
    label: "개인정보 수집·이용에 동의합니다.",
    linkText: "처리방침 보기",
    href: "/privacy",
    summary:
      "수집 항목: 휴대폰 번호, 이름, 생년월일, 성별, 내·외국인 정보, 본인확인값(CI/DI). 목적: 본인 확인, 회원 가입, 중복 가입·부정 이용 방지. 보유 기간: 회원 탈퇴 시까지(관련 법령에 따른 보관 기간 제외).",
  },
  {
    id: "third-party",
    required: true,
    label: "개인정보 제3자 제공에 동의합니다.",
    linkText: "내용 보기",
    summary:
      "제공받는 자: 휴대폰 본인확인기관(나이스평가정보, KCP 등), 이동통신사(SKT·KT·LG U+). 제공 항목: 이름, 생년월일, 성별, 휴대폰 번호, 내·외국인 정보, CI/DI. 제공 목적: 휴대폰 본인확인. 보유 기간: 본인확인 완료 시까지.",
  },
  {
    id: "age",
    required: true,
    label: "만 50세 이상이며, 리봄 서비스 이용 연령 요건을 충족합니다.",
  },
  {
    id: "marketing",
    required: false,
    label: "오픈 안내·이벤트 소식을 문자(SMS)로 받는 것에 동의합니다.",
  },
];

export const VERIFICATION_CONSENT_HEADING = {
  title: "약관 및 동의",
  subtitle: "본인인증 전에 아래 내용을 확인해 주세요",
  allAgree: "전체 동의",
  cta: "본인인증 하기",
} as const;
