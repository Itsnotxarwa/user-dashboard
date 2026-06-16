import { useEffect, useState } from "react";
import TopBar from "./dashboard-components/TopBar";
import Sidebar from "./sidebar";
import AgentsOverview from "./agents-components/AgentsOverview";
import AgentDetails from "./agents-components/AgentDetails";
import apiFetch from "./shared/apiFetch";

export default function Agents() {
    const [agents, setAgents] = useState([]);
    const [selectedAgent, setSelectedAgent] = useState(null);
    const [openAgentDetails, setOpenAgentsDetails] = useState(false);

    useEffect(() => {
        const getAgents = async () => {
            try {

                const res = await apiFetch("https://api.mazia.ai/me/agents", {
                    method: "GET",
                    });

                if (!res) return;
                
                const data = await res.json();
                setAgents(data);
                
            } catch (err) {
                console.error(err);
                alert("Network error, check your connection");
                setAgents([]);
            }
        };
        getAgents()
    },[])
    
    return(
        <div className="flex min-h-screen bg-white text-black dark:bg-[#0d1117] dark:text-white">
            <Sidebar />
            <main className="bg-[rgba(3,44,166,0.09)] flex-1 ml-64">
                <TopBar activeNav={{name: "Mon IA téléphonique"}} />
                <AgentsOverview 
                agents={agents} 
                setSelectedAgent={setSelectedAgent}
                selectedAgent={selectedAgent}
                setOpenAgentsDetails={setOpenAgentsDetails} />
            </main>
            {openAgentDetails && (
                <AgentDetails
                selectedAgent={selectedAgent}
                onClose={() => setOpenAgentsDetails(false)} />
            )}
        </div>
    )
}