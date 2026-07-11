import { DemoAutoTap } from "@/components/demo/DemoAutoTap";
import { ShieldIcon } from "@/components/demo/DemoIcons";
import { Button } from "@/components/ui/Button";

type DemoMaritalImportanceScreenProps = {
  autoTapVisible?: boolean;
  buttonPressed?: boolean;
  onDocumentVerifyClick?: () => void;
};

const TRUST_POINTS = [
  {
    title: "왜 확인하나요?",
    body: "리봄은 미혼 회원만을 위한 만남 서비스입니다. 혼인관계증명서로 미혼 사실을 확인해, 서로 신뢰할 수 있는 환경을 만듭니다.",
  },
  {
    title: "정당한 절차입니다",
    body: "국가가 발급한 공식 서류로 확인하며, 모든 회원이 동일한 기준으로 인증받습니다.",
  },
  {
    title: "안전한 만남의 시작",
    body: "검증된 회원만 이용할 수 있어, 진심 어린 만남에 집중하실 수 있습니다.",
  },
] as const;

export function DemoMaritalImportanceScreen({
  autoTapVisible = false,
  buttonPressed = false,
  onDocumentVerifyClick,
}: DemoMaritalImportanceScreenProps) {
  return (
    <div className="flex-1 flex flex-col min-h-0 animate-demo-fade-in">
      <div className="flex-1 min-h-0 flex flex-col justify-center space-y-4 overflow-y-auto">
        <div className="text-center space-y-2">
          <p className="text-base font-extrabold tracking-[0.2em] text-primary">
            MARITAL VERIFICATION
          </p>
          <h2 className="font-sans text-3xl font-black text-foreground leading-tight">
            미혼 사실 인증이
            <br />
            필요한 이유
          </h2>
        </div>

        <div className="w-16 h-16 mx-auto rounded-full bg-primary-light flex items-center justify-center text-primary shrink-0">
          <ShieldIcon className="w-11 h-11" />
        </div>

        <div className="space-y-2.5">
          {TRUST_POINTS.map((point) => (
            <div
              key={point.title}
              className="bg-white border-2 border-primary/15 rounded-2xl px-4 py-3 text-left"
            >
              <p className="text-sm font-extrabold text-primary mb-1">{point.title}</p>
              <p className="text-base font-semibold text-foreground/85 leading-snug">
                {point.body}
              </p>
            </div>
          ))}
        </div>

        <p className="text-[11px] font-medium text-foreground/45 leading-relaxed text-center px-1">
          사실혼(혼인신고 없이 사실상 혼인 관계) 상태에서는 이용이 불가합니다.
          <br />
          허위 정보 제공 시 추후 문제 발생에 대한 모든 법적 책임은 본인에게 있습니다.
        </p>
      </div>

      <div className="relative shrink-0 pt-3 pb-1">
        <Button
          variant="primary"
          fullWidth
          onClick={onDocumentVerifyClick}
          className={`min-h-14 text-xl font-bold transition-transform duration-150 ${
            buttonPressed
              ? "scale-[0.97] brightness-95 animate-none"
              : "animate-demo-pulse-brand"
          }`}
        >
          서류인증하기
        </Button>
        <DemoAutoTap visible={autoTapVisible} />
      </div>
    </div>
  );
}
