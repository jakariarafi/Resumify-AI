"use client";

import { useState } from "react";
import Link from "next/link";

const categories = ["All", "Free", "Pro", "Enterprise"];

// নতুন টেমপ্লেট যোগ করতে চাইলে শুধু এই অ্যারেতে নতুন আইটেম যোগ করবেন
const templates = [
  {
    name: "The Essential",
    category: "Free",
    plan: "Free Plan",
    description: "Standard layout optimized for basic ATS checking and casual job seekers.",
    tag: "Free",
    color: "bg-gray-50 border-gray-200",
  },
  {
    name: "The Executive",
    category: "Pro",
    plan: "Pro Plan",
    description: "Clean, traditional layout perfect for corporate roles with advanced ATS matching.",
    tag: "Most Popular",
    color: "bg-blue-50 border-blue-100",
  },
  {
    name: "The Innovator",
    category: "Pro",
    plan: "Pro Plan",
    description: "Stand out with a modern two-column design and unlimited AI bullet points.",
    tag: "AI Powered",
    color: "bg-indigo-50 border-indigo-100",
  },
  {
    name: "The Tech Lead",
    category: "Pro",
    plan: "Pro Plan",
    description: "Tailored for software engineers and technical roles with project highlights.",
    tag: "Tech Focus",
    color: "bg-slate-50 border-slate-200",
  },
  {
    name: "The Minimalist",
    category: "Pro",
    plan: "Pro Plan",
    description: "Sleek and minimal spacing designed for maximum readability by recruiters.",
    tag: "Clean Look",
    color: "bg-zinc-50 border-zinc-200",
  },
  {
    name: "The Creative",
    category: "Pro",
    plan: "Pro Plan",
    description: "Vibrant and structured layout ideal for designers and creative professionals.",
    tag: "Modern",
    color: "bg-amber-50 border-amber-100",
  },
  {
    name: "The Corporate Suite",
    category: "Enterprise",
    plan: "Enterprise Plan",
    description: "Custom branded layout designed for high-volume recruitment and institutional use.",
    tag: "Custom Team",
    color: "bg-purple-50 border-purple-100",
  },
  {
    name: "The Global Campus",
    category: "Enterprise",
    plan: "Enterprise Plan",
    description: "Specialized for university career centers and student placement management.",
    tag: "Institutional",
    color: "bg-emerald-50 border-emerald-100",
  },
];

export default function Templates() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredTemplates =
    activeCategory === "All"
      ? templates
      : templates.filter((template) => template.category === activeCategory);

  return (
    <section id="templates" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold tracking-wide uppercase">
            <svg className="w-3.5 h-3.5 text-indigo-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            <span>Resume Templates</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Designed to get you hired
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            Choose from our collection of ATS-friendly templates based on your subscription plan.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10 md:mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-full transition-all ${
                activeCategory === category
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
          {filteredTemplates.map((template, index) => (
            <div
              key={index}
              className="group flex flex-col bg-white rounded-3xl border border-gray-200 overflow-hidden hover:shadow-xl hover:border-indigo-200 transition-all duration-300"
            >
              <div className={`h-48 sm:h-56 w-full ${template.color} border-b flex items-center justify-center p-6 relative overflow-hidden`}>
                <div className="w-full h-full bg-white rounded shadow-sm p-4 flex flex-col gap-3 transform group-hover:scale-105 transition-transform duration-500">
                  <div className="w-1/3 h-3 bg-gray-200 rounded"></div>
                  <div className="w-1/4 h-2 bg-gray-100 rounded mb-2"></div>
                  <div className="w-full h-px bg-gray-100 my-1"></div>
                  <div className="w-full h-2 bg-gray-100 rounded"></div>
                  <div className="w-5/6 h-2 bg-gray-100 rounded"></div>
                  <div className="w-4/6 h-2 bg-gray-100 rounded"></div>
                </div>
                
                <div className="absolute inset-0 bg-indigo-900/10 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 backdrop-blur-[1px]">
                  <Link
                    href={`/editor?template=${template.name.toLowerCase().replace(/\s+/g, "-")}`}
                    className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg hover:bg-indigo-700 transition transform translate-y-4 group-hover:translate-y-0"
                  >
                    Use Template
                  </Link>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{template.name}</h3>
                    <span className="text-[10px] font-bold px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-md uppercase tracking-wide">
                      {template.plan}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">
                    {template.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}