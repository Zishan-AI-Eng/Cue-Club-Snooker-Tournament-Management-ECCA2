"use client";

import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SearchInput } from "@/components/ui/SearchInput";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { FormField } from "@/components/ui/FormField";
import { PlayerCard } from "@/components/player/PlayerCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { createPlayerAction, togglePlayerStatusAction } from "@/features/players/actions";
import type { Player } from "@/features/players/types";

export function PlayersManager({ initialPlayers }: { initialPlayers: Player[] }) {
  const [players, setPlayers] = useState(initialPlayers);
  const [search, setSearch] = useState("");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const filtered = players.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  async function handleAddPlayer(formData: FormData) {
    setError(null);
    setLoading(true);
    const result = await createPlayerAction(formData);
    setLoading(false);

    if (result?.error) {
      setError(result.error);
      return;
    }

    if (result?.player) {
      setPlayers((prev) =>
        [...prev, result.player].sort((a, b) => a.name.localeCompare(b.name))
      );
      setSheetOpen(false);
    }
  }

  async function handleToggleStatus(player: Player) {
    const result = await togglePlayerStatusAction(player.id, player.status);
    if (result?.success) {
      setPlayers((prev) =>
        prev.map((p) =>
          p.id === player.id
            ? { ...p, status: p.status === "active" ? "inactive" : "active" }
            : p
        )
      );
    }
  }

  return (
    <main className="flex flex-col gap-4 px-4 py-5">
      <SearchInput
        placeholder="Search players..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onClear={() => setSearch("")}
      />

      <Button
        variant="primary"
        size="md"
        className="gap-2"
        onClick={() => setSheetOpen(true)}
      >
        <Plus size={18} />
        Add New Player
      </Button>

      {filtered.length > 0 ? (
        <div className="flex flex-col divide-y divide-border">
          {filtered.map((player) => (
            <div key={player.id} className="flex items-center justify-between py-1">
              <PlayerCard name={player.name} meta={player.phone ?? undefined} />
              <button
                onClick={() => handleToggleStatus(player)}
                className={`shrink-0 rounded-pill px-3 py-1 text-xs font-semibold ${
                  player.status === "active"
                    ? "bg-accent-green/15 text-accent-green"
                    : "bg-bg-elevated text-text-muted"
                }`}
              >
                {player.status === "active" ? "Active" : "Inactive"}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<Search size={28} />}
          title="No players found."
          description="Try a different search or add a new player."
        />
      )}

      <BottomSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        title="Add New Player"
      >
        <form action={handleAddPlayer} className="flex flex-col gap-4">
          <FormField label="Player Name" name="name" placeholder="e.g. Ali Raza" required />
          <FormField label="Phone (optional)" name="phone" placeholder="03001234567" />

          {error && (
            <p className="text-sm text-error" role="alert">
              {error}
            </p>
          )}

          <Button type="submit" variant="primary" fullWidth disabled={loading}>
            {loading ? "Adding..." : "Add Player"}
          </Button>
        </form>
      </BottomSheet>
    </main>
  );
}