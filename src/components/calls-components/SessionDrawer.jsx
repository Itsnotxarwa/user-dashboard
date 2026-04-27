import { Phone, X, Clock, Wifi, Bot, Calendar, User, ArrowUpRight } from "lucide-react";

export default function SessionDrawer({selectedSession, onClose, open}) {
    const formatDate = (datetime) => datetime.split("T")[0];
    const formatDuration = (seconds) => {
        if (!seconds && seconds !== 0) return "0:00";
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${min}:${sec.toString().padStart(2, "0")}`;
    };

    let parsedTranscription = [];

    try {
        parsedTranscription = selectedSession?.transcription
            ? JSON.parse(selectedSession.transcription)
            : [];
    } catch {
        parsedTranscription = [];
    }
    
    const hasType = selectedSession?.call_type && selectedSession?.call_type !== "None";
    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(10,22,40,0.38)] 
        backdrop-blur-sm p-5">
            <div className={`flex-col fixed top-0 right-0 h-full  z-50 bg-white border-l scroll overflow-y-auto w-120 shrink-0 border-[rgba(3,44,166,.12)]
            shadow-[-4px_0_24px_rgba(3,44,166,.07)] ${
                open ? "translate-x-0" : "translate-x-full"
            }`}>
                {/* HEADER */}
                <div className="sticky top-0 z-10 flex items-center gap-3 px-5 py-4 border-b border-[rgba(3,44,166,.08)]
                bg-linear-to-br from-white to-[rgba(3,44,166,.04)]">
                    <div className="w-9 h-9 rounded-[11px] bg-linear-to-br from-[#032ca6] to-[#1a6bff]
                    flex items-center justify-center text-white shrink-0">
                        <Phone />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="font-bold text-slate-900 text-base tracking-tight" 
                        style={{fontFamily:"'Cabinet Grotesk',sans-serif;"}}>
                            Session Details
                        </div>
                        <div className="text-xs text-slate-400 truncate font-mono">
                            {selectedSession?.id || ""}
                        </div>
                    </div>
                    <button
                    onClick={onClose} 
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 
                    hover:text-slate-700 text-lg shrink-0 transition-all border border-[rgba(3,44,166,.12)]">
                        <X />
                    </button>
                </div>
                {/* Body */}
                <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
                    <div className="flex flex-wrap gap-2">
                        <span className={`text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1 border
                        ${selectedSession.call_status === "ANSWERED" ? "text-[#059669] bg-[rgba(5,150,105,.08)] border-[rgba(5,150,105,.20)]" 
                        : "text-[#dc2626] bg-[rgba(220,38,38,.08)] border-[rgba(220,38,38,.20)]"}`}>
                            <span className={`w-2 h-2 shrink-0 rounded-full
                                ${selectedSession.call_status === "ANSWERED" ? "bg-[#22c55e] shadow-[0_0_5px_#22c55e]" : "bg-[#f87171] shadow-[0_0_5px_#f87171]"}`}>
                            </span>
                            {selectedSession?.call_status}
                        </span>
                        {hasType && (
                        <span className={`text-xs px-3 py-1 rounded-full flex items-center gap-1 border
                            ${selectedSession.call_type === "outbound" ? "text-[#032ca6] bg-[rgba(3,44,166,.08)] border-[rgba(3,44,166,.20)]" 
                            : "text-[#059669] bg-[rgba(5,150,105,.08)] border-[rgba(5,150,105,.020)]"}`}>
                                <ArrowUpRight size={12} />
                                {selectedSession?.call_type}
                        </span>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <div className="p-3 rounded-[10px] bg-[rgba(3,44,166,0.03)] border border-[rgba(3,44,166,0.08)]">
                            <div className="flex items-center gap-1 text-[9px] text-[#9aabca] uppercase mb-1">
                                <Phone size={12} className="text-[#032ca6]" />
                                De
                            </div>
                            <div className="text-xs font-semibold text-[#374151] font-mono break-all">
                                {selectedSession?.from_number || ""}
                            </div>
                        </div>

                        <div className="p-3 rounded-[10px] bg-[rgba(3,44,166,0.03)] border border-[rgba(3,44,166,0.08)]">
                            <div className="flex items-center gap-1 text-[9px] text-[#9aabca] uppercase tracking-[0.08em] mb-1">
                                <Phone size={12} className="text-[#032ca6]" />
                                Vers
                            </div>
                            <div className="text-xs font-semibold text-[#374151] font-mono break-all">
                                {selectedSession?.to_number || ""}
                            </div>
                        </div>

                        <div className="p-3 rounded-[10px] bg-[rgba(3,44,166,0.03)] border border-[rgba(3,44,166,0.08)]">
                            <div className="flex items-center gap-1 text-[9px] text-[#9aabca] uppercase tracking-[0.08em] mb-1">
                                <Clock size={12} className="text-[#032ca6]" />
                                Durée
                            </div>
                            <div className="text-xs font-semibold text-[#374151] font-mono">
                                {formatDuration(selectedSession?.duration_seconds || "")}
                            </div>
                        </div>

                        <div className="p-3 rounded-[10px] bg-[rgba(3,44,166,0.03)] border border-[rgba(3,44,166,0.08)]">
                            <div className="flex items-center gap-1 text-[9px] text-[#9aabca] uppercase tracking-[0.08em] mb-1">
                                <Wifi size={12} className="text-[#032ca6]" />
                                Raison fin
                            </div>
                            <div className="text-xs font-semibold text-[#374151] font-mono">
                                {selectedSession?.disconnect_reason || ""}
                            </div>
                        </div>

                        <div className="p-3 rounded-[10px] bg-[rgba(3,44,166,0.03)] border border-[rgba(3,44,166,0.08)] col-span-2">
                            <div className="flex items-center gap-1 text-[9px] text-[#9aabca] uppercase tracking-[0.08em] mb-1">
                                <Calendar size={12} className="text-[#032ca6]" />
                                Créé le
                                </div>
                                <div className="text-xs font-semibold text-[#374151] font-mono break-all">
                                {formatDate(selectedSession.created_at)}
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center gap-3">
                        <div className="flex-1 h-px bg-[rgba(3,44,166,0.07)]" />
                        <span className="text-xs uppercase tracking-widest text-slate-500">
                        Transcription
                        </span>
                        <div className="flex-1 h-px bg-[rgba(3,44,166,0.07)]" />
                    </div>

                    {parsedTranscription.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            <span className="text-xs px-2 py-1 rounded bg-[rgba(3,44,166,0.06)] text-blue-600 border 
                            border-[rgba(3,44,166,0.14)]">
                                {parsedTranscription.length} messages
                            </span>
                            <span className="text-xs px-2 py-1 rounded bg-[rgba(3,44,166,0.06)] text-blue-600 border 
                            border-[rgba(3,44,166,0.14)] flex items-center justify-center gap-1">
                                <Bot size={12} />
                                {parsedTranscription.filter(m => m.role === "assistant").length} AI
                            </span>
                            <span className="text-xs px-2 py-1 rounded bg-slate-100 text-slate-600 border 
                            border-slate-200 flex items-center justify-center gap-1">
                                <User size={12} />
                                {parsedTranscription.filter(m => m.role === "user").length} client
                            </span>
                        </div>
                    )}

                    {parsedTranscription && parsedTranscription.length > 0 ? (
                        <div className="flex flex-col gap-3 pb-3">
                            {parsedTranscription.map((msg, i) => {
                                const isAI = msg.role === "assistant";

                                return (
                                <div key={i} className={`flex gap-2 ${isAI ? "" : "flex-row-reverse"}`}>
                                    <div
                                    className="w-7 h-7 rounded-full flex items-center justify-center text-white mt-1"
                                    style={{
                                        background: isAI
                                        ? `linear-gradient(135deg, #032ca6, #1a6bff)`
                                        : "linear-gradient(135deg,#475569,#64748b)",
                                    }}
                                    >
                                        {isAI ? <Bot size={12} /> : <User size={12} />}
                                    </div>

                                    <div
                                        className={`max-w-[80%] text-xs p-3 border ${
                                        isAI
                                            ? "bg-[rgba(3,44,166,0.06)] border-[rgba(3,44,166,0.13)] text-slate-900 rounded-tl-sm rounded-2xl"
                                            : "bg-slate-50 border-slate-200 text-slate-700 rounded-tr-sm rounded-2xl"
                                        }`}
                                    >
                                        <div className="text-[10px] uppercase font-semibold mb-1 flex items-center gap-1 text-slate-500">
                                        {isAI ? (
                                            <>
                                            <Bot size={10} /> AI Agent
                                            </>
                                        ) : (
                                    <>
                                        <User size={10} /> Client
                                    </>
                                    )}
                                </div>
                                {msg.content}
                                </div>
                            </div>
                            );
                        })}
                        </div>
                    ) : (
                        <div className="text-center text-sm text-slate-400 py-10">
                            No transcription available for this call.
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}