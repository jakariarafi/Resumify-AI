"use client";

import React from "react";

interface Language {
  name: string;
  proficiency: string;
}

interface LanguagesFormProps {
  data: Language[];
  onChange: (data: Language[]) => void;
}

export default function LanguagesForm({
  data,
  onChange,
}: LanguagesFormProps) {
  const handleChange = (
    index: number,
    field: keyof Language,
    value: string
  ) => {
    const updated = [...data];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    onChange(updated);
  };

  const addLanguage = () => {
    onChange([
      ...data,
      {
        name: "",
        proficiency: "Intermediate",
      },
    ]);
  };

  const removeLanguage = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Languages</h2>
          <p className="mt-1 text-sm text-slate-500">
            Add the languages you know and your proficiency level.
          </p>
        </div>

        <button
          type="button"
          onClick={addLanguage}
          className="rounded-xl bg-indigo-600 px-5 py-2 font-semibold text-white transition hover:bg-indigo-700 cursor-pointer text-sm"
        >
          + Add Language
        </button>
      </div>

      <div className="space-y-6">
        {data.map((language, index) => (
          <div
            key={index}
            className="rounded-xl border border-slate-200 p-6 bg-slate-50/50"
          >
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-700">
                Language #{index + 1}
              </h3>

              {data.length > 0 && (
                <button
                  type="button"
                  onClick={() => removeLanguage(index)}
                  className="font-medium text-red-600 hover:text-red-700 text-sm cursor-pointer"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block font-medium text-slate-700 text-sm">
                  Language
                </label>
                <input
                  type="text"
                  value={language.name}
                  onChange={(e) =>
                    handleChange(index, "name", e.target.value)
                  }
                  placeholder="English"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-sm"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium text-slate-700 text-sm">
                  Proficiency
                </label>
                <select
                  value={language.proficiency}
                  onChange={(e) =>
                    handleChange(index, "proficiency", e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-sm cursor-pointer"
                >
                  <option>Beginner</option>
                  <option>Elementary</option>
                  <option>Intermediate</option>
                  <option>Upper Intermediate</option>
                  <option>Advanced</option>
                  <option>Fluent</option>
                  <option>Native</option>
                </select>
              </div>
            </div>
          </div>
        ))}

        {data.length === 0 && (
          <div className="text-center py-8 text-slate-400 text-sm border-2 border-dashed rounded-xl">
            No languages added yet. Click &quot;+ Add Language&quot; to begin.
          </div>
        )}
      </div>
    </div>
  );
}