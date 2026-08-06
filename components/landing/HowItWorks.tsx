"use client";

import { FileText, Sliders, Download } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: <FileText className="w-5 h-5 text-indigo-600" />,
    title: "Import your background",
    description: "Paste your existing resume or fill in your core work history and project experience.",
  },
  {
    number: "02",
    icon: <Sliders className="w-5 h-5 text-indigo-600" />,
    title: "Target the job description",
    description: "Add the job posting you are applying for so the AI can align keywords accordingly.",
  },
  {
    number: "03",
    icon: <Download className="w-5 h-5 text-indigo-600" />,
    title: "Download and apply",
    description: "Review the generated improvements, select a layout, and export your PDF.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            How it works
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            Three simple steps to a better structured resume.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="p-8 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col justify-between hover:border-gray-200 transition">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                    {step.icon}
                  </div>
                  <span className="text-xs font-bold text-indigo-600 tracking-wider uppercase">Step {step.number}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}