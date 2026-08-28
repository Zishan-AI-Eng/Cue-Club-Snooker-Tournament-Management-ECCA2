import { Check } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { cn } from "@/lib/utils/cn";

export interface PlayerCardProps {
  name: string;
  avatarUrl?: string | null;
  /** When provided, renders as a selectable row with checkbox */
  selectable?: boolean;
  selected?: boolean;
  onToggle?: () => void;
  /** Optional trailing meta, e.g. "12 Tournaments" */
  meta?: string;
}

export function PlayerCard({
  name,
  avatarUrl,
  selectable = false,
  selected = false,
  onToggle,
  meta,
}: PlayerCardProps) {
  return (
    <div
      onClick={selectable ? onToggle : undefined}
      role={selectable ? "checkbox" : undefined}
      aria-checked={selectable ? selected : undefined}
      tabIndex={selectable ? 0 : undefined}
      className={cn(
        "flex items-center gap-3 rounded-button px-2 py-2.5 transition-colors",
        selectable && "cursor-pointer active:bg-bg-elevated"
      )}
    >
      {selectable && (
        <span
          className={cn(
            "flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors",
            selected
              ? "border-accent-green bg-accent-green"
              : "border-border bg-transparent"
          )}
        >
          {selected && <Check size={14} className="text-bg-primary" strokeWidth={3} />}
        </span>
      )}

      <Avatar name={name} src={avatarUrl} size="sm" />

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-text-primary">{name}</p>
        {meta && <p className="text-xs text-text-muted">{meta}</p>}
      </div>
    </div>
  );
}