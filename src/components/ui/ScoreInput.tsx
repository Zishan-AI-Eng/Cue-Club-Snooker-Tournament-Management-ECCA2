"use client";

import { Minus, Plus } from "lucide-react";
import { IconButton } from "@/components/ui/IconButton";

interface ScoreInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  max?: number;
}

export function ScoreInput({ label, value, onChange, max = 99 }: ScoreInputProps) {
  const decrement = () => onChange(Math.max(0, value - 1));
  const increment = () => onChange(Math.min(max, value + 1));

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-text-secondary">{label}</span>
      <div className="flex items-center justify-between gap-3 rounded-button border border-border bg-bg-secondary p-2">
        <IconButton
          aria-label={`Decrease ${label} score`}
          variant="surface"
          size="sm"
          onClick={decrement}
          disabled={value <= 0}
        >
          <Minus size={16} />
        </IconButton>
        <span className="text-2xl font-bold text-text-primary">{value}</span>
        <IconButton
          aria-label={`Increase ${label} score`}
          variant="surface"
          size="sm"
          onClick={increment}
          disabled={value >= max}
        >
          <Plus size={16} />
        </IconButton>
      </div>
    </div>
  );
}