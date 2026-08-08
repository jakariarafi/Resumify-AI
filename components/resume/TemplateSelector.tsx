import React from "react";
import { Crown } from "lucide-react";
import ResumeDocument from "./ResumeDocument";

// ✅ ফ্রী এবং প্রো টেমপ্লেটের ডাটা
export const INITIAL_TEMPLATES = [
  { id: "modern", label: "Modern Column", isPremium: false },
  { id: "classic", label: "Classic Print", isPremium: false },
  { id: "minimal", label: "Minimalist", isPremium: false },
  { id: "executive", label: "Executive", isPremium: true },
  { id: "creative", label: "Creative Flow", isPremium: true },
  { id: "elegant", label: "Elegant Serif", isPremium: true },
];

export default function TemplateSelector({ 
  templateId, 
  onSelect, 
  isPremiumUser, 
  onPremiumClick, 
  resumeData, 
  design, 
  sectionOrder,
  adminTemplates = []
}: any) {
  
  const allTemplates = [...INITIAL_TEMPLATES, ...adminTemplates];

  return (
    <div className="grid grid-cols-2 gap-4 pb-10">
      {allTemplates.map(t => {
        const isActive = templateId === t.id;
        return (
          <div 
            key={t.id}
            onClick={() => {
              if (t.isPremium && !isPremiumUser) {
                onPremiumClick();
              } else {
                onSelect(t.id);
              }
            }}
            className={`cursor-pointer transition-all duration-200 border-2 p-1 rounded-lg relative ${isActive ? 'border-[#0F6B62]' : 'border-transparent hover:border-slate-300'}`}
          >
            {/* PRO Badge */}
            {t.isPremium && (
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-400 to-yellow-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-md z-10 flex items-center gap-1">
                PRO <Crown size={10} />
              </div>
            )}

            <div className="w-full aspect-[1/1.4] bg-white shadow-sm relative overflow-hidden group rounded-md">
              <div 
                className="absolute top-0 left-0 origin-top-left pointer-events-none"
                style={{ width: "210mm", transform: "scale(0.18)" }} 
              >
                <ResumeDocument 
                  data={resumeData} 
                  template={t.id} 
                  design={design} 
                  sectionOrder={sectionOrder} 
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 backdrop-blur-sm">
                <span className="text-[12px] font-bold text-slate-800 text-center px-2">{t.label}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}