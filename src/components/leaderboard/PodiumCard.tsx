import { Crown } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { cn } from "@/lib/utils/cn";

export interface PodiumPlayer {
  rank: 1 | 2 | 3;
  playerName: string;
  avatarUrl?: string | null;
  tournamentsWon: number;
  points: number;
}

const RANK_CONFIG = {
  1: { ring: "gold" as const, badgeBg: "bg-gold", badgeText: "text-bg-primary", size: "xl" as const },
  2: { ring: "silver" as const, badgeBg: "bg-silver", badgeText: "text-bg-primary", size: "lg" as const },
  3: { ring: "bronze" as const, badgeBg: "bg-bronze", badgeText: "text-bg-primary", size: "lg" as const },
};

function PodiumSlot({ rank, playerName, avatarUrl, tournamentsWon, points }: PodiumPlayer) {
  const config = RANK_CONFIG[rank];
  const isFirst = rank === 1;

  return (
    <div
      className={cn(
        "flex flex-col items-center gap-2 rounded-card px-3 py-4",
        isFirst ? "bg-accent-green-dark/40" : "bg-bg-secondary"
      )}
    >
      <div className="relative">
        <Avatar name={playerName} src={avatarUrl} size={config.size} ring={config.ring} />
        <span
          className={cn(
            "absolute -top-2 -right-1 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold",
            config.badgeBg,
            config.badgeText
          )}
        >
          {rank}
        </span>
        {isFirst && (
          <Crown
            size={20}
            className="absolute -top-6 left-1/2 -translate-x-1/2 fill-gold text-gold"
          />
        )}
      </div>

      <p className="max-w-[90px] truncate text-center text-sm font-semibold text-text-primary">
        {playerName}
      </p>
      <p className={cn("font-bold", isFirst ? "text-2xl text-gold" : "text-lg text-text-primary")}>
        {points}
      </p>
      <p className="text-[10px] uppercase tracking-wide text-text-muted">Points</p>
    </div>
  );
}

interface PodiumCardProps {
  players: PodiumPlayer[]; // expects entries for rank 1, 2, 3
}

export function PodiumCard({ players }: PodiumCardProps) {
  const first = players.find((p) => p.rank === 1);
  const second = players.find((p) => p.rank === 2);
  const third = players.find((p) => p.rank === 3);

  return (
    <div className="flex items-end justify-center gap-2">
      {second && (
        <div className="flex-1">
          <PodiumSlot {...second} />
        </div>
      )}
      {first && (
        <div className="flex-1 scale-105">
          <PodiumSlot {...first} />
        </div>
      )}
      {third && (
        <div className="flex-1">
          <PodiumSlot {...third} />
        </div>
      )}
    </div>
  );
}