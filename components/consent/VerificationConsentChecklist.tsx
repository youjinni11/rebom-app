"use client";

import Link from "next/link";
import {
  VERIFICATION_CONSENT_HEADING,
  VERIFICATION_CONSENT_ITEMS,
  type VerificationConsentItem,
} from "@/lib/demo/verification-consent";

type VerificationConsentChecklistProps = {
  checked: Record<string, boolean>;
  onToggle: (id: string) => void;
  onToggleAll: () => void;
  compact?: boolean;
};

function ConsentRow({
  item,
  checked,
  onToggle,
  compact,
}: {
  item: VerificationConsentItem;
  checked: boolean;
  onToggle: (id: string) => void;
  compact?: boolean;
}) {
  return (
    <label
      className={`flex items-start gap-3 ${compact ? "py-2" : "py-2.5"} cursor-pointer`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={() => onToggle(item.id)}
        className="mt-0.5 w-5 h-5 accent-primary shrink-0"
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
        {item.linkText && item.href && (
          <Link
            href={item.href}
            className="text-primary underline underline-offset-2 ml-1 font-bold"
            onClick={(e) => e.stopPropagation()}
          >
            {item.linkText}
          </Link>
        )}
      </span>
    </label>
  );
}

export function VerificationConsentChecklist({
  checked,
  onToggle,
  onToggleAll,
  compact = false,
}: VerificationConsentChecklistProps) {
  const allRequiredChecked = VERIFICATION_CONSENT_ITEMS.filter((i) => i.required).every(
    (i) => checked[i.id]
  );

  return (
    <div
      className={`bg-white border-2 border-border rounded-2xl px-4 ${
        compact ? "py-3" : "py-4"
      } space-y-1`}
    >
      <label className="flex items-start gap-3 py-2 border-b border-border mb-1 cursor-pointer">
        <input
          type="checkbox"
          checked={allRequiredChecked && checked.marketing}
          onChange={onToggleAll}
          className="mt-0.5 w-5 h-5 accent-primary shrink-0"
        />
        <span className="text-base font-black text-foreground">
          {VERIFICATION_CONSENT_HEADING.allAgree}
        </span>
      </label>
      {VERIFICATION_CONSENT_ITEMS.map((item) => (
        <ConsentRow
          key={item.id}
          item={item}
          checked={!!checked[item.id]}
          onToggle={onToggle}
          compact={compact}
        />
      ))}
    </div>
  );
}

export function allRequiredConsentsChecked(checked: Record<string, boolean>) {
  return VERIFICATION_CONSENT_ITEMS.filter((i) => i.required).every(
    (i) => checked[i.id]
  );
}
