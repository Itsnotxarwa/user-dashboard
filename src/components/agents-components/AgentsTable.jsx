export default function AgentsTable({agents, setSelectedAgent, setOpenAgentsDetails}) {
    return(
        <div className="bg-white rounded-2xl overflow-hidden mb-6 border border-[rgba(3,44,166,.09)] 
        shadow-[0_2px_12px_rgba(3,44,166,.06)]">
        {agents.length === 0
        ? (
        <div className="py-6 text-center text-[13px] text-slate-500 rounded-xl
        border-dashed border-[rgba(3,44,166,0.12)]">
            Aucun agent pour le moment
        </div>
        )
        :  
        (
            <table className="w-full border-collapse">
                <thead>
                    <tr
                    className="bg-[rgba(3,44,166,0.05)] cursor-pointer">
                        <th className="text-left px-5 py-3 text-[11px] font-medium tracking-widest 
                        uppercase text-slate-400">
                            Nom de l’agent
                        </th>
                        <th className="text-left px-5 py-3 text-[11px] font-medium tracking-widest 
                        uppercase text-slate-400">
                            Numéro SIP
                        </th>
                        <th className="text-left px-5 py-3 text-[11px] font-medium tracking-widest 
                        uppercase text-slate-400">
                            Statut
                        </th>
                        <th className="text-left px-5 py-3 text-[11px] font-medium tracking-widest 
                        uppercase text-slate-400">
                            Outils
                        </th>
                    </tr>
                </thead>
                <tbody>
                        {agents.length === 0 ? (
                        <tr>
                            <td colSpan="7" className="text-center py-6 text-sm text-slate-500">
                                Aucun agent pour le moment
                            </td>
                        </tr>
                        ) : (
                        agents.map((a, i) => (
                        <tr 
                        key={i}
                        onClick={() => {
                            setSelectedAgent(a);
                            setOpenAgentsDetails(true);
                        }}
                        className="border-t border-[rgba(3,44,166,0.06)] hover:bg-[rgba(3,44,166,.02)]
                        cursor-pointer">
                            <td className="p-[13px_20px]">
                                <div className="flex items-center gap-2.5">
                                    <div className={`w-8.5 h-8.5 rounded-[10px] flex items-center justify-center
                                    text-white text-[11px] font-extrabold shrink-0
                                        ${a.is_active ? "bg-linear-to-br from-[#032ca6] to-[#1a6bff]" 
                                        : "bg-linear-to-br from-[#64748b] to-[#94a3b8]"}`}>
                                            {a?.name ? a.name
                                            .split(" ")
                                            .map(word => word.charAt(0).toUpperCase())
                                            .slice(0,2)
                                            .join("") 
                                            : ""}
                                        </div>
                                    <div className="text-[13px] font-bold text-[#0a1628]"
                                    style={{fontFamily: "'Cabinet Grotesk',sans-serif"}}>
                                        {a.name}
                                    </div>
                                    <div className="text-[11px] text-[#9aabca] mt-0.5">
                                        {a.id.slice(0,20)}
                                    </div>
                                </div>
                            </td>
                            <td className="p-[13px_20px]">
                                <span className="text-sm text-[#374151]">
                                    {a?.sip_number || ''}
                                </span>
                            </td>
                            <td className="p-[13px_20px] text-center">
                                <div className="flex justify-center items-center">
                                    <span className={`flex items-center gap-1 text-sm font-medium py-1 px-2.5 rounded-[20px] border
                                        ${a.is_active ? "text-[#059669] bg-[rgba(5,150,105,.08)] border-[rgba(5,150,105,.20)]" : "text-[#9ca3af] bg-[#9ca3af34] border-[#9ca3af34]"}`}>
                                        <span className={`w-1.5 h-1.5 shrink-0 rounded-full
                                            ${a.is_active ? "bg-[#22c55e] shadow-[0_0_5px_#22c55e]" : "bg-[#d1d5db]"}`}>
                                        </span>
                                        {a.is_active ? "Actif" : "Inactif"}
                                    </span>
                                </div>
                            </td>
                            <td className="p-[13px_20px]">
                                <span className="text-sm font-semibold text-[#0a1628]"
                                style={{fontFamily: "'Cabinet Grotesk',sans-serif"}}>
                                    {a?.tools?.filter(t => t.is_enabled).length}
                                </span>
                                <span className="text-[11px] text-[#9aabca]">
                                    / {a?.tools?.length}
                                </span>
                            </td>
                        </tr>
                        )))}
                    </tbody>
                </table>
        )
            }
        </div>
    )
}