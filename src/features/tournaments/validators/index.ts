import { z } from "zod";

export const createTournamentSchema = z.object({
  name: z.string().trim().min(3, "Name must be at least 3 characters").max(100),
  date: z.string().min(1, "Date is required"),
  start_time: z.string().min(1, "Start time is required"),
  player_count: z.union([z.literal(8), z.literal(16), z.literal(32)]),
  format: z.enum(["best_of_3", "best_of_5"]),
  description: z.string().trim().max(500).optional().or(z.literal("")),
});

export type CreateTournamentFormValues = z.infer<typeof createTournamentSchema>;