import { DemoAutoTap } from "@/components/demo/DemoAutoTap";
import { CertificateIcon, CheckCircleIcon } from "@/components/demo/DemoIcons";
import { DEMO_USER } from "@/components/demo/demo-user";
import { Button } from "@/components/ui/Button";

type DemoMaritalVerificationFormProps = {
  autoTapVisible?: boolean;
  buttonPressed?: boolean;
};

export function DemoMaritalVerificationForm({
  autoTapVisible = false,
  buttonPressed = false,
}: DemoMaritalVerificationFormProps) {
  return (
    <div className="flex-1 flex flex-col justify-center space-y-5 animate-demo-fade-in">
      <div className="text-center space-y-2">
        <p className="text-base font-extrabold tracking-[0.2em] text-primary">STEP 1 / 1</p>
        <h2 className="font-sans text-3xl font-black text-foreground leading-tight">
          미혼 상태 인증
        </h2>
      </div>

      <div className="w-16 h-16 mx-auto rounded-full bg-primary-light flex items-center justify-center text-primary">
        <CertificateIcon className="w-11 h-11" />
      </div>

      <p className="text-center text-xl font-bold text-foreground/90 leading-snug px-1">
        혼인관계증명서(일반)으로
        <br />
        미혼 상태를 확인합니다
      </p>

      <div className="bg-white border-2 border-border rounded-2xl px-5 py-4 space-y-3">
        <div className="flex justify-between text-lg">
          <span className="font-semibold text-foreground/75">이름</span>
          <span className="text-xl font-black">{DEMO_USER.name}</span>
        </div>
        <div className="flex justify-between text-lg">
          <span className="font-semibold text-foreground/75">생년월일</span>
          <span className="text-xl font-black">{DEMO_USER.birthDate}</span>
        </div>
      </div>

      <div className="relative pt-1">
        <Button
          variant="primary"
          fullWidth
          className={`min-h-14 text-xl font-bold transition-transform duration-150 ${
            buttonPressed
              ? "scale-[0.97] brightness-95 animate-none"
              : "animate-demo-pulse-brand"
          }`}
        >
          미혼 인증하기
        </Button>
        <DemoAutoTap visible={autoTapVisible} />
      </div>
    </div>
  );
}

export function DemoMaritalVerificationComplete() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center space-y-5 animate-demo-fade-in px-1">
      <div className="w-24 h-24 rounded-full bg-primary-light flex items-center justify-center text-primary">
        <CheckCircleIcon className="w-16 h-16" />
      </div>
      <div className="space-y-3">
        <p className="text-base font-extrabold tracking-[0.2em] text-primary">
          VERIFICATION COMPLETE
        </p>
        <h2 className="font-sans text-3xl font-black text-foreground leading-tight">
          미혼 인증 완료
        </h2>
        <p className="text-xl font-bold text-foreground/80 leading-snug">
          이제 앱의 모든 기능을
          <br />
          이용할 수 있습니다!
        </p>
      </div>
    </div>
  );
}
