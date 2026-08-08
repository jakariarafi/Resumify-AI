"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Crown, Sparkles, ShieldCheck, Zap } from "lucide-react";

export default function PricingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // প্রাইসিং পেজ থেকে সরাসরি আপনার তৈরি করা চেকআউট পেজে রিডাইরেক্ট করার ফাংশন
  const handleUpgradePayment = () => {
    setLoading(true);
    setTimeout(() => {
      router.push("/checkout");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-6 font-sans">
      <div className="max-w-4xl mx-auto text-center space-y-4 mb-16">
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold shadow-sm">
          <Crown size={14} /> PRO UPGRADE PLAN
        </div>
        <h1 className="text-4xl font-serif font-black text-slate-900">Unlock Unlimited Career Potential</h1>
        <p className="text-slate-600 max-w-xl mx-auto text-sm">Get access to all premium ATS templates, AI summary generation, custom fonts, and direct dashboard analytics.</p>
      </div>

      <div className="max-w-md mx-auto bg-white rounded-3xl shadow-2xl border-2 border-amber-400 p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-400 to-yellow-500 text-white text-[10px] font-black px-4 py-1 rounded-bl-xl uppercase tracking-widest shadow-sm">
          Best Value
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 font-serif">Lifetime PRO Pass</h3>
            <p className="text-slate-500 text-xs mt-1">One-time payment. Full access forever.</p>
          </div>

          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-black text-slate-900">৳৯৯৯</span>
            <span className="text-slate-500 text-xs font-medium">/ lifetime</span>
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-3 text-sm text-slate-700">
              <CheckCircle2 size={18} className="text-teal-600 shrink-0" /> All Premium ATS Templates
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-700">
              <CheckCircle2 size={18} className="text-teal-600 shrink-0" /> AI-Powered Smart Summaries
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-700">
              <CheckCircle2 size={18} className="text-teal-600 shrink-0" /> Direct Dashboard & Analytics Access
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-700">
              <CheckCircle2 size={18} className="text-teal-600 shrink-0" /> Unlimited PDF & Word Exports
            </div>
          </div>

          <button
            onClick={handleUpgradePayment}
            disabled={loading}
            className="w-full py-4 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-bold text-sm shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            {loading ? (
              <>Redirecting to Checkout...</>
            ) : (
              <><Zap size={16} /> Pay Now & Unlock PRO</>
            )}
          </button>

          <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 font-medium pt-2">
            <ShieldCheck size={14} /> Secured by SSL Encryption & bKash / Cards
          </div>
        </div>
      </div>
    </div>
  );
}