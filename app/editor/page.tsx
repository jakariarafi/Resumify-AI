"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Crown, Lock, Sparkles, Download, CheckCircle } from "lucide-react";

export default function ResumeEditorPage() {
  const router = useRouter();
  const [isProUser, setIsProUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // পেজ লোড হওয়ার সাথে সাথে চেক করবে ইউজার প্রো কি না
  useEffect(() => {
    try {
      const proStatus = localStorage.getItem("is_pro_user");
      if (proStatus === "true") {
        setIsProUser(true);
      }
    } catch (err) {
      console.error("Error reading localStorage", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <p className="animate-pulse">Loading editor...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Top Header Status Bar */}
        <div className="flex justify-between items-center bg-slate-900 border border-white/10 p-4 rounded-2xl">
          <h1 className="text-xl font-bold font-serif">Resume Editor & Builder</h1>
          
          <div>
            {isProUser ? (
              <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-sm">
                <Crown size={14} className="text-amber-400" /> PRO Plan Active
              </div>
            ) : (
              <button
                onClick={() => router.push("/pricing")}
                className="flex items-center gap-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-95 text-white px-4 py-2 rounded-full text-xs font-bold transition shadow-lg cursor-pointer"
              >
                <Sparkles size={14} /> Upgrade to PRO ($12)
              </button>
            )}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Editor Workspace */}
          <div className="md:col-span-2 bg-slate-900 border border-white/10 p-6 rounded-3xl space-y-4">
            <h2 className="text-lg font-semibold text-indigo-300">Resume Content</h2>
            <p className="text-xs text-slate-400">Fill out your details below to build your professional resume.</p>
            
            <div className="space-y-3 pt-2">
              <input 
                type="text" 
                placeholder="Full Name" 
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 text-white" 
              />
              <input 
                type="text" 
                placeholder="Professional Title (e.g. Full Stack Developer)" 
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 text-white" 
              />
              <textarea 
                rows={4} 
                placeholder="Write a brief professional summary..." 
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 text-white resize-none"
              />
            </div>
          </div>

          {/* Premium Features / Export Panel */}
          <div className="bg-slate-900 border border-white/10 p-6 rounded-3xl flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-indigo-300">Export & AI Tools</h2>
              
              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-emerald-400" /> Standard PDF Export
                </div>
                <div className={`flex items-center gap-2 ${isProUser ? "text-white" : "text-slate-500"}`}>
                  {isProUser ? <CheckCircle size={14} className="text-emerald-400" /> : <Lock size={14} className="text-rose-400" />} 
                  Unlimited ATS Optimization Scans
                </div>
                <div className={`flex items-center gap-2 ${isProUser ? "text-white" : "text-slate-500"}`}>
                  {isProUser ? <CheckCircle size={14} className="text-emerald-400" /> : <Lock size={14} className="text-rose-400" />} 
                  Advanced AI Copilot Generations
                </div>
              </div>
            </div>

            {/* Action Download / Export Button */}
            <div>
              {isProUser ? (
                <button 
                  onClick={() => alert("Downloading Pro PDF Resume...")}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-2xl text-xs transition cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20"
                >
                  <Download size={16} /> Download PRO PDF
                </button>
              ) : (
                <div className="space-y-2">
                  <button 
                    onClick={() => router.push("/pricing")}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-95 text-white font-bold py-3.5 rounded-2xl text-xs transition cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/25"
                  >
                    <Crown size={16} /> Unlock All PRO Features
                  </button>
                  <p className="text-[10px] text-center text-slate-500">Already paid? Go to success page to enter your Gmail code.</p>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}