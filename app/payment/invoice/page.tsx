"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Printer, ArrowLeft } from "lucide-react";

export default function InvoicePage() {
  const router = useRouter();
  const [paymentInfo, setPaymentInfo] = useState<any>(null);
  const [currentDate, setCurrentDate] = useState("");
  const [invoiceNo, setInvoiceNo] = useState("");

  useEffect(() => {
    setInvoiceNo(`INV-${Math.floor(100000 + Math.random() * 900000)}`);
    setCurrentDate(new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" }));

    try {
      const lastPayment = localStorage.getItem("last_payment");
      if (lastPayment) {
        setPaymentInfo(JSON.parse(lastPayment));
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center py-10 px-4 font-sans text-slate-900">
      
      {/* Top Action Bar */}
      <div className="max-w-3xl w-full flex justify-between items-center mb-6 print:hidden">
        <button 
          onClick={() => router.back()} 
          className="flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-white px-4 py-2 rounded-xl shadow hover:bg-slate-50 transition cursor-pointer"
        >
          <ArrowLeft size={14} /> Back
        </button>
        <button 
          onClick={() => window.print()} 
          className="flex items-center gap-1.5 text-xs font-bold text-white bg-slate-900 px-5 py-2.5 rounded-xl shadow-lg hover:bg-slate-800 transition cursor-pointer"
        >
          <Printer size={14} /> Print / Save PDF
        </button>
      </div>

      {/* Invoice Document Box */}
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-2xl p-8 md:p-14 space-y-8 border border-slate-200">
        
        {/* Header */}
        <div className="flex justify-between items-start border-b-2 border-slate-900 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-white font-black text-xl">
              R
            </div>
            <div>
              <h2 className="font-extrabold text-xl tracking-wide text-slate-900">Resumify.AI</h2>
              <p className="text-xs text-slate-500">Digital Solutions & SaaS</p>
            </div>
          </div>
          <div className="text-right">
            <h1 className="text-4xl font-black tracking-tight text-slate-900 uppercase">Invoice</h1>
            <p className="text-xs font-mono text-slate-500 mt-1">No.: {invoiceNo || "INV-00052"}</p>
            <p className="text-xs font-mono text-slate-500">Date: {currentDate || "02 June 2025"}</p>
          </div>
        </div>

        {/* Billed To & From */}
        <div className="grid grid-cols-2 gap-8 text-xs">
          <div className="space-y-1">
            <span className="font-bold uppercase tracking-wider text-slate-400 block">Billed To (Customer):</span>
            <p className="font-bold text-slate-900 text-sm">Resumify User</p>
            <p className="font-mono text-indigo-600 font-bold break-all">{paymentInfo?.email || "resumefiyai@gmail.com"}</p>
            <p className="text-slate-600">Bangladesh</p>
          </div>
          <div className="space-y-1 text-right">
            <span className="font-bold uppercase tracking-wider text-slate-400 block">From (Merchant):</span>
            <p className="font-bold text-slate-900 text-sm">Resumify.AI Inc.</p>
            <p className="text-slate-600">Online Automated Services</p>
            <p className="text-slate-600 font-mono">support@resumify.ai</p>
          </div>
        </div>

        {/* Items Table */}
        <div className="border border-slate-200 rounded-xl overflow-hidden">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold">
                <th className="p-4">Item description</th>
                <th className="p-4 text-center">Qty</th>
                <th className="p-4 text-right">Price</th>
                <th className="p-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              <tr>
                <td className="p-4">
                  <p className="font-bold text-slate-900 text-sm">Resumify.AI Pro Plan Subscription</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Method: {paymentInfo?.method || "Mobile Banking"} | Info: {paymentInfo?.detail || "Online Payment"}</p>
                </td>
                <td className="p-4 text-center">1</td>
                <td className="p-4 text-right font-mono">৳1,200</td>
                <td className="p-4 text-right font-mono font-bold">৳1,200</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="flex justify-end pt-2">
          <div className="w-64 space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal:</span>
              <span className="font-mono font-bold">৳1,200</span>
            </div>
            <div className="flex justify-between text-slate-600 border-b border-slate-200 pb-2">
              <span>Tax / VAT (0%):</span>
              <span className="font-mono font-bold">৳0</span>
            </div>
            <div className="flex justify-between text-slate-900 text-base font-black pt-1">
              <span>Total Paid:</span>
              <span className="font-mono text-indigo-600">$12.00 / ৳1,200</span>
            </div>
          </div>
        </div>

        {/* Footer & Terms */}
        <div className="border-t border-slate-200 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div>
            <p className="font-bold text-slate-800">Terms & Conditions:</p>
            <p>Payment is processed securely. For support, email support@resumify.ai</p>
          </div>
          <div className="text-right font-bold text-slate-900">
            Status: <span className="text-emerald-600 uppercase font-black">PAID</span>
          </div>
        </div>

      </div>
    </div>
  );
}