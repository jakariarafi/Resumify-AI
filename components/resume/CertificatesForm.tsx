"use client";

import React from "react";

interface Certificate {
  title: string;
  issuer: string;
  issueDate: string;
  expiryDate: string;
  credentialId: string;
  credentialUrl: string;
}

interface CertificatesFormProps {
  data: Certificate[];
  onChange: (data: Certificate[]) => void;
}

export default function CertificatesForm({
  data,
  onChange,
}: CertificatesFormProps) {
  const handleChange = (
    index: number,
    field: keyof Certificate,
    value: string
  ) => {
    const updated = [...data];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    onChange(updated);
  };

  const addCertificate = () => {
    onChange([
      ...data,
      {
        title: "",
        issuer: "",
        issueDate: "",
        expiryDate: "",
        credentialId: "",
        credentialUrl: "",
      },
    ]);
  };

  const removeCertificate = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Certificates</h2>
          <p className="mt-1 text-sm text-slate-500">
            Showcase your certifications and achievements.
          </p>
        </div>

        <button
          type="button"
          onClick={addCertificate}
          className="rounded-xl bg-indigo-600 px-5 py-2 font-semibold text-white hover:bg-indigo-700 transition cursor-pointer"
        >
          + Add Certificate
        </button>
      </div>

      <div className="space-y-8">
        {data.map((certificate, index) => (
          <div key={index} className="rounded-xl border border-slate-200 p-6 bg-slate-50/50">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-700">
                Certificate #{index + 1}
              </h3>

              {data.length > 0 && (
                <button
                  type="button"
                  onClick={() => removeCertificate(index)}
                  className="font-medium text-red-600 hover:text-red-700 text-sm cursor-pointer"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <InputField
                label="Certificate Title"
                value={certificate.title}
                placeholder="AWS Cloud Practitioner"
                onChange={(v) => handleChange(index, "title", v)}
              />

              <InputField
                label="Issued By"
                value={certificate.issuer}
                placeholder="Amazon Web Services"
                onChange={(v) => handleChange(index, "issuer", v)}
              />

              <InputField
                label="Issue Date"
                value={certificate.issueDate}
                placeholder="March 2025"
                onChange={(v) => handleChange(index, "issueDate", v)}
              />

              <InputField
                label="Expiry Date"
                value={certificate.expiryDate}
                placeholder="March 2028"
                onChange={(v) => handleChange(index, "expiryDate", v)}
              />

              <InputField
                label="Credential ID"
                value={certificate.credentialId}
                placeholder="ABC123XYZ"
                onChange={(v) => handleChange(index, "credentialId", v)}
              />

              <InputField
                label="Credential URL"
                value={certificate.credentialUrl}
                placeholder="https://www.credly.com/..."
                onChange={(v) => handleChange(index, "credentialUrl", v)}
              />
            </div>
          </div>
        ))}

        {data.length === 0 && (
          <div className="text-center py-8 text-slate-400 text-sm border-2 border-dashed rounded-xl">
            No certificates added yet. Click &quot;+ Add Certificate&quot; to begin.
          </div>
        )}
      </div>
    </div>
  );
}

interface InputFieldProps {
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
}: InputFieldProps) {
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