import Link from "next/link";
import { Logo } from "@/components/Logo";

export function Footer() {
  return (
    <footer id="contact" className="py-20 px-6 bg-[#1a1a1a] text-white">
      <div className="max-w-4xl mx-auto text-center space-y-10">
        <div className="space-y-4">
          <div className="flex justify-center">
            <Logo size="lg" href="/" textClassName="text-white" />
          </div>
          <p className="text-[#aaa] text-sm leading-relaxed">
            검증된 인연만이 모이는 프리미엄 시니어 멤버십
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/pre-register"
            className="inline-flex items-center justify-center px-10 py-4 bg-teal text-white text-base font-medium hover:bg-teal-hover transition-colors"
          >
            사전예약 신청하기
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center justify-center px-10 py-4 border border-[#555] text-[#ccc] text-base font-medium hover:border-teal hover:text-teal transition-colors"
          >
            로그인
          </Link>
        </div>

        <div className="pt-8 border-t border-[#333] space-y-2">
          <p className="text-xs text-[#666] tracking-wide">
            RE:BOM — SPRING RETURNS AGAIN
          </p>
          <p className="text-xs text-[#555]">
            &copy; {new Date().getFullYear()} 리봄. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
