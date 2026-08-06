"use client";

import React from "react";

interface Reference {
  name: string;
  position: string;
  company: string;
  email: string;
  phone: string;
}

interface ReferencesFormProps {
  data: Reference[];
  onChange: (data: Reference[]) => void;
}

export default function ReferencesForm({
  data,
  onChange,
}: ReferencesFormProps) {
  const handleChange = (
    index: number,
    field: keyof Reference,
    value: string
  ) => {
    const updated = [...data];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    onChange(updated);
  };

  const addReference = () => {
    onChange([
      ...data,
      {
        name: "",
        position: "",
        company: "",
        email: "",
        phone: "",
      },
    ]);
  };

  const removeReference = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            References
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Add professional references (optional).
          </p>
        </div>

        <button
          type="button"
          onClick={addReference}
          className="rounded-xl bg-indigo-600 px-5 py-2 font-semibold text-white transition hover:bg-indigo-700 cursor-pointer text-sm"
        >
          + Add Reference
        </button>
      </div>

      <div className="space-y-6">
        {data.map((reference, index) => (
          <div
            key={index}
            className="rounded-xl border border-slate-200 p-6 bg-slate-50/50"
          >
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-700">
                Reference #{index + 1}
              </h3>

              {data.length > 0 && (
                <button
                  type="button"
                  onClick={() => removeReference(index)}
                  className="font-medium text-red-600 hover:text-red-700 text-sm cursor-pointer"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <InputField
                label="Full Name"
                value={reference.name}
                placeholder="John Smith"
                onChange={(v) =>
                  handleChange(index, "name", v)
                }
              />

              <InputField
                label="Position"
                value={reference.position}
                placeholder="Senior Software Engineer"
                onChange={(v) =>
                  handleChange(index, "position", v)
                }
              />

              <InputField
                label="Company"
                value={reference.company}
                placeholder="Google"
                onChange={(v) =>
                  handleChange(index, "company", v)
                }
              />

              <InputField
                label="Email"
                value={reference.email}
                placeholder="john@gmail.com"
                onChange={(v) =>
                  handleChange(index, "email", v)
                }
              />

              <InputField
                label="Phone Number"
                value={reference.phone}
                placeholder="+8801XXXXXXXXX"
                onChange={(v) =>
                  handleChange(index, "phone", v)
                }
              />
            </div>
          </div>
        ))}

        {data.length === 0 && (
          <div className="text-center py-8 text-slate-400 text-sm border-2 border-dashed rounded-xl">
            No references added yet. Click &quot;+ Add Reference&quot; to begin.
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
      <label className="mb-2 block font-medium text-slate-700 text-sm">
        {label}
      </label>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-sm"
      />
    </div>
  );
}