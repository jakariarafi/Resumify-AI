"use client";

export default function MasterTemplate({ data, config, textSettings, colors, layoutSettings, primaryFont, dateAlignClass }: any) {
  const { personalInfo, education, experience, skills, projects, certificates, languages, references } = data;
  const templateId = config?.id; // টেমপ্লেটের আইডি (balanced, header-ats, essential, polished, vivid, calligraphic, harmonized, defined)
  const displayName = personalInfo?.fullName || `${personalInfo?.firstName || ""} ${personalInfo?.lastName || ""}`.trim() || "Your Name";

  // -------------------------------------------------------------------------
  // ১. BALANCED (Two Column Layout)
  // -------------------------------------------------------------------------
  if (templateId === "balanced") {
    return (
      <div className="grid grid-cols-3 gap-6 h-full text-slate-800">
        <div className="col-span-1 bg-slate-100 p-4 border-r border-slate-300 space-y-4">
          <h1 className="font-bold text-slate-900 text-lg">{displayName}</h1>
          <p className={`font-semibold uppercase tracking-wider ${colors.text} text-xs`}>{personalInfo?.profession}</p>
          <div className="text-[10px] space-y-1 text-slate-600">
            {personalInfo?.email && <p>{personalInfo.email}</p>}
            {personalInfo?.phone && <p>{personalInfo.phone}</p>}
            {personalInfo?.location && <p>{personalInfo.location}</p>}
          </div>
          {skills && skills.length > 0 && (
            <div>
              <h3 className="font-bold text-xs uppercase mb-2 text-slate-900">Skills</h3>
              <div className="flex flex-wrap gap-1">
                {skills.map((s: any, i: number) => (
                  <span key={i} className="bg-white px-1.5 py-0.5 text-[9px] border rounded text-slate-700">{s.name}</span>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="col-span-2 space-y-4">
          {personalInfo?.summary && (
            <div>
              <h3 className={`font-bold uppercase text-xs border-b pb-1 ${colors.text} ${colors.border}`}>Summary</h3>
              <p className="text-[11px] mt-1 text-slate-700 leading-relaxed">{personalInfo.summary}</p>
            </div>
          )}
          {experience && experience.length > 0 && (
            <div>
              <h3 className={`font-bold uppercase text-xs border-b pb-1 ${colors.text} ${colors.border}`}>Experience</h3>
              {experience.map((exp: any, i: number) => (
                <div key={i} className="mt-2">
                  <p className="font-bold text-xs">{exp.jobTitle || exp.position} - {exp.company}</p>
                  <p className="text-[10px] text-slate-500">{exp.startDate} - {exp.endDate}</p>
                  <p className="text-[11px] text-slate-700 mt-0.5">{exp.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // ২. HEADER ATS (Green Accent Top Header Layout)
  // -------------------------------------------------------------------------
  if (templateId === "header-ats") {
    return (
      <div className="w-full h-full space-y-4 text-slate-800">
        <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-lg text-center space-y-1">
          <h1 className="text-2xl font-black text-emerald-900">{displayName}</h1>
          <p className="text-xs font-bold text-emerald-700 uppercase tracking-widest">{personalInfo?.profession}</p>
          <p className="text-[10px] text-emerald-800">{personalInfo?.email} | {personalInfo?.phone} | {personalInfo?.location}</p>
        </div>
        {personalInfo?.summary && (
          <div>
            <h3 className="font-bold text-xs text-emerald-800 border-b border-emerald-200 pb-1 uppercase">Objective</h3>
            <p className="text-[11px] mt-1 text-slate-700">{personalInfo.summary}</p>
          </div>
        )}
        {experience && experience.length > 0 && (
          <div>
            <h3 className="font-bold text-xs text-emerald-800 border-b border-emerald-200 pb-1 uppercase">Work History</h3>
            {experience.map((exp: any, i: number) => (
              <div key={i} className="mt-2">
                <p className="font-bold text-xs text-slate-900">{exp.jobTitle} at {exp.company} <span className="text-[10px] text-slate-500 float-right">{exp.startDate} - {exp.endDate}</span></p>
                <p className="text-[11px] text-slate-700">{exp.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // ৩. ESSENTIAL (Minimalist Clean Layout)
  // -------------------------------------------------------------------------
  if (templateId === "essential") {
    return (
      <div className="w-full h-full space-y-4 text-slate-900 font-sans">
        <div className="border-b-2 border-slate-900 pb-3 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-light tracking-wide">{displayName}</h1>
            <p className="text-xs text-slate-600 uppercase tracking-widest mt-0.5">{personalInfo?.profession}</p>
          </div>
          <div className="text-right text-[10px] text-slate-600">
            <p>{personalInfo?.email}</p>
            <p>{personalInfo?.phone}</p>
          </div>
        </div>
        {personalInfo?.summary && (
          <p className="text-xs text-slate-700 leading-relaxed italic">{personalInfo.summary}</p>
        )}
        {experience && experience.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b pb-0.5">Experience</h3>
            {experience.map((exp: any, i: number) => (
              <div key={i}>
                <div className="flex justify-between font-bold text-xs">
                  <span>{exp.jobTitle} ({exp.company})</span>
                  <span className="text-[10px] text-slate-500">{exp.startDate} - {exp.endDate}</span>
                </div>
                <p className="text-[11px] text-slate-700">{exp.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // ৪. POLISHED (Photo + Modern Sidebar/Top Mix)
  // -------------------------------------------------------------------------
  if (templateId === "polished") {
    return (
      <div className="w-full h-full flex gap-4 text-slate-800">
        <div className="w-1/3 bg-slate-900 text-white p-4 rounded-l-xl space-y-4">
          {personalInfo?.photo && (
            <div className="w-20 h-20 rounded-full overflow-hidden mx-auto border-2 border-white">
              <img src={personalInfo.photo} alt="Profile" className="w-full h-full object-cover" />
            </div>
          )}
          <h2 className="text-sm font-bold text-center text-amber-400">CONTACT</h2>
          <div className="text-[10px] space-y-1 text-slate-300">
            <p>{personalInfo?.email}</p>
            <p>{personalInfo?.phone}</p>
            <p>{personalInfo?.location}</p>
          </div>
        </div>
        <div className="w-2/3 space-y-4 p-2">
          <h1 className="text-2xl font-bold text-slate-900">{displayName}</h1>
          <p className="text-xs font-semibold text-rose-600 uppercase">{personalInfo?.profession}</p>
          {personalInfo?.summary && <p className="text-[11px] text-slate-700">{personalInfo.summary}</p>}
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // ৫. VIVID (Creative & Bold Style)
  // -------------------------------------------------------------------------
  if (templateId === "vivid") {
    return (
      <div className="w-full h-full bg-white text-slate-900 space-y-4 border-t-8 border-amber-500 pt-2">
        <div className="flex items-center gap-4">
          {personalInfo?.photo && (
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-amber-500">
              <img src={personalInfo.photo} alt="" className="w-full h-full object-cover" />
            </div>
          )}
          <div>
            <h1 className="text-2xl font-black text-amber-600">{displayName}</h1>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-700">{personalInfo?.profession}</p>
          </div>
        </div>
        {personalInfo?.summary && (
          <div className="bg-amber-50 p-3 rounded-md border-l-4 border-amber-500">
            <p className="text-[11px] text-slate-700">{personalInfo.summary}</p>
          </div>
        )}
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // ৬. CALLIGRAPHIC (Classic Elegant Serif Style)
  // -------------------------------------------------------------------------
  if (templateId === "calligraphic") {
    return (
      <div className="w-full h-full bg-white text-slate-900 font-serif space-y-4 p-4 text-center">
        <h1 className="text-3xl font-bold tracking-widest uppercase">{displayName}</h1>
        <p className="text-xs italic text-slate-600">{personalInfo?.profession}</p>
        <div className="text-[10px] text-slate-500 border-y py-1">
          {personalInfo?.email} • {personalInfo?.phone} • {personalInfo?.location}
        </div>
        {personalInfo?.summary && (
          <p className="text-xs text-slate-700 italic max-w-md mx-auto">{personalInfo.summary}</p>
        )}
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // ৭. HARMONIZED (Modern Corporate Layout)
  // -------------------------------------------------------------------------
  if (templateId === "harmonized") {
    return (
      <div className="w-full h-full space-y-4 text-slate-800 bg-slate-50 p-4 rounded-xl border border-slate-200">
        <div className="flex justify-between items-center border-b pb-3">
          <div>
            <h1 className="text-xl font-extrabold text-cyan-800">{displayName}</h1>
            <p className="text-xs font-semibold text-slate-600">{personalInfo?.profession}</p>
          </div>
          <div className="text-right text-[10px] text-cyan-700">
            <p>{personalInfo?.email}</p>
            <p>{personalInfo?.phone}</p>
          </div>
        </div>
        {personalInfo?.summary && (
          <div>
            <h4 className="text-xs font-bold text-cyan-800 uppercase">Profile</h4>
            <p className="text-[11px] text-slate-700 mt-0.5">{personalInfo.summary}</p>
          </div>
        )}
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // ৮. DEFINED (Structured Professional Box Layout)
  // -------------------------------------------------------------------------
  if (templateId === "defined") {
    return (
      <div className="w-full h-full space-y-4 border-2 border-slate-900 p-4 bg-white">
        <div className="text-center bg-slate-900 text-white py-3 -mx-4 -mt-4 mb-4">
          <h1 className="text-xl font-bold">{displayName}</h1>
          <p className="text-[10px] uppercase tracking-widest text-slate-300">{personalInfo?.profession}</p>
        </div>
        {personalInfo?.summary && (
          <div>
            <h3 className="font-bold text-xs uppercase text-slate-900 bg-slate-200 px-2 py-0.5">Summary</h3>
            <p className="text-[11px] mt-1 text-slate-700 px-2">{personalInfo.summary}</p>
          </div>
        )}
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // ডিফল্ট ফলব্যাক ডিজাইন (যদি নতুন কোনো টেমপ্লেট যোগ করা হয় এবং তার আলাদা ডিজাইন না থাকে)
  // -------------------------------------------------------------------------
  return (
    <div className="w-full h-full text-slate-800 space-y-4 p-4">
      <h1 className="font-bold text-xl text-slate-900">{displayName}</h1>
      <p className="text-xs text-indigo-600 font-semibold">{personalInfo?.profession}</p>
      {personalInfo?.summary && <p className="text-xs text-slate-700">{personalInfo.summary}</p>}
    </div>
  );
}