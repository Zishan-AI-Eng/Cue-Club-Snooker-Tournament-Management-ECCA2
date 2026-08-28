import { Menu, SlidersHorizontal, Trophy, ChevronRight, Calendar } from "lucide-react";
import { AppHeader } from "@/components/navigation/AppHeader";
import { IconButton } from "@/components/ui/IconButton";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { DateBadge } from "@/components/shared/DateBadge";
import { EmptyState } from "@/components/shared/EmptyState";
import { mockHistory } from "@/lib/constants/mockData";

export default function HistoryPage() {
  const hasHistory = mockHistory.length > 0;

  return (
    <div>
      <AppHeader
        left={
          <IconButton aria-label="Open menu" variant="ghost" size="sm">
            <Menu size={22} />
          </IconButton>
        }
        title={
          <span className="text-base font-semibold text-text-primary">
            History
          </span>
        }
        right={
          <IconButton aria-label="Filter" variant="ghost" size="sm">
            <SlidersHorizontal size={20} />
          </IconButton>
        }
      />

      <main className="flex flex-col gap-4 px-4 py-5">
        <h3 className="text-sm font-bold uppercase tracking-wide text-text-secondary">
          Past Tournaments
        </h3>

        {hasHistory ? (
          <>
            <div className="flex flex-col gap-3">
              {mockHistory.map((t) => (
                <Card
                  key={t.id}
                  surface="secondary"
                  padding="sm"
                  className="flex items-center gap-3"
                >
                  <DateBadge date={t.date} />

                  <div className="min-w-0 flex-1">
                    <p className="flex items-center gap-1.5 truncate text-sm font-semibold text-text-primary">
                      <Trophy size={14} className="shrink-0 text-gold" />
                      {t.name}
                    </p>
                    <p className="mt-0.5 truncate text-xs font-medium text-accent-green">
                      Winner: {t.winner}
                    </p>
                    <p className="mt-1 text-xs text-text-muted">
                      {t.playerCount} Players · {t.format}
                    </p>
                  </div>

                  <ChevronRight size={20} className="shrink-0 text-text-muted" />
                </Card>
              ))}
            </div>

            <Button variant="outline" size="md" className="mt-2 gap-2">
              <Calendar size={16} />
              View All Tournaments
            </Button>
          </>
        ) : (
          <EmptyState
            title="No tournament history yet."
            description="Completed tournaments will appear here."
          />
        )}
      </main>
    </div>
  );
}