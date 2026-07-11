import Image from "next/image";

const iconSizes = {
  sm: 40,
  md: 56,
  lg: 80,
  xl: 104,
} as const;

type BrandMarkProps = {
  size?: keyof typeof iconSizes;
  iconSize?: number;
  showText?: boolean;
  textClassName?: string;
  imageClassName?: string;
  className?: string;
};

export function BrandMark({
  size = "md",
  iconSize,
  showText = true,
  textClassName = "text-primary",
  imageClassName = "mix-blend-multiply",
  className = "",
}: BrandMarkProps) {
  const px = iconSize ?? iconSizes[size];
  const textSize =
    size === "xl" ? "text-4xl" : size === "lg" ? "text-3xl" : "text-2xl";

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      <Image
        src="/logo.png"
        alt=""
        width={px}
        height={px}
        className={`object-contain ${imageClassName}`}
        priority={size === "xl" || size === "lg"}
      />
      {showText && (
        <span
          className={`font-serif font-semibold tracking-tight ${textSize} ${textClassName}`}
        >
          리봄
        </span>
      )}
    </div>
  );
}
