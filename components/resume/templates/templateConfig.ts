export interface TemplateConfig {
  id: string;
  name: string;
  category: "ATS" | "Two column" | "With photo" | "Customized";
  plan: "free" | "premium";
  layoutType: "modern-left" | "two-column" | "classic-centered" | "minimal";
  defaultAccent: string;
}

export const templatesConfig: TemplateConfig[] = [
  {
    id: "balanced",
    name: "Balanced",
    category: "Two column",
    plan: "free",
    layoutType: "two-column",
    defaultAccent: "indigo"
  },
  {
    id: "header-ats",
    name: "Header ATS",
    category: "ATS",
    plan: "free",
    layoutType: "modern-left",
    defaultAccent: "emerald"
  },
  {
    id: "essential",
    name: "Essential",
    category: "ATS",
    plan: "free",
    layoutType: "classic-centered",
    defaultAccent: "slate"
  },
  {
    id: "polished",
    name: "Polished",
    category: "With photo",
    plan: "free",
    layoutType: "minimal",
    defaultAccent: "rose"
  },
  // 👉 এখানে আপনার ইচ্ছমতো নতুন টেমপ্লেটগুলো অ্যাডমিন হিসেবে যোগ করে দিন:
  {
    id: "vivid",
    name: "Vivid",
    category: "With photo",
    plan: "free",
    layoutType: "modern-left",
    defaultAccent: "amber"
  },
  {
    id: "calligraphic",
    name: "Calligraphic",
    category: "Customized",
    plan: "free",
    layoutType: "classic-centered",
    defaultAccent: "violet"
  },
  {
    id: "harmonized",
    name: "Harmonized",
    category: "With photo",
    plan: "free",
    layoutType: "two-column",
    defaultAccent: "cyan"
  },
  {
    id: "defined",
    name: "Defined",
    category: "ATS",
    plan: "free",
    layoutType: "classic-centered",
    defaultAccent: "indigo"
  }
];