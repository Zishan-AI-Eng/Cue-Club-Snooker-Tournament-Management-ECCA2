import { ReactNode } from "react";

interface BracketColumnProps {
  children: ReactNode;
  /** Vertical gap multiplier - increases as rounds progress (fewer matches, more spacing) */
  gapClassName?: string;
}

export function BracketColumn({ children, gapClassName = "gap-4" }: BracketColumnProps) {
  return (
    <div className={`flex flex-col justify-around ${gapClassName}`}>
      {children}
    </div>
  );
}