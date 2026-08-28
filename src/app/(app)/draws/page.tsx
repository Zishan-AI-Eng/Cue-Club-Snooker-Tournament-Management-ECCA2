import { Trophy } from "lucide-react";
import { getActiveTournament } from "@/features/tournaments/services";
import { getTournamentBracket } from "@/features/matches/services";
import { getRoundSequence } from "@/features/matches/services/bracketEngine";
import { DrawsClient } from "./DrawsClient";

export default async function DrawsPage() {
  const tournament = await getActiveTournament();

  if (!tournament) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 px-4 py-24 text-center">
        <Trophy size={32} className="text-text-muted" />
        <p className="text-sm text-text-secondary">No tournament live</p>
        <p className="text-xs text-text-muted">
          Check back once a tournament's draw has been generated.
        </p>
      </div>
    );
  }

  const bracket = await getTournamentBracket(tournament.id);
  const roundOrder = getRoundSequence(
    tournament.player_count as 8 | 16 | 32
  ).filter((round) => bracket[round]?.length);

  return (
    <DrawsClient
      tournamentId={tournament.id}
      tournamentName={tournament.name}
      bracket={bracket}
      roundOrder={roundOrder}
    />
  );
} 