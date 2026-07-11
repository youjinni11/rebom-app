type VerificationMedallionItem = {
  id: "education" | "income";
  label: string;
  earned: boolean;
};

type VerificationMedallionsProps = {
  badges: VerificationMedallionItem[];
  showCount?: boolean;
  size?: "sm" | "md";
};

export function VerificationMedallions({
  badges,
  showCount = true,
  size = "md",
}: VerificationMedallionsProps) {
  const earnedCount = badges.filter((badge) => badge.earned).length;
  const medallionSize = size === "sm" ? "h-9 w-9" : "h-11 w-11";
  const innerSize = size === "sm" ? "h-6 w-6" : "h-7 w-7";
  const iconSize = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";

  return (
    <div className="w-full">
      {showCount && (
        <div className="flex items-center justify-between mb-2 px-0.5">
          <p className="text-[10px] font-extrabold tracking-[0.14em] text-primary/70">
            인증 뱃지
          </p>
          <span className="text-[10px] font-bold text-gold tabular-nums">
            {earnedCount}/{badges.length}
          </span>
        </div>
      )}
      <div className="flex justify-center gap-4">
        {badges.map((badge) => (
          <div key={badge.id} className="flex flex-col items-center gap-1 w-[2.75rem]">
            <div
              className={`relative ${medallionSize} rounded-full flex items-center justify-center transition-all ${
                badge.earned
                  ? "bg-gradient-to-br from-gold/30 via-primary-light to-primary/10 shadow-[0_4px_14px_rgba(201,169,98,0.28)] ring-2 ring-gold/55"
                  : "bg-muted/90 ring-1 ring-border/90"
              }`}
            >
              <span
                className={`flex ${innerSize} items-center justify-center rounded-full ${
                  badge.earned
                    ? "bg-primary/10 text-primary"
                    : "bg-foreground/[0.04] text-foreground/30"
                }`}
              >
                {badge.id === "education" ? (
                  <GraduationBadgeIcon className={iconSize} />
                ) : (
                  <IncomeBadgeIcon className={iconSize} />
                )}
              </span>

              {badge.earned ? (
                <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-cream border-2 border-white shadow-sm">
                  <CheckIcon className="h-2 w-2" />
                </span>
              ) : (
                <span className="absolute inset-0 flex items-center justify-center rounded-full bg-background/45 backdrop-blur-[1px]">
                  <LockIcon className="h-3 w-3 text-foreground/40" />
                </span>
              )}
            </div>
            <span
              className={`text-[10px] font-bold leading-none text-center ${
                badge.earned ? "text-primary" : "text-foreground/35"
              }`}
            >
              {badge.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.5 6l2.5 2.5 5-5" />
    </svg>
  );
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden
    >
      <rect x="6" y="11" width="12" height="9" rx="2" />
      <path strokeLinecap="round" d="M9 11V8a3 3 0 016 0v3" />
    </svg>
  );
}

function GraduationBadgeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4L3 9l9 5 9-5-9-5z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 11v4c0 2 3.5 4 6 4s6-2 6-4v-4" />
    </svg>
  );
}

function IncomeBadgeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden
    >
      <circle cx="12" cy="12" r="8" />
      <path strokeLinecap="round" d="M12 8v8M9.5 10.5h4a1.5 1.5 0 010 3h-4" />
    </svg>
  );
}
