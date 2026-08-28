"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, Trophy, History } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const NAV_ITEMS = [
  { href: "/home", label: "Home", icon: Home },
  { href: "/draws", label: "Draws", icon: LayoutGrid },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/history", label: "History", icon: History },
] as const;

export function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-bg-secondary"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="flex items-stretch justify-around">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname?.startsWith(href);

          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                className="flex flex-col items-center justify-center gap-1 py-2.5 min-h-[56px]"
                aria-current={isActive ? "page" : undefined}
              >
                <Icon
                  size={22}
                  strokeWidth={isActive ? 2.5 : 2}
                  className={cn(
                    isActive ? "text-accent-green" : "text-text-muted"
                  )}
                />
                <span
                  className={cn(
                    "text-[11px] font-medium",
                    isActive ? "text-accent-green" : "text-text-muted"
                  )}
                >
                  {label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}