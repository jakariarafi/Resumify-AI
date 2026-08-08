"use client";

import React, { useState, useEffect } from "react";
import { Crown, ShieldCheck } from "lucide-react";
import ResumeDocument from "./ResumeDocument";

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
  onPremiumClick, 
  resumeData, 
  design, 
  sectionOrder,
  adminTemplates = []
}: any) {
  
  const [hasEduPro, setHasEduPro] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const proStatus = localStorage.getItem("is_pro_user");
    const savedEmail = localStorage.getItem("checkout_email");
    if (proStatus === "true") {
      setHasEduPro(true);
      if (savedEmail) setUserEmail(savedEmail);
    }
  }, []);

  const allTemplates = [...INITIAL_TEMPLATES, ...adminTemplates];

  return (
    <div className="space-y-4 pb-10">
      
      {/* ইউজার যদি .edu ভেরিফাইড হয়, তবে এখানে স্ট্যাটাস শো করবে */}
      {hasEduPro && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center gap-2.5 shadow-sm">
          <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
            <ShieldCheck size={18} />
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-emerald-900">Verified Student Account</p>
            <p className="text-[11px] text-emerald-700 truncate">{userEmail || ".edu Student"} • All PRO Templates Unlocked</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        {allTemplates.map(t => {
          const isActive = templateId === t.id;
          return (
            <div 
              key={t.id}
              onClick={() => {
                if (t.isPremium && !hasEduPro) {
                  onPremiumClick();
                } else {
                  onSelect(t.id);
                }
              }}
              className={`cursor-pointer transition-all duration-200 border-2 p-1 rounded-lg relative ${isActive ? 'border-[#0F6B62]' : 'border-transparent hover:border-slate-300'}`}
            >
              {/* ফ্রি ইউজারদের জন্য PRO ব্যাজ */}
              {t.isPremium && !hasEduPro && (
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-400 to-yellow-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-md z-10 flex items-center gap-1">
                  PRO <Crown size={10} />
                </div>
              )}

              {/* .EDU ভেরিফাইড ইউজারদের জন্য .EDU PRO ব্যাজ */}
              {t.isPremium && hasEduPro && (
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-md z-10 flex items-center gap-1">
                  .EDU PRO <Crown size={10} />
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
    </div>
  );
}