type DemoEditControlsProps = {
  totalSlides: number;
  currentIndex: number;
  isPlaying: boolean;
  isComplete: boolean;
  loop: boolean;
  onLoopChange: (loop: boolean) => void;
  onPause: () => void;
  onResume: () => void;
  onRestart: () => void;
  onGoToSlide: (index: number) => void;
};

export function DemoEditControls({
  totalSlides,
  currentIndex,
  isPlaying,
  isComplete,
  loop,
  onLoopChange,
  onPause,
  onResume,
  onRestart,
  onGoToSlide,
}: DemoEditControlsProps) {
  return (
    <div className="fixed top-4 left-4 z-50 flex flex-col gap-2 text-sm w-[10.5rem] max-h-[calc(100dvh-2rem)] overflow-y-auto overscroll-contain">
      <div className="bg-surface/95 border border-border rounded-xl px-3 py-2 text-foreground shadow-lg space-y-2">
        <p className="text-xs font-bold text-primary">디자인 모드</p>
        <p className="text-xs text-foreground/60 leading-snug">
          멈춘 뒤 화면 번호를 고르거나 Cursor 디자인 모드로 수정하세요.
        </p>
      </div>

      <button
        type="button"
        onClick={isPlaying ? onPause : onResume}
        className="bg-primary text-cream rounded-xl px-4 py-2.5 font-bold shadow-lg hover:bg-primary-hover transition-colors"
      >
        {isPlaying ? "일시정지" : "재생"}
      </button>

      <div className="flex gap-2">
        <button
          type="button"
          disabled={currentIndex === 0}
          onClick={() => onGoToSlide(currentIndex - 1)}
          className="flex-1 bg-surface/95 border border-border rounded-xl px-3 py-2 font-medium shadow-lg disabled:opacity-40"
        >
          이전
        </button>
        <button
          type="button"
          disabled={currentIndex >= totalSlides - 1}
          onClick={() => onGoToSlide(currentIndex + 1)}
          className="flex-1 bg-surface/95 border border-border rounded-xl px-3 py-2 font-medium shadow-lg disabled:opacity-40"
        >
          다음
        </button>
      </div>

      <div className="bg-surface/95 border border-border rounded-xl px-3 py-3 shadow-lg">
        <p className="text-xs font-semibold text-foreground/70 mb-2">화면 선택</p>
        <div className="grid grid-cols-3 gap-1.5">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => onGoToSlide(index)}
              className={`min-h-9 rounded-lg text-sm font-bold transition-colors ${
                index === currentIndex
                  ? "bg-primary text-cream"
                  : "bg-muted text-foreground hover:bg-primary-light"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      <label className="flex items-center gap-2 bg-surface/95 border border-border rounded-xl px-3 py-2 text-foreground shadow-lg cursor-pointer">
        <input
          type="checkbox"
          checked={loop}
          onChange={(e) => onLoopChange(e.target.checked)}
          className="w-4 h-4 accent-primary"
        />
        <span>반복 재생</span>
      </label>

      {(isComplete || !isPlaying) && (
        <button
          type="button"
          onClick={onRestart}
          className="bg-surface/95 border border-border rounded-xl px-4 py-2 font-medium shadow-lg hover:bg-muted transition-colors"
        >
          처음부터
        </button>
      )}
    </div>
  );
}
