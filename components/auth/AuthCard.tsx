"use client";

import { ReactNode } from "react";

interface AuthCardProps {
  children: ReactNode;
}

export default function AuthCard({ children }: AuthCardProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-slate-950 via-indigo-950 to-violet-950 px-4 py-6 relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/30 rounded-full blur-[120px] animate-pulse"></div>

      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-violet-600/30 rounded-full blur-[120px] animate-pulse"></div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-sm rounded-2xl border border-white/20 bg-white/90 backdrop-blur-2xl shadow-2xl shadow-indigo-950/50 p-6 sm:p-7 transition-all duration-300">

        {children}

      </div>
    </div>
  );
}