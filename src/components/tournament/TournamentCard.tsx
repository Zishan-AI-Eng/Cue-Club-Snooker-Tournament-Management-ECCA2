import Link from "next/link";
import { ChevronRight, Clock } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { DateBadge } from "@/components/shared/DateBadge";

export interface TournamentCardProps {
  id: string;
  name: string;
  date: string | Date;
  startTime: string;
  playerCount: number;
  format: string;
  href?: string;
}

export function TournamentCard({
  id,
  name,
  date,
  startTime,
  playerCount,
  format,
  href,
}: TournamentCardProps) {
  const content = (
    <Card
      surface="secondary"
      padding="sm"
      className="flex items-center gap-3"
    >
      <DateBadge date={date} />

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-text-primary">
          {name}
        </p>
        <p className="mt-0.5 text-xs text-text-secondary">
          {playerCount} Players · {format}
        </p>
        <p className="mt-1 flex items-center gap-1 text-xs text-text-muted">
          <Clock size={12} />
          {startTime}
        </p>
      </div>

      {href && (
        <ChevronRight size={20} className="shrink-0 text-text-muted" />
      )}
    </Card>
  );

  if (href) {
    return (
      <Link href={href} aria-label={`View ${name}`}>
        {content}
      </Link>
    );
  }

  return content;
}