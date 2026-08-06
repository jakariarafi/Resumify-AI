"use client";

import { Bell, Search, Menu } from "lucide-react";

interface TopbarProps {
  onOpenSidebar: () => void;
  userName?: string;
  userInitials?: string;
}

export default function Topbar({ 
  onOpenSidebar, 
  userName = "User", 
  userInitials = "U" 
}: TopbarProps) {
  return (
    <header className="h-20 bg-slate-950/90 backdrop-blur-2xl border-b border-white/10 px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-30 shadow-lg w-full">
      
      <div className="flex items-center gap-3">
        <button 
          onClick={onOpenSidebar}
          className="lg:hidden p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-all active:scale-95 shrink-0 cursor-pointer"
          aria-label="Open Menu"
        >
          <Menu size={20} />
        </button>

        <div className="relative w-44 sm:w-72 md:w-80">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search size={16} />
          </span>
          <input
            type="text"
            placeholder="Search resumes, templates..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-medium focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all placeholder:text-slate-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-4 ml-auto">
        <button className="relative p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-200 cursor-pointer active:scale-95 shrink-0">
          <Bell size={18} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full animate-pulse shadow-sm shadow-indigo-500"></span>
        </button>

        <div className="flex items-center gap-3 pl-2.5 sm:pl-3 border-l border-white/10">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white font-bold text-xs shadow-md shadow-indigo-600/30 shrink-0">
            {userInitials}
          </div>
          <div className="hidden md:block text-left min-w-0">
            <h4 className="text-xs font-bold text-white leading-tight truncate">{userName}</h4>
            <p className="text-[10px] text-indigo-400 font-medium truncate">Pro Member</p>
          </div>
        </div>
      </div>

    </header>
  );
}