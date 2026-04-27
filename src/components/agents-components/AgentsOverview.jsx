import AgentsTable from "./AgentsTable";

export default function AgentsOverview({agents}) {
    return(
        <div className="min-h-screen bg-[rgba(3,44,166,0.09)]">
            <div className="max-w-7xl mx-auto lg:px-6 px-4">
                <h2 className="text-[17px] font-extrabold text-[#0a1628] tracking-tight">
                    Historique des appels
                </h2>
            
                <AgentsTable agents={agents} />
            </div>
        </div>
    )
}