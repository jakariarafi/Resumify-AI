import { ReactNode } from "react";

interface SectionProps {
  className?: string;
  children: ReactNode;
  id?: string;
}

export default function Section({
  className = "",
  children,
  id,
}: SectionProps) {
  return (
    <section id={id} className={`py-12 md:py-16 lg:py-20 relative overflow-hidden ${className}`}>
      {children}
    </section>
  );
}