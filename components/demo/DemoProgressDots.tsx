type DemoProgressDotsProps = {
  total: number;
  current: number;
};

export function DemoProgressDots({ total, current }: DemoProgressDotsProps) {
  return (
    <div className="flex items-center justify-center gap-3" aria-hidden>
      {Array.from({ length: total }).map((_, index) => (
        <span
          key={index}
          className={`rounded-full transition-all duration-300 ${
            index === current
              ? "w-3.5 h-3.5 bg-primary"
              : "w-3 h-3 bg-border"
          }`}
        />
      ))}
    </div>
  );
}
