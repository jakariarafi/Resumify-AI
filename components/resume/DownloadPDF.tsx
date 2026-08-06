"use client";

import { Download } from "lucide-react";
import { useReactToPrint } from "react-to-print";
import { RefObject } from "react";

interface DownloadPDFProps {
  resumeRef: RefObject<HTMLDivElement | null>;
}

export default function DownloadPDF({ resumeRef }: DownloadPDFProps) {
  const handlePrint = useReactToPrint({
    contentRef: resumeRef,
    documentTitle: "Al_Jakaria_Resume",
    pageStyle: `
      @page {
        size: A4;
        margin: 0;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
          margin: 0;
          padding: 0;
        }
      }
    `,
  });

  return (
    <button
      type="button"
      onClick={() => handlePrint()}
      className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 font-semibold text-white shadow hover:bg-indigo-700 transition cursor-pointer text-xs"
    >
      <Download size={16} />
      Download PDF
    </button>
  );
}