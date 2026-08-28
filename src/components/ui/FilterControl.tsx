"use client";

import { cn } from "@/lib/utils/cn";

export interface FilterOption {
  id: string;
  label: string;
}

interface FilterControlProps {
  options: FilterOption[];
  activeId: string;
  onChange: (id: string) => void;
}

export function FilterControl({ options, activeId, onChange }: FilterControlProps) {
  return (
    <div className="flex gap-2 overflow-x-auto">
      {options.map((opt) => {
        const isActive = opt.id === activeId;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            className={cn(
              "shrink-0 whitespace-nowrap rounded-pill border px-3 py-1.5 text-xs font-semibold transition-colors",
              isActive
                ? "border-accent-green bg-accent-green/15 text-accent-green"
                : "border-border bg-bg-secondary text-text-secondary"
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}