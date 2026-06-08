"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/home", label: "추천" },
  { href: "/matches", label: "매칭" },
  { href: "/schedule", label: "일정" },
  { href: "/my", label: "내 정보" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-surface/95 backdrop-blur border-t border-border z-50 shadow-[0_-4px_24px_rgba(26,71,58,0.06)]">
      <div className="max-w-lg mx-auto flex justify-around py-2">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center min-w-[72px] py-2 px-3 rounded-2xl transition-colors ${
                active
                  ? "text-primary bg-primary-light font-semibold"
                  : "text-foreground/55"
              }`}
            >
              {active && (
                <span className="w-5 h-0.5 bg-gold rounded-full mb-1" aria-hidden />
              )}
              <span className="text-base">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
