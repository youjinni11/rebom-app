"use client";

type DemoRecordWindowButtonProps = {
  href: string;
  label?: string;
};

/** 9:16 비율에 맞춘 작은 창으로 데모를 엽니다 (GIF 녹화용) */
export function DemoRecordWindowButton({
  href,
  label = "9:16 녹화 창 열기",
}: DemoRecordWindowButtonProps) {
  function openRecordWindow() {
    const { width, height } = { width: 760, height: 1360 };
    const features = [
      `width=${width}`,
      `height=${height}`,
      "menubar=no",
      "toolbar=no",
      "location=no",
      "status=no",
      "scrollbars=no",
    ].join(",");

    window.open(href, "rebom-demo-record", features);
  }

  return (
    <button
      type="button"
      onClick={openRecordWindow}
      className="flex items-center justify-center min-h-11 px-4 py-2 border-2 border-gold/60 text-primary font-bold rounded-xl hover:bg-gold/10 transition-colors text-sm"
    >
      {label}
    </button>
  );
}
