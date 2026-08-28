"use client";

import { cn } from "@/lib/utils/cn";

export interface RoundTab {
  id: string;
  label: string;
}

interface RoundTabsProps {
  rounds: RoundTab[];
  activeRoundId: string;
  onChange: (roundId: string) => void;
}

export function RoundTabs({ rounds, activeRoundId, onChange }: RoundTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Tournament rounds"
      className="scrollbar-hide flex gap-1 overflow-x-auto border-b border-border"
    >
      {rounds.map((round) => {
        const isActive = round.id === activeRoundId;
        return (
          <button
            key={round.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(round.id)}
            className={cn(
              "shrink-0 whitespace-nowrap px-4 py-3 text-sm font-semibold transition-colors",
              isActive
                ? "border-b-2 border-accent-green text-accent-green"
                : "border-b-2 border-transparent text-text-muted"
            )}
          >
            {round.label}
          </button>
        );
      })}
    </div>
  );
}