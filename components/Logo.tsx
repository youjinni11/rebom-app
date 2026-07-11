import Image from "next/image";
import Link from "next/link";

const sizes = {
  sm: { img: 28, text: "text-lg" },
  md: { img: 32, text: "text-xl" },
  lg: { img: 44, text: "text-2xl" },
  xl: { img: 56, text: "text-3xl" },
} as const;

type LogoProps = {
  size?: keyof typeof sizes;
  href?: string;
  className?: string;
  textClassName?: string;
};

export function Logo({
  size = "md",
  href = "/",
  className = "",
  textClassName = "text-[#1a1a1a]",
}: LogoProps) {
  const s = sizes[size];

  const content = (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Image
        src="/logo.png"
        alt=""
        width={s.img}
        height={s.img}
        className="object-contain shrink-0 mix-blend-multiply"
        priority={size === "lg" || size === "xl"}
      />
      <span
        className={`font-serif font-semibold tracking-tight ${s.text} ${textClassName}`}
      >
        리봄
      </span>
    </span>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex hover:opacity-80 transition-opacity">
        {content}
      </Link>
    );
  }

  return content;
}
