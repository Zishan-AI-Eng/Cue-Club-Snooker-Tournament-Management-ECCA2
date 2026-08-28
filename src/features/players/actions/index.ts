"use server";

import { revalidatePath } from "next/cache";
import { createPlayerSchema } from "@/features/players/validators";
import {
  createPlayer,
  updatePlayerStatus,
  updatePlayer,
} from "@/features/players/services";
import { getCurrentUser } from "@/lib/auth/actions";

export async function createPlayerAction(formData: FormData) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return { error: "Not authorized." };
  }

  const raw = {
    name: formData.get("name") as string,
    phone: (formData.get("phone") as string) || "",
  };

  const parsed = createPlayerSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  try {
    const player = await createPlayer(parsed.data);
    revalidatePath("/admin/players");
    return { success: true, player };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Failed to create player." };
  }
}

export async function togglePlayerStatusAction(
  playerId: string,
  currentStatus: "active" | "inactive"
) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return { error: "Not authorized." };
  }

  const newStatus = currentStatus === "active" ? "inactive" : "active";

  try {
    await updatePlayerStatus(playerId, newStatus);
    revalidatePath("/admin/players");
    return { success: true };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Failed to update player." };
  }
}

export async function editPlayerAction(playerId: string, formData: FormData) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return { error: "Not authorized." };
  }

  const raw = {
    name: formData.get("name") as string,
    phone: (formData.get("phone") as string) || "",
  };

  const parsed = createPlayerSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  try {
    await updatePlayer(playerId, {
      name: parsed.data.name,
      phone: parsed.data.phone || null,
    });
    revalidatePath("/admin/players");
    return { success: true };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Failed to update player." };
  }
}