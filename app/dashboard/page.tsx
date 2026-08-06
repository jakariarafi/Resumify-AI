import { db } from "@/lib/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import StatsCard from "@/components/dashboard/StatsCard";
import ProgressCard from "@/components/dashboard/ProgressCard";
import AnalyticsCharts from "@/components/dashboard/AnalyticsCharts";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const userEmail = cookieStore.get("user_email")?.value;

  if (!userEmail) {
    redirect("/login");
  }

  const user = await db.user.findUnique({
    where: { email: userEmail },
  });

  if (!user) {
    redirect("/login");
  }

  const getInitials = (fullName: string) => {
    if (!fullName) return "U";
    const names = fullName.trim().split(" ");
    if (names.length >= 2) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return fullName.substring(0, 2).toUpperCase();
  };

  const userInitials = user.name ? getInitials(user.name) : "U";

  return (
    <div className="space-y-6">
      {/* Dynamic Header with Real User Name */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-xl">
        <div>
          <h1 className="text-2xl font-black text-white">
            Welcome back, {user.name || "User"} 👋
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage your professional resumes and track performance.
          </p>
        </div>

        {/* Real Profile Card Section */}
        <div className="flex items-center gap-3 bg-white/10 border border-white/10 px-4 py-2.5 rounded-xl">
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-fuchsia-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
            {userInitials}
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-slate-950 rounded-full"></span>
          </div>
          <div>
            <h3 className="text-sm font-bold text-white leading-tight">{user.name || "User"}</h3>
            <span className="text-[11px] font-medium text-indigo-400">Pro Member</span>
          </div>
        </div>
      </div>

      <StatsCard />

      <AnalyticsCharts />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProgressCard />
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";
export const revalidate = 0;