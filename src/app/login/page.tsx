"use client";

import { useState } from "react";
import { signInWithPassword } from "@/lib/auth/actions";
import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setError(null);
    setLoading(true);
    const result = await signInWithPassword(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-bg-primary px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-text-primary">
            CUE CLUB SNOOKER
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            Sign in to continue
          </p>
        </div>

        <form action={handleSubmit} className="flex flex-col gap-4">
          <FormField
            label="Email"
            name="email"
            type="email"
            placeholder="you@example.com"
            required
          />
          <FormField
            label="Password"
            name="password"
            type="password"
            placeholder="••••••••"
            required
          />

          {error && (
            <p className="text-sm text-error" role="alert">
              {error}
            </p>
          )}

          <Button
            type="submit"
            variant="primary"
            size="md"
            fullWidth
            disabled={loading}
            className="mt-2"
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
}