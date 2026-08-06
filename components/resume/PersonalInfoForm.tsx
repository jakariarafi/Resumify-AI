"use client";

import React from "react";

interface PersonalInfo {
  fullName?: string;
  firstName?: string;
  lastName?: string;
  profession: string;
  email: string;
  phone: string;
  address: string;
  website?: string;
  linkedin?: string;
  github?: string;
  summary: string;
  photo?: string;
}

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

export default function PersonalInfoForm({
  data,
  onChange,
}: PersonalInfoFormProps) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onChange({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="rounded-2xl bg-white shadow-sm border border-slate-200 p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800">
          Personal Information
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Fill in your personal details.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <InputField
          label="Full Name"
          name="fullName"
          value={data?.fullName || ""}
          onChange={handleChange}
          placeholder="Al Jakaria Hossain"
        />

        <InputField
          label="Profession"
          name="profession"
          value={data?.profession || ""}
          onChange={handleChange}
          placeholder="Full Stack Developer"
        />

        <InputField
          label="Email"
          name="email"
          value={data?.email || ""}
          onChange={handleChange}
          placeholder="rafibd@example.com"
        />

        <InputField
          label="Phone"
          name="phone"
          value={data?.phone || ""}
          onChange={handleChange}
          placeholder="+8801XXXXXXXXX"
        />

        <InputField
          label="Address"
          name="address"
          value={data?.address || ""}
          onChange={handleChange}
          placeholder="Dhaka, Bangladesh"
        />

        <InputField
          label="Website"
          name="website"
          value={data?.website || ""}
          onChange={handleChange}
          placeholder="www.portfolio.com"
        />

        <InputField
          label="LinkedIn"
          name="linkedin"
          value={data?.linkedin || ""}
          onChange={handleChange}
          placeholder="linkedin.com/in/username"
        />

        <InputField
          label="GitHub"
          name="github"
          value={data?.github || ""}
          onChange={handleChange}
          placeholder="github.com/username"
        />
      </div>

      <div className="mt-6">
        <label className="block mb-2 text-sm font-semibold text-slate-700">
          Professional Summary
        </label>
        <textarea
          name="summary"
          rows={6}
          value={data?.summary || ""}
          onChange={handleChange}
          placeholder="Write a short professional summary..."
          className="w-full rounded-xl border border-slate-300 p-4 outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-sm resize-none"
        />
      </div>
    </div>
  );
}

interface InputProps {
  label: string;
  name: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function InputField({
  label,
  name,
  value,
  placeholder,
  onChange,
}: InputProps) {
  return (
    <div>
      <label className="block mb-2 text-sm font-semibold text-slate-700">
        {label}
      </label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-sm"
      />
    </div>
  );
}