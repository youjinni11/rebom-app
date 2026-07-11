"use client";

type CurationChipGridProps = {
  chips: readonly string[];
  selected: number[];
  onToggle: (index: number) => void;
  compact?: boolean;
  multi?: boolean;
};

export function CurationChipGrid({
  chips,
  selected,
  onToggle,
  compact = false,
  multi = true,
}: CurationChipGridProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {chips.map((label, index) => {
        const isSelected = selected.includes(index);

        return (
          <button
            key={label}
            type="button"
            onClick={() => {
              if (!multi && isSelected) return;
              onToggle(index);
            }}
            className={`inline-flex items-center px-3 py-2 rounded-2xl font-bold border-2 transition-all duration-200 ${
              compact ? "min-h-10 text-sm leading-snug" : "min-h-11 text-lg"
            } ${
              isSelected
                ? "bg-primary text-cream border-primary scale-[1.02] shadow-md"
                : "bg-white text-foreground/80 border-border hover:border-primary/30"
            }`}
          >
            {isSelected && (
              <span className={`mr-1.5 ${compact ? "text-sm" : "text-base"}`}>✓</span>
            )}
            {label}
          </button>
        );
      })}
    </div>
  );
}

export function toggleSelection(
  current: number[],
  index: number,
  multi = true
): number[] {
  if (current.includes(index)) {
    return current.filter((i) => i !== index);
  }
  return multi ? [...current, index] : [index];
}
