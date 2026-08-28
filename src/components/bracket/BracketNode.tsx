import { ReactNode } from "react";

interface BracketNodeProps {
  children: ReactNode;
  /** Whether this node connects forward to a next-round match */
  hasNextConnector?: boolean;
}

export function BracketNode({ children, hasNextConnector = true }: BracketNodeProps) {
  return (
    <div className="relative flex items-center">
      <div className="w-56 shrink-0">{children}</div>
      {hasNextConnector && (
        <div className="h-px w-6 shrink-0 bg-border" aria-hidden="true" />
      )}
    </div>
  );
}