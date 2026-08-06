"use client";

import { Info } from "lucide-react";

interface TextSettingsProps {
  settings: {
    lineHeight: number;
    h1Size: number;
    h2Size: number;
    bodySize: number;
    sectionSize: number;
    h1Weight: string;
    h2Weight: string;
    bodyWeight: string;
  };
  onChange: (newSettings: any) => void;
}

export default function ResumeTextSettings({ settings, onChange }: TextSettingsProps) {
  const handleChange = (key: string, value: any) => {
    onChange({ ...settings, [key]: value });
  };

  return (
    <div className="space-y-8 bg-white p-6 rounded-3xl border border-slate-200">
      
      {/* Line Height Slider */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-xs font-bold text-slate-700">Line Height</label>
          <span className="text-xs font-bold bg-slate-100 px-2.5 py-1 rounded-lg text-slate-700">
            {settings.lineHeight}%
          </span>
        </div>
        <input
          type="range"
          min="100"
          max="200"
          value={settings.lineHeight}
          onChange={(e) => handleChange("lineHeight", Number(e.target.value))}
          className="w-full accent-indigo-600 cursor-pointer"
        />
      </div>

      {/* Font Size Section */}
      <div className="space-y-4">
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">Font Size</h3>
        
        {[
          { label: "Primary Heading", key: "h1Size", min: 18, max: 36 },
          { label: "Secondary Heading", key: "h2Size", min: 12, max: 24 },
          { label: "Body", key: "bodySize", min: 9, max: 16 },
          { label: "Section Titles", key: "sectionSize", min: 10, max: 20 },
        ].map((item) => (
          <div key={item.key} className="flex items-center justify-between gap-4">
            <span className="text-xs font-semibold text-slate-600 w-36">{item.label}</span>
            <input
              type="range"
              min={item.min}
              max={item.max}
              value={(settings as any)[item.key]}
              onChange={(e) => handleChange(item.key, Number(e.target.value))}
              className="flex-1 accent-indigo-600 cursor-pointer"
            />
            <span className="text-xs font-bold bg-slate-100 px-2.5 py-1 rounded-lg text-slate-700 w-16 text-center">
              {(settings as any)[item.key]} pt
            </span>
          </div>
        ))}
      </div>

      {/* Font Weight Info Box */}
      <div className="bg-sky-50 border border-sky-100 p-4 rounded-2xl flex items-start gap-3">
        <Info size={16} className="text-sky-500 shrink-0 mt-0.5" />
        <p className="text-[11px] text-sky-800 leading-relaxed">
          Select any font weight you like, but DOCX will simplify to Bold and Normal. PDF preserves all styles.
        </p>
      </div>

      {/* Font Weight Selectors */}
      <div className="space-y-4">
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">Font Weight</h3>
        
        {[
          { label: "Primary Heading", key: "h1Weight" },
          { label: "Secondary Heading", key: "h2Weight" },
          { label: "Body", key: "bodyWeight" },
        ].map((item) => (
          <div key={item.key} className="flex items-center justify-between gap-4">
            <span className="text-xs font-semibold text-slate-600 w-36">{item.label}</span>
            <select
              value={(settings as any)[item.key]}
              onChange={(e) => handleChange(item.key, e.target.value)}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-semibold text-slate-700 outline-none focus:border-indigo-600 cursor-pointer"
            >
              <option value="normal">Normal</option>
              <option value="medium">Medium</option>
              <option value="bold">Bold</option>
              <option value="black">Black / Extra Bold</option>
            </select>
          </div>
        ))}
      </div>

    </div>
  );
}