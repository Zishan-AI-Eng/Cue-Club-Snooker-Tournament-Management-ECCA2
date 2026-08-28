import { Menu, Bell, Clock, Circle } from "lucide-react";
import { AppHeader } from "@/components/navigation/AppHeader";
import { IconButton } from "@/components/ui/IconButton";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { TournamentCard } from "@/components/tournament/TournamentCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { mockTournaments, mockLiveTournament } from "@/lib/constants/mockData";

export default function HomePage() {
  const hasLiveTournament = !!mockLiveTournament;

  return (
    <div>
      <AppHeader
        left={
          <IconButton aria-label="Open menu" variant="ghost" size="sm">
            <Menu size={22} />
          </IconButton>
        }
        title={
          <span className="text-sm font-bold tracking-wide text-text-primary">
            CUE CLUB SNOOKER
          </span>
        }
        right={
          <IconButton aria-label="Notifications" variant="ghost" size="sm">
            <Bell size={20} />
          </IconButton>
        }
      />

      <main className="flex flex-col gap-6 px-4 py-5">
        {hasLiveTournament ? (
          <Card
            surface="secondary"
            padding="lg"
            className="border-accent-green/30 bg-accent-green-dark/20"
          >
            <Badge variant="live" size="sm">
              <Circle size={6} className="fill-error text-error" />
              LIVE NOW
            </Badge>

            <h2 className="mt-3 text-lg font-bold text-text-primary">
              {mockLiveTournament.name}
            </h2>
            <p className="mt-1 text-sm font-medium text-accent-green">
              {mockLiveTournament.currentRound}
            </p>
            <p className="mt-1 flex items-center gap-1.5 text-xs text-text-secondary">
              <Circle size={8} className="fill-error text-error" />
              {mockLiveTournament.liveMatchCount} Matches Live
            </p>

            <Button variant="primary" size="md" className="mt-4 w-full">
              View Bracket
            </Button>
          </Card>
        ) : (
          <EmptyState
            title="No Tournament Live"
            description="The next tournament starts on August 24 at 12:00 PM."
          />
        )}

        <section>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wide text-text-secondary">
              Upcoming Tournaments
            </h3>
            <button className="text-xs font-semibold text-accent-green">
              View All
            </button>
          </div>

          {mockTournaments.length > 0 ? (
            <div className="flex flex-col gap-3">
              {mockTournaments.map((t) => (
                <TournamentCard
                  key={t.id}
                  id={t.id}
                  name={t.name}
                  date={t.date}
                  startTime={t.startTime}
                  playerCount={t.playerCount}
                  format={t.format}
                  href={`/draws?tournament=${t.id}`}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<Clock size={28} />}
              title="No tournaments yet."
              description="Create your first tournament to get started."
            />
          )}
        </section>
      </main>
    </div>
  );
}