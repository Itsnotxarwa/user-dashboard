import { useState, useEffect } from "react";
import Sidebar from "./sidebar";
import TopBar from "./dashboard-components/TopBar";
import CallsHeader from "./calls-components/CallsHeader";
import CallsTable from "./calls-components/callsTable";
import { handleUnauthorized } from "../utils/auth.js";
export default function CallsHistory() {
    const [sessions, setSessions] = useState([]);
    const [filter, setFilter] = useState("ALL");
    const filteredSessions = filter === "ALL" ? sessions : sessions.filter(c => c.status === filter);

    useEffect(() => {
        const getCallSessions = async (page = 1, limit = 20) => {
        try {
            const token = localStorage.getItem("token");
            
            const res = await fetch(
                `https://api.voixup.fr/me/calls/sessions?page=${page}&limit=${limit}`,
                {
                    headers: {
                    Authorization: `Bearer ${token}`,
                    accept: "application/json",
                    },
                }
            );

        if (res.status === 401) {
            handleUnauthorized(401);
            return;
        }

        const data = await res.json();

        if (!res.ok) {
            console.log("ERROR:", data);
            return;
        }

        console.log("CALL SESSIONS:", data);
        setSessions(data || [])
        return data;

        } catch (err) {
            console.log(err);
        }
    };

    getCallSessions();
    },[])
    return(
        <div className="flex min-h-screen bg-white text-black">
            <Sidebar />
            <main className="bg-linear-to-br from-white to-[rgba(3,44,166,0.09)] flex-1">
                <TopBar activeNav={{name: "Historique des appels"}} />
                <div className="p-6">
                    <CallsHeader onChange={(page, limit) => { sessions(page, limit)}} sessions={sessions} />
                    {sessions.length === 0 ? null : (
                        <div className="flex items-center gap-3 my-4">
                            <div className="flex gap-1 p-1 rounded-xl bg-[rgba(3,44,166,.05)] border
                            border-[rgba(3,44,166,.10)]">
                        {["ALL", "ANSWERED", "BUSY"].map((status) => {
                            const isActive = filter === status;
                            const statusLabels = {
                                ALL: "Tous",
                                ANSWERED: "Répondus",
                                BUSY: "Occupé",
                            };
                            return (
                                <button
                                    key={status}
                                    className={`px-3 py-1.5 text-xs transition-all rounded-xl
                                        ${isActive ? "bg-[#032ca6] text-white font-medium" 
                                            : "text-slate-500 hover:bg-white"
                                        }
                                    `}
                                    onClick={() => setFilter(status)}
                                >
                                    {statusLabels[status]}
                                </button>
                            );
                        })}
                    </div>
                </div>
                )}
                    <CallsTable filteredSessions={filteredSessions} />
                </div>
            </main>
        </div>
    )
}