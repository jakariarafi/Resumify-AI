"use client";

import { useState } from "react";
import { Sparkles, Check, Edit3 } from "lucide-react";

export default function SummaryGenerator({ info, experience, education, skills, onUpdateSummary }: any) {
  const [isEditing, setIsEditing] = useState(false);
  
  // অটোমেটিক সামারি জেনারেট করার লজিক
  const generatedSummary = `Dedicated and results-driven ${info.profession || 'Professional'} with hands-on expertise in ${skills?.map((s:any) => s.name).slice(0, 3).join(", ") || 'software development'}. Graduate from ${education?.[0]?.institution || 'University'} with a strong foundation in building efficient programs and applications. Proven ability to collaborate in fast-paced environments and eager to contribute to organizational success.`;

  const [summaryText, setSummaryText] = useState(info.summary || generatedSummary);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-extrabold text-slate-900 flex items-center gap-2">
          <Sparkles className="text-amber-500" size={28}/> AI-Generated Summary & Review
        </h1>
        <p className="text-sm text-stone-500 mt-1">Based on your completed profile, we have automatically crafted your professional summary. You can review or edit it anytime.</p>
      </div>

      <div className="bg-teal-50 border-2 border-teal-600/30 rounded-2xl p-6 relative shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs font-bold text-[#0F6B62] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles size={14}/> Auto-Crafted Summary
          </span>
          <button 
            onClick={() => setIsEditing(!isEditing)} 
            className="text-xs font-bold text-[#0F6B62] hover:underline flex items-center gap-1 cursor-pointer bg-white px-3 py-1.5 rounded-full border border-teal-200 shadow-sm"
          >
            {isEditing ? <><Check size={14}/> Save Changes</> : <><Edit3 size={14}/> Edit / Correct</>}
          </button>
        </div>

        {isEditing ? (
          <textarea
            rows={5}
            value={summaryText}
            onChange={(e) => {
              setSummaryText(e.target.value);
              onUpdateSummary(e.target.value);
            }}
            className="w-full bg-white border border-teal-300 rounded-xl p-4 text-sm text-stone-800 outline-none focus:ring-2 focus:ring-[#0F6B62] resize-none"
            placeholder="Edit your summary..."
          />
        ) : (
          <p className="text-stone-700 text-sm leading-relaxed font-medium bg-white/60 p-4 rounded-xl border border-teal-100">
            {summaryText}
          </p>
        )}
      </div>
    </div>
  );
}