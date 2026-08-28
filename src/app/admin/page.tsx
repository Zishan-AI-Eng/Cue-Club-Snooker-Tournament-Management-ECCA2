import Link from "next/link";
import { Users, Trophy, Settings, PlusCircle, History } from "lucide-react";
import { AppHeader } from "@/components/navigation/AppHeader";
import { Card } from "@/components/ui/Card";

const ADMIN_LINKS = [
  { href: "/admin/tournaments/new", label: "Create Tournament", icon: PlusCircle },
  { href: "/admin/tournaments", label: "Active Tournament", icon: Trophy },
  { href: "/admin/players", label: "Players", icon: Users },
  { href: "/admin/tournaments/history", label: "Tournament History", icon: History },
  { href: "/admin/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminDashboardPage() {
  return (
    <div>
      <AppHeader
        title={
          <span className="text-base font-semibold text-text-primary">
            Admin
          </span>
        }
      />

      <main className="flex flex-col gap-3 px-4 py-5">
        {ADMIN_LINKS.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href}>
            <Card
              surface="secondary"
              padding="md"
              className="flex items-center gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-button bg-accent-green/15 text-accent-green">
                <Icon size={20} />
              </div>
              <span className="text-sm font-semibold text-text-primary">
                {label}
              </span>
            </Card>
          </Link>
        ))}
      </main>
    </div>
  );
}