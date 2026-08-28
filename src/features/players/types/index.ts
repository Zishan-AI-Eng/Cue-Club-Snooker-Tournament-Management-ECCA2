export type PlayerStatus = "active" | "inactive";

export interface Player {
  id: string;
  name: string;
  avatar_url: string | null;
  phone: string | null;
  status: PlayerStatus;
  created_at: string;
  updated_at: string;
}

export interface CreatePlayerInput {
  name: string;
  phone?: string;
}