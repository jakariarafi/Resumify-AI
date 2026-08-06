"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Lock, Mail, Eye, EyeOff } from "lucide-react";
import { loginUser } from "@/actions/auth";
import { signIn } from "next-auth/react";

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const result = await loginUser(formData);

      if (result.error) {
        setError(result.error);
        setIsLoading(false);
      } else if (result.success) {
        setSuccess(result.success);
        setIsLoading(false);
        
        setTimeout(() => {
          router.push("/dashboard");
          router.refresh();
        }, 1000);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-slate-950 via-indigo-950 to-violet-950 px-4 py-6 relative overflow-hidden">
      
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/30 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-violet-600/30 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>

      <div className="w-full max-w-sm bg-white/90 backdrop-blur-2xl rounded-2xl shadow-2xl shadow-indigo-950/50 border border-white/20 p-6 sm:p-7 relative z-10 transition-all duration-300">
        
        <div className="text-center mb-5">
          <Link href="/" className="inline-block text-xl font-black tracking-tight text-gray-900 mb-3">
            Resumify<span className="text-indigo-600">.AI</span>
          </Link>
          
          <div className="relative w-14 h-14 mx-auto mb-2 rounded-full bg-gradient-to-tr from-indigo-600 via-violet-600 to-fuchsia-600 p-0.5 shadow-lg shadow-indigo-500/30 flex items-center justify-center text-white">
            <div className="w-full h-full rounded-full bg-white text-indigo-600 flex items-center justify-center shadow-inner">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></span>
          </div>

          <h2 className="text-lg font-bold text-gray-900">Welcome Back</h2>
          <p className="text-xs text-gray-500 mt-0.5">Sign in to access your professional workspace</p>
        </div>

        {error && (
          <div className="mb-3 p-2.5 text-xs text-red-600 bg-red-50 border border-red-200 rounded-xl text-center font-medium">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-3 p-2.5 text-xs text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-xl text-center font-medium">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-600 mb-1">
              Email Address
            </label>
            <div className="relative group">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-600 transition-colors">
                <Mail size={16} />
              </span>
              <input
                type="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-gray-50/80 border border-gray-200 text-gray-900 text-xs font-medium focus:bg-white focus:outline-none focus:border-indigo-600 focus:ring-3 focus:ring-indigo-600/10 transition-all duration-300"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-600">
                Password
              </label>
              <Link href="/forgot-password" className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 transition">
                Forgot password?
              </Link>
            </div>
            <div className="relative group">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-600 transition-colors">
                <Lock size={16} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-gray-50/80 border border-gray-200 text-gray-900 text-xs font-medium focus:bg-white focus:outline-none focus:border-indigo-600 focus:ring-3 focus:ring-indigo-600/10 transition-all duration-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 transition-colors focus:outline-none cursor-pointer"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full group relative flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer mt-1"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>

        </form>

        <div className="relative flex py-3 items-center">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink mx-3 text-[10px] uppercase font-bold text-gray-400 tracking-wider">Or continue with</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gray-50 border border-gray-200 hover:bg-gray-100 text-gray-800 font-semibold text-xs transition-all duration-200 active:scale-95 cursor-pointer shadow-sm"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.13 0-5.78-2.11-6.73-4.96H1.18v3.15C3.15 21.32 7.23 24 12 24z"/>
              <path fill="#FBBC05" d="M5.27 14.24c-.25-.72-.38-1.5-.38-2.24s.13-1.52.38-2.24V6.6H1.18C.43 8.12 0 9.8 0 12s.43 3.88 1.18 5.4l4.09-3.16z"/>
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.23 0 3.15 2.68 1.18 6.6l4.09 3.15c.95-2.85 3.6-4.96 6.73-4.96z"/>
            </svg>
            <span>Google</span>
          </button>

          <button
            type="button"
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gray-50 border border-gray-200 hover:bg-gray-100 text-gray-800 font-semibold text-xs transition-all duration-200 active:scale-95 cursor-pointer shadow-sm"
          >
            <svg className="w-4 h-4" viewBox="0 0 23 23">
              <path fill="#f3f3f3" d="M0 0h23v23H0z"/>
              <path fill="#f35325" d="M1 1h10v10H1z"/>
              <path fill="#81bc06" d="M12 1h10v10H12z"/>
              <path fill="#05a6f0" d="M1 12h10v10H1z"/>
              <path fill="#ffba08" d="M12 12h10v10H12z"/>
            </svg>
            <span>Microsoft</span>
          </button>
        </div>

        <div className="text-center mt-4 pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-600">
            Don't have an account?{" "}
            <Link href="/register" className="font-bold text-indigo-600 hover:text-indigo-800 transition">
              Create account
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}