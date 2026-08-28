import { z } from "zod";

export const createPlayerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(80, "Name is too long"),
  phone: z
    .string()
    .trim()
    .max(20, "Phone number is too long")
    .optional()
    .or(z.literal("")),
});

export type CreatePlayerFormValues = z.infer<typeof createPlayerSchema>;