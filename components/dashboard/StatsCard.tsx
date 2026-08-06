import { FileText, Award, Download, TrendingUp } from "lucide-react";

interface StatsCardProps {
  totalResumes?: number;
  avgAtsScore?: number;
  totalDownloads?: number;
}

export default function StatsCard({ 
  totalResumes = 0, 
  avgAtsScore = 0, 
  totalDownloads = 0 
}: StatsCardProps) {
  
  const stats = [
    {
      title: "Total Resumes",
      value: totalResumes < 10 ? `0${totalResumes}` : `${totalResumes}`,
      change: totalResumes > 0 ? "+Active count" : "No resumes yet",
      icon: FileText,
      gradient: "from-blue-600 via-indigo-600 to-violet-600",
      borderColor: "group-hover:border-blue-500/50",
    },
    {
      title: "Avg. ATS Score",
      value: `${avgAtsScore}%`,
      change: avgAtsScore > 0 ? "Optimized score" : "Pending analysis",
      icon: Award,
      gradient: "from-indigo-600 via-violet-600 to-fuchsia-600",
      borderColor: "group-hover:border-indigo-500/50",
    },
    {
      title: "Downloads",
      value: totalDownloads < 10 ? `0${totalDownloads}` : `${totalDownloads}`,
      change: "PDF & TXT exports",
      icon: Download,
      gradient: "from-violet-600 via-fuchsia-600 to-pink-600",
      borderColor: "group-hover:border-violet-500/50",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
      {stats.map((item, index) => {
        const Icon = item.icon;
        return (
          <div
            key={index}
            className={`group relative bg-slate-950/90 backdrop-blur-2xl border border-white/10 ${item.borderColor} rounded-2xl p-5 overflow-hidden shadow-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-indigo-500/10 flex items-center justify-between`}
          >
            {/* Background Glow Effect */}
            <div className={`absolute -right-10 -top-10 w-32 h-32 bg-gradient-to-tr ${item.gradient} opacity-20 blur-[50px] group-hover:opacity-40 transition-opacity duration-500 pointer-events-none`}></div>

            <div className="relative z-10 min-w-0 pr-3">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5 truncate">
                <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${item.gradient} shrink-0`}></span>
                <span className="truncate">{item.title}</span>
              </p>
              
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2 group-hover:scale-105 transition-transform origin-left duration-300">
                {item.value}
              </h3>
              
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] sm:text-[11px] font-semibold">
                <TrendingUp size={11} />
                <span className="truncate">{item.change}</span>
              </div>
            </div>

            <div className={`relative z-10 w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-tr ${item.gradient} flex items-center justify-center text-white shadow-xl shadow-indigo-950/50 group-hover:rotate-6 transition-transform duration-300 shrink-0`}>
              <Icon size={22} />
            </div>
          </div>
        );
      })}
    </div>
  );
}