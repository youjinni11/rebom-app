type DemoAutoTapProps = {
  visible: boolean;
};

export function DemoAutoTap({ visible }: DemoAutoTapProps) {
  if (!visible) return null;

  return (
    <div
      className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
      aria-hidden
    >
      <span className="relative flex items-center justify-center">
        <span className="absolute w-16 h-16 rounded-full bg-white/40 animate-demo-tap-ring" />
        <span className="w-10 h-10 rounded-full bg-white/70 border-2 border-white shadow-md animate-demo-tap-press" />
      </span>
    </div>
  );
}
