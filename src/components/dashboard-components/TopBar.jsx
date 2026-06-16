import { ChevronRight, Plus } from "lucide-react";

export default function TopBar({activeNav, isActive, setShowCreateCampaign}) {
    
    return(
        <div className="h-14 bg-white dark:bg-[#161b22] border-b flex items-center px-7 py-2 gap-4 shrink-0
        border-[rgba(3,44,166,.08)] dark:border-[#21262d]">
            <div className="flex items-center gap-2 text-sm text-slate-400 dark:text-[#8b949e]">
                <a href="/">Mazia</a>
                <ChevronRight size={14} />
                <span className="text-slate-500 dark:text-[#8b949e]">
                    {activeNav.name}
                </span>
            </div>

            {activeNav?.name === "Tableau de bord" && (
            <div className="flex items-center gap-1.5 ml-auto">
                <span className={`w-1.5 h-1.5 rounded-full
                    ${isActive? "bg-[#3fb950] shadow-[0_0_5px_#3fb950]" : "bg-[#8b949e] shadow-[0_0_5px_#8b949e]"}`}></span>
                <span className="text-xs text-[#8b949e]">
                    {isActive ? "Actif" : "Inactif"}
                </span>
            </div>
            )}

            {activeNav?.name === "Campagnes" && (
            <button
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl 
            text-xs font-bold text-white transition-all
            bg-linear-to-r from-[#1c50a0] to-[#58a6ff]
            border border-[rgba(88,166,255,.25)] shadow-[0_4px_14px_rgba(88,166,255,0.2)] cursor-pointer"
            onClick={() => setShowCreateCampaign(true)}>
                <Plus size={18} />
                Ajouter une campagne
            </button>
            )}

        </div>
    )
}