"use client";

import { Sparkles, Cpu, Layers, Sliders, ShieldCheck, Download, Zap } from "lucide-react";

const features = [
  {
    icon: <Cpu className="w-5 h-5 text-indigo-600" />,
    title: "Smart AI Keyword Matcher",
    description: "Scans job descriptions automatically and injects industry-specific keywords to beat automated recruiter screens.",
  },
  {
    icon: <Layers className="w-5 h-5 text-indigo-600" />,
    title: "Dynamic Section Reordering",
    description: "Easily drag, drop, or toggle resume sections to highlight your strongest qualifications first.",
  },
  {
    icon: <Sliders className="w-5 h-5 text-indigo-600" />,
    title: "One-Click Tone Adjustment",
    description: "Instantly switch your resume phrasing between corporate executive, creative startup, or technical engineering tones.",
  },
  {
    icon: <ShieldCheck className="w-5 h-5 text-indigo-600" />,
    title: "Zero-Data Tracking Policy",
    description: "Your personal employment history and private contact credentials are encrypted and never shared with third parties.",
  },
  {
    icon: <Download className="w-5 h-5 text-indigo-600" />,
    title: "Multiple Format Exports",
    description: "Download your completed resume in clean PDF, semantic HTML, or plain text format depending on recruiter guidelines.",
  },
  {
    icon: <Zap className="w-5 h-5 text-indigo-600" />,
    title: "Instant Version Control",
    description: "Maintain multiple tailored iterations of your CV simultaneously for different career tracks without rewriting from scratch.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-14 md:py-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center space-y-3 mb-10 md:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-[11px] md:text-xs font-bold tracking-wide uppercase shadow-xs">
            <Sparkles size={12} className="text-indigo-600" />
            <span>Advanced Capabilities</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight text-gray-900 leading-tight">
            Engineered for Maximum <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Interview Success</span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2">
            Discover the specialized toolkit built into our platform to optimize every line of your professional background.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-5 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl border border-gray-200/80 bg-gray-50/50 hover:bg-white hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}