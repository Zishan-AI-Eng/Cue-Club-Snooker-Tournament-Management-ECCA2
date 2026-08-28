import { createClient } from "@/lib/supabase/server";
import type { Player, CreatePlayerInput } from "@/features/players/types";

export async function getPlayers(): Promise<Player[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("players")
    .select("*")
    .order("name", { ascending: true });

  if (error) throw new Error(error.message);
  return data as Player[];
}

export async function getActivePlayers(): Promise<Player[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("players")
    .select("*")
    .eq("status", "active")
    .order("name", { ascending: true });

  if (error) throw new Error(error.message);
  return data as Player[];
}

export async function createPlayer(input: CreatePlayerInput): Promise<Player> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("players")
    .insert({
      name: input.name,
      phone: input.phone || null,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as Player;
}

export async function updatePlayerStatus(
  playerId: string,
  status: "active" | "inactive"
): Promise<void> {
  const supabase = await createClient();

  const { error } = await supabase
    .from("players")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", playerId);

  if (error) throw new Error(error.message);
}

export async function updatePlayer(
  playerId: string,
  updates: { name?: string; phone?: string | null }
): Promise<void> {
  const supabase = await createClient();

  const { error } = await supabase
    .from("players")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", playerId);

  if (error) throw new Error(error.message);
}