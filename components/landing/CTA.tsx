"use client";

import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-20 px-6 lg:px-8 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        <div className="relative rounded-3xl bg-gradient-to-r from-gray-900 via-indigo-950 to-gray-900 p-8 md:p-16 text-center text-white overflow-hidden shadow-2xl border border-gray-800">
          
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 blur-3xl rounded-full pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-600/10 blur-3xl rounded-full pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            
            <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
              Stop Losing Interviews to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400">Poorly Formatted Resumes</span>
            </h2>

            <p className="text-gray-300 text-base md:text-lg font-normal max-w-2xl mx-auto leading-relaxed">
              Build a polished, professional CV that recruiters actually notice. Spin up your tailored application package in under five minutes.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/dashboard/resume"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-base shadow-xl hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                <span>Build My Resume Now</span>
                <ArrowRight size={18} />
              </Link>
            </div>

            <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-400 font-medium">
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={16} className="text-indigo-400" />
                <span>Secure & Confidential</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={16} className="text-indigo-400" />
                <span>Built for Modern Hiring</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}