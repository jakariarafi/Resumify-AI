"use client";

import {
  Download,
  Save,
  Eye,
  Trash2,
  Palette,
} from "lucide-react";

interface ResumeToolbarProps {
  selectedTemplate: string;
  onTemplateChange: (template: string) => void;
  onDownload: () => void;
  onSave: () => void;
  onPreview: () => void;
  onClear: () => void;
}

export default function ResumeToolbar({
  selectedTemplate,
  onTemplateChange,
  onDownload,
  onSave,
  onPreview,
  onClear,
}: ResumeToolbarProps) {
  return (
    <div className="bg-white border rounded-2xl shadow-sm p-4 flex flex-wrap items-center justify-between gap-4">

      {/* Left */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-slate-700">
          <Palette size={18} />
          <span className="font-semibold text-sm">
            Template
          </span>
        </div>

        <select
          value={selectedTemplate}
          onChange={(e) => onTemplateChange(e.target.value)}
          className="rounded-xl border border-slate-300 px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-white cursor-pointer"
        >
          <option value="modern">Modern</option>
          <option value="professional">Professional</option>
          <option value="minimal">Minimal</option>
          <option value="creative">Creative</option>
        </select>
      </div>

      {/* Right */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={onPreview}
          className="flex items-center gap-2 rounded-xl border px-4 py-2 hover:bg-slate-100 transition text-sm font-medium cursor-pointer"
        >
          <Eye size={18} />
          Preview
        </button>

        <button
          type="button"
          onClick={onSave}
          className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700 transition text-sm font-medium cursor-pointer"
        >
          <Save size={18} />
          Save
        </button>

        <button
          type="button"
          onClick={onDownload}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 transition text-sm font-medium cursor-pointer"
        >
          <Download size={18} />
          Download PDF
        </button>

        <button
          type="button"
          onClick={onClear}
          className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-white hover:bg-red-700 transition text-sm font-medium cursor-pointer"
        >
          <Trash2 size={18} />
          Clear
        </button>
      </div>

    </div>
  );
}