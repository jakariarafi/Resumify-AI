"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, ArrowRight, KeyRound, Mail, FileText } from "lucide-react";

export default function PaymentSuccessPage() {
  const router = useRouter();
  const [paymentInfo, setPaymentInfo] = useState<any>(null);
  const [inputCode, setInputCode] = useState("");
  const [activateStatus, setActivateStatus] = useState<{ success?: boolean; message?: string } | null>(null);
  const [txnId, setTxnId] = useState("");

  useEffect(() => {
    setTxnId(`TXN-${Math.floor(10000 + Math.random() * 90000)}`);

    try {
      const lastPayment = localStorage.getItem("last_payment");
      if (lastPayment) {
        setPaymentInfo(JSON.parse(lastPayment));
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  const handleActivatePro = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;

    try {
      const savedCodes = JSON.parse(localStorage.getItem("active_pro_codes") || "[]");
      const found = savedCodes.find((item: any) => item.code.trim().toUpperCase() === inputCode.trim().toUpperCase());

      if (found) {
        if (found.used) {
          setActivateStatus({ success: false, message: "এই কোডটি ইতিমধ্যে ব্যবহার করা হয়েছে!" });
        } else {
          found.used = true;
          localStorage.setItem("active_pro_codes", JSON.stringify(savedCodes));
          localStorage.setItem("is_pro_user", "true"); // PRO স্ট্যাটাস পার্মানেন্টলি সেভ হলো
          
          setActivateStatus({ success: true, message: "অভিনন্দন! আপনার অ্যাকাউন্ট সফলভাবে PRO-তে উন্নীত হয়েছে!" });
          
          setTimeout(() => {
            router.push("/");
          }, 2000);
        }
      } else {
        setActivateStatus({ success: false, message: "অ্যাক্টিভেশন কোডটি সঠিক নয়! দয়া করে সঠিক কোড দিন।" });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 font-sans relative overflow-hidden">
      
      <div className="absolute w-[500px] h-[500px] bg-emerald-600/15 rounded-full blur-[120px] pointer-events-none -top-20 -left-20" />
      <div className="absolute w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none -bottom-20 -right-20" />

      <div className="max-w-xl w-full bg-slate-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden p-8 relative z-10 space-y-6">
        
        {/* Success Header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 size={36} />
          </div>
          <div>
            <h1 className="text-2xl font-serif font-black text-white">Payment Successful</h1>
            <p className="text-slate-400 text-xs mt-1">Your transaction has been processed. Please check your Gmail for the PRO activation code.</p>
          </div>
          <div className="text-3xl font-mono font-black text-emerald-400">$12.00 / ৳1,200</div>
        </div>

        {/* Transaction Details Box */}
        <div className="bg-slate-950/60 border border-white/5 rounded-2xl p-4 space-y-3 text-xs">
          <div className="flex justify-between items-center text-slate-400 border-b border-white/5 pb-2">
            <span>Ref Number</span>
            <span className="font-mono font-bold text-white">{txnId || "TXN-Loading..."}</span>
          </div>
          <div className="flex justify-between items-center text-slate-400 border-b border-white/5 pb-2">
            <span>Payment Method</span>
            <span className="font-bold text-white">{paymentInfo?.method || "Mobile Banking"}</span>
          </div>
          <div className="flex justify-between items-center text-slate-400 border-b border-white/5 pb-2">
            <span>Buyer Gmail</span>
            <span className="font-mono text-indigo-400 font-bold">{paymentInfo?.email || "resumefiyai@gmail.com"}</span>
          </div>
          <div className="flex justify-between items-center text-slate-400">
            <span>Details / Sender</span>
            <span className="font-mono text-amber-300 font-bold truncate max-w-[200px]">{paymentInfo?.detail || "N/A"}</span>
          </div>
        </div>

        {/* Code Input & Activation Section */}
        <div className="bg-gradient-to-r from-indigo-950/50 to-purple-950/50 border border-indigo-500/20 rounded-2xl p-5 space-y-4">
          <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold uppercase tracking-wider">
            <Mail size={16} /> Check your Gmail and enter the code below
          </div>

          <form onSubmit={handleActivatePro} className="space-y-3">
            <label className="block text-[11px] font-bold text-slate-300 uppercase flex items-center gap-1">
              <KeyRound size={12} className="text-purple-400" /> Enter PRO Code from Gmail:
            </label>
            <div className="flex gap-2">
              <input 
                type="text" 
                required
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                placeholder="e.g. PRO-8829-1DR" 
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-xs text-white uppercase font-mono outline-none focus:border-indigo-500"
              />
              <button 
                type="submit"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-95 text-white font-bold text-xs px-6 py-3 rounded-xl transition cursor-pointer shrink-0 shadow-lg"
              >
                Activate PRO
              </button>
            </div>

            {activateStatus && (
              <div className={`p-2.5 rounded-xl text-xs font-semibold ${activateStatus.success ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400" : "bg-rose-500/10 border border-rose-500/20 text-rose-400"}`}>
                {activateStatus.message}
              </div>
            )}
          </form>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5 pt-2">
          <button
            onClick={() => router.push("/payment/invoice")}
            className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3.5 rounded-2xl text-sm transition cursor-pointer flex items-center justify-center gap-2 border border-white/10 shadow"
          >
            <FileText size={16} className="text-indigo-400" /> <span>Download Official Invoice</span>
          </button>

          <button
            onClick={() => router.push("/")}
            className="w-full bg-white hover:bg-slate-100 text-slate-950 font-bold py-3.5 rounded-2xl text-sm shadow-lg transition cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Go to Dashboard / Home</span> <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </div>
  );
}