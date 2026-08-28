"use server";

import { revalidatePath } from "next/cache";
import { createTournamentSchema } from "@/features/tournaments/validators";
import {
  createTournament,
  addPlayersToTournament,
  updateTournamentStatus,
  getTournamentById,
  getTournamentPlayers,
} from "@/features/tournaments/services";
import { getCurrentUser } from "@/lib/auth/actions";
import { createClient } from "@/lib/supabase/server";
import {
  generateMatchTree,
  BracketPlayer,
} from "@/features/matches/services/bracketEngine";

export async function createTournamentAction(formData: FormData) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return { error: "Not authorized." };
  }

  const raw = {
    name: formData.get("name") as string,
    date: formData.get("date") as string,
    start_time: formData.get("start_time") as string,
    player_count: Number(formData.get("player_count")) as 8 | 16 | 32,
    format: formData.get("format") as "best_of_3" | "best_of_5",
    description: (formData.get("description") as string) || "",
  };

  const parsed = createTournamentSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  try {
    const tournament = await createTournament(parsed.data);
    revalidatePath("/admin");
    return { success: true, tournament };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Failed to create tournament." };
  }
}

export async function addPlayersAction(tournamentId: string, playerIds: string[]) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return { error: "Not authorized." };
  }

  if (playerIds.length === 0) {
    return { error: "Select at least one player." };
  }

  try {
    await addPlayersToTournament(tournamentId, playerIds);
    revalidatePath(`/admin/tournaments/${tournamentId}`);
    return { success: true };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Failed to add players." };
  }
}

export async function lockTournamentPlayersAction(tournamentId: string) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return { error: "Not authorized." };
  }

  try {
    const tournament = await getTournamentById(tournamentId);
    if (!tournament) {
      return { error: "Tournament not found." };
    }

    const playerCount = tournament.player_count as 8 | 16 | 32;

    const tournamentPlayers = await getTournamentPlayers(tournamentId);
    const players: BracketPlayer[] = tournamentPlayers.map((tp) => ({
      id: tp.player.id,
      name: tp.player.name,
    }));

    if (players.length !== playerCount) {
      return {
        error: `Need exactly ${playerCount} players selected, got ${players.length}.`,
      };
    }

    const matchRows = generateMatchTree(tournamentId, players, playerCount);

    const supabase = await createClient();
    const { error: insertError } = await supabase.from("matches").insert(matchRows);
    if (insertError) {
      return { error: "Failed to generate draw." };
    }

    await updateTournamentStatus(tournamentId, "draw_generated");

    revalidatePath(`/admin/tournaments/${tournamentId}`);
    revalidatePath("/draws");

    return { success: true };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Failed to generate draw." };
  }
}