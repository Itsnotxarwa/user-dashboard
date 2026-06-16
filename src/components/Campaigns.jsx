import { useState } from "react";
import Sidebar from "./sidebar";
import TopBar from "./dashboard-components/TopBar";
import CampaignOverview from "./campaigns-components/CampaignOverview";
import CreateCampaign from "./campaigns-components/CreateCampaign";

export default function Campaigns() {
    const [showCreateCampaign, setShowCreateCampaign] = useState(false);

    return(
        <div className="flex min-h-screen bg-white text-black dark:bg-[#0d1117] dark:text-white">
            <Sidebar />
            <main className="bg-[rgba(3,44,166,0.09)] flex-1 ml-64">
                <TopBar activeNav={{name: "Campagnes"}} setShowCreateCampaign={setShowCreateCampaign}  />
                <CampaignOverview />
            </main>
            {showCreateCampaign && (
                <CreateCampaign />
            )}
        </div>
    )
}