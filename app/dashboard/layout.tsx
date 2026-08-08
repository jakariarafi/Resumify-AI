import { db } from "@/lib/db";
import { cookies } from "next/headers";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const userEmailCookie = cookieStore.get("user_email")?.value;

  let currentUserName = "Guest User";
  let currentUserEmail = "guest@example.com";

  if (userEmailCookie) {
    try {
      const user = await db.user.findUnique({
        where: { email: userEmailCookie },
      });

      if (user) {
        currentUserName = user.name || "User";
        currentUserEmail = user.email;
      }
    } catch (error) {
      console.error("Database fetch error:", error);
    }
  }

  const getInitials = (name: string) => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const userInitials = getInitials(currentUserName);

  return (
    <DashboardLayout 
      userName={currentUserName} 
      userEmail={currentUserEmail} 
      userInitials={userInitials}
    >
      {children}
    </DashboardLayout>
  );
}

export const dynamic = "force-dynamic";
export const revalidate = 0;