'use client'

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Mail } from "lucide-react";
import { forgotPassword } from "@/actions/auth";

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);

    try {
      const result = await forgotPassword(formData);

      if (result?.error) {
        setErrorMessage(result.error);
        setIsLoading(false);
      } else if (result?.success) {
        alert(result.success);
        router.push("/login");
      }
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-slate-950 via-indigo-950 to-violet-950 px-4 py-6">
      <div className="w-full max-w-sm rounded-2xl border border-white/20 bg-white/90 backdrop-blur-2xl shadow-2xl p-7">
        <div className="text-center mb-6">
          <Link href="/" className="inline-block text-xl font-black tracking-tight text-gray-900 mb-4">
            Resumify<span className="text-indigo-600">.AI</span>
          </Link>
          <h2 className="text-xl font-bold text-gray-900">Forgot Password</h2>
          <p className="mt-1 text-xs text-gray-500">Enter your email to receive a reset link.</p>
        </div>

        {errorMessage && (
          <div className="mb-4 rounded-xl bg-rose-50 border border-rose-200 p-3 text-center text-xs text-rose-600 font-medium">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-gray-600">Email Address</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                required
                placeholder="name@example.com"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-3 py-3 text-sm focus:border-indigo-600 focus:outline-none text-gray-900"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 font-semibold text-white shadow-lg transition hover:bg-indigo-500 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
            <ArrowRight size={16} />
          </button>
        </form>

        <div className="mt-6 border-t pt-4 text-center">
          <Link href="/login" className="text-sm font-semibold text-indigo-600 hover:text-indigo-800">
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}