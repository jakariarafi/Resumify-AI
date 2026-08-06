"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MailCheck, ArrowRight, RefreshCw } from "lucide-react";

interface VerifyEmailProps {
  userEmail?: string;
}

export default function VerifyEmail({ userEmail = "example@gmail.com" }: VerifyEmailProps) {
  const [countdown, setCountdown] = useState(60);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (countdown === 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const handleResend = async () => {
    setLoading(true);
    setMessage("");

    try {
      // এখানে আপনার রিসেন্ড ইমেইলের সার্ভার অ্যাকশন বা API কল করতে পারেন
      // যেমন: await resendVerificationEmail(userEmail);
      
      await new Promise((resolve) => setTimeout(resolve, 1500)); // সিমুলেশন
      setMessage("Verification email resent successfully!");
      setCountdown(60);
    } catch (error) {
      setMessage("Failed to resend email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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

        {message && (
          <p className={`mt-4 text-xs text-center font-medium ${message.includes("success") ? "text-emerald-600" : "text-rose-600"}`}>
            {message}
          </p>
        )}

        {/* Resend */}
        <div className="mt-6">
          <button
            disabled={countdown > 0 || loading}
            onClick={handleResend}
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-indigo-200 py-3 text-sm font-semibold text-indigo-600 hover:bg-indigo-50 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <RefreshCw size={16} />
                {countdown > 0
                  ? `Resend in ${countdown}s`
                  : "Resend Verification Email"}
              </>
            )}
          </button>
        </div>

        {/* Dashboard */}
        <Link
          href="/dashboard"
          className="mt-4 flex items-center justify-center gap-2 w-full rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-700 py-3 font-semibold text-white hover:scale-[1.02] transition shadow-md shadow-indigo-600/20"
        >
          Continue
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