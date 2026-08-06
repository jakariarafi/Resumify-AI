"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Mail, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-slate-950 via-indigo-950 to-violet-950 px-4 py-6 relative overflow-hidden">

      {/* Background Blur */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/30 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-violet-600/30 rounded-full blur-[120px] animate-pulse"></div>

      <div className="relative z-10 w-full max-w-sm rounded-2xl border border-white/20 bg-white/90 backdrop-blur-2xl shadow-2xl shadow-indigo-950/50 p-7">

        {/* Logo */}
        <div className="text-center mb-6">
          <Link
            href="/"
            className="inline-block text-xl font-black tracking-tight text-gray-900 mb-4"
          >
            Resumify
            <span className="text-indigo-600">.AI</span>
          </Link>

          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-600 via-violet-600 to-fuchsia-600 text-white shadow-lg">
            <Mail size={26} />
          </div>

          <h2 className="text-xl font-bold text-gray-900">
            Forgot Password
          </h2>

          <p className="mt-1 text-xs text-gray-500">
            Enter your email to receive a password reset link.
          </p>
        </div>

        {!isSent ? (
          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-gray-600">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-3 py-3 text-sm focus:border-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-600/10"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-700 py-3 font-semibold text-white shadow-lg transition hover:scale-[1.01]"
            >
              {isLoading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <>
                  Send Reset Link
                  <ArrowRight size={16} />
                </>
              )}
            </button>

          </form>
        ) : (
          <div className="text-center">

            <CheckCircle2
              size={60}
              className="mx-auto text-emerald-500 mb-3"
            />

            <h3 className="text-lg font-bold text-gray-900">
              Email Sent
            </h3>

            <p className="mt-2 text-sm text-gray-600">
              We've sent a password reset link to
            </p>

            <p className="font-semibold text-indigo-600 mt-1">
              {email}
            </p>
          </div>
        )}

        <div className="mt-6 border-t pt-4 text-center">

          <Link
            href="/login"
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-800"
          >
            ← Back to Login
          </Link>

        </div>

      </div>
    </div>
  );
}