"use client";

import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";

interface DashboardLayoutProps {
  children: React.ReactNode;
  userName?: string;
  userEmail?: string;
  userInitials?: string;
}

export default function DashboardLayout({ 
  children, 
  userName, 
  userEmail, 
  userInitials 
}: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 overflow-hidden">
      
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        userName={userName}
        userEmail={userEmail}
        userInitials={userInitials}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        <Topbar 
          onOpenSidebar={() => setIsSidebarOpen(true)} 
          userName={userName}
          userInitials={userInitials}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

    </div>
  );
}