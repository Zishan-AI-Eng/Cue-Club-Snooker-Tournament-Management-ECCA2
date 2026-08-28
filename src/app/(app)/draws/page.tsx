"use client";

import { useState } from "react";
import { ArrowLeft, Settings, Info, Users, Shuffle, Trophy } from "lucide-react";
import { AppHeader } from "@/components/navigation/AppHeader";
import { IconButton } from "@/components/ui/IconButton";
import { Button } from "@/components/ui/Button";
import { RoundTabs } from "@/components/bracket/RoundTabs";
import { MatchCard } from "@/components/bracket/MatchCard";
import { mockBracket } from "@/lib/constants/mockData";

export default function DrawsPage() {
  const [activeRoundId, setActiveRoundId] = useState(mockBracket.rounds[0].id);

  const matches =
    mockBracket.matchesByRound[
      activeRoundId as keyof typeof mockBracket.matchesByRound
    ] ?? [];

  const isFinalRound = activeRoundId === "final";

  return (
    <div>
      <AppHeader
        left={
          <IconButton aria-label="Go back" variant="ghost" size="sm">
            <ArrowLeft size={20} />
          </IconButton>
        }
        title={
          <span className="truncate text-sm font-semibold text-text-primary">
            {mockBracket.tournamentName}
          </span>
        }
        right={
          <IconButton aria-label="Settings" variant="ghost" size="sm">
            <Settings size={20} />
          </IconButton>
        }
      />

      <RoundTabs
        rounds={mockBracket.rounds}
        activeRoundId={activeRoundId}
        onChange={setActiveRoundId}
      />

      <main className="flex flex-col gap-4 px-4 py-5">
        <p className="flex items-center gap-1.5 text-xs text-text-muted">
          <Info size={13} />
          Tap on a match to update score
        </p>

        {isFinalRound && matches[0]?.status === "upcoming" && !matches[0].player1Name ? (
          <div className="flex flex-col items-center justify-center gap-2 py-10 text-center">
            <Trophy size={32} className="text-text-muted" />
            <p className="text-sm text-text-secondary">
              Final will appear once semi-finals are complete.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {matches.map((match) => (
              <MatchCard
                key={match.id}
                seed1={match.seed1}
                player1Name={match.player1Name}
                player1Score={match.player1Score}
                seed2={match.seed2}
                player2Name={match.player2Name}
                player2Score={match.player2Score}
                status={match.status}
                winnerSlot={match.winnerSlot}
                onClick={() => {}}
              />
            ))}
          </div>
        )}

        <div className="mt-2 flex flex-col gap-2">
          <Button variant="outline" size="md" className="gap-2">
            <Shuffle size={16} />
            Regenerate Draw
          </Button>
          <Button variant="primary" size="md" className="gap-2">
            <Users size={16} />
            Add / Manage Players
          </Button>
        </div>
      </main>
    </div>
  );
}