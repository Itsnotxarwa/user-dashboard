import { useState, useEffect, useCallback } from "react";
import Sidebar from "./sidebar";
import TopBar from "./dashboard-components/TopBar";
import CallsHeader from "./calls-components/CallsHeader";
import CallsTable from "./calls-components/callsTable";
import { handleUnauthorized } from "../utils/auth.js";
import SessionDrawer from "./calls-components/SessionDrawer";
import CallsOverview from "./calls-components/CallsOverview.jsx";
export default function CallsHistory() {
    const [sessions, setSessions] = useState([]);
    const [selectedSession, setSelectedSession] = useState(null);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [loading, setLoading] = useState(false);
    const [range, setRange] = useState("30");

    //filters
    const [type, setType] = useState("");
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(20);

    const token = localStorage.getItem("token");
    
    const fetchSessions = useCallback(async () => {
        try{
            setLoading(true);

            const params = new URLSearchParams();

            if (type) params.append("type", type);
            params.append("page", page);
            params.append("page_size", limit);

            const url = `https://api.voixup.fr/me/calls/sessions?${params.toString()}`;

            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "accept": "application/json",
                    "authorization": `Bearer ${token}`
                }
            });

            if (response.status === 401) {
                handleUnauthorized(401);
                return;
            }
            
            if (response.status === 404) {
                setSessions([]);
                return;
            }
            
            if (!response.ok) {
                throw new Error("Failed to fetch sessions");
            }
            
            const data = await response.json();
            setSessions(data || []);
        } catch (error) {
            console.error("Error fetching sessions:", error);
            setSessions([]);
        } finally {
            setLoading(false);
        }
    },[token, type, page, limit]);

    useEffect(() => {
        fetchSessions();
    }, [fetchSessions]);
    
    return(
        <div className="flex min-h-screen bg-white text-black">
            <Sidebar />
            <main className="bg-[rgba(3,44,166,0.09)] flex-1">
                <TopBar activeNav={{name: "Historique des appels"}} />
                <div className="py-6">
                    <div className="max-w-7xl mx-auto lg:px-6 px-4">
                        <CallsHeader range={range} setRange={setRange} />

                        <CallsOverview range={range} />

                        {/* filters */}
                        <div className="flex items-center gap-4 mb-6 flex-wrap">
                            <select 
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="border border-[rgba(3,44,166,.14)] text-sm rounded-[9px] p-[7px_12px] bg-white
                            w-65 text-[#0a1628] cursor-pointer">
                                <option value="">Tous les types d’appels</option>
                                <option value="inbound">Entrants</option>
                                <option value="outbound">Sortants</option>
                            </select>
                            <div className="flex items-center gap-1.5">
                                <label className="text-sm text-[#0a1628]">
                                    Page
                                </label>
                                <input 
                                type="number"
                                value={page}
                                onChange={(e) => setPage(Number(e.target.value))}
                                className="border border-[rgba(3,44,166,.14)] text-sm rounded-[9px] p-[7px_12px] bg-white
                                w-15 text-[#0a1628] text-center" />
                            </div>
                            <div className="flex items-center gap-1.5">
                                <label className="text-sm text-[#0a1628]">
                                    limit
                                </label>
                                <input 
                                value={limit}
                                onChange={(e) => setLimit(Number(e.target.value))}
                                type="number"
                                className="border border-[rgba(3,44,166,.14)] text-sm rounded-[9px] p-[7px_12px] bg-white
                                w-15 text-[#0a1628] text-center" />
                            </div>
                        </div>

                        <CallsTable 
                        sessions={sessions} 
                        loading={loading}
                        setSelectedSession={setSelectedSession}
                        setOpenDrawer={setOpenDrawer} />
                    </div>
                </div>
            </main>
            {openDrawer && (
                <SessionDrawer 
                selectedSession={selectedSession}
                onClose={() => setOpenDrawer(false)}
                open={openDrawer} />
            )}
        </div>
    )
}