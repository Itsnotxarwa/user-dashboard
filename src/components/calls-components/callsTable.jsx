import { useState } from "react";
import { ChevronDown, Bot, User } from "lucide-react";

export default function CallsTable({filteredSessions, setSelectedSession, setOpenDrawer}) {
    const [openRow, setOpenRow] = useState(null);

    const formatDate = (datetime) => datetime.split("T")[0];
    const formatDuration = (seconds) => {
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${min}:${sec.toString().padStart(2, "0")}`;
    };

    const toggleRow = (id) => {
        setOpenRow(openRow === id ? null : id)
    }
    return(
        <div className="bg-white rounded-2xl overflow-hidden mb-6 border border-[rgba(3,44,166,.09)] 
        shadow-[0_2px_12px_rgba(3,44,166,.06)]">
            {filteredSessions.length === 0 ? (
                <div className="py-6 text-center text-sm text-slate-600 rounded-xl
                border-dashed border-[rgba(3,44,166,0.12)]">
                    Aucun appel pour le moment 
                </div>
            ) : (
            <table className="w-full border-collapse text-[13px]">
                <thead className="sticky top-0 bg-[#fafafa]">
                    <tr className="border-b border-[rgba(3,44,166,.07)]">
                        <th className="text-left px-5 py-2.5 text-[13px] font-medium tracking-widest uppercase text-slate-400">
                            De
                        </th>
                        <th className="text-left px-5 py-2.5 text-xs font-medium tracking-widest uppercase text-slate-400">
                            À
                        </th>
                        <th className="text-left px-5 py-2.5 text-xs font-medium tracking-widest uppercase text-slate-400">
                            Type
                        </th>
                        <th className="text-left px-5 py-2.5 text-xs font-medium tracking-widest uppercase text-slate-400">
                            Durée
                        </th>
                        <th className="text-left px-5 py-2.5 text-xs font-medium tracking-widest uppercase text-slate-400">
                            Statut
                        </th>
                        <th className="text-left px-5 py-2.5 text-xs font-medium tracking-widest uppercase text-slate-400">
                            Raison de fin
                        </th>
                        <th className="text-left px-5 py-2.5 text-xs font-medium tracking-widest uppercase text-slate-400">
                            Créé le
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {filteredSessions?.length === 0 ? (
                        <tr>
                            <td colSpan="8" className="text-center py-6 text-sm text-slate-600">
                                Aucun appel pour le moment
                            </td>
                        </tr>
                    ) : (
                    filteredSessions?.map((session) => {
                        return(
                        <>
                            <tr  
                            key={session.id}
                            onClick={() => {
                                setSelectedSession(session);
                                setOpenDrawer(true);
                            }}
                            className={`border-b border-[rgba(3,44,166,.05)] hover:bg-[rgba(3,44,166,.02)] 
                            cursor-pointer`}>
                                <td className="px-5 py-2.5 text-[13px] text-slate-800">
                                    {session.from_number}
                                </td>
                                <td className="px-5 py-2.5 text-[13px] text-slate-800">
                                    {session.to_number}
                                </td>
                                <td className="px-5 py-2.5 text-[13px] text-slate-800">
                                    {session.call_type}
                                </td>
                                <td className="px-5 py-2.5 text-[13px] text-slate-800">
                                    {formatDuration(session.duration_seconds)}
                                </td>
                                <td className="px-5 py-2.5 text-[13px] flex items-center">
                                    <span className={`py-1 px-2 rounded-full border ${session.call_status === "ANSWERED" 
                                    ? "bg-[rgba(5,150,105,.08)] text-[#059669] border-[rgba(5,150,105,.20)]" 
                                    : "bg-[rgba(220,38,38,.08)] text-[#dc2626] border-[rgba(220,38,38,.18)]"}`}>
                                        {session.call_status === "ANSWERED" ? "Répondus" : "Occupé"}
                                    </span>
                                </td>
                                <td className="px-5 py-2.5 text-[13px] text-slate-800">
                                    {session.disconnect_reason === "HANGUP_BY_CALLEE" ? "Raccroché par l’interlocuteur" : "Raccroché par l’assistant IA"}
                                </td>
                                <td className="px-5 py-2.5 text-[13px] text-slate-800">
                                    {formatDate(session.created_at)}
                                </td>
                            </tr>
                        </>
                    )}))}
                </tbody>
            </table>
            )}
        </div>
    )
}