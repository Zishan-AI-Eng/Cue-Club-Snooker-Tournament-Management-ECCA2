import { Check } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils/cn";

export type MatchStatus = "upcoming" | "live" | "completed";

export interface MatchCardProps {
  seed1?: number;
  player1Name: string | null;
  player1Score?: number;
  seed2?: number;
  player2Name: string | null;
  player2Score?: number;
  status: MatchStatus;
  winnerSlot?: 1 | 2;
  onClick?: () => void;
}

export function MatchCard({
  seed1,
  player1Name,
  player1Score,
  seed2,
  player2Name,
  player2Score,
  status,
  winnerSlot,
  onClick,
}: MatchCardProps) {
  const isClickable = !!onClick && status !== "upcoming";
  const player1Empty = !player1Name;
  const player2Empty = !player2Name;

  return (
    <Card
      surface="secondary"
      padding="sm"
      onClick={isClickable ? onClick : undefined}
      className={cn(
        "flex flex-col gap-2",
        status === "live" && "border-error/40",
        status === "completed" && "border-accent-green/30",
        isClickable && "cursor-pointer active:scale-[0.98] transition-transform"
      )}
    >
      {status === "live" && (
        <Badge variant="live" size="sm" className="w-fit">
          <span className="h-1.5 w-1.5 rounded-full bg-error" />
          LIVE
        </Badge>
      )}

      <PlayerRow
        seed={seed1}
        name={player1Name}
        score={player1Score}
        isEmpty={player1Empty}
        isWinner={winnerSlot === 1}
        showScore={status !== "upcoming"}
      />
      <PlayerRow
        seed={seed2}
        name={player2Name}
        score={player2Score}
        isEmpty={player2Empty}
        isWinner={winnerSlot === 2}
        showScore={status !== "upcoming"}
      />

      {status === "completed" && (
        <div className="mt-1 flex items-center justify-center gap-1 text-xs font-semibold text-accent-green">
          <Check size={14} />
          COMPLETED
        </div>
      )}

      {status === "upcoming" && !player1Empty && !player2Empty && (
        <p className="mt-1 text-center text-xs text-text-muted">
          Not Started
        </p>
      )}
    </Card>
  );
}

function PlayerRow({
  seed,
  name,
  score,
  isEmpty,
  isWinner,
  showScore,
}: {
  seed?: number;
  name: string | null;
  score?: number;
  isEmpty: boolean;
  isWinner: boolean;
  showScore: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex min-w-0 items-center gap-2">
        {seed !== undefined && (
          <span className="w-4 shrink-0 text-xs text-text-muted">{seed}</span>
        )}
        <span
          className={cn(
            "truncate text-sm",
            isEmpty
              ? "text-text-muted italic"
              : isWinner
              ? "font-semibold text-text-primary"
              : "text-text-secondary"
          )}
        >
          {name ?? "TBD"}
        </span>
      </div>
      {showScore && score !== undefined && (
        <span
          className={cn(
            "text-sm font-bold",
            isWinner ? "text-accent-green" : "text-text-secondary"
          )}
        >
          {score}
        </span>
      )}
    </div>
  );
}