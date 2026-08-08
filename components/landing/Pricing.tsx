"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, X, Sparkles, Mail, ShieldCheck, Loader2, ArrowRight } from "lucide-react";
import { sendStudentVerificationEmail } from "@/actions/auth";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Essential tools for casual job seekers starting out with standard resume building.",
    features: [
      "1 Professional Resume",
      "Limited ATS-Friendly Checks",
      "Standard PDF Export",
      "Basic AI Assistance",
    ],
    cta: "Get Started Free",
    href: "/register",
    badge: "Free",
  },
  {
    name: "Pro & Student EDU",
    price: "$12",
    period: "per month / Free for .edu",
    description: "Full premium features. Free forever if verified with a valid student .edu email.",
    features: [
      "Verify .edu email for 100% Free Access",
      "Unlimited Resumes & Versions",
      "25 Daily ATS-Friendly Optimization Scans",
      "Advanced Job Description Matcher",
      "Unlimited AI Copilot Generations",
      "Multiple Professional Templates",
      "Priority PDF Export & Formatting",
    ],
    cta: "Upgrade / Verify .edu",
    badge: "Most Popular",
  },
  {
    name: "Enterprise",
    price: "$45",
    period: "per year",
    description: "Built for universities, coding bootcamps, and high-volume career placement teams.",
    features: [
      "Unlimited ATS-Friendly Optimization Scans",
      "Bulk Candidate Management",
      "Custom Branded Resume Portals",
      "Dedicated Account Manager",
      "Advanced Analytics & Placement Tracking",
      "API Integration Support",
    ],
    cta: "Get Enterprise",
    href: "/register?plan=enterprise",
    badge: "For Teams",
  },
];

export default function Pricing() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<number>(1);
  const [showEduModal, setShowEduModal] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [step, setStep] = useState<"email" | "code">("email");
  const [inputCode, setInputCode] = useState("");
  const [sentCode, setSentCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleCtaClick = (planName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (planName.includes("Pro")) {
      setShowEduModal(true);
      setStep("email");
      setUserEmail("");
      setInputCode("");
      setErrorMsg("");
    } else {
      router.push(planName.includes("Enterprise") ? "/register?plan=enterprise" : "/register");
    }
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
      // .edu মেইল হলে কোড জেনারেট করে মেইল পাঠানোর রিকোয়েস্ট যাবে
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
      // সাধারণ জিমেইল হলে সরাসরি পেমেন্ট/চেকআউট পেজে নিয়ে যাবে
      setShowEduModal(false);
      router.push("/checkout"); // আপনার পেমেন্ট পেজের সঠিক পাথ
    } else {
      setErrorMsg("দয়া করে একটি বৈধ স্টুডেন্ট ইমেইল (.edu বা .ac.bd) অথবা পেমেন্টের জন্য সাধারণ জিমেইল দিন।");
    }
  };

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCode.trim() === sentCode) {
      localStorage.setItem("is_pro_user", "true");
      setShowEduModal(false);
      // .edu মেইল ভেরিফাই হলে সরাসরি আপনার চাওয়া ড্যাশবোর্ড রেজ্যুম পেজে নিয়ে যাবে
      router.push("/dashboard/resume");
    } else {
      setErrorMsg("কোডটি ভুল হয়েছে! সঠিক কোডটি দিয়ে আবার চেষ্টা করুন।");
    }
  };

  return (
    <section id="pricing" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50/50 border-t border-gray-100 relative">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold tracking-wide uppercase">
            <svg className="w-3.5 h-3.5 text-indigo-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Simple Pricing</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Invest in your career growth
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            Choose the plan that fits your professional level. Free access available for students with .edu emails.
          </p>
        </div>

        <div className="flex md:hidden justify-center gap-2 mb-8 bg-gray-200/70 p-1.5 rounded-2xl max-w-xs mx-auto">
          {plans.map((plan, index) => (
            <button
              key={index}
              onClick={() => setSelectedPlan(index)}
              className={`flex-1 py-2 text-[11px] font-bold rounded-xl transition-all ${
                selectedPlan === index
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {plan.name.split(" ")[0]}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => {
            const isSelected = selectedPlan === index;
            const isPro = plan.name.includes("Pro");

            return (
              <div
                key={index}
                onClick={() => setSelectedPlan(index)}
                className={`p-6 sm:p-8 rounded-3xl border flex flex-col justify-between relative shadow-sm transition-all duration-300 cursor-pointer ${
                  isSelected ? "flex" : "hidden md:flex"
                } ${
                  isSelected 
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-lg ring-2 ring-indigo-600/20" 
                    : "bg-white text-gray-900 border-gray-200 hover:border-gray-300"
                }`}
              >
                <span className={`absolute -top-3.5 left-1/2 -translate-x-1/2 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                  isSelected ? "bg-white text-indigo-600 shadow-xs" : isPro ? "bg-indigo-600 text-white" : "bg-gray-900 text-white"
                }`}>
                  {plan.badge}
                </span>

                <div>
                  <div className="mb-6 space-y-2 mt-2">
                    <h3 className={`text-xl font-bold ${isSelected ? "text-white" : "text-gray-900"}`}>{plan.name}</h3>
                    <p className={`text-xs sm:text-sm leading-relaxed ${isSelected ? "text-indigo-100" : "text-gray-600"}`}>{plan.description}</p>
                  </div>

                  <div className="mb-6 flex items-baseline gap-1">
                    <span className={`text-3xl sm:text-4xl font-black ${isSelected ? "text-white" : "text-gray-900"}`}>{plan.price}</span>
                    <span className={`text-xs sm:text-sm font-medium ${isSelected ? "text-indigo-100" : "text-gray-500"}`}>/ {plan.period}</span>
                  </div>

                  <div className={`space-y-3 mb-8 border-t pt-6 ${isSelected ? "border-indigo-500/50" : "border-gray-100"}`}>
                    {plan.features.map((feature, fIndex) => (
                      <div key={fIndex} className={`flex items-center gap-3 text-sm ${isSelected ? "text-indigo-50" : "text-gray-700"}`}>
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${isSelected ? "bg-white/20 text-white" : "bg-indigo-50 text-indigo-600"}`}>
                          <Check size={14} />
                        </div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={(e) => handleCtaClick(plan.name, e)}
                  className={`w-full py-3.5 rounded-xl font-semibold text-sm text-center transition cursor-pointer ${
                    isSelected
                      ? "bg-white text-indigo-600 hover:bg-gray-100 shadow-sm"
                      : isPro
                      ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm"
                      : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            );
          })}
        </div>

      </div>

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
    </section>
  );
}