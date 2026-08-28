import { cn } from "@/lib/utils/cn";

interface DateBadgeProps {
  /** A valid date (ISO string or Date object) */
  date: string | Date;
  className?: string;
}

export function DateBadge({ date, className }: DateBadgeProps) {
  const d = typeof date === "string" ? new Date(date) : date;

  const month = d.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
  const day = d.getDate();
  const weekday = d.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase();

  return (
    <div
      className={cn(
        "flex w-14 shrink-0 flex-col items-center justify-center rounded-button bg-bg-elevated py-2",
        className
      )}
    >
      <span className="text-[10px] font-semibold text-text-muted">{month}</span>
      <span className="text-lg font-bold leading-tight text-text-primary">{day}</span>
      <span className="text-[10px] font-semibold text-text-muted">{weekday}</span>
    </div>
  );
}