'use client'

import { useState, useEffect } from "react";
import { getUserProfile, updateUserName } from "@/actions/profile";
import { User, Mail, Calendar, ArrowLeft, KeyRound, Edit2, Check, X, Loader2, Sparkles, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [user, setUser] = useState<{ name: string; email: string; createdAt: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const router = useRouter();

  useEffect(() => {
    async function fetchProfile() {
      const res = await getUserProfile();
      if (res.error) {
        router.push("/login");
      } else if (res.user) {
        setUser({
          name: res.user.name,
          email: res.user.email,
          createdAt: res.user.createdAt ? res.user.createdAt.toString() : "",
        });
        setNewName(res.user.name);
      }
      setLoading(false);
    }
    fetchProfile();
  }, [router]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    setMessage({ type: "", text: "" });

    const formData = new FormData();
    formData.append("name", newName);

    const res = await updateUserName(formData);

    if (res.error) {
      setMessage({ type: "error", text: res.error });
    } else if (res.success) {
      setMessage({ type: "success", text: res.success });
      setUser((prev) => prev ? { ...prev, name: newName } : null);
      setIsEditing(false);
    }
    setUpdating(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center text-xs font-semibold">
        <Loader2 className="animate-spin mr-2 text-indigo-600" size={18} /> Loading profile details...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-xl bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        
        {/* ব্যাকগ্রাউন্ড ডেকোরেশন */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-50 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16"></div>

        {/* টপ ন্যাভ ও স্ট্যাটাস */}
        <div className="flex items-center justify-between mb-8 relative z-10">
          <Link 
            href="/dashboard" 
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-indigo-600 bg-slate-100 px-3.5 py-2 rounded-xl transition shadow-sm"
          >
            <ArrowLeft size={15} /> Back to Dashboard
          </Link>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Active Account
          </span>
        </div>

        {/* অ্যালার্ট ম্যাসেজ */}
        {message.text && (
          <div className={`mb-6 p-3.5 rounded-2xl text-xs font-medium text-center shadow-sm relative z-10 ${message.type === 'error' ? 'bg-rose-50 text-rose-600 border border-rose-200' : 'bg-emerald-50 text-emerald-600 border border-emerald-200'}`}>
            {message.text}
          </div>
        )}

        {/* অবতার ও নাম সেকশন */}
        <div className="flex flex-col items-center text-center mb-8 relative z-10">
          <div className="relative mb-3">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white text-3xl font-black shadow-xl shadow-indigo-600/20">
              {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
            <div className="absolute -bottom-1 -right-1 bg-white text-indigo-600 p-1.5 rounded-xl shadow-md border border-slate-100">
              <ShieldCheck size={16} />
            </div>
          </div>

          {!isEditing ? (
            <div className="flex items-center gap-2 mt-1">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900">{user?.name}</h1>
              <button 
                onClick={() => setIsEditing(true)} 
                className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 rounded-xl transition"
                title="Edit Name"
              >
                <Edit2 size={15} />
              </button>
            </div>
          ) : (
            <form onSubmit={handleUpdate} className="flex items-center gap-2 w-full max-w-xs mt-2">
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-300 text-xs px-3.5 py-2.5 rounded-xl text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white shadow-inner font-medium"
              />
              <button type="submit" disabled={updating} className="p-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 transition shadow-md">
                <Check size={15} />
              </button>
              <button type="button" onClick={() => setIsEditing(false)} className="p-2.5 bg-slate-200 text-slate-700 rounded-xl hover:bg-slate-300 transition">
                <X size={15} />
              </button>
            </form>
          )}

          <p className="text-xs text-slate-500 mt-1 font-medium">{user?.email}</p>
        </div>

        {/* ডিটেইলস লিস্ট কার্ড */}
        <div className="space-y-3 mb-8 text-xs relative z-10">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-sm">
            <span className="flex items-center gap-2.5 text-slate-600 font-semibold"><User size={16} className="text-indigo-600" /> Full Name</span>
            <span className="font-bold text-slate-900">{user?.name}</span>
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-sm">
            <span className="flex items-center gap-2.5 text-slate-600 font-semibold"><Mail size={16} className="text-violet-600" /> Email Address</span>
            <span className="font-bold text-slate-900 truncate max-w-[200px] sm:max-w-xs">{user?.email}</span>
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-sm">
            <span className="flex items-center gap-2.5 text-slate-600 font-semibold"><Calendar size={16} className="text-emerald-600" /> Joined Date</span>
            <span className="font-bold text-slate-900">
              {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "N/A"}
            </span>
          </div>
        </div>

        {/* পাসওয়ার্ড পরিবর্তনের বাটন */}
        <Link 
          href="/dashboard/settings" 
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-600/20 transition text-xs tracking-wide relative z-10"
        >
          <KeyRound size={16} /> Change Password & Settings
        </Link>

      </div>
    </div>
  );
}