"use client";

import { Check } from "lucide-react";
import { templatesConfig } from "./templates/templateConfig";

interface ResumeTemplatesProps {
  selected: string;
  onSelect: (id: string) => void;
}

export default function ResumeTemplates({ selected, onSelect }: ResumeTemplatesProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {templatesConfig.map((template) => {
        const isSelected = selected === template.id;

        return (
          <div
            key={template.id}
            onClick={() => onSelect(template.id)}
            className={`group relative bg-white border-2 rounded-2xl p-4 cursor-pointer transition-all duration-300 hover:shadow-xl ${
              isSelected ? "border-sky-500 ring-4 ring-sky-100" : "border-slate-200 hover:border-slate-300"
            }`}
          >
            <div className="h-44 bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col justify-between relative overflow-hidden">
              <div className="space-y-2 opacity-70">
                <div className="w-1/3 h-2 bg-slate-400 rounded"></div>
                <div className="w-1/4 h-1.5 bg-slate-300 rounded"></div>
                <div className="w-full h-1 bg-slate-200 rounded mt-3"></div>
                <div className="w-5/6 h-1 bg-slate-200 rounded"></div>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase">{template.category}</span>
                <span className="bg-amber-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded">PDF</span>
              </div>
              {isSelected && (
                <div className="absolute inset-0 bg-sky-500/20 backdrop-blur-[1px] flex items-center justify-center">
                  <div className="bg-sky-500 text-white p-2.5 rounded-full shadow-lg">
                    <Check size={20} strokeWidth={3} />
                  </div>
                </div>
              )}
            </div>
            <div className="mt-3 text-center">
              <h3 className="text-sm font-bold text-slate-800">{template.name}</h3>
            </div>
          </div>
        );
      })}
    </div>
  );
}