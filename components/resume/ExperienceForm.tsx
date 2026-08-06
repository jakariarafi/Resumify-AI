"use client";

import React from "react";

interface Experience {
  jobTitle: string;
  company: string;
  location: string;
  employmentType: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  description: string;
}

interface ExperienceFormProps {
  data: Experience[];
  onChange: (data: Experience[]) => void;
}

export default function ExperienceForm({
  data,
  onChange,
}: ExperienceFormProps) {
  const handleChange = (
    index: number,
    field: keyof Experience,
    value: string | boolean
  ) => {
    const updated = [...data];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    onChange(updated);
  };

  const addExperience = () => {
    onChange([
      ...data,
      {
        jobTitle: "",
        company: "",
        location: "",
        employmentType: "",
        startDate: "",
        endDate: "",
        currentlyWorking: false,
        description: "",
      },
    ]);
  };

  const removeExperience = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  return (
    <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Work Experience</h2>
          <p className="text-sm text-slate-500 mt-1">
            Add your professional experience.
          </p>
        </div>

        <button
          type="button"
          onClick={addExperience}
          className="rounded-xl bg-indigo-600 px-5 py-2 text-white font-semibold hover:bg-indigo-700 transition cursor-pointer text-sm"
        >
          + Add Experience
        </button>
      </div>

      <div className="space-y-8">
        {data.map((item, index) => (
          <div key={index} className="rounded-xl border border-slate-200 p-6 bg-slate-50/50">
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-bold text-lg text-slate-700">
                Experience #{index + 1}
              </h3>

              {data.length > 0 && (
                <button
                  type="button"
                  onClick={() => removeExperience(index)}
                  className="text-red-600 hover:text-red-700 font-semibold text-sm cursor-pointer"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <InputField
                label="Job Title"
                value={item.jobTitle}
                onChange={(v) => handleChange(index, "jobTitle", v)}
                placeholder="Frontend Developer"
              />

              <InputField
                label="Company"
                value={item.company}
                onChange={(v) => handleChange(index, "company", v)}
                placeholder="Google"
              />

              <InputField
                label="Location"
                value={item.location}
                onChange={(v) => handleChange(index, "location", v)}
                placeholder="Dhaka, Bangladesh"
              />

              <InputField
                label="Employment Type"
                value={item.employmentType}
                onChange={(v) => handleChange(index, "employmentType", v)}
                placeholder="Full Time"
              />

              <InputField
                label="Start Date"
                value={item.startDate}
                onChange={(v) => handleChange(index, "startDate", v)}
                placeholder="Jan 2024"
              />

              <InputField
                label="End Date"
                value={item.endDate}
                onChange={(v) => handleChange(index, "endDate", v)}
                placeholder="Present"
              />
            </div>

            <div className="mt-5 flex items-center gap-3">
              <input
                type="checkbox"
                id={`currentlyWorking-${index}`}
                checked={item.currentlyWorking}
                onChange={(e) =>
                  handleChange(index, "currentlyWorking", e.target.checked)
                }
                className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500 cursor-pointer"
              />
              <label htmlFor={`currentlyWorking-${index}`} className="text-sm text-slate-700 font-medium cursor-pointer">
                I currently work here
              </label>
            </div>

            <div className="mt-5">
              <label className="block mb-2 font-semibold text-slate-700 text-sm">
                Responsibilities / Achievements
              </label>
              <textarea
                rows={5}
                value={item.description}
                onChange={(e) =>
                  handleChange(index, "description", e.target.value)
                }
                placeholder="Describe your responsibilities, achievements, technologies used..."
                className="w-full rounded-xl border border-slate-300 p-4 outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-sm resize-none"
              />
            </div>
          </div>
        ))}

        {data.length === 0 && (
          <div className="text-center py-8 text-slate-400 text-sm border-2 border-dashed rounded-xl">
            No work experience added yet. Click &quot;+ Add Experience&quot; to begin.
          </div>
        )}
      </div>
    </div>
  );
}

interface InputProps {
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}

function InputField({
  label,
  value,
  placeholder,
  onChange,
}: InputProps) {
  return (
    <div>
      <label className="block mb-2 font-semibold text-slate-700 text-sm">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-sm"
      />
    </div>
  );
}