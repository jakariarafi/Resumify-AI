import Link from "next/link";
import { MailCheck, ArrowRight, RefreshCw } from "lucide-react";

interface PageProps {
  searchParams: Promise<{ email?: string }>;
}

export default async function VerifyEmail({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const userEmail = resolvedParams.email || "example@gmail.com";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-slate-950 via-indigo-950 to-violet-950 px-4 relative overflow-hidden">

      {/* Background */}
      <div className="absolute top-[-10%] left-[-10%] w-[450px] h-[450px] bg-indigo-600/30 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[450px] h-[450px] bg-violet-600/30 rounded-full blur-[120px]" />

      <div className="relative z-10 w-full max-w-md rounded-3xl bg-white/90 backdrop-blur-2xl border border-white/20 shadow-2xl p-8">

        {/* Icon */}
        <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-600 via-violet-600 to-fuchsia-600 flex items-center justify-center shadow-xl">
          <MailCheck size={38} className="text-white" />
        </div>

        {/* Title */}
        <div className="text-center mt-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Verify Your Email
          </h1>

          <p className="text-gray-500 text-sm mt-3 leading-6">
            We've sent a verification link to
          </p>

          <p className="font-semibold text-indigo-600 mt-1 truncate px-4">
            {userEmail}
          </p>
        </div>

        {/* Info Box */}
        <div className="mt-6 rounded-2xl bg-indigo-50 border border-indigo-100 p-4 text-center">
          <p className="text-sm text-gray-600">
            Please verify your email before accessing your dashboard.
          </p>
        </div>

        {/* Dashboard */}
        <Link
          href="/dashboard"
          className="mt-6 flex items-center justify-center gap-2 w-full rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-700 py-3 font-semibold text-white hover:scale-[1.02] transition shadow-md shadow-indigo-600/20"
        >
          Continue to Dashboard
          <ArrowRight size={18} />
        </Link>

        {/* Back */}
        <div className="mt-6 text-center">
          <Link
            href="/login"
            className="text-sm font-medium text-gray-500 hover:text-indigo-600"
          >
            ← Back to Login
          </Link>
        </div>

      </div>
    </div>
  );
}