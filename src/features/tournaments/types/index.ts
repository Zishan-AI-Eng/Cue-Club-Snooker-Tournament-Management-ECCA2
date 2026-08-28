export type TournamentStatus =
  | "draft"
  | "registration"
  | "draw_generated"
  | "in_progress"
  | "final"
  | "completed"
  | "archived";

export type MatchFormat = "best_of_3" | "best_of_5";

export interface Tournament {
  id: string;
  name: string;
  date: string;
  start_time: string;
  player_count: 8 | 16 | 32;
  format: MatchFormat;
  status: TournamentStatus;
  winner_id: string | null;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateTournamentInput {
  name: string;
  date: string;
  start_time: string;
  player_count: 8 | 16 | 32;
  format: MatchFormat;
  description?: string;
}