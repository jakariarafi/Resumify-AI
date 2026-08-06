"use client";

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    question: "What is the definition of a resume?",
    answer: "A resume is a formal document that provides an overview of your professional background, work experience, education, and key skills. It is typically used to secure new employment opportunities and acts as your first impression to hiring managers.",
  },
  {
    question: "What is the difference between a CV and a resume?",
    answer: "While both documents are used to apply for jobs, a resume is a concise, 1-2 page summary of your relevant skills and experience tailored to a specific role. A CV (Curriculum Vitae) is a comprehensive, multi-page academic chronicle of your entire career, including publications, awards, and research.",
  },
  {
    question: "How do I choose the right resume template?",
    answer: "Choosing the right template depends on your industry and experience level. Clean, chronological formats work best for corporate roles, while modern or creative templates are great for design, tech, and marketing positions. Our platform offers ATS-friendly options optimized for all sectors.",
  },
  {
    question: "How far back should a resume go?",
    answer: "Generally, your resume should cover the past 10 to 15 years of your professional experience. Focus on relevant, impactful roles rather than listing every job you have ever held since college.",
  },
  {
    question: "What does an ATS-friendly resume mean?",
    answer: "An Applicant Tracking System (ATS) is software used by recruiters to scan and rank resumes before a human ever reads them. An ATS-friendly resume uses standard formatting, clear section headings, and relevant keywords to ensure your application passes automated screenings.",
  },
  {
    question: "What resume file format can I download in?",
    answer: "You can instantly download your completed resume in multiple formats, most notably high-quality PDF, which ensures your layout, fonts, and spacing remain perfectly intact across all devices and printers.",
  },
  {
    question: "Is it worth paying for a resume builder?",
    answer: "Yes, premium resume builders save you hours of formatting hassle, provide expert-approved content suggestions via AI, and utilize ATS-tested layouts designed specifically to land you more interviews faster.",
  },
  {
    question: "Should I make a different resume for every job application?",
    answer: "Ideally, yes! Tailoring your resume with specific keywords from each job description greatly increases your chances of passing the ATS filter and catching the hiring manager's attention.",
  },
  {
    question: "What makes Resumify AI the best resume builder?",
    answer: "Resumify AI combines cutting-edge artificial intelligence with recruiter-approved templates, instant ATS optimization, and one-click export tools to give you an unfair advantage in your job hunt.",
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [count, setCount] = useState(0);

  // Number counting animation effect
  useEffect(() => {
    let start = 0;
    const end = 189943;
    const duration = 2000; // 2 seconds
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, []);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        
        {/* --- FAQ Section First --- */}
        <div className="text-center space-y-3 mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        {/* FAQ Accordion List */}
        <div className="divide-y divide-gray-200 border-t border-b border-gray-200 bg-white mb-20">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <div key={index} className="transition-colors">
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between text-left py-5 px-2 sm:px-4 font-semibold text-gray-900 hover:text-blue-600 focus:outline-none transition"
                >
                  <span className="text-sm sm:text-base pr-4">{faq.question}</span>
                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-blue-500 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-2 sm:px-4 pb-6 pt-1 text-gray-600 text-sm leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>


        {/* --- Top Career Advice Text --- */}
        <div className="text-center mb-6">
          <p className="text-xs sm:text-sm text-gray-500 font-medium">
            Need more career advice?{" "}
            <Link href="#resources" className="text-blue-500 font-semibold hover:underline">
              View our career resources
            </Link>
          </p>
        </div>

        {/* --- Join Banner at the Bottom with Accurate SVG Arrows --- */}
        <div className="bg-[#f0f7ff] rounded-3xl p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-10 shadow-xs border border-blue-50">
          
          {/* Left Text & Button */}
          <div className="space-y-4 text-center lg:text-left max-w-lg">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
              Join over <span className="text-[#3b82f6]">{count.toLocaleString()}</span> resume makers
            </h3>
            <p className="text-gray-600 text-sm sm:text-base">
              Start now and get hired faster.
            </p>
            <div className="pt-2">
              <Link
                href="/builder"
                className="inline-block px-8 py-3.5 rounded-xl bg-[#2589f5] text-white font-bold text-sm sm:text-base hover:bg-blue-600 transition shadow-md shadow-blue-500/20"
              >
                Create my resume
              </Link>
            </div>
          </div>

          {/* Right Visuals (Person Image + Accurate Curved Arrows + Logos) */}
          <div className="flex items-center gap-6 relative">
            
            {/* Person Image Box */}
            <div className="w-52 h-52 sm:w-60 sm:h-60 bg-blue-200/70 rounded-3xl overflow-hidden shadow-sm relative">
              <img 
                src="/logos/banner.png" 
                alt="Resume Maker" 
                className="w-full h-full object-cover object-top"
              />
              {/* Smile Icon Badge */}
              <div className="absolute top-3 right-3 text-blue-600 bg-white/80 backdrop-blur-xs p-1.5 rounded-full shadow-xs">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              {/* Check Badges */}
              <div className="absolute bottom-3 right-3 flex gap-1 text-blue-600">
                <svg className="w-5 h-5 bg-white rounded-full p-0.5 shadow-xs" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
              </div>
            </div>

            {/* Connecting SVG Arrows & Company Logos */}
            <div className="relative flex flex-col justify-between h-52 py-2">
              
              {/* Corrected SVG Curved Arrows pointing precisely to each logo box */}
              <svg className="absolute left-[-42px] top-4 w-12 h-44 pointer-events-none text-indigo-300" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 50 180">
                {/* Top arrow to Amazon */}
                <path d="M 50 25 C 20 25, 10 25, 2 30" />
                {/* Middle arrow to Apple */}
                <path d="M 50 90 L 2 90" />
                {/* Bottom arrow to Booking */}
                <path d="M 50 155 C 20 155, 10 155, 2 150" />
              </svg>

              {/* Logo 1: Amazon */}
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center p-2.5 z-10 border border-gray-100">
                <img src="/logos/ama.jpg" alt="Amazon" className="w-full h-full object-contain mix-blend-multiply" />
              </div>

              {/* Logo 2: Apple */}
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center p-2.5 z-10 border border-gray-100">
                <img src="/logos/app.png" alt="Apple" className="w-full h-full object-contain mix-blend-multiply" />
              </div>

              {/* Logo 3: Booking */}
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center p-2.5 z-10 border border-gray-100">
                <img src="/logos/bol.png" alt="Booking" className="w-full h-full object-contain mix-blend-multiply" />
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}