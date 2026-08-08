"use client";

import { useState, useRef, useEffect } from "react";
import html2canvas from "html2canvas-pro";
import { jsPDF } from "jspdf";
import { useRouter } from "next/navigation";
import {
  Download, ArrowRight, ArrowLeft, X, ZoomIn, ZoomOut,
  Check, Edit3, FileDown, FileType, File as FileIcon, 
  Loader2, GripVertical, RefreshCcw, LayoutTemplate, Palette, 
  PlusSquare, SpellCheck, Save, Sparkles, Briefcase, GraduationCap, 
  FolderKanban, Languages as LanguagesIcon, User, FileText, Plus, LayoutDashboard, Crown
} from "lucide-react";

import ResumeSidebar from "./ResumeSidebar";
import EducationForm from "./EducationForm";
import ExperienceForm from "./ExperienceForm";
import SkillsForm from "./SkillsForm";
import ProjectsForm from "./ProjectsForm";
import LanguagesForm from "./LanguagesForm";
import CertificatesForm from "./CertificatesForm"; 
import ReferencesForm from "./ReferencesForm";     
import ResumeDocument from "./ResumeDocument";
import TemplateSelector from "./TemplateSelector"; 
import ProModal from "./ProModal"; 

/* ----------------------------------------------------------------------
   DESIGN TOKENS & DATA
---------------------------------------------------------------------- */
const FONTS = [
  "Inter", "Roboto", "Poppins", "Open Sans", "Lato", "Montserrat", 
  "Source Sans Pro", "Ubuntu", "Playfair Display", "Merriweather", 
  "Lora", "Nunito", "Raleway", "PT Sans", "Work Sans", "Mulish"
];

const ACCENTS = [
  { id: "white", hex: "#FFFFFF" },
  { id: "gray", hex: "#6B7280" },
  { id: "navy", hex: "#1E3A8A" },
  { id: "purple", hex: "#6D28D9" },
  { id: "blue", hex: "#2563EB" },
  { id: "teal", hex: "#0F6B62" },
  { id: "green", hex: "#166534" },
  { id: "rust", hex: "#991B1B" },
  { id: "salmon", hex: "#F87171" },
  { id: "yellow", hex: "#EAB308" },
];

const INITIAL_TEMPLATES = [
  { id: "modern", label: "Modern Column", isPremium: false },
  { id: "classic", label: "Classic Print", isPremium: false },
  { id: "minimal", label: "Minimalist", isPremium: false },
  { id: "executive", label: "Executive", isPremium: true },
  { id: "creative", label: "Creative Flow", isPremium: true },
  { id: "elegant", label: "Elegant Serif", isPremium: true },
];

const INITIAL_SECTION_ORDER = [
  { id: "summary", label: "Professional Summary" },
  { id: "experience", label: "Work Experience" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "certificates", label: "Certifications" },
  { id: "languages", label: "Languages" },
  { id: "references", label: "References" },
];

const ALL_SECTIONS_LIST = [
  { id: "summary", label: "Professional Summary", icon: Sparkles },
  { id: "experience", label: "Work Experience", icon: Briefcase },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "skills", label: "Skills", icon: Palette }, 
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "certificates", label: "Certifications", icon: FileText },
  { id: "languages", label: "Languages", icon: LanguagesIcon },
  { id: "references", label: "References", icon: User },
];

const uid = () => Math.random().toString(36).slice(2, 10);

/* ----------------------------------------------------------------------
   THUMBNAIL COMPONENT (Live Mini-Preview)
---------------------------------------------------------------------- */
const TemplateThumbnail = ({ template, isActive, onClick, resumeData, design, sectionOrder }: any) => {
  return (
    <div 
      onClick={onClick}
      className={`cursor-pointer transition-all duration-200 border-2 p-1 rounded-lg relative ${isActive ? 'border-[#0F6B62]' : 'border-transparent hover:border-slate-300'}`}
    >
      {template.isPremium && (
        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-400 to-yellow-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-md z-10 flex items-center gap-1">
          PRO <Crown size={10} />
        </div>
      )}
      <div className="w-full aspect-[1/1.4] bg-white shadow-sm relative overflow-hidden group rounded-md">
        <div className="absolute top-0 left-0 origin-top-left pointer-events-none" style={{ width: "210mm", transform: "scale(0.18)" }}>
          <ResumeDocument data={resumeData} template={template.id} design={design} sectionOrder={sectionOrder} />
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 backdrop-blur-sm">
          <span className="text-[12px] font-bold text-slate-800 text-center px-2">{template.label}</span>
        </div>
      </div>
    </div>
  );
};

/* ----------------------------------------------------------------------
   EXPORT HELPERS
---------------------------------------------------------------------- */
function buildFontLinks(fontFamily: string) {
  return `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=${fontFamily.replace(/ /g, "+")}:wght@300;400;500;600;700&display=swap">`;
}

function plainTextResume(data: any) {
  const { info, experience, education, skills, projects, certificates, languages, references } = data;
  const lines = [];
  const fullName = [info.firstName, info.lastName].filter(Boolean).join(" ");
  lines.push(fullName.toUpperCase());
  if (info.profession) lines.push(info.profession);
  lines.push([info.email, info.phone, [info.city, info.country].filter(Boolean).join(", "), info.website].filter(Boolean).join(" | "));
  lines.push("");
  if (info.summary) { lines.push("SUMMARY", info.summary, ""); }
  if (experience?.length) {
    lines.push("EXPERIENCE");
    experience.forEach((e: any) => {
      lines.push(`${e.jobTitle} — ${e.company}${e.location ? ", " + e.location : ""}`);
      lines.push([e.startDate, e.current ? "Present" : e.endDate].filter(Boolean).join(" — "));
      if (e.description) lines.push(e.description);
      lines.push("");
    });
  }
  if (education?.length) {
    lines.push("EDUCATION");
    education.forEach((ed: any) => {
      lines.push(`${ed.degree} — ${ed.institution}${ed.location ? ", " + ed.location : ""}`);
      lines.push([ed.startDate, ed.endDate].filter(Boolean).join(" — ") + (ed.grade ? ` | ${ed.grade}` : ""));
      lines.push("");
    });
  }
  if (skills?.length) { lines.push("SKILLS", skills.map((s: any) => `${s.name} (${s.level})`).join(", "), ""); }
  if (projects?.length) {
    lines.push("PROJECTS");
    projects.forEach((p: any) => { lines.push(p.name + (p.link ? ` — ${p.link}` : "")); if (p.description) lines.push(p.description); lines.push(""); });
  }
  if (certificates?.length) {
    lines.push("CERTIFICATIONS");
    certificates.forEach((c: any) => { lines.push(`${c.name || c.title} — ${c.issuer || c.organization}`); lines.push(""); });
  }
  if (languages?.length) { lines.push("LANGUAGES", languages.map((l: any) => `${l.name} (${l.level})`).join(", "), ""); }
  return lines.join("\n");
}

function downloadBlob(content: string, filename: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

/* ----------------------------------------------------------------------
   MAIN APP BUILDER
---------------------------------------------------------------------- */
export default function ResumeBuilder() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<"wizard" | "editor">("wizard"); 
  const [currentStep, setCurrentStep] = useState(1);
  const [downloadOpen, setDownloadOpen] = useState(false);
  const [zoom, setZoom] = useState(80);
  const [downloadFormat, setDownloadFormat] = useState("pdf");
  const [isDownloading, setIsDownloading] = useState(false);
  
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [documentTitle, setDocumentTitle] = useState("Untitled_Resume");
  
  const [adminTemplates, setAdminTemplates] = useState<any[]>([]);
  const [templateId, setTemplateId] = useState("modern");
  
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [newTemplate, setNewTemplate] = useState({ id: "", label: "", isPremium: false });
  
  // ✅ Automatic Premium Status Checker from LocalStorage
  const [isPremiumUser, setIsPremiumUser] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("is_premium") === "true";
    }
    return false;
  });
  const [premiumModalOpen, setPremiumModalOpen] = useState(false);

  const [activeMenu, setActiveMenu] = useState("templates"); 

  const [design, setDesign] = useState({
    color: "#0F6B62",
    fontSize: "NORMAL", 
    fontFamily: "Inter",
    sectionSpacing: 20,
    paragraphSpacing: 10,
    lineSpacing: 1.5,
    format: "A4" 
  });

  const [sectionOrder, setSectionOrder] = useState([...INITIAL_SECTION_ORDER]);
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  const handleDragStart = (index: number) => { dragItem.current = index; };
  const handleDragEnter = (index: number) => { dragOverItem.current = index; };
  const handleDragEnd = () => {
    if (dragItem.current !== null && dragOverItem.current !== null && dragItem.current !== dragOverItem.current) {
      const newOrder = [...sectionOrder];
      const draggedItem = newOrder[dragItem.current];
      newOrder.splice(dragItem.current, 1);
      newOrder.splice(dragOverItem.current, 0, draggedItem);
      setSectionOrder(newOrder);
    }
    dragItem.current = null;
    dragOverItem.current = null;
  };

  const toggleSection = (sectionId: string, sectionLabel: string) => {
    const exists = sectionOrder.find(s => s.id === sectionId);
    if (exists) {
      setSectionOrder(sectionOrder.filter(s => s.id !== sectionId));
    } else {
      setSectionOrder([...sectionOrder, { id: sectionId, label: sectionLabel }]);
    }
  };

  const [info, setInfo] = useState({
    firstName: "Al Jakaria", lastName: "Rafi", profession: "Software Engineer",
    email: "jakariarafi12@gmail.com", phone: "+880 1500000000", city: "Dhaka",
    country: "Bangladesh", website: "", photo: "",
    summary: "",
  });

  const [experience, setExperience] = useState<any[]>([
    { id: uid(), jobTitle: "Software Engineer Trainee", company: "Cyber Bangla", location: "Dhaka", startDate: "2025", endDate: "", current: true, description: "Building responsive web applications and AI-driven tools using React, Next.js, and Tailwind CSS." },
  ]);
  const [education, setEducation] = useState<any[]>([
    { id: uid(), degree: "B.Sc. in Computer Science & Engineering", institution: "University of Asia Pacific", location: "Dhaka", startDate: "2022", endDate: "2026", grade: "3.80" },
  ]);
  const [skills, setSkills] = useState<any[]>([
    { id: uid(), name: "Python", level: "Advanced" },
    { id: uid(), name: "React.js", level: "Expert" },
    { id: uid(), name: "Next.js", level: "Advanced" },
  ]);
  
  const [projects, setProjects] = useState<any[]>([]);
  const [certificates, setCertificates] = useState<any[]>([]); 
  const [languages, setLanguages] = useState<any[]>([]);
  const [references, setReferences] = useState<any[]>([]);

  // Auto-generate summary at Step 8 based on profile info
  useEffect(() => {
    if (currentStep === 8) {
      const topEdu = education[0]?.degree ? `holding a ${education[0].degree} from ${education[0].institution}` : "";
      const topSkill = skills.length > 0 ? `proficient in ${skills.map(s => s.name).join(", ")}` : "";
      const topExp = experience[0]?.jobTitle ? `experienced as a ${experience[0].jobTitle} at ${experience[0].company}` : "";
      
      const craftedSummary = `Results-driven ${info.profession || 'Professional'} ${topEdu}, ${topExp}. Highly skilled and ${topSkill}, based in ${info.city}, ${info.country}. Demonstrated expertise in building robust applications and delivering high-quality software solutions.`;
      
      setInfo(prev => ({ ...prev, summary: prev.summary && prev.summary.trim() !== "" ? prev.summary : craftedSummary }));
    }
  }, [currentStep, education, experience, skills, info.profession, info.city, info.country]);

  useEffect(() => {
    const id = "gf-" + design.fontFamily.replace(/\s+/g, "-").toLowerCase();
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = `https://fonts.googleapis.com/css2?family=${design.fontFamily.replace(/ /g, "+")}:wght@400;500;600;700;800&display=swap`;
      document.head.appendChild(link);
    }
  }, [design.fontFamily]);

  const resumeData = { info, experience, education, skills, projects, certificates, languages, references };
  const printRef = useRef<HTMLDivElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setInfo({ ...info, photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDirectPDFDownload = async () => {
    if (!printRef.current) return;
    setIsDownloading(true);

    try {
      const element = printRef.current;
      const canvas = await html2canvas(element, { scale: 2, useCORS: true, logging: false });
      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: design.format.toLowerCase() });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${documentTitle}.pdf`); 
    } catch (error) {
      alert("Failed to generate PDF.");
    } finally {
      setIsDownloading(false);
      setDownloadOpen(false);
    }
  };

  const handleDownloadDOCX = () => {
    if (!printRef.current) return;
    const html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
      <head><meta charset="utf-8">${buildFontLinks(design.fontFamily)}<title>${documentTitle}</title></head>
      <body>${printRef.current.outerHTML}</body></html>`;
    downloadBlob(html, `${documentTitle}.doc`, "application/msword"); 
    setDownloadOpen(false);
  };

  const handleDownloadTXT = () => {
    downloadBlob(plainTextResume(resumeData), `${documentTitle}.txt`, "text/plain;charset=utf-8"); 
    setDownloadOpen(false);
  };

  const handleConfirmDownload = () => {
    if (downloadFormat === "pdf") handleDirectPDFDownload();
    else if (downloadFormat === "docx") handleDownloadDOCX();
    else if (downloadFormat === "txt") handleDownloadTXT();
  };

  // ✅ Automatic Navigation: Premium users go to Dashboard, Free users go to Landing Page ("/")
  const handleExitNavigation = () => {
    const checkPremium = typeof window !== "undefined" && localStorage.getItem("is_premium") === "true";
    if (checkPremium || isPremiumUser) {
      router.push("/dashboard");
    } else {
      router.push("/");
    }
  };

  const allTemplates = [...INITIAL_TEMPLATES, ...adminTemplates];

  const handleTemplateSelect = (t: any) => {
    const checkPremium = typeof window !== "undefined" && localStorage.getItem("is_premium") === "true";
    if (t.isPremium && !checkPremium && !isPremiumUser) {
      setPremiumModalOpen(true);
    } else {
      setTemplateId(t.id);
    }
  };

  const handleAddNewTemplate = () => {
    if(!newTemplate.id || !newTemplate.label) return alert("Please provide Template ID and Label");
    setAdminTemplates([...adminTemplates, newTemplate]);
    setTemplateId(newTemplate.id);
    setNewTemplate({ id: "", label: "", isPremium: false });
    setAdminModalOpen(false);
  };

  // -------------------------------------------------------------
  // WIZARD VIEW 
  // -------------------------------------------------------------
  if (viewMode === "wizard") {
    return (
      <div className="fixed inset-0 z-[999] w-full bg-white text-slate-900 flex flex-col font-sans overflow-hidden">
        <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between shrink-0 shadow-sm">
          <button onClick={() => setViewMode("editor")} className="flex items-center gap-1.5 text-xs font-bold text-teal-800 hover:underline cursor-pointer">
            <ArrowLeft size={16} /> Skip to Editor & Preview
          </button>
          <span className="text-xs font-bold text-slate-600">Step-by-Step Wizard Form</span>
          <div />
        </header>

        <div className="flex-1 flex overflow-hidden">
          <ResumeSidebar currentStep={currentStep} setStep={setCurrentStep} completeness={Math.min(100, Math.round((currentStep / 9) * 100))} />
          
          <div className="flex-1 bg-white p-10 overflow-y-auto flex flex-col justify-between">
            <div className="max-w-3xl mx-auto w-full space-y-8 pb-16">
              
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h1 className="text-3xl font-serif font-extrabold text-slate-900">Heading & Contact</h1>
                    <p className="text-sm text-slate-500 mt-1">Provide your basic contact and professional details.</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                    <div className="md:col-span-3 flex flex-col items-center space-y-2">
                      <div className="w-32 h-40 bg-slate-200 border border-slate-300 rounded-lg overflow-hidden shadow-inner flex items-center justify-center">
                        {info.photo ? <img src={info.photo} alt="Profile" className="w-full h-full object-cover" /> : <div className="text-slate-400 text-xs font-medium text-center p-2">No Photo</div>}
                      </div>
                      <label className="text-xs font-bold text-blue-600 hover:underline cursor-pointer">
                        Upload Photo <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                      </label>
                    </div>

                    <div className="md:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5"><label className="block text-[11px] font-bold tracking-wider text-slate-700">FIRST NAME</label><input type="text" value={info.firstName} onChange={(e) => setInfo({ ...info, firstName: e.target.value })} className="w-full bg-slate-50 border border-slate-300 rounded-md px-3.5 py-2.5 text-sm outline-none focus:border-teal-600" /></div>
                      <div className="space-y-1.5"><label className="block text-[11px] font-bold tracking-wider text-slate-700">LAST NAME</label><input type="text" value={info.lastName} onChange={(e) => setInfo({ ...info, lastName: e.target.value })} className="w-full bg-slate-50 border border-slate-300 rounded-md px-3.5 py-2.5 text-sm outline-none focus:border-teal-600" /></div>
                      <div className="space-y-1.5 sm:col-span-2"><label className="block text-[11px] font-bold tracking-wider text-slate-700">PROFESSION / TITLE</label><input type="text" value={info.profession} onChange={(e) => setInfo({ ...info, profession: e.target.value })} className="w-full bg-slate-50 border border-slate-300 rounded-md px-3.5 py-2.5 text-sm outline-none focus:border-teal-600" /></div>
                      <div className="space-y-1.5"><label className="block text-[11px] font-bold tracking-wider text-slate-700">CITY</label><input type="text" value={info.city} onChange={(e) => setInfo({ ...info, city: e.target.value })} className="w-full bg-slate-50 border border-slate-300 rounded-md px-3.5 py-2.5 text-sm outline-none focus:border-teal-600" /></div>
                      <div className="space-y-1.5"><label className="block text-[11px] font-bold tracking-wider text-slate-700">COUNTRY</label><input type="text" value={info.country} onChange={(e) => setInfo({ ...info, country: e.target.value })} className="w-full bg-slate-50 border border-slate-300 rounded-md px-3.5 py-2.5 text-sm outline-none focus:border-teal-600" /></div>
                      <div className="space-y-1.5"><label className="block text-[11px] font-bold tracking-wider text-slate-700">PHONE</label><input type="text" value={info.phone} onChange={(e) => setInfo({ ...info, phone: e.target.value })} className="w-full bg-slate-50 border border-slate-300 rounded-md px-3.5 py-2.5 text-sm outline-none focus:border-teal-600" /></div>
                      <div className="space-y-1.5"><label className="block text-[11px] font-bold tracking-wider text-slate-700">EMAIL</label><input type="email" value={info.email} onChange={(e) => setInfo({ ...info, email: e.target.value })} className="w-full bg-slate-50 border border-slate-300 rounded-md px-3.5 py-2.5 text-sm outline-none focus:border-teal-600" /></div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && <EducationForm data={education} onChange={(data: any) => setEducation(data)} />}
              {currentStep === 3 && <ExperienceForm data={experience} onChange={(data: any) => setExperience(data)} />}
              {currentStep === 4 && <SkillsForm data={skills} onChange={(data: any) => setSkills(data)} />}
              {currentStep === 5 && <ProjectsForm data={projects} onChange={(data: any) => setProjects(data)} />}
              {currentStep === 6 && <CertificatesForm data={certificates} onChange={(data: any) => setCertificates(data)} />}
              {currentStep === 7 && <LanguagesForm data={languages} onChange={(data: any) => setLanguages(data)} />}

              {currentStep === 8 && (
                <div className="space-y-6">
                  <div>
                    <h1 className="text-3xl font-serif font-extrabold text-slate-900 flex items-center gap-2">
                      <Sparkles className="text-amber-500" size={28}/> Professional Summary
                    </h1>
                    <p className="text-sm text-stone-500 mt-1">Our AI has analyzed your entire profile to craft this ATS-friendly summary. Feel free to edit or correct it below.</p>
                  </div>
                  <div className="bg-teal-50 border-2 border-teal-600/30 rounded-2xl p-6 relative shadow-sm space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-[#0F6B62] uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles size={14}/> ATS Summary Generator & Editor
                      </span>
                      <span className="text-xs text-stone-500 font-medium">Fully editable</span>
                    </div>
                    <textarea
                      rows={6}
                      value={info.summary}
                      onChange={(e) => setInfo({ ...info, summary: e.target.value })}
                      className="w-full bg-white border border-teal-300 rounded-xl p-4 text-sm text-stone-800 outline-none focus:ring-2 focus:ring-[#0F6B62] resize-none leading-relaxed font-medium shadow-inner"
                      placeholder="Your AI generated summary will appear here..."
                    />
                  </div>
                </div>
              )}

              {currentStep === 9 && <ReferencesForm data={references} onChange={(data: any) => setReferences(data)} />}

              <div className="flex justify-between items-center pt-8 border-t border-slate-200 mt-12">
                <button onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))} className={`px-6 py-3 rounded-full border-2 border-slate-900 text-slate-900 font-bold text-sm cursor-pointer hover:bg-slate-50 ${currentStep === 1 ? 'opacity-0' : ''}`}>
                  <ArrowLeft size={16} className="inline mr-1" /> Back
                </button>
                {currentStep < 9 ? (
                  <button onClick={() => setCurrentStep(prev => prev + 1)} className="px-8 py-3 rounded-full bg-[#0F6B62] text-white font-bold text-sm cursor-pointer flex items-center gap-2 hover:bg-teal-800">
                    Next Step <ArrowRight size={16} />
                  </button>
                ) : (
                  <button onClick={() => setViewMode("editor")} className="px-8 py-3 rounded-full bg-slate-900 text-white font-bold text-sm cursor-pointer flex items-center gap-2 hover:bg-slate-800">
                    Done / Go to Editor
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // EDITOR VIEW
  // -------------------------------------------------------------
  return (
    <div className="fixed inset-0 z-[999] w-full flex flex-col font-sans bg-[#E5E7EB]" style={{ "--accent": design.color } as any}>
      
      {/* HEADER */}
      <header className="bg-white px-6 py-3 flex items-center justify-between shadow-sm sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <button onClick={handleExitNavigation} className="flex items-center gap-2 text-white bg-slate-900 hover:bg-slate-800 px-4 py-2 rounded-xl text-xs font-bold transition shadow-sm cursor-pointer">
            <LayoutDashboard size={14} /> {(typeof window !== "undefined" && localStorage.getItem("is_premium") === "true") || isPremiumUser ? "Dashboard" : "Home / Landing"}
          </button>
          
          <button onClick={() => setViewMode("wizard")} className="flex items-center gap-2 text-stone-600 hover:text-stone-900 font-bold text-sm transition cursor-pointer">
            <ArrowLeft size={16} /> Edit Info
          </button>
          <div className="h-6 w-px bg-stone-200" />
          
          {isEditingTitle ? (
            <div className="flex items-center gap-2 bg-stone-100 px-3 py-1.5 rounded-lg border border-stone-300">
              <input type="text" value={documentTitle} onChange={(e) => setDocumentTitle(e.target.value)} className="bg-transparent text-sm font-bold text-slate-900 outline-none w-48" autoFocus />
              <button onClick={() => setIsEditingTitle(false)} className="text-stone-500 hover:text-[#0F6B62]"><Check size={18} strokeWidth={3} /></button>
            </div>
          ) : (
            <div className="flex items-center gap-2 cursor-pointer font-bold text-stone-800" onClick={() => setIsEditingTitle(true)}>
              {documentTitle} <Edit3 size={14} className="text-stone-400" />
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-stone-100 rounded-lg p-1 border border-stone-200">
            <button onClick={() => setZoom(Math.max(40, zoom - 10))} className="p-1.5 text-stone-500 hover:text-stone-900 rounded hover:bg-white transition"><ZoomOut size={16} /></button>
            <span className="text-xs font-bold w-12 text-center text-stone-800">{zoom}%</span> 
            <button onClick={() => setZoom(Math.min(150, zoom + 10))} className="p-1.5 text-stone-500 hover:text-stone-900 rounded hover:bg-white transition"><ZoomIn size={16} /></button>
          </div>
          <button onClick={() => setDownloadOpen(true)} className="flex items-center gap-2 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-md hover:opacity-90 transition bg-[#0F6B62] cursor-pointer">
            <Download size={16} /> Download
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT ICONS NAVBAR */}
        <aside className="w-[88px] bg-white border-r flex flex-col items-center py-6 gap-6 z-20 shadow-sm">
           <button onClick={() => setActiveMenu("templates")} className={`flex flex-col items-center gap-1.5 transition ${activeMenu === "templates" ? "text-[#0F6B62]" : "text-stone-500 hover:text-stone-800"}`}>
             <div className={`p-2.5 rounded-xl ${activeMenu === "templates" ? "bg-teal-50" : ""}`}><LayoutTemplate size={22} strokeWidth={activeMenu === "templates" ? 2.5 : 1.5} /></div>
             <span className="text-[10px] font-bold">Templates</span>
           </button>
           <button onClick={() => setActiveMenu("design")} className={`flex flex-col items-center gap-1.5 transition ${activeMenu === "design" ? "text-[#0F6B62]" : "text-stone-500 hover:text-stone-800"}`}>
             <div className={`p-2.5 rounded-xl ${activeMenu === "design" ? "bg-teal-50" : ""}`}><Palette size={22} strokeWidth={activeMenu === "design" ? 2.5 : 1.5} /></div>
             <span className="text-[10px] font-bold text-center leading-tight">Design &<br/>formatting</span>
           </button>
           <button onClick={() => setActiveMenu("sections")} className={`flex flex-col items-center gap-1.5 transition ${activeMenu === "sections" ? "text-[#0F6B62]" : "text-stone-500 hover:text-stone-800"}`}>
             <div className={`p-2.5 rounded-xl ${activeMenu === "sections" ? "bg-teal-50" : ""}`}><PlusSquare size={22} strokeWidth={activeMenu === "sections" ? 2.5 : 1.5} /></div>
             <span className="text-[10px] font-bold text-center leading-tight">Add<br/>section</span>
           </button>
           <button onClick={() => setActiveMenu("spell")} className={`flex flex-col items-center gap-1.5 transition ${activeMenu === "spell" ? "text-[#0F6B62]" : "text-stone-500 hover:text-stone-800"}`}>
             <div className={`p-2.5 rounded-xl ${activeMenu === "spell" ? "bg-teal-50" : ""}`}><SpellCheck size={22} strokeWidth={activeMenu === "spell" ? 2.5 : 1.5} /></div>
             <span className="text-[10px] font-bold text-center leading-tight">Spell<br/>check</span>
           </button>
        </aside>

        {/* SUB PANEL */}
        <div className="w-[360px] bg-white border-r flex flex-col shadow-lg z-10 overflow-hidden">
          
          <div className="flex justify-between items-center px-6 py-5 border-b">
            <h2 className="text-2xl font-serif font-bold text-[#0A2540]">
              {activeMenu === "templates" && "Templates"}
              {activeMenu === "design" && "Design & formatting"}
              {activeMenu === "sections" && "Add section"}
              {activeMenu === "spell" && "Spell check"}
            </h2>
          </div>

          <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
            
            {activeMenu === "templates" && (
              <div className="animate-in fade-in slide-in-from-left-4 duration-300">
                <div className="flex flex-wrap gap-2.5 mb-8 justify-center">
                  {ACCENTS.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setDesign({ ...design, color: c.hex })}
                      className="w-7 h-7 rounded-full transition cursor-pointer relative"
                      style={{ 
                        background: c.hex, 
                        border: c.id === 'white' ? '1px solid #ccc' : 'none',
                        boxShadow: design.color === c.hex ? `0 0 0 2px white, 0 0 0 3px ${c.hex === '#FFFFFF' ? '#ccc' : c.hex}` : "none" 
                      }}
                    >
                       {c.id === 'white' && <div className="absolute inset-0 w-full h-full rounded-full border-t border-red-500 transform rotate-45 pointer-events-none opacity-20"></div>}
                    </button>
                  ))}
                </div>
                
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-[#0A2540]">All templates (ATS)</h3>
                  <button onClick={() => setAdminModalOpen(true)} className="text-[11px] font-bold text-[#0F6B62] flex items-center gap-1 hover:underline cursor-pointer"><Plus size={12}/> Admin Add</button>
                </div>
                
                <TemplateSelector 
                  templateId={templateId} 
                  onSelect={setTemplateId} 
                  isPremiumUser={isPremiumUser || (typeof window !== "undefined" && localStorage.getItem("is_premium") === "true")} 
                  onPremiumClick={() => setPremiumModalOpen(true)}
                  resumeData={resumeData}
                  design={design}
                  sectionOrder={sectionOrder}
                  adminTemplates={adminTemplates}
                />
              </div>
            )}

            {activeMenu === "design" && (
              <div className="animate-in fade-in slide-in-from-left-4 duration-300">
                <div className="mb-8">
                  <h3 className="text-[15px] font-bold text-[#0A2540] mb-4">Section order</h3>
                  <div className="space-y-2.5">
                    {sectionOrder.map((section, index) => (
                      <div
                        key={section.id}
                        draggable
                        onDragStart={() => handleDragStart(index)}
                        onDragEnter={() => handleDragEnter(index)}
                        onDragEnd={handleDragEnd}
                        onDragOver={(e) => e.preventDefault()}
                        className="flex items-center gap-3 border border-stone-300 rounded-lg px-4 py-3 bg-white cursor-grab hover:shadow-md transition active:cursor-grabbing"
                      >
                        <GripVertical size={16} className="text-[#0A2540]" />
                        <span className="text-[14px] text-[#0A2540]">{section.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <hr className="border-stone-200 mb-6" />

                <div className="mb-6">
                  <h3 className="text-[15px] font-bold text-[#0A2540] mb-3">Font style</h3>
                  <div className="grid grid-cols-3 gap-3 mb-5">
                    {["SMALL", "NORMAL", "LARGE"].map((size) => (
                      <button
                        key={size}
                        onClick={() => setDesign({ ...design, fontSize: size })}
                        className="border rounded-xl flex flex-col items-center justify-center py-4 transition bg-white cursor-pointer"
                        style={{ borderColor: design.fontSize === size ? "#0F6B62" : "#D1D5DB", borderWidth: design.fontSize === size ? "2px" : "1px" }}
                      >
                        <span className="font-serif font-bold text-[#0A2540]" style={{ fontSize: size === "SMALL" ? "16px" : size === "LARGE" ? "24px" : "20px" }}>A</span>
                        <span className="text-[10px] font-bold text-stone-500 mt-1">{size}</span>
                      </button>
                    ))}
                  </div>
                  
                  <p className="text-[11px] font-bold text-stone-500 uppercase tracking-widest mb-1.5">FONT</p>
                  <select
                    value={design.fontFamily}
                    onChange={(e) => setDesign({ ...design, fontFamily: e.target.value })}
                    className="w-full border border-stone-300 rounded-lg p-2.5 text-[14px] text-stone-700 outline-none bg-white cursor-pointer"
                  >
                    {FONTS.map(f => <option key={f} value={f} style={{fontFamily: f}}>{f}</option>)}
                  </select>
                </div>

                <hr className="border-stone-200 mb-6" />

                <div className="space-y-6 mb-8">
                  <div>
                    <p className="text-[11px] font-bold text-stone-500 uppercase tracking-widest mb-2">SECTION SPACING</p>
                    <input type="range" min="10" max="40" value={design.sectionSpacing} onChange={(e) => setDesign({ ...design, sectionSpacing: Number(e.target.value) })} className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#0F6B62]" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-stone-500 uppercase tracking-widest mb-2">PARAGRAPH SPACING</p>
                    <input type="range" min="4" max="24" value={design.paragraphSpacing} onChange={(e) => setDesign({ ...design, paragraphSpacing: Number(e.target.value) })} className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#0F6B62]" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-stone-500 uppercase tracking-widest mb-2">LINE SPACING</p>
                    <input type="range" min="1.2" max="2.0" step="0.1" value={design.lineSpacing} onChange={(e) => setDesign({ ...design, lineSpacing: Number(e.target.value) })} className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#0F6B62]" />
                  </div>
                </div>

                <hr className="border-stone-200 mb-6" />
                <div className="mb-6">
                  <h3 className="text-[15px] font-bold text-[#0A2540] mb-3">Page Size</h3>
                  <div className="flex gap-2">
                    {["A4", "Letter"].map((f) => (
                      <button
                        key={f}
                        onClick={() => setDesign({ ...design, format: f })}
                        className="flex-1 py-2.5 rounded-lg border text-sm font-bold transition cursor-pointer"
                        style={{ 
                          borderColor: design.format === f ? "#0F6B62" : "#D1D5DB", 
                          color: design.format === f ? "#0F6B62" : "#6B7280", 
                          backgroundColor: design.format === f ? "#F0FDFA" : "white" 
                        }}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-center mt-6 pt-4 border-t border-stone-200">
                  <button 
                    onClick={() => setDesign({ color: "#0F6B62", fontSize: "NORMAL", fontFamily: "Inter", sectionSpacing: 20, paragraphSpacing: 10, lineSpacing: 1.5, format: "A4" })}
                    className="flex items-center gap-1.5 text-[13px] font-bold text-[#0070B8] hover:underline cursor-pointer"
                  >
                    <RefreshCcw size={14}/> Reset to default
                  </button>
                </div>
              </div>
            )}

            {activeMenu === "sections" && (
              <div className="animate-in fade-in slide-in-from-left-4 duration-300">
                <h3 className="text-[15px] font-bold text-[#0A2540] mb-4">Manage Sections</h3>
                <p className="text-xs text-stone-500 mb-6">Choose which sections you want to include in your resume.</p>
                <div className="space-y-3">
                  {ALL_SECTIONS_LIST.map(sec => {
                    const isActive = sectionOrder.some(s => s.id === sec.id);
                    return (
                      <button
                        key={sec.id}
                        onClick={() => toggleSection(sec.id, sec.label)}
                        className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition cursor-pointer ${isActive ? 'border-[#0F6B62] bg-teal-50' : 'border-stone-200 bg-white hover:border-stone-300'}`}
                      >
                        <div className="flex items-center gap-3">
                          <sec.icon size={18} className={isActive ? "text-[#0F6B62]" : "text-stone-400"} />
                          <span className={`text-sm font-bold ${isActive ? "text-[#0F6B62]" : "text-stone-600"}`}>{sec.label}</span>
                        </div>
                        {isActive ? (
                          <div className="w-5 h-5 rounded bg-[#0F6B62] flex items-center justify-center text-white"><Check size={14}/></div>
                        ) : (
                          <div className="w-5 h-5 rounded border-2 border-stone-300 flex items-center justify-center text-stone-400"><Plus size={14}/></div>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {activeMenu === "spell" && (
              <div className="text-center text-stone-500 mt-10">
                <SpellCheck size={40} className="mx-auto mb-4 opacity-50" />
                <p className="text-sm font-medium">ATS Check Passed: Perfect Structure!</p>
              </div>
            )}
            
          </div>
        </div>

        {/* LIVE PREVIEW CANVAS */}
        <main className="flex-1 overflow-y-auto p-8 flex flex-col items-center bg-[#E5E7EB]">
          <div 
            ref={printRef}
            className="shadow-xl transition-transform origin-top"
            style={{ transform: `scale(${zoom / 100})`, marginBottom: "100px" }}
          >
            <ResumeDocument data={resumeData} template={templateId} design={design} sectionOrder={sectionOrder} />
          </div>
        </main>

      </div>

      {/* DOWNLOAD MODAL */}
      {downloadOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden">
            <div className="px-6 py-5 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold text-[#0A2540] font-serif">Download resume as</h2>
              <button onClick={() => setDownloadOpen(false)} className="hover:bg-stone-100 p-1.5 rounded-full transition cursor-pointer"><X size={20}/></button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="radio" name="downloadFormat" checked={downloadFormat === "pdf"} onChange={() => setDownloadFormat("pdf")} className="w-5 h-5 text-[#0F6B62] accent-[#0F6B62] cursor-pointer" />
                  <span className="text-[15px] font-medium text-slate-800">Adobe PDF (.pdf)</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="radio" name="downloadFormat" checked={downloadFormat === "docx"} onChange={() => setDownloadFormat("docx")} className="w-5 h-5 text-[#0F6B62] accent-[#0F6B62] cursor-pointer" />
                  <span className="text-[15px] font-medium text-slate-800">MS Word Document (.docx)</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="radio" name="downloadFormat" checked={downloadFormat === "txt"} onChange={() => setDownloadFormat("txt")} className="w-5 h-5 text-[#0F6B62] accent-[#0F6B62] cursor-pointer" />
                  <span className="text-[15px] font-medium text-slate-800">Plain Text (.txt)</span>
                </label>
              </div>

              <div className="space-y-1.5 pt-2">
                <label className="block text-[11px] font-bold tracking-wider text-slate-700 uppercase">RESUME NAME</label>
                <input
                  type="text"
                  value={documentTitle}
                  onChange={(e) => setDocumentTitle(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-md px-3.5 py-3 text-sm font-medium text-slate-800 focus:ring-2 focus:ring-[#0F6B62] outline-none transition"
                />
              </div>
            </div>
            
            <div className="px-6 py-5 border-t border-slate-200 bg-white flex items-center justify-between">
              <button onClick={() => setDownloadOpen(false)} className="text-[15px] font-bold text-[#0A2540] underline hover:text-[#0F6B62] transition cursor-pointer">Cancel</button>
              <button onClick={handleConfirmDownload} disabled={isDownloading} className="px-8 py-3 rounded-full bg-[#0F6B62] text-white font-bold text-[15px] transition shadow-md cursor-pointer flex gap-2 hover:bg-teal-800">
                {isDownloading ? <><Loader2 size={20} className="animate-spin"/> Saving...</> : "Download"}
              </button>
            </div>
          </div>
        </div>
      )}

      <ProModal isOpen={premiumModalOpen} onClose={() => setPremiumModalOpen(false)} />
    </div>
  );
}