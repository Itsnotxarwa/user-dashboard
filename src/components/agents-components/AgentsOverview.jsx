import AgentsTable from "./AgentsTable";

export default function AgentsOverview({agents}) {
    <div className="min-h-screen bg-[rgba(3,44,166,0.09)] flex max-w-7xl mx-auto">
        <AgentsTable agents={agents} />
    </div>
}