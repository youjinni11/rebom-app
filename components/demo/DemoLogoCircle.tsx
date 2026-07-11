import { BrandMark } from "@/components/BrandMark";

type DemoLogoCircleProps = {
  className?: string;
};

export function DemoLogoCircle({ className = "" }: DemoLogoCircleProps) {
  return (
    <div
      className={`w-36 h-36 rounded-full bg-primary-light flex items-center justify-center overflow-hidden ${className}`}
    >
      <BrandMark
        size="lg"
        iconSize={140}
        showText={false}
        className="gap-0"
        imageClassName="mix-blend-darken"
      />
    </div>
  );
}
