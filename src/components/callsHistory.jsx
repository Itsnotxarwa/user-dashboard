import { useState, useEffect } from "react";
import Sidebar from "./sidebar";
import TopBar from "./dashboard-components/TopBar";
import CallsHeader from "./calls-components/CallsHeader";
import CallsTable from "./calls-components/callsTable";
import { handleUnauthorized } from "../utils/auth.js";
export default function CallsHistory() {
    const [sessions, setSessions] = useState([]);

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
                    <CallsTable sessions={sessions} />
                </div>
            </main>
        </div>
    )
}