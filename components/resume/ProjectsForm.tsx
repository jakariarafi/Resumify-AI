"use client";

import React from "react";

interface Project {
  title: string;
  role: string;
  technologies: string;
  github: string;
  liveDemo: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface ProjectsFormProps {
  data: Project[];
  onChange: (data: Project[]) => void;
}

export default function ProjectsForm({
  data,
  onChange,
}: ProjectsFormProps) {
  const handleChange = (
    index: number,
    field: keyof Project,
    value: string
  ) => {
    const updated = [...data];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    onChange(updated);
  };

  const addProject = () => {
    onChange([
      ...data,
      {
        title: "",
        role: "",
        technologies: "",
        github: "",
        liveDemo: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };

  const removeProject = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Projects</h2>
          <p className="mt-1 text-sm text-slate-500">
            Showcase your best projects.
          </p>
        </div>

        <button
          type="button"
          onClick={addProject}
          className="rounded-xl bg-indigo-600 px-5 py-2 font-semibold text-white transition hover:bg-indigo-700 cursor-pointer text-sm"
        >
          + Add Project
        </button>
      </div>

      <div className="space-y-8">
        {data.map((project, index) => (
          <div
            key={index}
            className="rounded-xl border border-slate-200 p-6 bg-slate-50/50"
          >
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-700">
                Project #{index + 1}
              </h3>

              {data.length > 0 && (
                <button
                  type="button"
                  onClick={() => removeProject(index)}
                  className="font-medium text-red-600 hover:text-red-700 text-sm cursor-pointer"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <InputField
                label="Project Title"
                value={project.title}
                placeholder="AI Resume Builder"
                onChange={(v) =>
                  handleChange(index, "title", v)
                }
              />

              <InputField
                label="Your Role"
                value={project.role}
                placeholder="Full Stack Developer"
                onChange={(v) =>
                  handleChange(index, "role", v)
                }
              />

              <InputField
                label="Technologies"
                value={project.technologies}
                placeholder="Next.js, Prisma, PostgreSQL"
                onChange={(v) =>
                  handleChange(index, "technologies", v)
                }
              />

              <InputField
                label="GitHub URL"
                value={project.github}
                placeholder="https://github.com/username/project"
                onChange={(v) =>
                  handleChange(index, "github", v)
                }
              />

              <InputField
                label="Live Demo"
                value={project.liveDemo}
                placeholder="https://project.vercel.app"
                onChange={(v) =>
                  handleChange(index, "liveDemo", v)
                }
              />

              <div className="grid grid-cols-2 gap-4">
                <InputField
                  label="Start Date"
                  value={project.startDate}
                  placeholder="Jan 2025"
                  onChange={(v) =>
                    handleChange(index, "startDate", v)
                  }
                />

                <InputField
                  label="End Date"
                  value={project.endDate}
                  placeholder="Present"
                  onChange={(v) =>
                    handleChange(index, "endDate", v)
                  }
                />
              </div>
            </div>

            <div className="mt-5">
              <label className="mb-2 block font-medium text-slate-700 text-sm">
                Project Description
              </label>

              <textarea
                rows={5}
                value={project.description}
                onChange={(e) =>
                  handleChange(
                    index,
                    "description",
                    e.target.value
                  )
                }
                placeholder="Describe your project, key features, technologies used, and your contributions..."
                className="w-full rounded-xl border border-slate-300 p-4 outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-sm resize-none"
              />
            </div>
          </div>
        ))}

        {data.length === 0 && (
          <div className="text-center py-8 text-slate-400 text-sm border-2 border-dashed rounded-xl">
            No projects added yet. Click &quot;+ Add Project&quot; to begin.
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