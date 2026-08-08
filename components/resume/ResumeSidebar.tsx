"use client";

import { Check } from "lucide-react";

interface ResumeSidebarProps {
  currentStep: number;
  setStep: (step: number) => void;
  completeness: number;
}

const steps = [
  { id: 1, label: "Heading" },
  { id: 2, label: "Education" },
  { id: 3, label: "Experience" },
  { id: 4, label: "Skills" },
  { id: 5, label: "Summary" },
  { id: 6, label: "Finalize" },
];

export default function ResumeSidebar({ currentStep, setStep, completeness }: ResumeSidebarProps) {
  return (
    <aside className="w-72 bg-[#06182c] text-white flex flex-col justify-between p-6 shrink-0 h-full select-none border-r border-slate-800 shadow-xl">
      
      {/* Steps List with Dashed Line Animation */}
      <div className="space-y-6 pt-4">
        <div className="flex flex-col space-y-6 relative">
          
          {/* Vertical Background Dashed Line */}
          <div className="absolute left-[15px] top-4 bottom-4 w-0.5 border-l-2 border-dashed border-slate-700/60 z-0" />

          {steps.map((item, index) => {
            const isActive = currentStep === item.id;
            const isCompleted = currentStep > item.id;

            return (
              <button
                key={item.id}
                onClick={() => setStep(item.id)}
                className="flex items-center gap-4 text-left relative z-10 w-full group cursor-pointer transition-all duration-300"
              >
                {/* Step Circle with Pulse & Glow Animation */}
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-500 relative ${
                    isActive 
                      ? "bg-amber-400 text-slate-900 ring-4 ring-amber-400/20 scale-110 shadow-lg shadow-amber-400/20" 
                      : isCompleted 
                      ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20" 
                      : "bg-[#112a46] text-slate-400 group-hover:bg-[#1a3a5f] group-hover:text-white"
                  }`}
                >
                  {isCompleted ? <Check size={14} className="stroke-[3]" /> : item.id}
                  
                  {/* Active Ripple Animation Effect */}
                  {isActive && (
                    <span className="absolute inset-0 rounded-full bg-amber-400 animate-ping opacity-35 pointer-events-none" />
                  )}
                </div>

                {/* Step Label with Hover Transition */}
                <span className={`text-sm font-semibold tracking-wide transition-all duration-300 ${
                  isActive 
                    ? "text-white font-bold translate-x-1" 
                    : isCompleted 
                    ? "text-slate-300" 
                    : "text-slate-400 group-hover:text-slate-200"
                }`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Resume Completeness Bar with Smooth Transition */}
        <div className="pt-8 border-t border-slate-800/80 space-y-2.5">
          <div className="flex justify-between text-[11px] font-bold tracking-wider text-slate-400">
            <span>RESUME COMPLETENESS:</span>
            <span className="text-amber-400 font-extrabold">{completeness}%</span>
          </div>
          <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden p-0.5 border border-slate-800">
            <div 
              className="bg-amber-400 h-full transition-all duration-700 ease-out rounded-full shadow-sm shadow-amber-400/50"
              style={{ width: `${completeness}%` }}
            />
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="text-[11px] text-slate-400 space-y-3 pt-6 border-t border-slate-800/80">
        <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-slate-400">
          <a href="#" className="hover:underline hover:text-white transition">Terms & Conditions</a>
          <a href="#" className="hover:underline hover:text-white transition">Privacy Policy</a>
          <a href="#" className="hover:underline hover:text-white transition">Accessibility</a>
          <a href="#" className="hover:underline hover:text-white transition">Contact Us</a>
        </div>
        <p className="text-slate-500 text-[10px] pt-1">© 2026, Bold Limited. All rights reserved.</p>
      </div>

    </aside>
  );
}