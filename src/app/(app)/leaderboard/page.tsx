import { Menu, SlidersHorizontal } from "lucide-react";
import { AppHeader } from "@/components/navigation/AppHeader";
import { IconButton } from "@/components/ui/IconButton";
import { PodiumCard } from "@/components/leaderboard/PodiumCard";
import { LeaderboardRow } from "@/components/leaderboard/LeaderboardRow";
import { EmptyState } from "@/components/shared/EmptyState";
import { mockPodium, mockLeaderboardList } from "@/lib/constants/mockData";

export default function LeaderboardPage() {
  const hasData = mockPodium.length > 0;

  return (
    <div>
      <AppHeader
        left={
          <IconButton aria-label="Open menu" variant="ghost" size="sm">
            <Menu size={22} />
          </IconButton>
        }
        title={
          <span className="text-base font-semibold text-text-primary">
            Leaderboard
          </span>
        }
        right={
          <IconButton aria-label="Filter" variant="ghost" size="sm">
            <SlidersHorizontal size={20} />
          </IconButton>
        }
      />

      <main className="flex flex-col gap-6 px-4 py-5">
        {hasData ? (
          <>
            <PodiumCard players={mockPodium} />

            <div className="flex flex-col">
              <div className="mb-2 flex items-center justify-between px-1 text-xs font-semibold uppercase tracking-wide text-text-muted">
                <span>Player</span>
                <span>Points</span>
              </div>
              {mockLeaderboardList.map((player) => (
                <LeaderboardRow
                  key={player.rank}
                  rank={player.rank}
                  playerName={player.playerName}
                  tournamentsWon={player.tournamentsWon}
                  points={player.points}
                />
              ))}
            </div>
          </>
        ) : (
          <EmptyState
            title="No rankings yet."
            description="Rankings will appear once tournaments are completed."
          />
        )}
      </main>
    </div>
  );
}