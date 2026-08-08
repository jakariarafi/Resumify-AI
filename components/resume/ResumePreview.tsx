"use client";

import { templatesConfig } from "./templates/templateConfig";

interface ResumePreviewProps {
  personalInfo: {
    fullName?: string;
    firstName?: string;
    lastName?: string;
    profession?: string;
    email: string;
    phone: string;
    address?: string;
    location?: string;
    website?: string;
    linkedin?: string;
    github?: string;
    summary: string;
    photo?: string;
  };
  education: any[];
  experience: any[];
  skills: any[];
  projects: any[];
  certificates: any[];
  languages: any[];
  references: any[];
  template?: string;
  primaryFont?: string;
  secondaryFont?: string;
  accentColor?: string;
  layoutSettings?: any;
  textSettings?: any;
  pageNumber?: number; // মাল্টি-পেজ ট্র্যাকিংয়ের জন্য
}

export default function ResumePreview({
  personalInfo,
  education,
  experience,
  skills,
  projects,
  certificates,
  languages,
  references,
  template = "balanced",
  primaryFont = "Inter",
  secondaryFont = "Inter",
  accentColor = "indigo",
  layoutSettings = {
    topBottom: 0.50,
    leftRight: 0.50,
    headerAlignment: "left",
    dateAlignment: "right",
    locationAlignment: "left",
    showEducationBy: "institution",
    educationLayout: "stacked",
    betweenSections: 16,
    betweenTitles: 6,
    betweenBlocks: 6,
  },
  textSettings = {
    lineHeight: 120,
    primaryHeadingSize: 24,
    secondaryHeadingSize: 16,
    bodySize: 11,
    sectionTitleSize: 12,
    primaryHeadingWeight: "bold",
    secondaryHeadingWeight: "bold",
    bodyWeight: "normal",
    sectionTitleWeight: "600",
  },
  pageNumber = 1
}: ResumePreviewProps) {
  
  const currentConfig = templatesConfig.find((t) => t.id === template) || templatesConfig[0];
  const layoutType = currentConfig?.layoutType || "classic-centered";

  const getColorClasses = () => {
    switch (accentColor) {
      case "emerald": return { text: "text-emerald-600", border: "border-emerald-600" };
      case "rose": return { text: "text-rose-600", border: "border-rose-600" };
      case "amber": return { text: "text-amber-600", border: "border-amber-600" };
      case "cyan": return { text: "text-cyan-600", border: "border-cyan-600" };
      case "violet": return { text: "text-violet-600", border: "border-violet-600" };
      default: return { text: "text-indigo-600", border: "border-indigo-600" };
    }
  };

  const colors = getColorClasses();
  const displayName = personalInfo?.fullName || `${personalInfo?.firstName || ""} ${personalInfo?.lastName || ""}`.trim() || "Your Name";

  const alignment = layoutSettings.headerAlignment || "left";
  const contactJustifyClass = 
    alignment === "center" ? "justify-center" :
    alignment === "right" ? "justify-end" : "justify-start";

  const dateAlignClass = layoutSettings.dateAlignment === "left" ? "order-first" : "order-last";

  return (
    <div 
      className="w-full bg-white text-slate-800 box-border"
      style={{ 
        fontFamily: `'${secondaryFont}', sans-serif`,
        minHeight: "297mm", // ফিক্সড হাইটের বদলে minHeight ব্যবহার করা হয়েছে যাতে লেখা বাড়লে পেজ অটো বড় হয় বা প্রিন্টের সময় ঠিক থাকে
        paddingTop: `${layoutSettings.topBottom}in`,
        paddingBottom: `${layoutSettings.topBottom}in`,
        paddingLeft: `${layoutSettings.leftRight}in`,
        paddingRight: `${layoutSettings.leftRight}in`,
        lineHeight: `${textSettings.lineHeight}%`
      }}
    >
      
      {layoutType === "two-column" ? (
        <div className="grid grid-cols-3 gap-6">
          {/* বাম কলাম */}
          <div className="col-span-1 bg-slate-50 p-3 rounded-xl border-r border-slate-200 space-y-4">
            {pageNumber === 1 && personalInfo?.photo && (
              <div className={`w-16 h-16 rounded-xl overflow-hidden border-2 ${colors.border} shrink-0 shadow-sm mx-auto`}>
                <img src={personalInfo.photo} alt="Profile" className="w-full h-full object-cover" />
              </div>
            )}
            {pageNumber === 1 && (
              <>
                <h1 className="text-slate-900 tracking-tight font-bold" style={{ fontFamily: `'${primaryFont}', sans-serif`, fontSize: `${textSettings.primaryHeadingSize * 0.8}pt` }}>
                  {displayName}
                </h1>
                <p className={`uppercase tracking-widest ${colors.text} font-semibold`} style={{ fontSize: `${textSettings.secondaryHeadingSize * 0.8}pt` }}>
                  {personalInfo?.profession || "Profession"}
                </p>
                <div className="text-[10px] space-y-1 text-slate-600">
                  {personalInfo?.email && <p>{personalInfo.email}</p>}
                  {personalInfo?.phone && <p>{personalInfo.phone}</p>}
                  {personalInfo?.location && <p>{personalInfo.location}</p>}
                </div>
              </>
            )}

            {skills && skills.length > 0 && (
              <div>
                <h3 className={`uppercase tracking-wider border-b pb-1 font-bold ${colors.text} ${colors.border}`} style={{ fontSize: `${textSettings.sectionTitleSize * 0.9}pt` }}>Skills</h3>
                <div className="flex flex-wrap gap-1 mt-2">
                  {skills.map((s: any, i: number) => (
                    <span key={i} className="bg-white px-2 py-0.5 text-[9px] border rounded font-medium text-slate-700">
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ডান কলাম */}
          <div className="col-span-2 space-y-4">
            {pageNumber === 1 && personalInfo?.summary && (
              <section>
                <h2 className={`uppercase tracking-wider border-b pb-1 font-bold ${colors.text} ${colors.border}`} style={{ fontSize: `${textSettings.sectionTitleSize}pt` }}>Summary</h2>
                <p className="text-slate-700 leading-relaxed mt-1" style={{ fontSize: `${textSettings.bodySize}pt` }}>{personalInfo.summary}</p>
              </section>
            )}

            {experience && experience.length > 0 && (
              <section>
                <h2 className={`uppercase tracking-wider border-b pb-1 font-bold ${colors.text} ${colors.border}`} style={{ fontSize: `${textSettings.sectionTitleSize}pt` }}>Experience</h2>
                <div className="space-y-3 mt-2">
                  {experience.map((exp: any, i: number) => (
                    <div key={i}>
                      <div className="flex justify-between items-baseline font-bold text-slate-900" style={{ fontSize: `${textSettings.secondaryHeadingSize * 0.9}pt` }}>
                        <span>{exp.jobTitle || exp.position} {exp.company ? <span className="font-normal text-slate-600">at {exp.company}</span> : ""}</span>
                        <span className="text-[10px] text-slate-500">{exp.startDate} - {exp.currentlyWorking ? "Present" : exp.endDate}</span>
                      </div>
                      <p className="text-slate-700 mt-0.5 leading-relaxed" style={{ fontSize: `${textSettings.bodySize}pt` }}>{exp.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      ) : (
        /* স্ট্যান্ডার্ড লেআউট */
        <>
          {/* Header Section (শুধুমাত্র Page 1 এ দেখাবে) */}
          {pageNumber === 1 && (
            <div 
              className={`pb-6 border-b-2 flex ${
                alignment === "center" ? "flex-col items-center text-center" : 
                alignment === "right" ? "flex-row-reverse justify-between text-right items-center" : 
                "flex-row justify-between text-left items-center"
              } gap-4 ${colors.border}`}
              style={{ marginBottom: `${layoutSettings.betweenSections}pt` }}
            >
              <div className={`space-y-1 w-full flex flex-col ${
                alignment === "center" ? "items-center text-center" : 
                alignment === "right" ? "items-end text-right" : "items-start text-left"
              }`}>
                <h1 
                  className="text-slate-900 tracking-tight"
                  style={{ 
                    fontFamily: `'${primaryFont}', sans-serif`,
                    fontSize: `${textSettings.primaryHeadingSize}pt`,
                    fontWeight: textSettings.primaryHeadingWeight
                  }}
                >
                  {displayName}
                </h1>
                <p 
                  className={`uppercase tracking-widest ${colors.text}`}
                  style={{ 
                    fontFamily: `'${secondaryFont}', sans-serif`,
                    fontSize: `${textSettings.secondaryHeadingSize}pt`,
                    fontWeight: textSettings.secondaryHeadingWeight
                  }}
                >
                  {personalInfo?.profession || "Profession / Job Title"}
                </p>
                
                <div 
                  className={`flex flex-wrap gap-x-3 gap-y-1 text-slate-600 pt-1 font-medium w-full ${contactJustifyClass}`}
                  style={{ fontSize: `${textSettings.bodySize}pt` }}
                >
                  {personalInfo?.email && <span>{personalInfo.email}</span>}
                  {personalInfo?.phone && <span>• {personalInfo.phone}</span>}
                  {(personalInfo?.location || personalInfo?.address) && (
                    <span>• {personalInfo.location || personalInfo.address}</span>
                  )}
                  {personalInfo?.website && <span>• {personalInfo.website}</span>}
                  {personalInfo?.linkedin && <span>• {personalInfo.linkedin}</span>}
                  {personalInfo?.github && <span>• {personalInfo.github}</span>}
                </div>
              </div>

              {personalInfo?.photo && (
                <div className={`w-20 h-20 rounded-2xl overflow-hidden border-2 ${colors.border} shrink-0 shadow-sm`}>
                  <img src={personalInfo.photo} alt="Profile" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          )}

          {/* Summary (Page 1) */}
          {pageNumber === 1 && personalInfo?.summary && (
            <section style={{ marginBottom: `${layoutSettings.betweenSections}pt` }}>
              <h2 
                className={`uppercase tracking-wider border-b pb-1 ${colors.text} ${colors.border}`}
                style={{ 
                  fontFamily: `'${primaryFont}', sans-serif`,
                  fontSize: `${textSettings.sectionTitleSize}pt`,
                  fontWeight: textSettings.sectionTitleWeight,
                  marginBottom: `${layoutSettings.betweenTitles}pt`
                }}
              >
                Professional Summary
              </h2>
              <p className="text-slate-700 leading-relaxed text-justify" style={{ fontSize: `${textSettings.bodySize}pt`, fontWeight: textSettings.bodyWeight }}>
                {personalInfo.summary}
              </p>
            </section>
          )}

          {/* Experience */}
          {experience && experience.length > 0 && (
            <section style={{ marginBottom: `${layoutSettings.betweenSections}pt` }}>
              <h2 
                className={`uppercase tracking-wider border-b pb-1 ${colors.text} ${colors.border}`}
                style={{ 
                  fontFamily: `'${primaryFont}', sans-serif`,
                  fontSize: `${textSettings.sectionTitleSize}pt`,
                  fontWeight: textSettings.sectionTitleWeight,
                  marginBottom: `${layoutSettings.betweenTitles}pt`
                }}
              >
                Work Experience
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: `${layoutSettings.betweenBlocks}pt` }}>
                {experience.map((exp: any, i: number) => (
                  <div key={i}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-slate-900" style={{ fontSize: `${textSettings.secondaryHeadingSize}pt`, fontWeight: textSettings.secondaryHeadingWeight }}>
                        {exp.jobTitle || exp.position} {exp.company ? <span className="font-normal text-slate-600">at {exp.company}</span> : ""}
                      </h3>
                      <span className={`text-slate-500 ${dateAlignClass}`} style={{ fontSize: `${textSettings.bodySize - 1}pt` }}>
                        {exp.startDate} - {exp.currentlyWorking ? "Present" : exp.endDate}
                      </span>
                    </div>
                    {exp.location && <p className="text-slate-500 italic" style={{ fontSize: `${textSettings.bodySize - 1}pt` }}>{exp.location}</p>}
                    {exp.description && (
                      <p className="text-slate-700 mt-1 leading-relaxed whitespace-pre-line" style={{ fontSize: `${textSettings.bodySize}pt`, fontWeight: textSettings.bodyWeight }}>
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education && education.length > 0 && (
            <section style={{ marginBottom: `${layoutSettings.betweenSections}pt` }}>
              <h2 
                className={`uppercase tracking-wider border-b pb-1 ${colors.text} ${colors.border}`}
                style={{ 
                  fontFamily: `'${primaryFont}', sans-serif`,
                  fontSize: `${textSettings.sectionTitleSize}pt`,
                  fontWeight: textSettings.sectionTitleWeight,
                  marginBottom: `${layoutSettings.betweenTitles}pt`
                }}
              >
                Education
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: `${layoutSettings.betweenBlocks}pt` }}>
                {education.map((edu: any, i: number) => {
                  const primaryTitle = layoutSettings.showEducationBy === "degree" ? edu.degree : edu.institution;
                  const secondaryTitle = layoutSettings.showEducationBy === "degree" ? edu.institution : edu.degree;

                  return (
                    <div key={i}>
                      <div className="flex justify-between items-baseline">
                        <h3 className="text-slate-900" style={{ fontSize: `${textSettings.secondaryHeadingSize}pt`, fontWeight: textSettings.secondaryHeadingWeight }}>
                          {primaryTitle}
                        </h3>
                        <span className={`text-slate-500 ${dateAlignClass}`} style={{ fontSize: `${textSettings.bodySize - 1}pt` }}>
                          {edu.startDate} - {edu.endDate}
                        </span>
                      </div>
                      {secondaryTitle && <p className="text-slate-600 font-medium" style={{ fontSize: `${textSettings.bodySize}pt` }}>{secondaryTitle}</p>}
                      <div className="flex gap-3 text-slate-500 mt-0.5" style={{ fontSize: `${textSettings.bodySize - 1}pt` }}>
                        {edu.location && <span>{edu.location}</span>}
                        {edu.cgpa && <span>• CGPA/GPA: {edu.cgpa}</span>}
                      </div>
                      {edu.description && (
                        <p className="text-slate-700 mt-1 leading-relaxed" style={{ fontSize: `${textSettings.bodySize}pt`, fontWeight: textSettings.bodyWeight }}>
                          {edu.description}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects && projects.length > 0 && (
            <section style={{ marginBottom: `${layoutSettings.betweenSections}pt` }}>
              <h2 
                className={`uppercase tracking-wider border-b pb-1 ${colors.text} ${colors.border}`}
                style={{ 
                  fontFamily: `'${primaryFont}', sans-serif`,
                  fontSize: `${textSettings.sectionTitleSize}pt`,
                  fontWeight: textSettings.sectionTitleWeight,
                  marginBottom: `${layoutSettings.betweenTitles}pt`
                }}
              >
                Projects
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: `${layoutSettings.betweenBlocks}pt` }}>
                {projects.map((proj: any, i: number) => (
                  <div key={i}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-slate-900" style={{ fontSize: `${textSettings.secondaryHeadingSize}pt`, fontWeight: textSettings.secondaryHeadingWeight }}>
                        {proj.title} {proj.role ? <span className="font-normal text-slate-600">({proj.role})</span> : ""}
                      </h3>
                      <span className={`text-slate-500 ${dateAlignClass}`} style={{ fontSize: `${textSettings.bodySize - 1}pt` }}>
                        {proj.startDate} - {proj.endDate}
                      </span>
                    </div>
                    {proj.technologies && (
                      <p className={`font-semibold ${colors.text}`} style={{ fontSize: `${textSettings.bodySize - 1}pt` }}>
                        Technologies: {proj.technologies}
                      </p>
                    )}
                    {proj.description && (
                      <p className="text-slate-700 mt-1 leading-relaxed" style={{ fontSize: `${textSettings.bodySize}pt`, fontWeight: textSettings.bodyWeight }}>
                        {proj.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {skills && skills.length > 0 && (
            <section style={{ marginBottom: `${layoutSettings.betweenSections}pt` }}>
              <h2 
                className={`uppercase tracking-wider border-b pb-1 ${colors.text} ${colors.border}`}
                style={{ 
                  fontFamily: `'${primaryFont}', sans-serif`,
                  fontSize: `${textSettings.sectionTitleSize}pt`,
                  fontWeight: textSettings.sectionTitleWeight,
                  marginBottom: `${layoutSettings.betweenTitles}pt`
                }}
              >
                Skills
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((s: any, i: number) => (
                  <span key={i} className="font-semibold bg-slate-100 text-slate-800 px-2.5 py-1 rounded-md border border-slate-200" style={{ fontSize: `${textSettings.bodySize - 1}pt` }}>
                    {s.name} {s.level ? `(${s.level})` : ""}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Certificates */}
          {certificates && certificates.length > 0 && (
            <section style={{ marginBottom: `${layoutSettings.betweenSections}pt` }}>
              <h2 
                className={`uppercase tracking-wider border-b pb-1 ${colors.text} ${colors.border}`}
                style={{ 
                  fontFamily: `'${primaryFont}', sans-serif`,
                  fontSize: `${textSettings.sectionTitleSize}pt`,
                  fontWeight: textSettings.sectionTitleWeight,
                  marginBottom: `${layoutSettings.betweenTitles}pt`
                }}
              >
                Certificates
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: `${layoutSettings.betweenBlocks}pt` }}>
                {certificates.map((cert: any, i: number) => (
                  <div key={i} className="flex justify-between items-baseline">
                    <div>
                      <h3 className="text-slate-900" style={{ fontSize: `${textSettings.secondaryHeadingSize}pt`, fontWeight: textSettings.secondaryHeadingWeight }}>{cert.title}</h3>
                      <p className="text-slate-600" style={{ fontSize: `${textSettings.bodySize - 1}pt` }}>{cert.issuer}</p>
                    </div>
                    <span className={`text-slate-500 ${dateAlignClass}`} style={{ fontSize: `${textSettings.bodySize - 1}pt` }}>{cert.issueDate}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {languages && languages.length > 0 && (
            <section style={{ marginBottom: `${layoutSettings.betweenSections}pt` }}>
              <h2 
                className={`uppercase tracking-wider border-b pb-1 ${colors.text} ${colors.border}`}
                style={{ 
                  fontFamily: `'${primaryFont}', sans-serif`,
                  fontSize: `${textSettings.sectionTitleSize}pt`,
                  fontWeight: textSettings.sectionTitleWeight,
                  marginBottom: `${layoutSettings.betweenTitles}pt`
                }}
              >
                Languages
              </h2>
              <div className="flex flex-wrap gap-4">
                {languages.map((lang: any, i: number) => (
                  <span key={i} className="text-slate-700 font-medium" style={{ fontSize: `${textSettings.bodySize}pt` }}>
                    <strong className="text-slate-900">{lang.name}</strong> ({lang.proficiency})
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* References */}
          {references && references.length > 0 && (
            <section style={{ marginBottom: `${layoutSettings.betweenSections}pt` }}>
              <h2 
                className={`uppercase tracking-wider border-b pb-1 ${colors.text} ${colors.border}`}
                style={{ 
                  fontFamily: `'${primaryFont}', sans-serif`,
                  fontSize: `${textSettings.sectionTitleSize}pt`,
                  fontWeight: textSettings.sectionTitleWeight,
                  marginBottom: `${layoutSettings.betweenTitles}pt`
                }}
              >
                References
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {references.map((ref: any, i: number) => (
                  <div key={i} style={{ fontSize: `${textSettings.bodySize}pt` }}>
                    <p className="font-bold text-slate-900">{ref.name}</p>
                    <p className="text-slate-600">{ref.position} at {ref.company}</p>
                    <p className={`font-medium ${colors.text}`} style={{ fontSize: `${textSettings.bodySize - 1}pt` }}>{ref.email} | {ref.phone}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </>
      )}

    </div>
  );
}