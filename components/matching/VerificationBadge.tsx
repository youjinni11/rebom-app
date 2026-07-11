import { CheckCircleIcon } from "@/components/demo/DemoIcons";

export function VerificationBadge() {
  return (
    <div className="bg-primary-light border-2 border-primary/20 rounded-2xl px-4 py-3 flex items-start gap-3">
      <div className="shrink-0 w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-0.5">
        <CheckCircleIcon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-sm font-extrabold text-primary leading-snug">
          미혼 상태 인증 완료
        </p>
        <p className="text-sm font-semibold text-foreground/70 mt-0.5 leading-snug">
          인증된 회원만 매칭 서비스를 이용할 수 있습니다
        </p>
      </div>
    </div>
  );
}
