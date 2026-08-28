import { Loader2 } from "lucide-react";

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = "Loading..." }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-12 text-center">
      <Loader2 size={28} className="animate-spin text-accent-green" />
      <p className="text-sm text-text-secondary">{message}</p>
    </div>
  );
}