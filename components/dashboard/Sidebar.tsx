"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutUser } from "@/actions/auth"; // সার্ভার অ্যাকশন ইম্পোর্ট করা হলো
import { 
  LayoutDashboard, 
  FileText, 
  Sparkles, 
  User, 
  Settings, 
  LogOut, 
  ChevronRight,
  X,
  Home 
} from "lucide-react";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  userName?: string;
  userEmail?: string;
  userInitials?: string;
}

export default function Sidebar({ 
  isOpen = false, 
  onClose, 
  userName = "User", 
  userEmail = "user@example.com", 
  userInitials = "U" 
}: SidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "My Resumes", href: "/dashboard/resume", icon: FileText },
    { name: "AI Builder", href: "/dashboard/builder", icon: Sparkles },
    { name: "Profile", href: "/dashboard/profile", icon: User },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <>
      {isOpen && (
        <div 
          onClick={onClose} 
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 lg:hidden transition-opacity"
        />
      )}

      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-slate-950 border-r border-white/15 min-h-screen flex flex-col justify-between p-5 select-none shrink-0 shadow-2xl
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
      `}>
        <div className="absolute top-0 left-0 w-full h-48 bg-indigo-600/10 blur-[80px] pointer-events-none"></div>

        <div>
          <div className="mb-8 px-2 flex items-center justify-between">
            <div>
              <Link href="/dashboard" prefetch={true} className="inline-block text-2xl font-black tracking-tight text-white">
                Resumify<span className="text-indigo-500">.AI</span>
              </Link>
              <p className="text-[11px] text-slate-400 font-medium mt-0.5">Professional Workspace</p>
            </div>
            <button 
              onClick={onClose} 
              className="lg:hidden p-2 text-slate-400 hover:text-white rounded-xl bg-white/5 border border-white/10"
            >
              <X size={18} />
            </button>
          </div>

          <nav className="space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  prefetch={true}
                  onClick={onClose}
                  className={`flex items-center justify-between px-3.5 py-3 rounded-xl font-medium text-sm transition-all duration-200 group ${
                    isActive
                      ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-600/30"
                      : "text-slate-400 hover:text-white hover:bg-white/5 active:scale-[0.98]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={18} className={`transition-transform group-hover:scale-115 ${isActive ? "text-white" : "text-slate-400 group-hover:text-indigo-400"}`} />
                    <span className="truncate">{item.name}</span>
                  </div>
                  {isActive && <ChevronRight size={14} className="text-white/80 shrink-0" />}
                </Link>
              );
            })}
          </nav>

          
          <div className="mt-4 pt-4 border-t border-white/10">
            <Link
              href="/"
              prefetch={true}
              onClick={onClose}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-xs text-indigo-400 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 transition-all duration-200 active:scale-[0.98]"
            >
              <Home size={16} />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10">
          <div className="flex items-center gap-3 px-3 py-2.5 mb-2 rounded-xl bg-white/5 border border-white/5">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white font-bold text-xs shadow-inner shrink-0">
              {userInitials}
            </div>
            <div className="overflow-hidden min-w-0">
              <h4 className="text-xs font-bold text-white truncate">{userName}</h4>
              <p className="text-[10px] text-slate-400 truncate">{userEmail}</p>
            </div>
          </div>

          {/* সাইন আউট ফর্ম যা কুকি ডিলিট করে সরাসরি মেইন ল্যান্ডিং পেজে নিয়ে যাবে */}
          <form action={logoutUser}>
            <button
              type="submit"
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-xs text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-all duration-200 active:scale-[0.98] cursor-pointer"
            >
              <LogOut size={16} />
              <span>Sign Out</span>
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}