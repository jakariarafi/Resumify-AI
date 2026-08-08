// components/resume/ResumeDocument.tsx
import React from "react";

export default function ResumeDocument({ data, template, design, sectionOrder, forwardedRef }: any) {
  const { info, experience, education, skills, projects, certificates, languages, references } = data;
  
  const baseSize = design.fontSize === "SMALL" ? "10px" : design.fontSize === "LARGE" ? "12px" : "11px";
  const headerSize = design.fontSize === "SMALL" ? "22px" : design.fontSize === "LARGE" ? "28px" : "25px";
  const sectionTitleSize = design.fontSize === "SMALL" ? "11px" : design.fontSize === "LARGE" ? "14px" : "12.5px";
  
  const lineSpacing = design.lineSpacing;
  const paragraphSpacing = `${design.paragraphSpacing}px`;
  const sectionGap = `${design.sectionSpacing}px`;
  
  const accent = design.color === "#FFFFFF" ? "#111827" : design.color; 
  const bgAccent = design.color;
  const font = design.fontFamily;

  const pageWidth = design.format === "A4" ? "210mm" : "8.5in";
  const pageMinHeight = design.format === "A4" ? "297mm" : "11in";

  const baseStyle = {
    width: pageWidth,
    minHeight: pageMinHeight,
    background: "#ffffff",
    color: "#222222",
    fontFamily: `${font}, sans-serif`,
    fontSize: baseSize,
    lineHeight: lineSpacing,
    boxSizing: "border-box",
  };

  const SectionTitle = ({ children, hideLine = false }: any) => (
    <div style={{
      fontSize: sectionTitleSize, fontWeight: 700, letterSpacing: "0.08em",
      textTransform: "uppercase", color: accent, marginBottom: "8px",
      borderBottom: hideLine ? "none" : `1.5px solid ${accent}`, paddingBottom: hideLine ? "0" : "4px",
    }}>
      {children}
    </div>
  );

  const fullName = [info.firstName, info.lastName].filter(Boolean).join(" ") || "Your Name";
  const locationLine = [info.city, info.country].filter(Boolean).join(", ");
  const dateRange = (s: string, e: string, c?: boolean) => [s, c ? "Present" : e].filter(Boolean).join(" — ");

  const renderContent = (id: string) => {
    switch (id) {
      case "summary":
        if (!info.summary) return null;
        return (
          <div key={id} style={{ marginBottom: sectionGap }}>
            <SectionTitle>Summary</SectionTitle>
            <p style={{ margin: 0 }}>{info.summary}</p>
          </div>
        );
      case "experience":
        if (!experience?.length) return null;
        return (
          <div key={id} style={{ marginBottom: sectionGap }}>
            <SectionTitle>Experience</SectionTitle>
            {experience.map((e: any, i: number) => (
              <div key={e.id || i} style={{ marginBottom: paragraphSpacing }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: "1.05em" }}>
                  <span>{e.jobTitle}</span>
                  <span style={{ fontWeight: 600, fontSize: "0.9em", color: "#666" }}>{dateRange(e.startDate, e.endDate, e.current)}</span>
                </div>
                <div style={{ fontWeight: 600, color: accent, marginBottom: "4px" }}>{[e.company, e.location].filter(Boolean).join(" · ")}</div>
                {e.description && <p style={{ margin: 0 }}>{e.description}</p>}
              </div>
            ))}
          </div>
        );
      case "education":
        if (!education?.length) return null;
        return (
          <div key={id} style={{ marginBottom: sectionGap }}>
            <SectionTitle>Education</SectionTitle>
            {education.map((ed: any, i: number) => (
              <div key={ed.id || i} style={{ marginBottom: paragraphSpacing }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: "1.05em" }}>
                  <span>{ed.degree}</span>
                  <span style={{ fontWeight: 600, fontSize: "0.9em", color: "#666" }}>{dateRange(ed.startDate, ed.endDate)}</span>
                </div>
                <div style={{ fontWeight: 600, color: "#555" }}>{[ed.institution, ed.location].filter(Boolean).join(" · ")}{ed.grade ? ` · ${ed.grade}` : ""}</div>
              </div>
            ))}
          </div>
        );
      case "skills":
        if (!skills?.length) return null;
        return (
          <div key={id} style={{ marginBottom: sectionGap }}>
            <SectionTitle>Skills</SectionTitle>
            <div style={{ fontWeight: 500 }}>{skills.map((s: any) => s.name).join(" · ")}</div>
          </div>
        );
      case "projects":
        if (!projects?.length) return null;
        return (
          <div key={id} style={{ marginBottom: sectionGap }}>
            <SectionTitle>Projects</SectionTitle>
            {projects.map((p: any, i: number) => (
              <div key={p.id || i} style={{ marginBottom: paragraphSpacing }}>
                <div style={{ fontWeight: 700, fontSize: "1.05em" }}>{p.name} {p.link && <span style={{ fontWeight: 500, fontSize: "0.85em", color: accent }}>— {p.link}</span>}</div>
                {p.description && <p style={{ margin: 0 }}>{p.description}</p>}
              </div>
            ))}
          </div>
        );
      case "certificates":
        if (!certificates?.length) return null;
        return (
          <div key={id} style={{ marginBottom: sectionGap }}>
            <SectionTitle>Certifications</SectionTitle>
            {certificates.map((cert: any, i: number) => (
              <div key={cert.id || i} style={{ marginBottom: paragraphSpacing }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: "1.05em" }}>
                  <span>{cert.name || cert.title}</span>
                  <span style={{ fontWeight: 600, fontSize: "0.9em", color: "#666" }}>{cert.date || cert.year}</span>
                </div>
                <div style={{ fontWeight: 600, color: accent }}>{cert.issuer || cert.organization}</div>
                {cert.description && <p style={{ margin: "2px 0 0" }}>{cert.description}</p>}
              </div>
            ))}
          </div>
        );
      case "languages":
        if (!languages?.length) return null;
        return (
          <div key={id} style={{ marginBottom: sectionGap }}>
            <SectionTitle>Languages</SectionTitle>
            <div style={{ fontWeight: 500 }}>{languages.map((l: any) => `${l.name} (${l.level})`).join(" · ")}</div>
          </div>
        );
      case "references":
        if (!references?.length) return null;
        return (
          <div key={id} style={{ marginBottom: sectionGap }}>
            <SectionTitle>References</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
              {references.map((ref: any, i: number) => (
                <div key={ref.id || i} style={{ marginBottom: paragraphSpacing }}>
                  <div style={{ fontWeight: 700, fontSize: "1.05em" }}>{ref.name}</div>
                  <div style={{ fontWeight: 600, color: accent }}>{ref.position}{ref.company ? `, ${ref.company}` : ''}</div>
                  <div style={{ color: "#555" }}>{ref.email}</div>
                  <div style={{ color: "#555" }}>{ref.phone}</div>
                </div>
              ))}
            </div>
          </div>
        );
      default: return null;
    }
  };

  const getContactInfo = () => [info.email, info.phone, locationLine, info.website].filter(Boolean).join("  |  ");

  // ==========================================
  // FREE TEMPLATES
  // ==========================================

  if (template === "modern") {
    return (
      <div ref={forwardedRef} style={{ ...baseStyle, display: "flex" } as any}>
        <div style={{ width: "32%", background: bgAccent === "#FFFFFF" ? "#1F2328" : bgAccent, color: bgAccent === "#FFFFFF" ? "#F0F0F0" : "#FFF", padding: "35px 25px" }}>
          {info.photo && <img src={info.photo} alt="" style={{ width: "90px", height: "90px", borderRadius: "50%", objectFit: "cover", marginBottom: "20px", border: `3px solid rgba(255,255,255,0.5)` }} />}
          <div style={{ fontSize: headerSize, fontWeight: 800, lineHeight: 1.1, marginBottom: "5px", color: "#FFF" }}>{fullName}</div>
          <div style={{ fontSize: "1.1em", opacity: 0.9, fontWeight: 600, marginBottom: "25px" }}>{info.profession}</div>
          
          <div style={{ fontSize: "0.85em", textTransform: "uppercase", opacity: 0.7, fontWeight: 700, marginBottom: "8px", letterSpacing: "0.1em" }}>Contact</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "30px", fontSize: "0.95em" }}>
            {info.email && <div>{info.email}</div>}
            {info.phone && <div>{info.phone}</div>}
            {locationLine && <div>{locationLine}</div>}
            {info.website && <div>{info.website}</div>}
          </div>

          {skills?.length > 0 && (
            <>
              <div style={{ fontSize: "0.85em", textTransform: "uppercase", opacity: 0.7, fontWeight: 700, marginBottom: "8px", letterSpacing: "0.1em" }}>Skills</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "30px", fontSize: "0.95em" }}>
                {skills.map((s: any, i: number) => <div key={i} style={{ display: "flex", justifyContent: "space-between" }}><span>{s.name}</span><span style={{ opacity: 0.7 }}>{s.level}</span></div>)}
              </div>
            </>
          )}
        </div>
        <div style={{ width: "68%", padding: "40px 35px" }}>
          {sectionOrder.filter((s:any) => !['skills'].includes(s.id)).map((s:any) => renderContent(s.id))}
        </div>
      </div>
    );
  }

  if (template === "minimal") {
    return (
      <div ref={forwardedRef} style={{ ...baseStyle, padding: "45px 50px" } as any}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px", borderBottom: `2px solid #EEE`, paddingBottom: "20px" }}>
          <div>
            <div style={{ fontSize: headerSize, fontWeight: 700 }}>{fullName}</div>
            <div style={{ fontSize: "1.1em", color: accent, fontWeight: 600, marginTop: "4px" }}>{info.profession}</div>
            <div style={{ color: "#888", marginTop: "10px" }}>{getContactInfo()}</div>
          </div>
          {info.photo && <img src={info.photo} alt="" style={{ width: "75px", height: "75px", borderRadius: "8px", objectFit: "cover" }} />}
        </div>
        {sectionOrder.map((s: any) => {
          if (s.id === 'summary' && info.summary) return <div key="summary" style={{ marginBottom: sectionGap }}><p style={{ fontSize: "1.1em", fontWeight: 500, margin: 0 }}>{info.summary}</p></div>;
          return renderContent(s.id);
        })}
      </div>
    );
  }

  // ==========================================
  // PREMIUM TEMPLATES (PRO)
  // ==========================================

  if (template === "executive") {
    return (
      <div ref={forwardedRef} style={{ ...baseStyle, padding: "0 40px 40px" } as any}>
        <div style={{ height: "15px", width: "100%", background: bgAccent, borderBottom: bgAccent === "#FFFFFF" ? "1px solid #EEE" : "none", marginBottom: "30px" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "25px", borderBottom: "2px solid #E5E5E5", paddingBottom: "15px" }}>
          <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            {info.photo && <img src={info.photo} alt="" style={{ width: "80px", height: "80px", borderRadius: "50%", objectFit: "cover", border: `2px solid ${accent}` }} />}
            <div>
              <div style={{ fontSize: headerSize, fontWeight: 800 }}>{fullName}</div>
              <div style={{ fontSize: "1.2em", color: accent, fontWeight: 700 }}>{info.profession}</div>
            </div>
          </div>
          <div style={{ textAlign: "right", color: "#555", fontSize: "0.9em", lineHeight: 1.6 }}>
            {info.email && <div>{info.email}</div>}
            {info.phone && <div>{info.phone}</div>}
            {locationLine && <div>{locationLine}</div>}
          </div>
        </div>
        {sectionOrder.map((s: any) => renderContent(s.id))}
      </div>
    );
  }

  if (template === "creative") {
    return (
      <div ref={forwardedRef} style={{ ...baseStyle, display: "flex", flexDirection: "column" } as any}>
        <div style={{ background: bgAccent === "#FFFFFF" ? "#F9FAFB" : bgAccent, color: bgAccent === "#FFFFFF" ? "#111" : "#FFF", padding: "40px 50px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: bgAccent === "#FFFFFF" ? "1px solid #E5E7EB" : "none" }}>
          <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            {info.photo && <img src={info.photo} alt="" style={{ width: "80px", height: "80px", borderRadius: "50%", objectFit: "cover", border: "3px solid rgba(255,255,255,0.3)" }} />}
            <div>
              <div style={{ fontSize: headerSize, fontWeight: 800 }}>{fullName}</div>
              <div style={{ fontSize: "1.1em", fontWeight: 500, opacity: 0.9 }}>{info.profession}</div>
            </div>
          </div>
          <div style={{ textAlign: "right", fontSize: "0.9em", opacity: 0.9 }}>
            <div>{info.email}</div>
            <div>{info.phone}</div>
            <div>{locationLine}</div>
          </div>
        </div>
        <div style={{ padding: "40px 50px" }}>
          {sectionOrder.map((s: any) => renderContent(s.id))}
        </div>
      </div>
    );
  }

  if (template === "elegant") {
    return (
      <div ref={forwardedRef} style={{ ...baseStyle, padding: "40px", fontFamily: "Playfair Display, serif" } as any}>
        <div style={{ textAlign: "center", marginBottom: "30px", borderBottom: `1px solid ${accent}`, paddingBottom: "20px" }}>
          <div style={{ fontSize: headerSize, fontWeight: 400, letterSpacing: "0.05em", color: accent }}>{fullName}</div>
          <div style={{ fontSize: "1.1em", fontStyle: "italic", color: "#555", marginTop: "6px" }}>{info.profession}</div>
          <div style={{ color: "#777", marginTop: "12px", fontSize: "0.9em", letterSpacing: "0.05em" }}>{getContactInfo()}</div>
        </div>
        {sectionOrder.map((s: any) => renderContent(s.id))}
      </div>
    );
  }

  // Classic Default (Free)
  return (
    <div ref={forwardedRef} style={{ ...baseStyle, padding: "45px 50px" } as any}>
      <div style={{ textAlign: "center", marginBottom: "30px", paddingBottom: "0" }}>
        {info.photo && <img src={info.photo} alt="" style={{ width: "80px", height: "80px", borderRadius: "50%", objectFit: "cover", margin: "0 auto 15px", border: `2px solid ${accent}` }} />}
        <div>
          <div style={{ fontSize: headerSize, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em" }}>{fullName}</div>
          <div style={{ fontSize: "1.1em", color: accent, fontWeight: 600, marginTop: "4px" }}>{info.profession}</div>
          <div style={{ color: "#666", marginTop: "10px", fontSize: "0.95em" }}>{getContactInfo()}</div>
        </div>
      </div>
      {sectionOrder.map((s: any) => renderContent(s.id))}
    </div>
  );
}