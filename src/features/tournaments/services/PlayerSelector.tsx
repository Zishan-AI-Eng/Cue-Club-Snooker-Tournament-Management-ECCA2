"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PlayerCard } from "@/components/player/PlayerCard";
import { SearchInput } from "@/components/ui/SearchInput";
import { Button } from "@/components/ui/Button";
import { ConfirmationDialog } from "@/components/ui/ConfirmationDialog";
import { addPlayersAction, lockTournamentPlayersAction } from "@/features/tournaments/actions";
import type { Player } from "@/features/players/types";
import type { TournamentStatus } from "@/features/tournaments/types";

interface PlayerSelectorProps {
  tournamentId: string;
  requiredCount: number;
  allPlayers: Player[];
  initiallySelectedIds: string[];
  tournamentStatus: TournamentStatus;
}

export function PlayerSelector({
  tournamentId,
  requiredCount,
  allPlayers,
  initiallySelectedIds,
  tournamentStatus,
}: PlayerSelectorProps) {
  const router = useRouter();
  const [selected, setSelected] = useState<Set<string>>(new Set(initiallySelectedIds));
  const [search, setSearch] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const isLocked = tournamentStatus !== "registration" && tournamentStatus !== "draft";

  const filtered = allPlayers.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  function toggle(playerId: string) {
    if (isLocked) return;
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(playerId)) {
        next.delete(playerId);
      } else if (next.size < requiredCount) {
        next.add(playerId);
      }
      return next;
    });
  }

  async function handleSave() {
    setError(null);
    setLoading(true);
    const result = await addPlayersAction(tournamentId, Array.from(selected));
    setLoading(false);
    if (result?.error) setError(result.error);
  }

  async function handleGenerateDraw() {
    setLoading(true);
    await addPlayersAction(tournamentId, Array.from(selected));
    const result = await lockTournamentPlayersAction(tournamentId);
    setLoading(false);
    if (result?.success) {
      router.push(`/draws?tournament=${tournamentId}`);
    } else if (result?.error) {
      setError(result.error);
    }
  }

  const canGenerate = selected.size === requiredCount;

  return (
    <main className="flex flex-col gap-4 px-4 py-5">
      <SearchInput
        placeholder="Search players..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onClear={() => setSearch("")}
      />

      <p className="text-sm font-semibold text-text-secondary">
        {selected.size} / {requiredCount} Players Selected
      </p>

      <div className="flex flex-col divide-y divide-border">
        {filtered.map((player) => (
          <div key={player.id} onClick={() => toggle(player.id)}>
            <PlayerCard
              name={player.name}
              selectable
              selected={selected.has(player.id)}
            />
          </div>
        ))}
      </div>

      {error && (
        <p className="text-sm text-error" role="alert">
          {error}
        </p>
      )}

      {!isLocked && (
        <div className="mt-2 flex flex-col gap-2">
          <Button
            variant="outline"
            size="md"
            onClick={handleSave}
            disabled={loading}
          >
            Save Selection
          </Button>
          <Button
            variant="primary"
            size="md"
            disabled={!canGenerate || loading}
            onClick={() => setConfirmOpen(true)}
          >
            Generate Draw
          </Button>
        </div>
      )}

      <ConfirmationDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleGenerateDraw}
        title="Generate Draw?"
        description="This will lock the selected players and generate the knockout bracket."
        confirmLabel="Generate"
      />
    </main>
  );
}