import { createClient } from "@/lib/supabase/server";

export interface BracketMatch {
  id: string;
  round: string;
  match_number: number;
  player1_id: string | null;
  player2_id: string | null;
  player1_name: string | null;
  player2_name: string | null;
  player1_score: number | null;
  player2_score: number | null;
  winner_id: string | null;
  status: "upcoming" | "live" | "completed";
  next_match_id: string | null;
}

/**
 * Returns the tournament currently considered "live" for public display:
 * draw has been generated and it isn't completed/archived yet.
 * Most recently created active tournament wins if multiple exist.
 */
export async function getActiveTournament() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("tournaments")
    .select("*")
    .in("status", ["draw_generated", "in_progress", "final"])
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw new Error("Failed to fetch active tournament");
  return data;
}

/**
 * Returns all matches for a tournament, grouped by round, with player names resolved.
 */
export async function getTournamentBracket(
  tournamentId: string
): Promise<Record<string, BracketMatch[]>> {
  const supabase = await createClient();

  const { data: matches, error } = await supabase
    .from("matches")
    .select(
      "id, round, match_number, player1_id, player2_id, player1_score, player2_score, winner_id, status, next_match_id, player1:players!matches_player1_id_fkey(name), player2:players!matches_player2_id_fkey(name)"
    )
    .eq("tournament_id", tournamentId)
    .order("match_number", { ascending: true });

  if (error) throw new Error("Failed to fetch bracket");

  const grouped: Record<string, BracketMatch[]> = {};

  for (const m of matches ?? []) {
    const row: BracketMatch = {
      id: m.id,
      round: m.round,
      match_number: m.match_number,
      player1_id: m.player1_id,
      player2_id: m.player2_id,
      player1_name: (m.player1 as any)?.name ?? null,
      player2_name: (m.player2 as any)?.name ?? null,
      player1_score: m.player1_score,
      player2_score: m.player2_score,
      winner_id: m.winner_id,
      status: m.status,
      next_match_id: m.next_match_id,
    };

    if (!grouped[row.round]) grouped[row.round] = [];
    grouped[row.round].push(row);
  }

  return grouped;
}