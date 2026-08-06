'use client'

import { useState, useRef } from "react";
import { changePassword, deleteUserAccount } from "@/actions/auth";
import { Lock, CheckCircle2, AlertCircle, Eye, EyeOff, Shield, Bell, Trash2, CreditCard, Sparkles, ArrowLeft, Check, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("subscription");
  const [selectedPlan, setSelectedPlan] = useState("pro");
  
  // পাসওয়ার্ড পরিবর্তনের স্টেট
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // অ্যাকাউন্ট ডিলিট স্টেট ও পপআপ মডাল স্টেট
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const router = useRouter();

  const handlePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    const formData = new FormData(e.currentTarget);
    const res = await changePassword(formData);

    if (res?.error) {
      setError(res.error);
    } else if (res?.success) {
      setSuccess(res.success);
      formRef.current?.reset();
    }
    setIsLoading(false);
  };

  const handleDeleteAccount = async () => {
    if (confirmText.trim().toLowerCase() !== "confirm") {
      setDeleteError("Please type 'confirm' to proceed.");
      return;
    }
    
    setIsDeleting(true);
    setDeleteError("");

    const res = await deleteUserAccount();

    if (res?.error) {
      setDeleteError(res.error);
      setIsDeleting(false);
    } else if (res?.success) {
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center p-3 sm:p-6">
      <div className="w-full max-w-4xl bg-white border border-slate-200/80 rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl relative overflow-hidden">
        
        {/* টপ ন্যাভ ও হেডার */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 relative z-10">
          <div>
            <h1 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
              Account Settings <Sparkles size={16} className="text-indigo-600" />
            </h1>
            <p className="text-[11px] text-slate-500">Manage active subscription and security protocols.</p>
          </div>
          <Link href="/dashboard" className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-slate-700 hover:text-indigo-600 bg-slate-100 px-3 py-2 rounded-xl transition shadow-sm w-full sm:w-auto">
            <ArrowLeft size={14} /> Back to Dashboard
          </Link>
        </div>

        {/* ট্যাব মেনু */}
        <div className="flex items-center justify-center sm:justify-start gap-1.5 mt-3 border-b border-slate-100 pb-2.5 overflow-x-auto relative z-10 scrollbar-none">
          <button
            onClick={() => setActiveTab("subscription")}
            title="Subscription & Plans"
            className={`text-xs font-extrabold py-2 px-3 sm:px-3.5 transition border-b-2 whitespace-nowrap cursor-pointer flex items-center justify-center gap-1.5 rounded-xl shrink-0 ${
              activeTab === "subscription" ? "border-indigo-600 text-indigo-600 bg-indigo-50/50" : "border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <CreditCard size={15} className="shrink-0" /> 
            <span className="hidden sm:inline">Subscription & Plans</span>
          </button>

          <button
            onClick={() => setActiveTab("security")}
            title="Security & Password"
            className={`text-xs font-extrabold py-2 px-3 sm:px-3.5 transition border-b-2 whitespace-nowrap cursor-pointer flex items-center justify-center gap-1.5 rounded-xl shrink-0 ${
              activeTab === "security" ? "border-indigo-600 text-indigo-600 bg-indigo-50/50" : "border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <Shield size={15} className="shrink-0" /> 
            <span className="hidden sm:inline">Security & Password</span>
          </button>

          <button
            onClick={() => setActiveTab("notifications")}
            title="Notifications & Alerts"
            className={`text-xs font-extrabold py-2 px-3 sm:px-3.5 transition border-b-2 whitespace-nowrap cursor-pointer flex items-center justify-center gap-1.5 rounded-xl shrink-0 ${
              activeTab === "notifications" ? "border-indigo-600 text-indigo-600 bg-indigo-50/50" : "border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <Bell size={15} className="shrink-0" /> 
            <span className="hidden sm:inline">Notifications & Alerts</span>
          </button>

          <button
            onClick={() => setActiveTab("delete")}
            title="Delete Account"
            className={`text-xs font-extrabold py-2 px-3 sm:px-3.5 transition border-b-2 whitespace-nowrap cursor-pointer flex items-center justify-center gap-1.5 rounded-xl shrink-0 ${
              activeTab === "delete" ? "border-rose-600 text-rose-600 bg-rose-50/50" : "border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <Trash2 size={15} className="shrink-0" /> 
            <span className="hidden sm:inline">Delete Account</span>
          </button>
        </div>

        {/* ট্যাব ১: সাবস্ক্রিপশন ও প্ল্যান (কমপ্যাক্ট লেআউট) */}
        {activeTab === "subscription" && (
          <div className="py-4 space-y-3 relative z-10">
            <div>
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-800">Available Subscription Plans</h2>
              <p className="text-[11px] text-slate-500">Select a plan below to set your active subscription.</p>
            </div>

            <div className="space-y-2.5">
              
              {/* ১. ফ্রি প্ল্যান */}
              <div 
                onClick={() => setSelectedPlan('free')}
                className={`p-3.5 sm:p-4 rounded-2xl border transition cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                  selectedPlan === 'free' ? 'border-indigo-600 ring-2 ring-indigo-600/20 bg-indigo-50/10 shadow-sm' : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${selectedPlan === 'free' ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-300'}`}>
                    {selectedPlan === 'free' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xs font-black text-slate-900">Free Tier</h3>
                      <span className="text-[9px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">FREE</span>
                    </div>
                    <p className="text-[11px] text-slate-500">1 Professional Resume, Limited ATS Checks, Standard PDF Export.</p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-3 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                  <span className="text-sm font-black text-slate-900">$0 <span className="text-[10px] font-normal text-slate-500">/ forever</span></span>
                  <button className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition shadow-sm ${selectedPlan === 'free' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
                    {selectedPlan === 'free' ? '✓ Active' : 'Select'}
                  </button>
                </div>
              </div>

              {/* ২. প্রো ও স্টুডেন্ট ইডিইউ প্ল্যান */}
              <div 
                onClick={() => setSelectedPlan('pro')}
                className={`p-3.5 sm:p-4 rounded-2xl border transition cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                  selectedPlan === 'pro' ? 'border-indigo-600 ring-2 ring-indigo-600/20 bg-indigo-50/20 shadow-sm' : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${selectedPlan === 'pro' ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-300'}`}>
                    {selectedPlan === 'pro' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xs font-black text-slate-900">Pro & Student EDU</h3>
                      <span className="text-[9px] font-bold uppercase tracking-wider bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded">POPULAR</span>
                    </div>
                    <p className="text-[11px] text-slate-500">Unlimited Resumes, 25 Daily ATS Scans, AI Copilot, Free with .edu.</p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-3 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                  <span className="text-sm font-black text-slate-900">$12 <span className="text-[10px] font-normal text-slate-500">/ mo</span></span>
                  <button className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition shadow-sm ${selectedPlan === 'pro' ? 'bg-emerald-600 text-white' : 'bg-indigo-600 text-white hover:bg-indigo-500'}`}>
                    {selectedPlan === 'pro' ? '✓ Active' : 'Upgrade'}
                  </button>
                </div>
              </div>

              {/* ৩. এন্টারপ্রাইজ প্ল্যান */}
              <div 
                onClick={() => setSelectedPlan('enterprise')}
                className={`p-3.5 sm:p-4 rounded-2xl border transition cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                  selectedPlan === 'enterprise' ? 'border-indigo-600 ring-2 ring-indigo-600/20 bg-indigo-50/10 shadow-sm' : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${selectedPlan === 'enterprise' ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-300'}`}>
                    {selectedPlan === 'enterprise' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xs font-black text-slate-900">Enterprise Teams</h3>
                      <span className="text-[9px] font-bold uppercase tracking-wider bg-slate-900 text-white px-1.5 py-0.5 rounded">TEAMS</span>
                    </div>
                    <p className="text-[11px] text-slate-500">Bulk Candidate Management, Custom Portals, Dedicated Manager.</p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-3 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                  <span className="text-sm font-black text-slate-900">$45 <span className="text-[10px] font-normal text-slate-500">/ yr</span></span>
                  <button className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition shadow-sm ${selectedPlan === 'enterprise' ? 'bg-emerald-600 text-white' : 'border border-slate-300 text-slate-800 hover:bg-slate-50'}`}>
                    {selectedPlan === 'enterprise' ? '✓ Active' : 'Get Teams'}
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ট্যাব ২: সিকিউরিটি */}
        {activeTab === "security" && (
          <div className="py-4 max-w-lg relative z-10">
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-800 mb-0.5">Security & Password</h2>
            <p className="text-[11px] text-slate-500 mb-3">Ensure your account is using a strong, unique password.</p>

            {error && (
              <div className="mb-3 flex items-center gap-2 bg-rose-50 border border-rose-200 text-rose-600 p-3 rounded-xl text-xs">
                <AlertCircle size={16} className="shrink-0" /> <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="mb-3 flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-600 p-3 rounded-xl text-xs">
                <CheckCircle2 size={16} className="shrink-0" /> <span>{success}</span>
              </div>
            )}

            <form ref={formRef} onSubmit={handlePasswordSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">Current Password</label>
                <div className="relative">
                  <input
                    type={showOld ? "text" : "password"}
                    name="oldPassword"
                    required
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 focus:border-indigo-600 focus:bg-white focus:outline-none transition"
                  />
                  <button type="button" onClick={() => setShowOld(!showOld)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700">
                    {showOld ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">New Password</label>
                <div className="relative">
                  <input
                    type={showNew ? "text" : "password"}
                    name="newPassword"
                    required
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 focus:border-indigo-600 focus:bg-white focus:outline-none transition"
                  />
                  <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700">
                    {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">Retype New Password</label>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    name="confirmPassword"
                    required
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 focus:border-indigo-600 focus:bg-white focus:outline-none transition"
                  />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700">
                    {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl shadow-md transition text-xs cursor-pointer disabled:opacity-50 mt-2"
              >
                {isLoading ? "Updating..." : "Update Password"}
              </button>
            </form>
          </div>
        )}

        {/* ট্যাব ৩: নোটিফিকেশন */}
        {activeTab === "notifications" && (
          <div className="py-4 max-w-lg space-y-3 relative z-10">
            <div>
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-800">Notification Preferences</h2>
              <p className="text-[11px] text-slate-500">Control how and when you receive system alerts.</p>
            </div>
            
            <div className="space-y-2 pt-1">
              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer hover:border-indigo-300 transition">
                <div>
                  <p className="text-xs font-bold text-slate-800">Email Updates & News</p>
                  <p className="text-[10px] text-slate-500">Receive feature updates via email.</p>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-indigo-600 rounded cursor-pointer" />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer hover:border-indigo-300 transition">
                <div>
                  <p className="text-xs font-bold text-slate-800">Security Login Alerts</p>
                  <p className="text-[10px] text-slate-500">Get notified whenever a new login occurs.</p>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-indigo-600 rounded cursor-pointer" />
              </label>
            </div>
          </div>
        )}

        {/* ট্যাব ৪: ডিলিট অ্যাকাউন্ট */}
        {activeTab === "delete" && (
          <div className="py-4 max-w-lg space-y-3 relative z-10">
            <div>
              <h2 className="text-xs font-black uppercase tracking-wider text-rose-600">Delete Account</h2>
              <p className="text-[11px] text-slate-500">Permanently remove your account and data.</p>
            </div>

            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-[11px] font-medium shadow-sm">
              ⚠️ Warning: Deleting your account is irreversible. All your resumes and data will be lost.
            </div>

            <button 
              onClick={() => {
                setConfirmText("");
                setDeleteError("");
                setShowDeleteModal(true);
              }}
              className="bg-rose-600 hover:bg-rose-500 text-white font-bold px-5 py-3 rounded-xl shadow-md transition text-xs cursor-pointer flex items-center justify-center gap-2 w-full mt-1"
            >
              <Trash2 size={15} /> Delete Account
            </button>
          </div>
        )}

        {/* কনফার্মেশন পপআপ মডাল বক্স */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 z-50">
            <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-slate-100 relative">
              
              <button 
                onClick={() => setShowDeleteModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                  <Trash2 size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900">Are you absolutely sure?</h3>
                  <p className="text-[11px] text-slate-500">This action cannot be undone.</p>
                </div>
              </div>

              {deleteError && (
                <div className="mb-3 p-2.5 bg-rose-50 border border-rose-200 text-rose-600 rounded-xl text-[11px] font-medium">
                  {deleteError}
                </div>
              )}

              <div className="space-y-2 mb-4">
                <p className="text-[11px] text-slate-600">
                  Type <span className="font-extrabold text-rose-600">&quot;confirm&quot;</span> below:
                </p>
                <input
                  type="text"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  placeholder="Type confirm"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-900 focus:border-rose-600 focus:bg-white focus:outline-none transition"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="w-1/2 py-2.5 rounded-xl font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  disabled={isDeleting || confirmText.trim().toLowerCase() !== "confirm"}
                  className="w-1/2 py-2.5 rounded-xl font-bold text-xs bg-rose-600 hover:bg-rose-500 text-white shadow transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {isDeleting ? "Deleting..." : "Yes, Delete"}
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}