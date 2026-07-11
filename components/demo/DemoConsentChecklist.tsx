import {
  VERIFICATION_CONSENT_ITEMS,
  type VerificationConsentItem,
} from "@/lib/demo/verification-consent";

type DemoConsentChecklistProps = {
  /** 데모 GIF: 필수 항목이 모두 체크된 것처럼 표시 */
  demoChecked?: boolean;
  compact?: boolean;
};

function ConsentRow({
  item,
  checked,
  compact,
}: {
  item: VerificationConsentItem;
  checked: boolean;
  compact?: boolean;
}) {
  return (
    <label
      className={`flex items-start gap-3 ${compact ? "py-2" : "py-2.5"} cursor-default`}
    >
      <input
        type="checkbox"
        checked={checked}
        readOnly
        className="mt-0.5 w-5 h-5 accent-primary shrink-0 pointer-events-none"
        aria-hidden
      />
      <span
        className={`${compact ? "text-sm" : "text-base"} font-semibold text-foreground/85 leading-snug text-left`}
      >
        <span
          className={
            item.required ? "text-primary font-bold" : "text-foreground/50 font-bold"
          }
        >
          {item.required ? "[필수]" : "[선택]"}
        </span>{" "}
        {item.label}
        {item.linkText && (
          <span className="text-primary underline underline-offset-2 ml-1 font-bold">
            {item.linkText}
          </span>
        )}
      </span>
    </label>
  );
}

export function DemoConsentChecklist({
  demoChecked = true,
  compact = false,
}: DemoConsentChecklistProps) {
  const requiredChecked = demoChecked;
  const optionalChecked = false;

  return (
    <div
      className={`bg-white border-2 border-border rounded-2xl px-4 ${
        compact ? "py-3" : "py-4"
      } space-y-1`}
    >
      <label className="flex items-start gap-3 py-2 border-b border-border mb-1 cursor-default">
        <input
          type="checkbox"
          checked={requiredChecked}
          readOnly
          className="mt-0.5 w-5 h-5 accent-primary shrink-0 pointer-events-none"
          aria-hidden
        />
        <span className="text-base font-black text-foreground">전체 동의</span>
      </label>
      {VERIFICATION_CONSENT_ITEMS.map((item) => (
        <ConsentRow
          key={item.id}
          item={item}
          checked={item.required ? requiredChecked : optionalChecked}
          compact={compact}
        />
      ))}
    </div>
  );
}
