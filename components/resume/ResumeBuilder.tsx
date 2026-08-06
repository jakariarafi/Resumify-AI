"use client";

import { useState, useRef, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import ResumePreview from "./ResumePreview";
import PersonalInfoForm from "./PersonalInfoForm";
import EducationForm from "./EducationForm";
import ExperienceForm from "./ExperienceForm";
import SkillsForm from "./SkillsForm";
import ProjectsForm from "./ProjectsForm";
import CertificatesForm from "./CertificatesForm";
import LanguagesForm from "./LanguagesForm";
import ReferencesForm from "./ReferencesForm";
import ResumeTemplates from "./ResumeTemplates";
import ResumeLayoutSettings from "./ResumeLayoutSettings";
import { Upload, Download, Save, Palette, Type, Paintbrush, FileText } from "lucide-react";

const fontList = [
  "Inter", "Roboto", "Poppins", "Open Sans", "Lato", "Montserrat", 
  "Source Sans Pro", "Ubuntu", "Playfair Display", "Merriweather", 
  "Lora", "Nunito", "Raleway", "PT Sans", "Work Sans", "Mulish", 
  "Quicksand", "Karla", "Inconsolata", "Fira Code", "Josefin Sans",
  "Cabin", "Oxygen", "Arimo", "Bitter", "Oswald", "Arial"
];

export default function ResumeBuilder() {
  const [activeTab, setActiveTab] = useState("edit");
  const [section, setSection] = useState("personal");
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [customizeSubTab, setCustomizeSubTab] = useState("templates");

  const [primaryFont, setPrimaryFont] = useState("Inter");
  const [secondaryFont, setSecondaryFont] = useState("Inter");
  const [selectedColor, setSelectedColor] = useState("indigo");
  const [documentTitle, setDocumentTitle] = useState("Al_Jakaria_Resume");

  // টেক্সট সেটিংস স্টেট
  const [textSettings, setTextSettings] = useState({
    lineHeight: 120,
    primaryHeadingSize: 24,
    secondaryHeadingSize: 16,
    bodySize: 11,
    sectionTitleSize: 12,
    primaryHeadingWeight: "bold",
    secondaryHeadingWeight: "bold",
    bodyWeight: "normal",
    sectionTitleWeight: "600",
  });

  const [layoutSettings, setLayoutSettings] = useState({
    format: "A4",
    headerFooter: 0.30,
    topBottom: 0.50,
    leftRight: 0.50,
    betweenSections: 16,
    betweenTitles: 6,
    betweenBlocks: 6,
    dateFormat: "Short Name (Jan YYYY)",
    headerAlignment: "left",
    dateAlignment: "right",
    locationAlignment: "left",
    showEducationBy: "institution",
    educationLayout: "stacked",
  });

  useEffect(() => {
    [primaryFont, secondaryFont].forEach((font) => {
      if (!font) return;
      const linkId = `google-font-${font.replace(/\s+/g, "-").toLowerCase()}`;
      if (!document.getElementById(linkId) && font !== "Arial") {
        const fontUrl = `https://fonts.googleapis.com/css2?family=${font.replace(/\s+/g, "+")}:wght@300;400;500;600;700&display=swap`;
        const link = document.createElement("link");
        link.id = linkId;
        link.rel = "stylesheet";
        link.href = fontUrl;
        document.head.appendChild(link);
      }
    });
  }, [primaryFont, secondaryFont]);

  const [personalInfo, setPersonalInfo] = useState({
    fullName: "Al Jakaria Hossain Jobayed",
    profession: "Full Stack Developer",
    email: "rafibd@example.com",
    phone: "+880 1500000000",
    address: "Dhaka, Bangladesh",
    website: "portfolio.com",
    linkedin: "linkedin.com/in/rafi",
    github: "github.com/rafi",
    summary: "Passionate Full Stack Developer and CSE graduate with strong experience in building modern web applications.",
    photo: "",
  });

  const [education, setEducation] = useState<any[]>([
    { degree: "B.Sc. in Computer Science & Engineering", institution: "University of Asia Pacific", location: "Dhaka", startDate: "2022", endDate: "2026", cgpa: "3.80", description: "" }
  ]);

  const [experience, setExperience] = useState<any[]>([
    { jobTitle: "Software Engineer Trainee", company: "Cyber Bangla", location: "Dhaka", employmentType: "Full Time", startDate: "2025", endDate: "Present", currentlyWorking: true, description: "Developing responsive web applications and AI tools using React, Next.js, and Tailwind CSS." }
  ]);

  const [skills, setSkills] = useState<any[]>([
    { name: "Python", category: "Programming", level: "Advanced" },
    { name: "React.js", category: "Frontend", level: "Expert" },
    { name: "Next.js", category: "Frontend", level: "Advanced" },
    { name: "Tailwind CSS", category: "Design", level: "Expert" }
  ]);

  const [projects, setProjects] = useState<any[]>([
    { title: "AI-Driven IoT Module", role: "Developer", technologies: "Next.js, Python, IoT", github: "github.com/rafi", liveDemo: "vercel.app", startDate: "Jan 2026", endDate: "Present", description: "Built a real-time mobility monitoring system." }
  ]);

  const [certificates, setCertificates] = useState<any[]>([]);
  const [languages, setLanguages] = useState<any[]>([
    { name: "Bengali", proficiency: "Native" },
    { name: "English", proficiency: "Fluent" }
  ]);
  const [references, setReferences] = useState<any[]>([]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPersonalInfo({ ...personalInfo, photo: imageUrl });
    }
  };

  const handleSave = () => {
    alert("Resume saved successfully!");
  };

  const resumeRef = useRef<HTMLDivElement>(null);
  
  const handleDownloadPDF = useReactToPrint({
    contentRef: resumeRef,
    documentTitle: documentTitle || "My_Resume",
  });

  return (
    <div className="min-h-screen w-full bg-slate-100 text-slate-900 flex flex-col font-sans fixed inset-0 z-50 overflow-hidden">
      
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between shrink-0 shadow-sm">
        <div className="flex items-center gap-2">
          <Palette size={16} className="text-slate-500" />
          <span className="text-xs font-bold text-slate-700">Resumify.AI Builder</span>
        </div>

        <div className="hidden md:flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1">
          <FileText size={14} className="text-slate-400" />
          <input
            type="text"
            value={documentTitle}
            onChange={(e) => setDocumentTitle(e.target.value)}
            placeholder="File name..."
            className="bg-transparent text-xs font-bold text-slate-700 outline-none w-36"
          />
        </div>

        <div className="flex bg-slate-100 p-1 rounded-full border border-slate-200">
          <button
            onClick={() => setActiveTab("edit")}
            className={`px-6 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
              activeTab === "edit" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Edit
          </button>
          <button
            onClick={() => setActiveTab("customize")}
            className={`px-6 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
              activeTab === "customize" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Customize Design
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer shadow-sm"
          >
            <Save size={14} /> Save
          </button>
          <button
            onClick={() => handleDownloadPDF()}
            className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer shadow-sm"
          >
            <Download size={14} /> Download PDF
          </button>
        </div>
      </header>

      {/* Main Split Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        
        {/* Left Form / Customization Panel */}
        <div className="lg:col-span-6 bg-white p-8 overflow-y-auto border-r border-slate-200 flex flex-col justify-between">
          <div className="max-w-xl mx-auto w-full space-y-6 pb-10">
            
            {activeTab === "edit" ? (
              <>
                <div className="flex items-center gap-2 overflow-x-auto pb-3">
                  {[
                    { id: "personal", label: "Personal" },
                    { id: "education", label: "Education" },
                    { id: "experience", label: "Experience" },
                    { id: "skills", label: "Skills" },
                    { id: "projects", label: "Projects" },
                    { id: "certificates", label: "Certificates" },
                    { id: "languages", label: "Languages" },
                    { id: "references", label: "References" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setSection(tab.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer shadow-xs ${
                        section === tab.id
                          ? "bg-indigo-600 text-white shadow-md ring-2 ring-indigo-200"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {section === "personal" && (
                  <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    <div>
                      <h3 className="text-xs font-bold text-slate-700">Profile Photo</h3>
                      <p className="text-[10px] text-slate-500">Upload your professional photo</p>
                    </div>
                    <label className="flex items-center justify-center w-16 h-16 bg-white border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-indigo-500 transition overflow-hidden shrink-0 shadow-sm">
                      {personalInfo.photo ? (
                        <img src={personalInfo.photo} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <Upload size={16} className="text-slate-400" />
                      )}
                      <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                    </label>
                  </div>
                )}

                <div className="bg-slate-50/50 border border-slate-200 rounded-3xl p-6">
                  {section === "personal" && <PersonalInfoForm data={personalInfo} onChange={setPersonalInfo as any} />}
                  {section === "education" && <EducationForm data={education} onChange={setEducation} />}
                  {section === "experience" && <ExperienceForm data={experience} onChange={setExperience} />}
                  {section === "skills" && <SkillsForm data={skills} onChange={setSkills} />}
                  {section === "projects" && <ProjectsForm data={projects} onChange={setProjects} />}
                  {section === "certificates" && <CertificatesForm data={certificates} onChange={setCertificates} />}
                  {section === "languages" && <LanguagesForm data={languages} onChange={setLanguages} />}
                  {section === "references" && <ReferencesForm data={references} onChange={setReferences} />}
                </div>
              </>
            ) : (
              <div className="space-y-6">
                
                {/* Customize Sub-Tabs */}
                <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200">
                  {[
                    { id: "templates", label: "Template & Colors" },
                    { id: "text", label: "Text" },
                    { id: "layout", label: "Layout" },
                  ].map((subTab) => (
                    <button
                      key={subTab.id}
                      onClick={() => setCustomizeSubTab(subTab.id)}
                      className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                        customizeSubTab === subTab.id ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-900"
                      }`}
                    >
                      {subTab.label}
                    </button>
                  ))}
                </div>

                {/* Template & Colors */}
                {customizeSubTab === "templates" && (
                  <div className="space-y-6">
                    <div className="bg-slate-50/50 border border-slate-200 rounded-3xl p-6">
                      <ResumeTemplates 
                        selected={selectedTemplate} 
                        onSelect={(templateId) => setSelectedTemplate(templateId)} 
                      />
                    </div>

                    <div className="bg-slate-50/50 border border-slate-200 rounded-3xl p-6 space-y-6">
                      <h3 className="text-lg font-bold text-slate-800">Accent Color</h3>
                      <div className="flex gap-3">
                        {[
                          { id: "indigo", bg: "bg-indigo-600" },
                          { id: "emerald", bg: "bg-emerald-600" },
                          { id: "rose", bg: "bg-rose-600" },
                          { id: "amber", bg: "bg-amber-600" },
                          { id: "cyan", bg: "bg-cyan-600" },
                          { id: "violet", bg: "bg-violet-600" },
                        ].map((color) => (
                          <button
                            key={color.id}
                            onClick={() => setSelectedColor(color.id)}
                            className={`w-8 h-8 rounded-full ${color.bg} transition cursor-pointer shadow-sm ${
                              selectedColor === color.id ? "ring-4 ring-offset-2 ring-indigo-500" : "opacity-80 hover:opacity-100"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Text Tab */}
                {customizeSubTab === "text" && (
                  <div className="bg-slate-50/50 border border-slate-200 rounded-3xl p-6 space-y-6">
                    <h3 className="text-lg font-bold text-slate-800">Typography & Text Settings</h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Primary Font</label>
                        <select
                          value={primaryFont}
                          onChange={(e) => setPrimaryFont(e.target.value)}
                          className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 outline-none cursor-pointer"
                        >
                          {fontList.map((font) => (
                            <option key={font} value={font} style={{ fontFamily: font }}>{font}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Secondary Font</label>
                        <select
                          value={secondaryFont}
                          onChange={(e) => setSecondaryFont(e.target.value)}
                          className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 outline-none cursor-pointer"
                        >
                          {fontList.map((font) => (
                            <option key={font} value={font} style={{ fontFamily: font }}>{font}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-xs font-bold text-slate-700">Line Height</label>
                        <span className="text-xs font-bold bg-slate-100 px-2 py-0.5 rounded-lg text-slate-700">{textSettings.lineHeight}%</span>
                      </div>
                      <input
                        type="range"
                        min="100"
                        max="200"
                        value={textSettings.lineHeight}
                        onChange={(e) => setTextSettings({ ...textSettings, lineHeight: Number(e.target.value) })}
                        className="w-full accent-indigo-600 cursor-pointer"
                      />
                    </div>

                    <div className="space-y-4 pt-2 border-t border-slate-200">
                      <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">Font Size</h4>
                      
                      {[
                        { label: "Primary Heading", key: "primaryHeadingSize", min: 16, max: 36 },
                        { label: "Secondary Heading", key: "secondaryHeadingSize", min: 12, max: 24 },
                        { label: "Body", key: "bodySize", min: 9, max: 16 },
                        { label: "Section Titles", key: "sectionTitleSize", min: 10, max: 20 },
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between gap-4">
                          <span className="text-xs font-semibold text-slate-600 w-36">{item.label}</span>
                          <input
                            type="range"
                            min={item.min}
                            max={item.max}
                            value={(textSettings as any)[item.key]}
                            onChange={(e) => setTextSettings({ ...textSettings, [item.key]: Number(e.target.value) })}
                            className="flex-1 accent-indigo-600 cursor-pointer"
                          />
                          <span className="text-xs font-bold bg-slate-100 px-2.5 py-1 rounded-lg text-slate-700 w-16 text-center">
                            {(textSettings as any)[item.key]} pt
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-4 pt-2 border-t border-slate-200">
                      <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">Font Weight</h4>
                      
                      {[
                        { label: "Primary Heading", key: "primaryHeadingWeight" },
                        { label: "Secondary Heading", key: "secondaryHeadingWeight" },
                        { label: "Body", key: "bodyWeight" },
                        { label: "Section Titles", key: "sectionTitleWeight" },
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between gap-4">
                          <span className="text-xs font-semibold text-slate-600 w-36">{item.label}</span>
                          <select
                            value={(textSettings as any)[item.key]}
                            onChange={(e) => setTextSettings({ ...textSettings, [item.key]: e.target.value })}
                            className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 outline-none cursor-pointer"
                          >
                            <option value="normal">Regular (Normal)</option>
                            <option value="500">Medium</option>
                            <option value="600">Semibold</option>
                            <option value="bold">Bold</option>
                            <option value="900">Black / Extra Bold</option>
                          </select>
                        </div>
                      ))}
                    </div>

                  </div>
                )}

                {/* Layout Tab */}
                {customizeSubTab === "layout" && (
                  <ResumeLayoutSettings layout={layoutSettings} onChange={setLayoutSettings} />
                )}

              </div>
            )}

          </div>
        </div>

        {/* Right Live Preview Panel */}
        <div className="lg:col-span-6 bg-slate-100 p-8 overflow-y-auto flex flex-col items-center justify-between relative">
          
          <div 
            ref={resumeRef} 
            id="printable-resume-area" 
            className="bg-white text-slate-900 shadow-2xl my-6"
            style={{
              width: layoutSettings.format === "A4" ? "210mm" : "8.5in",
              minHeight: layoutSettings.format === "A4" ? "297mm" : "11in",
              paddingTop: `${layoutSettings.topBottom}in`,
              paddingBottom: `${layoutSettings.topBottom}in`,
              paddingLeft: `${layoutSettings.leftRight}in`,
              paddingRight: `${layoutSettings.leftRight}in`,
              boxSizing: "border-box",
            }}
          >
            <ResumePreview
              personalInfo={personalInfo}
              education={education}
              experience={experience}
              skills={skills}
              projects={projects}
              certificates={certificates}
              languages={languages}
              references={references}
              template={selectedTemplate}
              primaryFont={primaryFont}
              secondaryFont={secondaryFont}
              accentColor={selectedColor}
              layoutSettings={layoutSettings}
              textSettings={textSettings}
            />
          </div>

          <div className="flex items-center gap-4 bg-slate-900 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-md">
            <span>1 / 1</span>
          </div>

        </div>

      </div>
    </div>
  );
}