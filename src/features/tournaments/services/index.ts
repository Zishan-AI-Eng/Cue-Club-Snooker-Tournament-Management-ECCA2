import { createClient } from "@/lib/supabase/server";
import type { Tournament, CreateTournamentInput, TournamentStatus } from "@/features/tournaments/types";

export async function getTournaments(): Promise<Tournament[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("tournaments")
    .select("*")
    .order("date", { ascending: true });

  if (error) throw new Error(error.message);
  return data as Tournament[];
}

export async function getTournamentById(id: string): Promise<Tournament | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("tournaments")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data as Tournament;
}

export async function createTournament(input: CreateTournamentInput): Promise<Tournament> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("tournaments")
    .insert({
      name: input.name,
      date: input.date,
      start_time: input.start_time,
      player_count: input.player_count,
      format: input.format,
      description: input.description || null,
      status: "registration",
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as Tournament;
}

export async function updateTournamentStatus(
  tournamentId: string,
  status: TournamentStatus
): Promise<void> {
  const supabase = await createClient();

  const { error } = await supabase
    .from("tournaments")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", tournamentId);

  if (error) throw new Error(error.message);
}

export async function addPlayersToTournament(
  tournamentId: string,
  playerIds: string[]
): Promise<void> {
  const supabase = await createClient();

  const rows = playerIds.map((playerId) => ({
    tournament_id: tournamentId,
    player_id: playerId,
  }));

  const { error } = await supabase.from("tournament_players").insert(rows);

  if (error) throw new Error(error.message);
}

export async function getTournamentPlayers(tournamentId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("tournament_players")
    .select("id, player_id, seed, player:players(id, name, avatar_url)")
    .eq("tournament_id", tournamentId);

  if (error) throw new Error(error.message);
  return data;
}