import { Avatar } from "@/components/ui/Avatar";

export interface LeaderboardRowProps {
  rank: number;
  playerName: string;
  avatarUrl?: string | null;
  tournamentsWon: number;
  points: number;
  onClick?: () => void;
}

export function LeaderboardRow({
  rank,
  playerName,
  avatarUrl,
  tournamentsWon,
  points,
  onClick,
}: LeaderboardRowProps) {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 border-b border-border py-3 last:border-b-0"
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <span className="w-6 shrink-0 text-sm font-semibold text-text-muted">
        #{rank}
      </span>

      <Avatar name={playerName} src={avatarUrl} size="sm" />

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-text-primary">
          {playerName}
        </p>
        <p className="text-xs text-text-secondary">
          {tournamentsWon} Tournament{tournamentsWon === 1 ? "" : "s"} Won
        </p>
      </div>

      <span className="shrink-0 text-sm font-bold text-text-primary">
        {points}
        <span className="ml-1 text-xs font-normal text-text-muted">Points</span>
      </span>
    </div>
  );
}