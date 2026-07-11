"use client";

import Link from "next/link";
import {
  CalendarIcon,
  HeartIcon,
  UserIcon,
} from "@/components/demo/DemoIcons";

const NAV_ITEMS = [
  { label: "매칭", icon: HeartIcon, href: "/demo/matching" },
  { label: "일정", icon: CalendarIcon, href: "/demo/schedule" },
  { label: "프로필", icon: UserIcon, href: "/demo/profile-curation?design=1&slide=4" },
] as const;

type DemoBottomNavProps = {
  activeIndex?: number;
  onItemClick?: (index: number) => void;
  docked?: boolean;
  bottomInset?: string;
  /** true면 탭 클릭 시 데모 페이지로 이동 */
  demoLinks?: boolean;
};

export function DemoBottomNav({
  activeIndex = 0,
  onItemClick,
  docked = true,
  bottomInset = "bottom-0",
  demoLinks = false,
}: DemoBottomNavProps) {
  return (
    <nav
      className={
        docked
          ? `absolute ${bottomInset} -left-5 -right-5 z-20 bg-surface/95 backdrop-blur-md border-t border-border shadow-[0_-4px_24px_rgba(26,71,58,0.08)]`
          : "shrink-0 bg-surface/95 backdrop-blur-md border-t border-border shadow-[0_-4px_24px_rgba(26,71,58,0.08)]"
      }
    >
      <div className="flex justify-around px-1 pt-2 pb-2.5">
        {NAV_ITEMS.map(({ label, icon: Icon, href }, index) => {
          const active = index === activeIndex;
          const isProfile = index === 2;
          const useCustomClick = isProfile && Boolean(onItemClick) && !demoLinks;

          const className = `relative flex flex-col items-center min-w-[4.75rem] py-2 px-3 rounded-2xl transition-all duration-200 ${
            active
              ? "text-primary bg-primary-light font-semibold shadow-sm"
              : "text-foreground/50"
          } ${useCustomClick || demoLinks ? "cursor-pointer active:scale-[0.98]" : "cursor-default"}`;

          const content = (
            <>
              {active && (
                <span
                  className="absolute top-1 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-gold rounded-full"
                  aria-hidden
                />
              )}
              <Icon className={`w-6 h-6 mb-1 ${active ? "text-primary" : "text-foreground/45"}`} />
              <span className="text-[0.95rem] leading-none tracking-tight">{label}</span>
            </>
          );

          if (demoLinks) {
            return (
              <Link key={label} href={href} className={className}>
                {content}
              </Link>
            );
          }

          return (
            <button
              key={label}
              type="button"
              onClick={() => onItemClick?.(index)}
              disabled={!useCustomClick && Boolean(onItemClick) && !active}
              className={className}
            >
              {content}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
