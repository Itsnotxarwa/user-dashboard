import { useEffect, useState } from "react";
import TopBar from "./dashboard-components/TopBar";
import Sidebar from "./sidebar";
import { handleUnauthorized } from "../utils/auth";
import AgentsOverview from "./agents-components/AgentsOverview";

export default function Agents() {
    const [agents, setAgents] = useState([]);

    useEffect(() => {
        const getAgents = async () => {
            try {
                const token = localStorage.getItem("token");

                const res = await fetch("https://api.voixup.fr/me/agents", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    });

                if (res.status === 401) {
                    handleUnauthorized(401);
                    return;
                }

                if (res.status === 404) {
                    setAgents([]);
                    return;
                }
                
                const data = await res.json();
                console.log(data);

                setAgents(data);
                
            } catch (err) {
                console.error(err);
                setAgents([]);
            }
        };
        getAgents()
    },[])
    
    return(
        <div className="flex min-h-screen bg-white text-black">
            <Sidebar />
            <main className="bg-linear-to-br from-white to-[rgba(3,44,166,0.09)] flex-1">
                <TopBar activeNav={{name: "Mon IA téléphonique"}} />
                <AgentsOverview agents={agents} />
            </main>
        </div>
    )
}