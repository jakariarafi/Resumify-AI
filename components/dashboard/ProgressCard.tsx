interface ProgressCardProps {
  totalResumes?: number;
}

export default function ProgressCard({ totalResumes = 0 }: ProgressCardProps) {
  // যদি কোনো রেজুমে না থাকে, তবে প্রোগ্রেস ০% দেখাবে। রেজুমে থাকলে প্রোগ্রেস বাড়বে।
  const completionPercentage = totalResumes > 0 ? 85 : 0;

  return (
    <div className="bg-slate-950/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between shadow-xl">
      
      <div className="absolute top-0 right-0 w-36 h-36 bg-indigo-600/10 blur-[60px] pointer-events-none"></div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Profile Optimization</h3>
          <span className="px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold border border-indigo-500/20">
            {completionPercentage}% Complete
          </span>
        </div>

        <p className="text-xs text-slate-400 mb-5 leading-relaxed">
          Complete your missing professional details to increase your ATS match score significantly.
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-white/5 rounded-full h-2.5 mb-5 overflow-hidden border border-white/5">
          <div 
            className="bg-gradient-to-r from-indigo-500 to-violet-500 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="pt-4 border-t border-white/10 flex items-center justify-between">
        <span className="text-xs text-slate-400 font-medium">
          {totalResumes > 0 ? "Next: Add Work Experience" : "Get started by creating a resume"}
        </span>
        <button className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all cursor-pointer">
          {totalResumes > 0 ? "Complete Now" : "Create Resume"}
        </button>
      </div>

    </div>
  );
}