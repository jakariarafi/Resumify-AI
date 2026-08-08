"use client";

import { useState, useEffect } from "react";
import { PlusCircle, Copy, Check } from "lucide-react";

export default function AdminCodesPage() {
  const [codesList, setCodesList] = useState<any[]>([]);
  const [copiedCode, setCopiedCode] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("active_pro_codes") || "[]");
    setCodesList(saved);
  }, []);

  // নতুন ইউনিক কোড জেনারেট করার ফাংশন
  const generateNewCode = () => {
    const prefix = "PRO";
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const randomChars = Math.random().toString(36).substring(2, 5).toUpperCase();
    const newCode = `${prefix}-${randomNum}-${randomChars}`;

    const newItem = { code: newCode, used: false, date: new Date().toLocaleDateString() };
    const updated = [newItem, ...codesList];
    
    setCodesList(updated);
    localStorage.setItem("active_pro_codes", JSON.stringify(updated));
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(""), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 p-8 text-white font-sans">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex justify-between items-center bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <div>
            <h1 className="text-xl font-bold">Admin Code Generator</h1>
            <p className="text-xs text-slate-400">Generate unique activation codes for users who paid.</p>
          </div>
          <button 
            onClick={generateNewCode}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-bold text-xs flex items-center gap-2 cursor-pointer transition"
          >
            <PlusCircle size={16} /> Generate Code
          </button>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Generated Codes List</h2>
          {codesList.length === 0 ? (
            <p className="text-xs text-slate-500">No codes generated yet.</p>
          ) : (
            <div className="space-y-2">
              {codesList.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs">
                  <span className="font-mono font-bold text-indigo-400">{item.code}</span>
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${item.used ? "bg-red-500/20 text-red-400" : "bg-emerald-500/20 text-emerald-400"}`}>
                      {item.used ? "Used" : "Active"}
                    </span>
                    <button 
                      onClick={() => copyToClipboard(item.code)}
                      className="text-slate-400 hover:text-white cursor-pointer"
                    >
                      {copiedCode === item.code ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}