"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { AppHeader } from "@/components/navigation/AppHeader";
import { IconButton } from "@/components/ui/IconButton";
import { FormField } from "@/components/ui/FormField";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { createTournamentAction } from "@/features/tournaments/actions";

export default function NewTournamentPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setError(null);
    setLoading(true);
    const result = await createTournamentAction(formData);
    setLoading(false);

    if (result?.error) {
      setError(result.error);
      return;
    }

    if (result?.tournament) {
      router.push(`/admin/tournaments/${result.tournament.id}`);
    }
  }

  return (
    <div>
      <AppHeader
        left={
          <Link href="/admin">
            <IconButton aria-label="Go back" variant="ghost" size="sm">
              <ArrowLeft size={20} />
            </IconButton>
          </Link>
        }
        title={
          <span className="text-base font-semibold text-text-primary">
            Create Tournament
          </span>
        }
      />

      <main className="px-4 py-5">
        <form action={handleSubmit} className="flex flex-col gap-4">
          <FormField
            label="Tournament Name"
            name="name"
            placeholder="e.g. August Week 3 Tournament"
            required
          />

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-text-secondary">
              Number of Players
            </label>
            <Select
              name="player_count"
              options={[
                { value: "8", label: "8 Players" },
                { value: "16", label: "16 Players" },
                { value: "32", label: "32 Players" },
              ]}
              defaultValue="16"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-text-secondary">
              Match Format
            </label>
            <Select
              name="format"
              options={[
                { value: "best_of_3", label: "Best of 3" },
                { value: "best_of_5", label: "Best of 5" },
              ]}
              defaultValue="best_of_3"
              required
            />
          </div>

          <FormField label="Tournament Date" name="date" type="date" required />
          <FormField label="Start Time" name="start_time" type="time" required />
          <FormField
            label="Description (optional)"
            name="description"
            placeholder="Add notes about this tournament"
          />

          {error && (
            <p className="text-sm text-error" role="alert">
              {error}
            </p>
          )}

          <Button type="submit" variant="primary" fullWidth disabled={loading} className="mt-2">
            {loading ? "Creating..." : "Create Tournament"}
          </Button>
        </form>
      </main>
    </div>
  );
}