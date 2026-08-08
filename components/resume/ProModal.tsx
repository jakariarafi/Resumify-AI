// components/resume/ProModal.tsx
import React from "react";
import { useRouter } from "next/navigation";
import { Lock, Zap } from "lucide-react";

export default function ProModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const router = useRouter();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden text-center p-8">
        <div className="w-16 h-16 bg-gradient-to-tr from-amber-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
          <Lock size={32} className="text-white" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 mb-2 font-serif">Premium Template</h2>
        <p className="text-sm text-slate-500 mb-8">This is a PRO template. Upgrade your account to unlock all professional designs instantly.</p>
        
        <div className="flex flex-col gap-3">
          <button 
            onClick={() => {
              onClose();
              router.push("/pricing"); // ✅ পেমেন্ট পেজে রিডাইরেক্ট করবে
            }} 
            className="w-full py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-bold text-sm shadow-md hover:shadow-lg hover:scale-[1.02] transition-transform cursor-pointer flex items-center justify-center gap-2"
          >
            <Zap size={16} /> Upgrade to PRO
          </button>
          <button onClick={onClose} className="w-full py-3.5 rounded-full text-slate-500 font-bold text-sm hover:bg-slate-50 transition-colors cursor-pointer">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}