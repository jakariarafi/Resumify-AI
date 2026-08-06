"use client";

import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from "recharts";

interface AnalyticsChartsProps {
  resumes?: any[];
}

export default function AnalyticsCharts({ resumes = [] }: AnalyticsChartsProps) {
  // যদি ইউজারের কোনো রেজুমে না থাকে, তবে গ্রাফের মান শূন্য বা ফাঁকা দেখাবে
  const hasData = resumes && resumes.length > 0;

  const areaData = hasData ? [
    { name: "Mon", resumes: 1 },
    { name: "Tue", resumes: 3 },
    { name: "Wed", resumes: 2 },
    { name: "Thu", resumes: 5 },
    { name: "Fri", resumes: 4 },
    { name: "Sat", resumes: 7 },
    { name: "Sun", resumes: resumes.length },
  ] : [
    { name: "Mon", resumes: 0 },
    { name: "Tue", resumes: 0 },
    { name: "Wed", resumes: 0 },
    { name: "Thu", resumes: 0 },
    { name: "Fri", resumes: 0 },
    { name: "Sat", resumes: 0 },
    { name: "Sun", resumes: 0 },
  ];

  const pieData = hasData ? [
    { name: "Software / Tech", value: 45, color: "#38bdf8" },
    { name: "Data Science", value: 25, color: "#a855f7" },
    { name: "Management", value: 20, color: "#fb7185" },
    { name: "Others", value: 10, color: "#34d399" },
  ] : [
    { name: "No Data Yet", value: 100, color: "#334155" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 w-full">
      
      {/* Area Chart Section */}
      <div className="lg:col-span-2 bg-slate-950/90 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 sm:p-5 shadow-2xl relative overflow-hidden flex flex-col justify-between">
        <div className="absolute top-0 right-0 w-36 h-36 bg-indigo-600/10 blur-[60px] pointer-events-none"></div>

        <div className="flex items-center justify-between mb-3">
          <div className="min-w-0 pr-2">
            <h3 className="text-xs sm:text-sm font-bold text-white truncate">Resume Generation Activity</h3>
            <p className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 truncate">Weekly overview of your metrics</p>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] sm:text-[11px] font-semibold shrink-0">
            This Week
          </span>
        </div>

        <div className="h-[170px] sm:h-[190px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={areaData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="colorResumes" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: "#020617", borderColor: "#ffffff20", borderRadius: "8px", color: "#fff", fontSize: "11px" }}
              />
              <Area type="monotone" dataKey="resumes" stroke="#38bdf8" strokeWidth={2.5} fillOpacity={1} fill="url(#colorResumes)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pie Chart Section */}
      <div className="bg-slate-950/90 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 sm:p-5 shadow-2xl relative overflow-hidden flex flex-col justify-between">
        <div className="absolute bottom-0 left-0 w-36 h-36 bg-pink-600/10 blur-[60px] pointer-events-none"></div>

        <div className="min-w-0 pr-2">
          <h3 className="text-xs sm:text-sm font-bold text-white truncate">Resume Categories</h3>
          <p className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 truncate">Distribution by job domains</p>
        </div>

        <div className="h-[140px] sm:h-[150px] w-full flex items-center justify-center my-1">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={60}
                paddingAngle={hasData ? 4 : 0}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: "#020617", borderColor: "#ffffff20", borderRadius: "8px", color: "#fff", fontSize: "11px" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
          {pieData.map((item, index) => (
            <div key={index} className="flex items-center gap-1.5 min-w-0">
              <span className="w-2 h-2 rounded-full shadow-md shrink-0" style={{ backgroundColor: item.color }}></span>
              <span className="text-[10px] font-medium text-slate-300 truncate">{item.name}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}