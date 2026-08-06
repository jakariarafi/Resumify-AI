"use client";

interface LayoutSettingsProps {
  layout: {
    format: string;
    headerFooter: number;
    topBottom: number;
    leftRight: number;
    betweenSections: number;
    betweenTitles: number;
    betweenBlocks: number;
    dateFormat: string;
    headerAlignment: string; // "left" | "center" | "right"
    dateAlignment: string;   // "left" | "right"
    locationAlignment: string; // "left" | "right"
    showEducationBy: string; // "institution" | "degree"
    educationLayout: string; // "stacked" | "inline"
  };
  onChange: (newLayout: any) => void;
}

export default function ResumeLayoutSettings({ layout, onChange }: LayoutSettingsProps) {
  const handleChange = (key: string, value: any) => {
    onChange({ ...layout, [key]: value });
  };

  return (
    <div className="space-y-8 bg-white p-6 rounded-3xl border border-slate-200">
      
      {/* Format Selector */}
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-2">Format</label>
        <select
          value={layout.format}
          onChange={(e) => handleChange("format", e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700 outline-none focus:border-indigo-600 cursor-pointer"
        >
          <option value="A4">A4 (210mm x 297mm)</option>
          <option value="US Letter">US Letter (8.5&quot; x 11&quot;)</option>
        </select>
      </div>

      {/* Date Format */}
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-2">Date format</label>
        <select
          value={layout.dateFormat || "Short Name (Jan YYYY)"}
          onChange={(e) => handleChange("dateFormat", e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700 outline-none focus:border-indigo-600 cursor-pointer"
        >
          <option value="Short Name (Jan YYYY)">Short Name (Jan YYYY)</option>
          <option value="Numeric (MM/YYYY)">Numeric (MM/YYYY)</option>
          <option value="Full Name (Month YYYY)">Full Name (Month YYYY)</option>
          <option value="Year Only (YYYY)">Year Only (YYYY)</option>
        </select>
      </div>

      {/* Header Alignment */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Header Alignment</label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: "left", label: "Left" },
            { id: "center", label: "Center" },
            { id: "right", label: "Right" },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleChange("headerAlignment", item.id)}
              className={`p-3 border-2 rounded-xl text-center text-xs font-bold transition cursor-pointer ${
                (layout.headerAlignment || "left") === item.id
                  ? "border-sky-500 bg-sky-50/50 text-sky-700"
                  : "border-slate-200 text-slate-600 hover:border-slate-300"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Date Alignment */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Date Alignment</label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { id: "left", label: "Left" },
            { id: "right", label: "Right" },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleChange("dateAlignment", item.id)}
              className={`p-3 border-2 rounded-xl text-center text-xs font-bold transition cursor-pointer ${
                (layout.dateAlignment || "right") === item.id
                  ? "border-sky-500 bg-sky-50/50 text-sky-700"
                  : "border-slate-200 text-slate-600 hover:border-slate-300"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Location Alignment */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Location Alignment</label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { id: "left", label: "Left" },
            { id: "right", label: "Right" },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleChange("locationAlignment", item.id)}
              className={`p-3 border-2 rounded-xl text-center text-xs font-bold transition cursor-pointer ${
                (layout.locationAlignment || "left") === item.id
                  ? "border-sky-500 bg-sky-50/50 text-sky-700"
                  : "border-slate-200 text-slate-600 hover:border-slate-300"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Show Education By */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Show Education By</label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { id: "institution", label: "Institution" },
            { id: "degree", label: "Degree" },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleChange("showEducationBy", item.id)}
              className={`p-3 border-2 rounded-xl text-center text-xs font-bold transition cursor-pointer ${
                (layout.showEducationBy || "institution") === item.id
                  ? "border-sky-500 bg-sky-50/50 text-sky-700"
                  : "border-slate-200 text-slate-600 hover:border-slate-300"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Education Layout */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Education Layout</label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { id: "stacked", label: "Stacked" },
            { id: "inline", label: "Inline" },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleChange("educationLayout", item.id)}
              className={`p-3 border-2 rounded-xl text-center text-xs font-bold transition cursor-pointer ${
                (layout.educationLayout || "stacked") === item.id
                  ? "border-sky-500 bg-sky-50/50 text-sky-700"
                  : "border-slate-200 text-slate-600 hover:border-slate-300"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Margins & Spacing Sliders */}
      <div className="space-y-6 pt-4 border-t border-slate-200">
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">Margins & Spacing</h3>

        {[
          { label: "Header & Footer", key: "headerFooter", min: 0, max: 2, step: 0.05, unit: "in" },
          { label: "Top & bottom", key: "topBottom", min: 0.2, max: 2, step: 0.05, unit: "in" },
          { label: "Left & right", key: "leftRight", min: 0.2, max: 2, step: 0.05, unit: "in" },
          { label: "Between sections", key: "betweenSections", min: 4, max: 32, step: 1, unit: "pt" },
          { label: "Between Titles & Content", key: "betweenTitles", min: 2, max: 16, step: 1, unit: "pt" },
          { label: "Between Content blocks", key: "betweenBlocks", min: 2, max: 16, step: 1, unit: "pt" },
        ].map((item) => (
          <div key={item.key} className="flex items-center justify-between gap-4">
            <span className="text-xs font-semibold text-slate-600 w-44">{item.label}</span>
            <input
              type="range"
              min={item.min}
              max={item.max}
              step={item.step}
              value={(layout as any)[item.key]}
              onChange={(e) => handleChange(item.key, Number(e.target.value))}
              className="flex-1 accent-indigo-600 cursor-pointer"
            />
            <span className="text-xs font-bold bg-slate-100 px-2.5 py-1 rounded-lg text-slate-700 w-20 text-center">
              {(layout as any)[item.key]} {item.unit}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}