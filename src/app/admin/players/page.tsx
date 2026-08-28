import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { AppHeader } from "@/components/navigation/AppHeader";
import { IconButton } from "@/components/ui/IconButton";
import { getPlayers } from "@/features/players/services";
import { PlayersManager } from "./PlayersManager";

export default async function AdminPlayersPage() {
  const players = await getPlayers();

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
            Manage Players
          </span>
        }
      />
      <PlayersManager initialPlayers={players} />
    </div>
  );
}