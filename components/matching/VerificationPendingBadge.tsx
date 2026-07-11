import Link from "next/link";
import { CertificateIcon } from "@/components/demo/DemoIcons";
import { Button } from "@/components/ui/Button";

export function VerificationPendingBadge() {
  return (
    <div className="bg-amber-50 border-2 border-amber-200/80 rounded-2xl px-4 py-3 flex items-start gap-3">
      <div className="shrink-0 w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 mt-0.5">
        <CertificateIcon className="w-6 h-6" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-extrabold text-amber-800 leading-snug">
          미혼 상태 인증이 필요합니다
        </p>
        <p className="text-sm font-semibold text-foreground/70 mt-0.5 leading-snug">
          인증을 완료하면 매칭 서비스를 이용할 수 있습니다
        </p>
        <Link href="/signup/verify" className="inline-block mt-2">
          <Button variant="outline" className="min-h-9 text-sm font-bold px-4">
            미혼 인증하기
          </Button>
        </Link>
      </div>
    </div>
  );
}
