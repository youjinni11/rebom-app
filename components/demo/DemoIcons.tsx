type IconProps = {
  className?: string;
};

export function ShieldIcon({ className = "w-20 h-20" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M32 6L12 14v16c0 12.5 8.5 24.2 20 28 11.5-3.8 20-15.5 20-28V14L32 6z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M24 32l6 6 12-14"
      />
    </svg>
  );
}

export function LockIcon({ className = "w-20 h-20" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden
    >
      <rect x="16" y="28" width="32" height="26" rx="4" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M24 28v-6a8 8 0 0116 0v6"
      />
      <circle cx="32" cy="41" r="3" fill="currentColor" stroke="none" />
      <path strokeLinecap="round" d="M32 44v5" />
    </svg>
  );
}

export function PhoneIcon({ className = "w-20 h-20" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden
    >
      <rect x="20" y="8" width="24" height="48" rx="4" />
      <circle cx="32" cy="48" r="2" fill="currentColor" stroke="none" />
      <path strokeLinecap="round" d="M26 14h12" />
    </svg>
  );
}

export function CertificateIcon({ className = "w-20 h-20" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14 12h36v40l-9-5-9 5-9-5-9 5V12z"
      />
      <path strokeLinecap="round" d="M24 24h16M24 32h12M24 40h8" />
    </svg>
  );
}

export function FaceIcon({ className = "w-20 h-20" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden
    >
      <ellipse cx="32" cy="34" rx="18" ry="22" />
      <circle cx="24" cy="30" r="2" fill="currentColor" stroke="none" />
      <circle cx="40" cy="30" r="2" fill="currentColor" stroke="none" />
      <path strokeLinecap="round" d="M24 42c3 4 13 4 16 0" />
    </svg>
  );
}

export function CheckCircleIcon({ className = "w-20 h-20" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden
    >
      <circle cx="32" cy="32" r="24" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20 32l8 8 16-18"
      />
    </svg>
  );
}

export function HeartIcon({ className = "w-20 h-20" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M32 54s-18-12-18-28a10 10 0 0118-6 10 10 0 0118 6c0 16-18 28-18 28z"
      />
    </svg>
  );
}

export function CompassIcon({ className = "w-20 h-20" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden
    >
      <circle cx="32" cy="32" r="22" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M38 26l-4 16-16 4 4-16 16-4z"
      />
      <circle cx="32" cy="32" r="2" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function SproutIcon({ className = "w-20 h-20" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M32 52V28"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M32 36c-10-2-18-10-20-22 12 2 20 10 22 20"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M32 36c10-2 18-10 20-22-12 2-20 10-22 20"
      />
      <path strokeLinecap="round" d="M24 52h16" />
    </svg>
  );
}

export function CameraIcon({ className = "w-20 h-20" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden
    >
      <rect x="10" y="18" width="44" height="32" rx="4" />
      <circle cx="32" cy="34" r="10" />
      <path strokeLinecap="round" d="M24 18l4-8h8l4 8" />
      <circle cx="46" cy="24" r="2" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function UserIcon({ className = "w-20 h-20" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden
    >
      <circle cx="32" cy="22" r="10" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14 54c4-12 12-18 18-18s14 6 18 18"
      />
    </svg>
  );
}

export function CalendarIcon({ className = "w-20 h-20" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden
    >
      <rect x="12" y="14" width="40" height="38" rx="4" />
      <path strokeLinecap="round" d="M12 24h40" />
      <path strokeLinecap="round" d="M22 10v8M42 10v8" />
      <rect x="22" y="32" width="8" height="8" rx="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}
