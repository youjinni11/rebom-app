import Link from "next/link";
import { Logo } from "@/components/Logo";

export const metadata = {
  title: "개인정보 처리방침 — 리봄",
  description: "리봄 사전예약 개인정보 처리방침",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#faf9f6]">
      <header className="border-b border-[#e8e6e1]">
        <div className="max-w-2xl mx-auto px-6 h-14 flex items-center justify-between">
          <Logo size="sm" />
          <Link href="/pre-register" className="text-sm text-teal hover:underline">
            사전예약으로
          </Link>
        </div>
      </header>

      <article className="max-w-2xl mx-auto px-6 py-12 prose prose-neutral">
        <h1 className="text-2xl font-semibold text-[#1a1a1a] mb-2">개인정보 처리방침</h1>
        <p className="text-sm text-[#888] mb-10">시행일: 2026년 6월 8일 · 버전 1.0 (초안)</p>

        <section className="space-y-4 text-[#555] text-sm leading-relaxed">
          <p>
            리봄(이하 &ldquo;회사&rdquo;)은 「개인정보 보호법」에 따라 사전예약 신청자의
            개인정보를 보호하고, 관련 고충을 신속하게 처리하기 위해 다음과 같이 개인정보
            처리방침을 수립·공개합니다.
          </p>

          <h2 className="text-base font-semibold text-[#1a1a1a] pt-4">1. 수집하는 개인정보 항목</h2>
          <p>사전예약 신청 시 아래 정보를 수집합니다.</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>필수: 이름, 성별, 연령대, 휴대폰 번호</li>
            <li>선택: 오픈 안내·이벤트 문자(SMS) 수신 동의 여부</li>
          </ul>

          <h2 className="text-base font-semibold text-[#1a1a1a] pt-4">2. 개인정보의 수집·이용 목적</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>리봄 서비스 정식 오픈 안내 및 사전예약 확인</li>
            <li>서비스 관련 문의 응대</li>
            <li>(선택 동의 시) 오픈·이벤트 등 마케팅 정보 문자 발송</li>
          </ul>
          <p className="text-[#888]">
            ※ 현재 단계에서는 매칭·결제 등 정식 서비스가 제공되지 않으며, 수집된 정보는
            사전예약 목적으로만 사용됩니다.
          </p>

          <h2 className="text-base font-semibold text-[#1a1a1a] pt-4">3. 보유 및 이용 기간</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              사전예약 정보: 서비스 정식 오픈 후 회원 전환 시까지, 또는 사전예약 취소·삭제
              요청 시까지
            </li>
            <li>
              관련 법령에 따라 보존이 필요한 경우 해당 기간 동안 보관
            </li>
          </ul>

          <h2 className="text-base font-semibold text-[#1a1a1a] pt-4">4. 개인정보의 제3자 제공</h2>
          <p>
            회사는 원칙적으로 이용자의 개인정보를 제3자에게 제공하지 않습니다. 다만,
            이용자의 동의가 있거나 법령에 따른 경우는 예외로 합니다.
          </p>

          <h2 className="text-base font-semibold text-[#1a1a1a] pt-4">5. 개인정보 처리 위탁</h2>
          <p>현재 개인정보 처리를 외부에 위탁하지 않습니다. 위탁이 발생하는 경우 본 방침을 통해 공지합니다.</p>
          <p className="text-[#888]">
            ※ 데이터 저장: Supabase(호스팅 리전은 프로젝트 설정에 따름)
          </p>

          <h2 className="text-base font-semibold text-[#1a1a1a] pt-4">6. 이용자의 권리</h2>
          <p>이용자는 언제든지 다음 권리를 행사할 수 있습니다.</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>개인정보 열람·정정·삭제·처리 정지 요청</li>
            <li>개인정보 수집·이용 동의 철회</li>
            <li>마케팅 수신 동의 철회</li>
          </ul>
          <p>요청 방법: 아래 연락처로 이메일 문의</p>

          <h2 className="text-base font-semibold text-[#1a1a1a] pt-4">7. 개인정보의 안전성 확보 조치</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>개인정보 접근 권한 최소화</li>
            <li>전송 구간 암호화(HTTPS)</li>
            <li>데이터베이스 접근 통제(RLS 등)</li>
          </ul>

          <h2 className="text-base font-semibold text-[#1a1a1a] pt-4">8. 만 19세 미만</h2>
          <p>
            리봄은 만 19세 이상(또는 서비스 정책상 성인)을 대상으로 합니다. 만 19세 미만의
            사전예약은 받지 않습니다.
          </p>

          <h2 className="text-base font-semibold text-[#1a1a1a] pt-4">9. 개인정보 보호책임자</h2>
          <ul className="list-none space-y-1">
            <li>담당: 리봄 운영팀</li>
            <li>이메일: primesenior0530@gmail.com</li>
          </ul>
          <p className="text-[#888]">
            ※ 정식 사업자 등록 후 상호·대표자·사업자등록번호를 본 방침에 반영합니다.
          </p>

          <h2 className="text-base font-semibold text-[#1a1a1a] pt-4">10. 방침의 변경</h2>
          <p>
            본 방침이 변경되는 경우 웹사이트 공지 또는 개별 통지를 통해 안내합니다.
          </p>
        </section>

        <div className="mt-12 pt-8 border-t border-[#e8e6e1]">
          <Link
            href="/pre-register"
            className="inline-flex items-center justify-center px-6 py-3 bg-teal text-white text-sm font-medium hover:bg-teal-hover transition-colors"
          >
            사전예약 신청하기
          </Link>
        </div>
      </article>
    </main>
  );
}
