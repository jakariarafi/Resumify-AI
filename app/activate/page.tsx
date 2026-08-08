"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, KeyRound, Loader2 } from "lucide-react";

export default function ActivationPage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleActivate = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    setTimeout(() => {
      // ডেটাবেজ বা লোকালস্টোরেজ থেকে জেনারেট করা কোডের লিস্ট চেক করা
      const savedCodes = JSON.parse(localStorage.getItem("active_pro_codes") || "[]");
      const codeIndex = savedCodes.findIndex((item: any) => item.code === code.trim() && !item.used);

      if (codeIndex !== -1) {
        // কোড সঠিক এবং এখনো ব্যবহৃত হয়নি
        savedCodes[codeIndex].used = true; // কোডটি একবার ব্যবহারের পর লক করে দেওয়া হলো
        localStorage.setItem("active_pro_codes", JSON.stringify(savedCodes));
        
        // ইউজারকে PRO করে দেওয়া হলো
        localStorage.setItem("is_premium", "true");
        
        alert("Congratulations! Your account is now upgraded to PRO.");
        router.push("/dashboard");
      } else {
        // কোড ভুল বা ইতিমধ্যে ব্যবহৃত হয়ে থাকলে
        setError("Invalid, expired, or already used activation code!");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl text-white space-y-6">
        
        <div className="text-center space-y-2">
          <div className="w-14 h-14 bg-indigo-500/20 text-indigo-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <KeyRound size={28} />
          </div>
          <h1 className="text-2xl font-serif font-black">Activate PRO Account</h1>
          <p className="text-xs text-slate-400">Enter the unique activation code sent to your Gmail after payment verification.</p>
        </div>

        <form onSubmit={handleActivate} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Activation Code *</label>
            <input 
              type="text" 
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="e.g. PRO-4821-X9P" 
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-center font-mono uppercase tracking-widest outline-none focus:border-indigo-500"
            />
          </div>

          {error && <p className="text-red-400 text-xs text-center font-medium">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-sm shadow-lg hover:opacity-95 transition cursor-pointer flex items-center justify-center gap-2"
          >
            {loading ? <><Loader2 size={16} className="animate-spin" /> Verifying Code...</> : "Activate PRO Now"}
          </button>
        </form>

        <div className="text-center">
          <button onClick={() => router.push("/pricing")} className="text-xs text-slate-500 hover:text-slate-300 underline cursor-pointer">
            Back to Pricing
          </button>
        </div>

      </div>
    </div>
  );
}