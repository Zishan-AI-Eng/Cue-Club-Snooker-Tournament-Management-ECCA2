import { BottomNavigation } from "@/components/navigation/BottomNavigation";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-bg-primary pb-20">
      {children}
      <BottomNavigation />
    </div>
  );
}