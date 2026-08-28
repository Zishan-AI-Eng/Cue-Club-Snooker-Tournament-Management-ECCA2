import { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface AppHeaderProps {
  /** Left slot: menu icon, back button, etc. */
  left?: ReactNode;
  /** Center: title or logo+brand block */
  title?: ReactNode;
  /** Right slot: notification bell, settings icon, etc. */
  right?: ReactNode;
  className?: string;
}

export function AppHeader({ left, title, right, className }: AppHeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-40 flex items-center justify-between gap-3 border-b border-border bg-bg-primary px-4",
        className
      )}
      style={{
        paddingTop: "calc(env(safe-area-inset-top) + 0.75rem)",
        paddingBottom: "0.75rem",
      }}
    >
      <div className="flex min-w-[40px] items-center">{left}</div>
      <div className="flex flex-1 items-center justify-center">{title}</div>
      <div className="flex min-w-[40px] items-center justify-end">{right}</div>
    </header>
  );
}