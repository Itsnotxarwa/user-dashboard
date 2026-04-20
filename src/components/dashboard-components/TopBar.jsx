import { ChevronRight, Plus } from "lucide-react";

export default function TopBar({activeNav, isActive}) {
    
    return(
        <div className="h-14 bg-white border-b flex items-center px-7 py-2 gap-4 shrink-0
        border-[rgba(3,44,166,.08)]">
            <div className="flex items-center gap-2 text-sm text-slate-400">
                <a href="/">Mazia</a>
                <ChevronRight size={14} />
                <span className="text-slate-500">
                    {activeNav.name}
                </span>
            </div>

            {activeNav === "Tableau de bord" && (
            <div className="flex items-center gap-1.5 ml-2">
                <span className={`w-1.5 h-1.5 rounded-full
                    ${isActive? "bg-[#22c55e] shadow-[0_0_5px_#22c55e]" : "bg-[#6b7280] shadow-[0_0_5px_#6b7280]"}`}></span>
                <span className="text-[10px] text-slate-400">
                    {isActive ? "Active" : "Inactive"}
                </span>
            </div>
            )}
        </div>
    )
}