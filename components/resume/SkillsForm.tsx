"use client";

import React from "react";

interface Skill {
  name: string;
  category: string;
  level: string;
}

interface SkillsFormProps {
  data: Skill[];
  onChange: (data: Skill[]) => void;
}

export default function SkillsForm({
  data,
  onChange,
}: SkillsFormProps) {
  const handleChange = (
    index: number,
    field: keyof Skill,
    value: string
  ) => {
    const updated = [...data];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    onChange(updated);
  };

  const addSkill = () => {
    onChange([
      ...data,
      {
        name: "",
        category: "",
        level: "Intermediate",
      },
    ]);
  };

  const removeSkill = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  return (
    <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Skills
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Add your technical and professional skills.
          </p>
        </div>

        <button
          type="button"
          onClick={addSkill}
          className="rounded-xl bg-indigo-600 px-5 py-2 text-white font-semibold hover:bg-indigo-700 transition cursor-pointer text-sm"
        >
          + Add Skill
        </button>
      </div>

      <div className="space-y-6">
        {data.map((skill, index) => (
          <div
            key={index}
            className="rounded-xl border border-slate-200 p-5 bg-slate-50/50"
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold text-lg text-slate-700">
                Skill #{index + 1}
              </h3>

              {data.length > 0 && (
                <button
                  type="button"
                  onClick={() => removeSkill(index)}
                  className="text-red-600 hover:text-red-700 font-medium text-sm cursor-pointer"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {/* Skill Name */}
              <div>
                <label className="block mb-2 font-medium text-slate-700 text-sm">
                  Skill
                </label>
                <input
                  type="text"
                  value={skill.name}
                  onChange={(e) =>
                    handleChange(index, "name", e.target.value)
                  }
                  placeholder="React.js"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-sm"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block mb-2 font-medium text-slate-700 text-sm">
                  Category
                </label>
                <select
                  value={skill.category}
                  onChange={(e) =>
                    handleChange(index, "category", e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-sm cursor-pointer"
                >
                  <option value="">Select Category</option>
                  <option>Programming</option>
                  <option>Frontend</option>
                  <option>Backend</option>
                  <option>Database</option>
                  <option>Cloud</option>
                  <option>AI / ML</option>
                  <option>Design</option>
                  <option>Soft Skill</option>
                  <option>Language</option>
                </select>
              </div>

              {/* Level */}
              <div>
                <label className="block mb-2 font-medium text-slate-700 text-sm">
                  Proficiency
                </label>
                <select
                  value={skill.level}
                  onChange={(e) =>
                    handleChange(index, "level", e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-sm cursor-pointer"
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                  <option>Expert</option>
                </select>
              </div>
            </div>
          </div>
        ))}

        {data.length === 0 && (
          <div className="text-center py-8 text-slate-400 text-sm border-2 border-dashed rounded-xl">
            No skills added yet. Click &quot;+ Add Skill&quot; to begin.
          </div>
        )}
      </div>
    </div>
  );
}