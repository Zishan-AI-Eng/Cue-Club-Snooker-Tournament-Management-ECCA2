import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/actions";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (user.role !== "admin") {
    redirect("/home");
  }

  return <div className="min-h-screen bg-bg-primary pb-10">{children}</div>;
}