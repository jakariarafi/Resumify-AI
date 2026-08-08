"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, X, Sparkles, Mail, ShieldCheck, Loader2, ArrowRight, Crown, GraduationCap } from "lucide-react";
import { sendStudentVerificationEmail } from "@/actions/auth";

export default function PricingPage() {
  const router = useRouter();
  
  const [showEduModal, setShowEduModal] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [step, setStep] = useState<"email" | "code">("email");
  const [inputCode, setInputCode] = useState("");
  const [sentCode, setSentCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleProClick = () => {
    setShowEduModal(true);
    setStep("email");
    setUserEmail("");
    setInputCode("");
    setErrorMsg("");
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedEmail = userEmail.trim().toLowerCase();
    if (!trimmedEmail) return;

    localStorage.setItem("checkout_email", trimmedEmail);

    const isStudentEmail = 
      trimmedEmail.endsWith(".edu") || 
      trimmedEmail.includes(".ac.") || 
      trimmedEmail.endsWith(".edu.bd");

    const isCommonEmail = 
      trimmedEmail.includes("@gmail.com") || 
      trimmedEmail.includes("@yahoo.com") || 
      trimmedEmail.includes("@hotmail.com") || 
      trimmedEmail.includes("@outlook.com");

    if (isStudentEmail && !isCommonEmail) {
      setLoading(true);
      setErrorMsg("");
      const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
      setSentCode(randomCode);

      try {
        const res = await sendStudentVerificationEmail(trimmedEmail, randomCode);
        if (res && res.success) {
          setStep("code");
        } else {
          setErrorMsg(res?.error || "Failed to send code.");
        }
      } catch (err) {
        setErrorMsg("Something went wrong!");
      } finally {
        setLoading(false);
      }

    } else if (isCommonEmail) {
      setShowEduModal(false);
      router.push("/checkout");
    } else {
      setErrorMsg("দয়া করে একটি বৈধ স্টুডেন্ট ইমেইল (.edu বা .ac.bd) অথবা পেমেন্টের জন্য সাধারণ জিমেইল দিন।");
    }
  };

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCode.trim() === sentCode) {
      localStorage.setItem("is_pro_user", "true");
      setShowEduModal(false);
      router.push("/dashboard/resume");
    } else {
      setErrorMsg("কোডটি ভুল হয়েছে! সঠিক কোডটি দিয়ে আবার চেষ্টা করুন।");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-6 font-sans">
      
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center space-y-4 mb-16">
        <h1 className="text-4xl md:text-5xl font-serif font-black text-slate-900">Simple, Transparent Pricing</h1>
        <p className="text-slate-600 max-w-xl mx-auto text-sm">Choose the perfect plan for your career growth. Students get 100% free access with a valid .edu email.</p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        
        {/* 1. Free Plan */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between relative">
          <div>
            <div className="inline-block bg-slate-900 text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-full mb-6 tracking-wider">
              Free
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Free</h3>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              Essential tools for casual job seekers starting out with standard resume building.
            </p>
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-4xl font-black text-slate-900">$0</span>
              <span className="text-slate-400 text-xs font-medium">/ forever</span>
            </div>

            <ul className="space-y-4 text-sm text-slate-700 mb-8">
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0"><Check size={12} strokeWidth={3}/></div>
                1 Professional Resume
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0"><Check size={12} strokeWidth={3}/></div>
                Limited ATS-Friendly Checks
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0"><Check size={12} strokeWidth={3}/></div>
                Standard PDF Export
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0"><Check size={12} strokeWidth={3}/></div>
                Basic AI Assistance
              </li>
            </ul>
          </div>

          <button
            onClick={() => router.push("/register")}
            className="w-full py-3.5 rounded-2xl border border-slate-300 text-slate-800 font-bold text-sm hover:bg-slate-50 transition cursor-pointer"
          >
            Get Started Free
          </button>
        </div>

        {/* 2. Pro & Student EDU Plan */}
        <div className="bg-[#5B21B6] text-white rounded-3xl p-8 shadow-2xl flex flex-col justify-between relative transform md:-translate-y-3 border-2 border-indigo-400">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-white text-[#5B21B6] text-[10px] font-black uppercase px-4 py-1.5 rounded-full tracking-widest shadow-md">
            Most Popular
          </div>

          <div>
            <div className="inline-block bg-white/20 text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-full mb-6 tracking-wider">
              Pro & Student EDU
            </div>
            <h3 className="text-2xl font-bold mb-2">Pro & Student EDU</h3>
            <p className="text-xs text-indigo-200 mb-6 leading-relaxed">
              Full premium features. Free forever if verified with a valid student .edu email.
            </p>
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-4xl font-black">$12</span>
              <span className="text-indigo-200 text-xs font-medium">/ per month / Free for .edu</span>
            </div>

            <ul className="space-y-4 text-sm text-indigo-100 mb-8">
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-white/20 text-white flex items-center justify-center shrink-0"><Check size={12} strokeWidth={3}/></div>
                Verify .edu email for 100% Free Access
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-white/20 text-white flex items-center justify-center shrink-0"><Check size={12} strokeWidth={3}/></div>
                Unlimited Resumes & Versions
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-white/20 text-white flex items-center justify-center shrink-0"><Check size={12} strokeWidth={3}/></div>
                25 Daily ATS-Friendly Optimization Scans
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-white/20 text-white flex items-center justify-center shrink-0"><Check size={12} strokeWidth={3}/></div>
                Advanced Job Description Matcher
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-white/20 text-white flex items-center justify-center shrink-0"><Check size={12} strokeWidth={3}/></div>
                Unlimited AI Copilot Generations
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-white/20 text-white flex items-center justify-center shrink-0"><Check size={12} strokeWidth={3}/></div>
                Multiple Professional Templates
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-white/20 text-white flex items-center justify-center shrink-0"><Check size={12} strokeWidth={3}/></div>
                Priority PDF Export & Formatting
              </li>
            </ul>
          </div>

          <button
            onClick={handleProClick}
            className="w-full py-4 rounded-2xl bg-white text-[#5B21B6] font-extrabold text-sm shadow-lg hover:bg-indigo-50 transition cursor-pointer flex items-center justify-center gap-2"
          >
            <Crown size={16} className="text-amber-500" /> Upgrade / Verify .edu
          </button>
        </div>

        {/* 3. Enterprise Plan */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between relative">
          <div>
            <div className="inline-block bg-slate-900 text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-full mb-6 tracking-wider">
              For Teams
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Enterprise</h3>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              Built for universities, coding bootcamps, and high-volume career placement teams.
            </p>
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-4xl font-black text-slate-900">$45</span>
              <span className="text-slate-400 text-xs font-medium">/ per year</span>
            </div>

            <ul className="space-y-4 text-sm text-slate-700 mb-8">
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0"><Check size={12} strokeWidth={3}/></div>
                Unlimited ATS-Friendly Optimization Scans
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0"><Check size={12} strokeWidth={3}/></div>
                Bulk Candidate Management
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0"><Check size={12} strokeWidth={3}/></div>
                Custom Branded Resume Portals
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0"><Check size={12} strokeWidth={3}/></div>
                Dedicated Account Manager
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0"><Check size={12} strokeWidth={3}/></div>
                Advanced Analytics & Placement Tracking
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0"><Check size={12} strokeWidth={3}/></div>
                API Integration Support
              </li>
            </ul>
          </div>

          <button
            onClick={() => router.push("/register?plan=enterprise")}
            className="w-full py-3.5 rounded-2xl border border-slate-300 text-slate-800 font-bold text-sm hover:bg-slate-50 transition cursor-pointer"
          >
            Get Enterprise
          </button>
        </div>

      </div>

      {/* Modal for .EDU Verification */}
      {showEduModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-white/10 max-w-md w-full rounded-3xl p-6 relative shadow-2xl space-y-4">
            <button 
              onClick={() => setShowEduModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer"
            >
              <X size={20} />
            </button>

            {step === "email" ? (
              <>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Sparkles size={18} className="text-amber-400" /> Enter Your Email
                  </h3>
                  <p className="text-xs text-slate-400">
                    Enter your <span className="text-indigo-400 font-bold">.edu</span> email for free student verification, or a regular Gmail to proceed to payment.
                  </p>
                </div>

                <form onSubmit={handleEmailSubmit} className="space-y-3 pt-2">
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-3.5 text-slate-500" />
                    <input 
                      type="email" 
                      required
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      placeholder="your.email@university.edu or @gmail.com" 
                      className="w-full bg-slate-950 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs text-white outline-none focus:border-indigo-500 font-mono"
                      autoFocus
                    />
                  </div>

                  {errorMsg && (
                    <p className="text-[11px] text-rose-400 font-medium">{errorMsg}</p>
                  )}

                  <button 
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-95 text-white font-bold text-xs py-3.5 rounded-xl transition cursor-pointer shadow-lg flex items-center justify-center gap-2"
                  >
                    {loading && <Loader2 size={16} className="animate-spin" />}
                    {loading ? "Processing..." : "Continue / Verify"}
                  </button>
                </form>
              </>
            ) : (
              <>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <ShieldCheck size={18} className="text-emerald-400" /> Enter Verification Code
                  </h3>
                  <p className="text-xs text-slate-400">
                    We have sent a verification code to <span className="text-indigo-400 font-medium">{userEmail}</span>. Enter it below.
                  </p>
                </div>

                <form onSubmit={handleCodeSubmit} className="space-y-3 pt-2">
                  <div className="relative">
                    <input 
                      type="text" 
                      required
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value)}
                      placeholder="Enter 6-digit code" 
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-center text-lg tracking-widest text-white outline-none focus:border-indigo-500 font-mono"
                      autoFocus
                    />
                  </div>

                  {errorMsg && (
                    <p className="text-[11px] text-rose-400 font-medium text-center">{errorMsg}</p>
                  )}

                  <button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-95 text-white font-bold text-xs py-3.5 rounded-xl transition cursor-pointer shadow-lg flex items-center justify-center gap-1.5"
                  >
                    Verify & Go to Resume <ArrowRight size={16} />
                  </button>
                </form>
              </>
            )}

          </div>
        </div>
      )}

    </div>
  );
}