"use client";

import Image from "next/image";
import { DemoLogoCircle } from "@/components/demo/DemoLogoCircle";
import {
  CalendarIcon,
  HeartIcon,
  LockIcon,
  ShieldIcon,
  UserIcon,
} from "@/components/demo/DemoIcons";
import { Button } from "@/components/ui/Button";

function Chip({ label, selected = false }: { label: string; selected?: boolean }) {
  return (
    <span
      className={`inline-flex rounded-full border-2 px-3 py-1.5 text-sm font-medium ${
        selected
          ? "border-primary bg-primary-light text-primary"
          : "border-border bg-surface text-foreground/70"
      }`}
    >
      {label}
    </span>
  );
}

function Field({
  label,
  value,
  locked = false,
}: {
  label: string;
  value: string;
  locked?: boolean;
}) {
  return (
    <div className="space-y-1">
      <p className="text-xs font-semibold text-foreground/50">
        {label}
        {locked ? " · 자동" : ""}
      </p>
      <div className="rounded-xl border-2 border-border bg-surface px-3 py-2.5 text-base text-foreground">
        {value}
      </div>
    </div>
  );
}

function BottomNav({ active }: { active: "match" | "schedule" | "my" }) {
  const items = [
    { key: "match" as const, label: "매칭", Icon: HeartIcon },
    { key: "schedule" as const, label: "일정", Icon: CalendarIcon },
    { key: "my" as const, label: "프로필", Icon: UserIcon },
  ];
  return (
    <div className="shrink-0 border-t border-border bg-surface/95 px-1 pb-1 pt-1.5">
      <div className="flex justify-around">
        {items.map(({ key, label, Icon }) => {
          const on = active === key;
          return (
            <div
              key={key}
              className={`flex min-w-[4.5rem] flex-col items-center rounded-2xl px-3 py-1.5 ${
                on ? "bg-primary-light text-primary" : "text-foreground/45"
              }`}
            >
              <Icon className="mb-0.5 h-5 w-5" />
              <span className="text-[11px] font-semibold">{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function WfWelcome({ onCta }: { onCta: () => void }) {
  return (
    <div className="flex h-full flex-col px-5 pb-4 pt-8">
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <DemoLogoCircle className="mb-6" />
        <h1 className="text-4xl font-extrabold leading-tight text-foreground">
          다시, 봄이 옵니다
        </h1>
        <p className="mt-2 text-sm font-bold tracking-[0.25em] text-foreground/55">
          RE:BOM
        </p>
        <p className="mt-4 text-lg font-semibold text-foreground/80">
          50대 이상을 위한
          <br />
          프리미엄 인연 멤버십
        </p>
      </div>
      <Button fullWidth onClick={onCta}>
        시작하기
      </Button>
    </div>
  );
}

export function WfOnboarding({ onCta }: { onCta: () => void }) {
  return (
    <div className="flex h-full flex-col px-5 pb-4 pt-6">
      <div className="flex flex-1 flex-col justify-center space-y-5">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-light">
          <ShieldIcon className="h-7 w-7 text-primary" />
        </div>
        <h1 className="text-2xl font-extrabold text-foreground">
          검증된 분만
          <br />
          만납니다
        </h1>
        <ul className="space-y-2 text-base text-foreground/75">
          <li>· 휴대폰·얼굴·미혼 인증</li>
          <li>· 가치관·라이프 기반 소개</li>
          <li>· 리봄이 일정까지 조율</li>
        </ul>
        <p className="text-sm text-foreground/45">온보딩 슬라이드 요약 (탭으로 넘김)</p>
      </div>
      <div className="space-y-2">
        <Button fullWidth onClick={onCta}>
          시작하기
        </Button>
        <button type="button" onClick={onCta} className="w-full py-2 text-sm text-primary">
          이미 회원이에요
        </button>
      </div>
    </div>
  );
}

export function WfLogin({ onCta }: { onCta: () => void }) {
  return (
    <div className="flex h-full flex-col px-5 pb-4 pt-10">
      <div className="mb-8 text-center">
        <DemoLogoCircle className="mx-auto mb-4 h-20 w-20" />
        <h1 className="text-2xl font-bold text-foreground">로그인</h1>
        <p className="mt-1 text-sm text-foreground/55">카카오 · 구글 · 휴대폰</p>
      </div>
      <div className="space-y-3">
        <button
          type="button"
          onClick={onCta}
          className="flex min-h-12 w-full items-center justify-center rounded-2xl bg-[#FEE500] text-base font-bold text-[#191919]"
        >
          카카오로 계속하기
        </button>
        <button
          type="button"
          onClick={onCta}
          className="flex min-h-12 w-full items-center justify-center rounded-2xl border-2 border-border bg-surface text-base font-bold"
        >
          Google로 계속하기
        </button>
        <button
          type="button"
          onClick={onCta}
          className="flex min-h-12 w-full items-center justify-center rounded-2xl bg-primary text-base font-bold text-cream"
        >
          휴대폰 번호로 계속하기
        </button>
      </div>
    </div>
  );
}

export function WfConsent({ onCta }: { onCta: () => void }) {
  const items = [
    { label: "이용약관 동의", required: true, checked: true },
    { label: "개인정보 수집·이용", required: true, checked: true },
    { label: "제3자 제공 동의", required: true, checked: true },
    { label: "만 50세 이상입니다", required: true, checked: true },
    { label: "SMS 마케팅 (선택)", required: false, checked: false },
  ];
  return (
    <div className="flex h-full flex-col px-5 pb-4 pt-6">
      <h1 className="text-2xl font-bold text-foreground">약관 동의</h1>
      <p className="mt-1 text-sm text-foreground/55">신원검증을 시작하기 전</p>
      <ul className="mt-6 flex-1 space-y-3">
        {items.map((item) => (
          <li
            key={item.label}
            className="flex items-start gap-3 rounded-xl border-2 border-border bg-surface px-3 py-3"
          >
            <span
              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 text-xs ${
                item.checked
                  ? "border-primary bg-primary text-cream"
                  : "border-border"
              }`}
            >
              {item.checked ? "✓" : ""}
            </span>
            <span className="text-sm font-medium leading-snug">
              {item.label}
              {item.required ? (
                <span className="text-error"> *</span>
              ) : null}
            </span>
          </li>
        ))}
      </ul>
      <Button fullWidth onClick={onCta}>
        본인인증 하기
      </Button>
    </div>
  );
}

export function WfPhone({ onCta }: { onCta: () => void }) {
  return (
    <div className="flex h-full flex-col px-5 pb-4 pt-6">
      <h1 className="text-2xl font-bold">휴대폰 인증</h1>
      <p className="mt-1 text-sm text-foreground/55">실제 SMS 인증번호를 받습니다</p>
      <div className="mt-8 space-y-4">
        <Field label="휴대폰 번호" value="010-1234-5678" />
      </div>
      <div className="flex-1" />
      <Button fullWidth onClick={onCta}>
        인증번호 받기
      </Button>
    </div>
  );
}

export function WfOtp({ onCta }: { onCta: () => void }) {
  return (
    <div className="flex h-full flex-col px-5 pb-4 pt-6">
      <h1 className="text-2xl font-bold">인증번호 입력</h1>
      <p className="mt-1 text-sm text-foreground/55">문자로 받은 6자리</p>
      <div className="mt-10 flex justify-center gap-2">
        {["1", "2", "3", "4", "5", "6"].map((d) => (
          <div
            key={d}
            className="flex h-12 w-10 items-center justify-center rounded-xl border-2 border-primary bg-primary-light text-xl font-bold text-primary"
          >
            {d}
          </div>
        ))}
      </div>
      <div className="flex-1" />
      <Button fullWidth onClick={onCta}>
        확인
      </Button>
    </div>
  );
}

export function WfPhoneResult({ onCta }: { onCta: () => void }) {
  return (
    <div className="flex h-full flex-col px-5 pb-4 pt-6">
      <h1 className="text-2xl font-bold">본인 정보가 확인됐어요</h1>
      <p className="mt-1 text-sm text-foreground/55">OTP에서 가져온 실데이터</p>
      <div className="mt-6 space-y-3">
        <Field label="이름" value="김영숙" locked />
        <Field label="성별" value="여성" locked />
        <Field label="나이" value="58세" locked />
        <Field label="국적" value="대한민국" locked />
      </div>
      <div className="flex-1" />
      <Button fullWidth onClick={onCta}>
        다음 · 얼굴 인증
      </Button>
    </div>
  );
}

export function WfFace({ onCta }: { onCta: () => void }) {
  return (
    <div className="flex h-full flex-col px-5 pb-4 pt-6">
      <h1 className="text-2xl font-bold">얼굴 인증</h1>
      <p className="mt-1 text-sm text-foreground/55">실제 카메라로 본인 확인</p>
      <div className="mt-8 flex flex-1 flex-col items-center">
        <div className="relative h-56 w-44 overflow-hidden rounded-[2rem] border-4 border-primary/30 bg-[#1a2522]">
          <div className="absolute inset-6 rounded-full border-2 border-dashed border-cream/40" />
          <p className="absolute inset-x-0 bottom-4 text-center text-xs text-cream/70">
            얼굴을 맞춰 주세요
          </p>
        </div>
      </div>
      <Button fullWidth onClick={onCta}>
        촬영하기
      </Button>
    </div>
  );
}

export function WfFaceDone({ onCta }: { onCta: () => void }) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-5 pb-4 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-light text-3xl text-primary">
        ✓
      </div>
      <h1 className="text-2xl font-bold">얼굴 인증 완료</h1>
      <p className="mt-2 text-sm text-foreground/55">이제 미혼 인증을 진행합니다</p>
      <div className="mt-10 w-full">
        <Button fullWidth onClick={onCta}>
          계속
        </Button>
      </div>
    </div>
  );
}

export function WfMarital({ onCta }: { onCta: () => void }) {
  return (
    <div className="flex h-full flex-col px-5 pb-4 pt-6">
      <h1 className="text-2xl font-bold">미혼 인증</h1>
      <p className="mt-1 text-sm text-foreground/55">
        현재 혼인이면 가입 불가 · 나중에 하기 가능(매칭 잠금)
      </p>
      <div className="mt-6 space-y-3">
        <Field label="실명" value="김영숙" />
        <Field label="생년월일 6자리" value="650315" />
      </div>
      <div className="flex-1" />
      <div className="space-y-2">
        <Button fullWidth onClick={onCta}>
          미혼 인증하기
        </Button>
        <button type="button" onClick={onCta} className="w-full py-2 text-sm text-foreground/50">
          나중에 하기
        </button>
      </div>
    </div>
  );
}

export function WfVerifyDone({ onCta }: { onCta: () => void }) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-5 pb-4 text-center">
      <p className="mb-2 text-xs font-bold tracking-widest text-gold">3 OF 3 COMPLETE</p>
      <h1 className="text-2xl font-bold">신원검증이 끝났어요</h1>
      <p className="mt-2 text-sm text-foreground/55">프로필을 이어서 작성합니다</p>
      <div className="mt-10 w-full">
        <Button fullWidth onClick={onCta}>
          서비스 둘러보기
        </Button>
      </div>
    </div>
  );
}

export function WfSignupFee({ onCta, onSkip }: { onCta: () => void; onSkip: () => void }) {
  return (
    <div className="flex h-full flex-col justify-end bg-foreground/40 px-4 pb-6">
      <div className="rounded-3xl bg-surface p-5 shadow-xl">
        <p className="text-xs font-bold tracking-widest text-primary/60">JOIN FEE</p>
        <h1 className="mt-1 text-xl font-bold">가입비 10만원</h1>
        <p className="mt-2 text-sm leading-relaxed text-foreground/65">
          나중에 내도 됩니다. 다만 매칭에서 다른 회원 프로필을 보려면 결제가 필요합니다.
        </p>
        <div className="mt-5 space-y-2">
          <Button fullWidth onClick={onCta}>
            결제하기
          </Button>
          <button
            type="button"
            onClick={onSkip}
            className="w-full py-2 text-sm font-medium text-foreground/50"
          >
            나중에 하기
          </button>
        </div>
      </div>
    </div>
  );
}

export function WfProfile({ onCta }: { onCta: () => void }) {
  return (
    <div className="flex h-full flex-col px-5 pb-4 pt-5">
      <h1 className="text-2xl font-bold">프로필</h1>
      <p className="mt-1 text-sm text-foreground/55">사진 필수 · 수도권</p>
      <div className="mt-4 flex gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="flex h-20 w-20 items-center justify-center rounded-xl border-2 border-dashed border-primary/40 bg-primary-light text-xs font-semibold text-primary"
          >
            {i === 0 ? "사진+" : "+"}
          </div>
        ))}
      </div>
      <div className="mt-4 space-y-3">
        <Field label="닉네임" value="봄이오는길" />
        <Field label="성별" value="여성" locked />
        <Field label="출생연도" value="1965" locked />
        <Field label="지역" value="서울" />
      </div>
      <div className="flex-1" />
      <Button fullWidth onClick={onCta}>
        다음 · 가치관
      </Button>
    </div>
  );
}

export function WfValues({ onCta }: { onCta: () => void }) {
  return (
    <div className="flex h-full flex-col px-5 pb-4 pt-5">
      <p className="text-xs font-bold text-primary/60">가치관 1 / 5</p>
      <h1 className="mt-1 text-xl font-bold">만남에서 가장 중요한 것은?</h1>
      <div className="mt-5 flex flex-wrap gap-2">
        <Chip label="진솔한 대화" selected />
        <Chip label="서로 존중" selected />
        <Chip label="천천히 알아가기" />
        <Chip label="가족·인연 중시" />
        <Chip label="함께 성장" />
      </div>
      <p className="mt-4 text-xs text-foreground/45">
        와이어: 5문항(관계·정치·종교·피하고 싶은 것) 동일 패턴
      </p>
      <div className="flex-1" />
      <Button fullWidth onClick={onCta}>
        다음
      </Button>
    </div>
  );
}

export function WfLifestyle({ onCta }: { onCta: () => void }) {
  return (
    <div className="flex h-full flex-col px-5 pb-4 pt-5">
      <p className="text-xs font-bold text-primary/60">라이프스타일</p>
      <h1 className="mt-1 text-xl font-bold">좋아하는 활동</h1>
      <div className="mt-5 flex flex-wrap gap-2">
        <Chip label="산책·등산" selected />
        <Chip label="요리·맛집" />
        <Chip label="여행" selected />
        <Chip label="독서·영화" />
        <Chip label="음악·공연" />
      </div>
      <p className="mt-4 text-xs text-foreground/45">
        이어서 가족 · 자기관리 · 음주+흡연 (각 최소 1개)
      </p>
      <div className="flex-1" />
      <Button fullWidth onClick={onCta}>
        완료 · 매칭으로
      </Button>
    </div>
  );
}

export function WfMatchBlur({ onCta }: { onCta: () => void }) {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="relative min-h-0 flex-1 overflow-hidden px-5 pt-4">
        <h1 className="text-2xl font-bold text-primary">매칭</h1>
        <div className="mt-3 blur-sm select-none">
          <div className="relative mb-3 h-40 overflow-hidden rounded-xl bg-muted">
            <Image
              src="/images/candidates/lee-kyung-hee.png"
              alt=""
              fill
              className="object-cover"
            />
          </div>
          <p className="text-lg font-bold">이경희 · 55</p>
          <p className="text-sm text-foreground/60">서울 강남</p>
        </div>
        <div className="absolute inset-x-5 top-24 rounded-2xl border-2 border-primary/20 bg-surface/95 p-4 shadow-lg backdrop-blur">
          <div className="mb-2 flex items-center gap-2 text-primary">
            <LockIcon className="h-5 w-5" />
            <span className="font-bold">결제 · 인증이 필요해요</span>
          </div>
          <p className="text-sm leading-relaxed text-foreground/65">
            가입비 결제와 미혼 인증을 마쳐야 다른 회원 프로필을 볼 수 있습니다.
          </p>
          <Button fullWidth className="mt-4" onClick={onCta}>
            결제 / 인증하기
          </Button>
        </div>
      </div>
      <BottomNav active="match" />
    </div>
  );
}

export function WfMatchProposal({ onCta }: { onCta: () => void }) {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-3 pt-4">
        <div className="mb-2 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">매칭 제안</h1>
          <span className="rounded-full bg-gold/20 px-2 py-0.5 text-[10px] font-bold text-primary">
            48시간
          </span>
        </div>
        <p className="mb-3 text-xs text-foreground/50">리봄이 소개한 분 · 2일 주기 1건</p>
        <div className="relative mb-3 h-44 overflow-hidden rounded-xl">
          <Image
            src="/images/candidates/lee-kyung-hee.png"
            alt="이경희"
            fill
            className="object-cover"
          />
        </div>
        <p className="text-xl font-bold">이경희 · 55</p>
        <p className="text-sm text-foreground/60">서울 강남 · 미혼 인증 완료</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          <Chip label="진솔한 대화" selected />
          <Chip label="여행" selected />
          <Chip label="고졸" />
        </div>
        <div className="mt-5 space-y-2">
          <Button fullWidth onClick={onCta}>
            수락하기
          </Button>
          <button type="button" className="w-full py-2 text-sm text-foreground/45">
            거절하기
          </button>
        </div>
      </div>
      <BottomNav active="match" />
    </div>
  );
}

export function WfMatchPay({ onCta }: { onCta: () => void }) {
  return (
    <div className="flex h-full flex-col justify-end bg-foreground/40 px-4 pb-6">
      <div className="rounded-3xl bg-surface p-5 shadow-xl">
        <p className="text-xs font-bold tracking-widest text-primary/60">MATCHING FEE</p>
        <h1 className="mt-1 text-xl font-bold">매칭비 30,000원</h1>
        <p className="mt-2 text-sm text-foreground/65">
          양쪽 모두 결제 · 첫 매칭 수락 1회는 무료
        </p>
        <div className="mt-4 rounded-xl bg-primary-light px-3 py-2 text-sm font-semibold text-primary">
          이번 결제: 무료 (첫 1회)
        </div>
        <Button fullWidth className="mt-5" onClick={onCta}>
          확인하고 수락
        </Button>
      </div>
    </div>
  );
}

export function WfMatchWait({ onCta }: { onCta: () => void }) {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <div className="mb-4 h-12 w-12 animate-pulse rounded-full bg-gold/40" />
        <h1 className="text-xl font-bold">상대측 결제 대기중</h1>
        <p className="mt-2 text-sm leading-relaxed text-foreground/60">
          회원님은 수락·결제를 마쳤습니다.
          <br />
          상대가 48시간 안에 완료하면 매칭이 성사됩니다.
        </p>
        <Button className="mt-8" onClick={onCta}>
          (데모) 상대 완료 → 일정
        </Button>
      </div>
      <BottomNav active="match" />
    </div>
  );
}

export function WfAvailability({ onCta }: { onCta: () => void }) {
  const days = ["월", "화", "수", "목", "금", "토", "일"];
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-3 pt-4">
        <h1 className="text-xl font-bold">불가능 시간을 알려 주세요</h1>
        <p className="mt-1 text-sm text-foreground/55">앞으로 10일 안에서 · 가능 시간이 아님</p>
        <div className="mt-4 grid grid-cols-7 gap-1.5">
          {days.map((d, i) => (
            <div
              key={d}
              className={`flex aspect-square items-center justify-center rounded-lg text-xs font-bold ${
                i === 2 || i === 5
                  ? "bg-error/15 text-error ring-2 ring-error/30"
                  : "bg-muted text-foreground/60"
              }`}
            >
              {d}
            </div>
          ))}
        </div>
        <p className="mt-2 text-[11px] text-error/80">빨간 칸 = 불가능한 날/시간</p>
        <div className="mt-5 space-y-3">
          <Field label="가능 장소 (필수)" value="강남 · 압구정 · 분당" />
          <Field label="리봄에게 메모 (선택)" value="저녁 약속은 피하고 싶어요" />
        </div>
        <Button fullWidth className="mt-6" onClick={onCta}>
          제출하기
        </Button>
      </div>
      <BottomNav active="schedule" />
    </div>
  );
}

export function WfScheduleProposal({ onCta }: { onCta: () => void }) {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-3 pt-4">
        <p className="text-xs font-bold tracking-widest text-gold">RE:BOM 제안</p>
        <h1 className="mt-1 text-xl font-bold">일정·장소가 도착했어요</h1>
        <div className="mt-5 space-y-3 rounded-2xl border-2 border-primary/20 bg-primary-light/40 p-4">
          <p className="text-sm text-foreground/55">날짜</p>
          <p className="text-lg font-bold">7월 18일 (토) 오후 2:00</p>
          <p className="mt-3 text-sm text-foreground/55">장소</p>
          <p className="text-lg font-bold">경희다이닝 강남역점</p>
        </div>
        <p className="mt-3 text-xs text-foreground/45">일정 수락 시 추가 결제 없음</p>
        <div className="mt-6 space-y-2">
          <Button fullWidth onClick={onCta}>
            수락하기
          </Button>
          <button type="button" className="w-full py-2 text-sm text-foreground/45">
            조율 요청
          </button>
        </div>
      </div>
      <BottomNav active="schedule" />
    </div>
  );
}

export function WfScheduleConfirmed({ onCta }: { onCta: () => void }) {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-2xl text-cream">
          ✓
        </div>
        <h1 className="text-xl font-bold">일정이 확정됐어요</h1>
        <p className="mt-2 text-sm text-foreground/60">
          7월 18일 오후 2:00
          <br />
          경희다이닝 강남역점
        </p>
        <p className="mt-4 rounded-xl bg-muted px-3 py-2 text-xs leading-relaxed text-foreground/65">
          채팅은 만남 24시간 전에 열립니다.
          <br />
          앱에서 휴대폰 번호는 공개되지 않습니다.
        </p>
        <Button className="mt-8" onClick={onCta}>
          채팅 미리보기
        </Button>
      </div>
      <BottomNav active="schedule" />
    </div>
  );
}

export function WfChat({ onCta }: { onCta: () => void }) {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="border-b border-border px-4 py-3">
        <p className="font-bold">이경희</p>
        <p className="text-[11px] text-foreground/45">채팅 · 만남 후 24시간 내 종료</p>
      </div>
      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto bg-muted/40 px-4 py-4">
        <div className="rounded-2xl bg-gold/15 px-3 py-2 text-center text-xs leading-relaxed text-foreground/70">
          만나서 연락처를 교환해 주세요.
          <br />
          앱에서는 번호가 공개되지 않습니다.
        </div>
        <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-surface px-3 py-2 text-sm shadow-sm">
          안녕하세요, 만나서 반가워요.
        </div>
        <div className="ml-auto max-w-[80%] rounded-2xl rounded-tr-sm bg-primary px-3 py-2 text-sm text-cream">
          네, 저도요. 토요일에 뵙겠습니다.
        </div>
      </div>
      <div className="flex gap-2 border-t border-border bg-surface p-3">
        <div className="flex-1 rounded-xl border-2 border-border px-3 py-2 text-sm text-foreground/35">
          메시지 입력
        </div>
        <button
          type="button"
          onClick={onCta}
          className="rounded-xl bg-primary px-4 text-sm font-bold text-cream"
        >
          전송
        </button>
      </div>
    </div>
  );
}

export function WfMy() {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-3 pt-4">
        <h1 className="text-2xl font-bold text-primary">내 정보</h1>
        <div className="mt-4 flex items-center gap-3">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-light text-lg font-bold text-primary">
            봄
          </div>
          <div>
            <p className="text-lg font-bold">봄이오는길</p>
            <p className="text-sm text-foreground/55">58 · 서울</p>
          </div>
        </div>
        <ul className="mt-6 divide-y divide-border rounded-2xl border-2 border-border bg-surface">
          {[
            "프로필 수정",
            "가치관 · 라이프 수정",
            "미혼 인증하기",
            "학력 인증 (초·중·고·대)",
            "직업 인증 (서류 업로드)",
            "결제 내역",
            "로그아웃",
          ].map((label) => (
            <li key={label} className="px-4 py-3.5 text-sm font-medium">
              {label}
            </li>
          ))}
        </ul>
      </div>
      <BottomNav active="my" />
    </div>
  );
}
