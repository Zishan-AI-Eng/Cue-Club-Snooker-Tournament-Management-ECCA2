import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { AppHeader } from "@/components/navigation/AppHeader";
import { IconButton } from "@/components/ui/IconButton";
import { getTournamentById, getTournamentPlayers } from "@/features/tournaments/services";
import { getActivePlayers } from "@/features/players/services";
import { PlayerSelector } from "./PlayerSelector";

export default async function TournamentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const tournament = await getTournamentById(id);
  if (!tournament) notFound();

  const [allPlayers, tournamentPlayers] = await Promise.all([
    getActivePlayers(),
    getTournamentPlayers(id),
  ]);

  const selectedPlayerIds = tournamentPlayers.map((tp) => tp.player_id ?? (tp.player as any)?.id).filter(Boolean);

  return (
    <div>
      <AppHeader
        left={
          <Link href="/admin">
            <IconButton aria-label="Go back" variant="ghost" size="sm">
              <ArrowLeft size={20} />
            </IconButton>
          </Link>
        }
        title={
          <span className="truncate text-sm font-semibold text-text-primary">
            {tournament.name}
          </span>
        }
      />

      <PlayerSelector
        tournamentId={tournament.id}
        requiredCount={tournament.player_count}
        allPlayers={allPlayers}
        initiallySelectedIds={selectedPlayerIds}
        tournamentStatus={tournament.status}
      />
    </div>
  );
}