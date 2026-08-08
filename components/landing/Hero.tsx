"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Sparkles } from "lucide-react";

const typewriterTexts = [
  "AI-Driven Bullet Points",
  "Real-Time Keyword Matching",
  "Professional Templates",
  "ATS-Optimized Resumes"
];

export default function Hero() {
  const router = useRouter();
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentDisplayText, setCurrentDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(80);

  useEffect(() => {
    const fullText = typewriterTexts[currentTextIndex];

    const handleTyping = () => {
      if (!isDeleting) {
        setCurrentDisplayText(fullText.substring(0, currentDisplayText.length + 1));
        if (currentDisplayText === fullText) {
          setTimeout(() => setIsDeleting(true), 1200);
          setTypingSpeed(40);
        }
      } else {
        setCurrentDisplayText(fullText.substring(0, currentDisplayText.length - 1));
        if (currentDisplayText === "") {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % typewriterTexts.length);
          setTypingSpeed(80);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentDisplayText, isDeleting, currentTextIndex, typingSpeed]);

  const scrollToTemplates = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetElement = document.querySelector("#templates");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  // বাটন ক্লিক করলেই সরাসরি রেজ্যুম এডিট পেজে নিয়ে যাবে
  const handleCreateResume = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push("/dashboard/resume");
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-white via-indigo-50/40 to-white">
      {/* Background Glowing & Animated Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-indigo-500/15 via-violet-500/15 to-fuchsia-500/10 blur-[120px] rounded-full -z-10 pointer-events-none animate-pulse"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        
        {/* Main Headline with Stunning Gradient */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 tracking-tight max-w-4xl mx-auto leading-[1.12]">
          Build an <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 animate-gradient">ATS-Optimized Resume</span> in Minutes.
        </h1>

        {/* Fast Dynamic Typewriter Subtitle */}
        <div className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-normal h-12 flex items-center justify-center">
          <span>Transform your career with&nbsp;</span>
          <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
            {currentDisplayText}
          </span>
          <span className="animate-pulse ml-0.5 font-bold text-indigo-600">|</span>
        </div>

        {/* CTA Buttons with Smooth Hover Effects */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleCreateResume}
            className="w-full sm:w-auto group flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-700 text-white font-bold text-base shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 cursor-pointer"
          >
            <span>Create Your Resume Free</span>
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </button>

          <a
            href="#templates"
            onClick={scrollToTemplates}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white border border-gray-200 text-gray-700 font-bold text-base shadow-sm hover:bg-gray-50 hover:border-indigo-200 transition-all duration-300 cursor-pointer"
          >
            Explore Templates
          </a>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm font-semibold text-gray-500">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={18} className="text-emerald-500" />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck size={18} className="text-emerald-500" />
            <span>ATS Friendly Guaranteed</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap size={18} className="text-amber-500" />
            <span>Ready in under 5 minutes</span>
          </div>
        </div>

        {/* Interactive Workspace Preview Mockup Card */}
        <div className="mt-16 max-w-5xl mx-auto rounded-3xl border border-gray-200/80 bg-white/60 backdrop-blur-2xl p-3 shadow-2xl shadow-indigo-500/10 transition-all hover:shadow-indigo-500/20">
          <div className="rounded-2xl bg-gradient-to-b from-gray-900 to-gray-950 p-6 md:p-10 text-white text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/20 blur-3xl rounded-full pointer-events-none"></div>
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 border-b border-gray-800 pb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">Live Workspace Preview</span>
                <h3 className="text-2xl font-bold mt-1">Smart AI Resume Builder</h3>
              </div>
              <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-1.5 rounded-full text-xs font-bold shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                ATS Score: 92/100
              </div>
            </div>

            {/* Mockup Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-900/90 border border-gray-800 p-5 rounded-xl transition hover:border-indigo-500/50">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">1. Personal Info</h4>
                <p className="text-sm font-semibold mt-2 text-gray-200">Al Jakaria Hossain Jobayed Rafi</p>
                <p className="text-xs text-indigo-400 mt-0.5 font-medium">Software Engineer</p>
              </div>
              <div className="bg-gray-900/90 border border-gray-800 p-5 rounded-xl transition hover:border-indigo-500/50">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">2. AI Bullet Points</h4>
                <p className="text-xs text-gray-300 mt-2 leading-relaxed">&quot;Engineered full-stack features using React, reducing API load time by 35%.&quot;</p>
              </div>
              <div className="bg-gray-900/90 border border-gray-800 p-5 rounded-xl flex flex-col justify-between transition hover:border-emerald-500/50">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">3. Export Ready</h4>
                <div className="mt-2 text-xs font-bold text-emerald-400 bg-emerald-950/60 py-2 text-center rounded-lg border border-emerald-800/60 shadow-inner">
                  PDF Generated Successfully ✓
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}