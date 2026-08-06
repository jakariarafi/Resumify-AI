"use client";

import React from "react";

interface Education {
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  cgpa: string;
  description: string;
}

interface EducationFormProps {
  data: Education[];
  onChange: (data: Education[]) => void;
}

export default function EducationForm({
  data,
  onChange,
}: EducationFormProps) {
  const handleChange = (
    index: number,
    field: keyof Education,
    value: string
  ) => {
    const updated = [...data];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    onChange(updated);
  };

  const addEducation = () => {
    onChange([
      ...data,
      {
        degree: "",
        institution: "",
        location: "",
        startDate: "",
        endDate: "",
        cgpa: "",
        description: "",
      },
    ]);
  };

  const removeEducation = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  return (
    <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Education</h2>
          <p className="text-sm text-slate-500 mt-1">
            Add your educational background.
          </p>
        </div>

        <button
          type="button"
          onClick={addEducation}
          className="rounded-xl bg-indigo-600 px-5 py-2 text-white font-semibold hover:bg-indigo-700 transition cursor-pointer text-sm"
        >
          + Add Education
        </button>
      </div>

      <div className="space-y-8">
        {data.map((item, index) => (
          <div key={index} className="rounded-xl border border-slate-200 p-6 bg-slate-50/50">
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-bold text-lg text-slate-700">
                Education #{index + 1}
              </h3>

              {data.length > 0 && (
                <button
                  type="button"
                  onClick={() => removeEducation(index)}
                  className="text-red-600 hover:text-red-700 font-semibold text-sm cursor-pointer"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <InputField
                label="Degree"
                value={item.degree}
                onChange={(v) => handleChange(index, "degree", v)}
                placeholder="BSc in Computer Science"
              />

              <InputField
                label="Institution"
                value={item.institution}
                onChange={(v) => handleChange(index, "institution", v)}
                placeholder="University Name"
              />

              <InputField
                label="Location"
                value={item.location}
                onChange={(v) => handleChange(index, "location", v)}
                placeholder="Dhaka, Bangladesh"
              />

              <InputField
                label="CGPA / GPA"
                value={item.cgpa}
                onChange={(v) => handleChange(index, "cgpa", v)}
                placeholder="3.80 / 4.00"
              />

              <InputField
                label="Start Date"
                value={item.startDate}
                onChange={(v) => handleChange(index, "startDate", v)}
                placeholder="2022"
              />

              <InputField
                label="End Date"
                value={item.endDate}
                onChange={(v) => handleChange(index, "endDate", v)}
                placeholder="2026"
              />
            </div>

            <div className="mt-5">
              <label className="block mb-2 font-semibold text-slate-700 text-sm">
                Description
              </label>
              <textarea
                rows={4}
                value={item.description}
                onChange={(e) =>
                  handleChange(index, "description", e.target.value)
                }
                placeholder="Achievements, coursework, thesis..."
                className="w-full rounded-xl border border-slate-300 p-4 outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-sm resize-none"
              />
            </div>
          </div>
        ))}

        {data.length === 0 && (
          <div className="text-center py-8 text-slate-400 text-sm border-2 border-dashed rounded-xl">
            No education added yet. Click &quot;+ Add Education&quot; to begin.
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