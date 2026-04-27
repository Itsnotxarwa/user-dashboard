import { useState } from "react";
import AgentsTable from "./AgentsTable";

export default function AgentsOverview({agents, selectedAgent, setSelectedAgent}) {
    const [openAgentDetails, setOpenAgentsDetails] = useState(false);

    return(
        <div className="min-h-screen bg-[rgba(3,44,166,0.09)] py-6">
            <div className="max-w-7xl mx-auto lg:px-6 px-4">
                <h2 className="text-[17px] font-extrabold text-[#0a1628] tracking-tight mb-6">
                    Historique des appels
                </h2>
            
                <AgentsTable agents={agents}
                setSelectedAgent={setSelectedAgent}
                setOpenAgentsDetails={setOpenAgentsDetails} />
            </div>
            {openAgentDetails && (
                <AgentDetails
                selectedAgent={selectedAgent}
                onClose={() => setOpenAgentsDetails(false)} />
            )}
        </div>
    )
}