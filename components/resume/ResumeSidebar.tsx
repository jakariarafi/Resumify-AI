"use client";

import {
  User,
  GraduationCap,
  Briefcase,
  Code2,
  FolderKanban,
  Award,
  Languages,
  Users,
} from "lucide-react";

interface ResumeSidebarProps {
  active: string;
  setActive: (section: string) => void;
}

const sections = [
  {
    id: "personal",
    title: "Personal Info",
    icon: User,
  },
  {
    id: "education",
    title: "Education",
    icon: GraduationCap,
  },
  {
    id: "experience",
    title: "Experience",
    icon: Briefcase,
  },
  {
    id: "skills",
    title: "Skills",
    icon: Code2,
  },
  {
    id: "projects",
    title: "Projects",
    icon: FolderKanban,
  },
  {
    id: "certificates",
    title: "Certificates",
    icon: Award,
  },
  {
    id: "languages",
    title: "Languages",
    icon: Languages,
  },
  {
    id: "references",
    title: "References",
    icon: Users,
  },
];

export default function ResumeSidebar({
  active,
  setActive,
}: ResumeSidebarProps) {
  return (
    <div className="flex h-full flex-col bg-white">

      {/* Header */}
      <div className="border-b p-6">
        <h2 className="text-xl font-bold text-slate-800">
          Resume Builder
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Complete every section.
        </p>
      </div>

      {/* Menu */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">

        {sections.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 cursor-pointer
                ${
                  active === item.id
                    ? "bg-indigo-600 text-white shadow-lg"
                    : "text-slate-600 hover:bg-slate-100"
                }
              `}
            >
              <Icon size={20} />

              <span className="font-medium">
                {item.title}
              </span>
            </button>
          );
        })}

      </div>

      {/* Footer */}
      <div className="border-t p-5">
        <div className="rounded-xl bg-indigo-50 p-4">
          <h3 className="font-semibold text-indigo-700">
            Resume Progress
          </h3>

          <div className="mt-3 h-2 w-full rounded-full bg-indigo-100">
            <div className="h-2 w-1/4 rounded-full bg-indigo-600"></div>
          </div>

          <p className="mt-2 text-xs text-slate-500">
            25% Completed
          </p>
        </div>
      </div>

    </div>
  );
}