import { useState, useEffect } from "react";
import { handleUnauthorized }  from "../../utils/auth";
import Logo from "../../assets/image.png";
import Campaigns from "./Campaigns";

export default function CampaignOverview() {

    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(false);

    //filters
    const [agentId, setAgentId] = useState("");
    const [startDate, setStartDate] = useState("");
    const [status, setStatus] = useState("");

    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
            setLoading(true);

            const token = localStorage.getItem("token");

            const params = new URLSearchParams();

            if (agentId) params.append("agentId", agentId);
            if (startDate) params.append("startDate", startDate);
            if (status) params.append("status", status);

            const url = `https://api.voixup.fr/me/campaigns?${params.toString()}`;
    
            const res = await fetch(url,{
                headers: {
                accept: "application/json",
                authorization: `Bearer ${token}`,
                },
            });

            if (res.status === 401) {
                handleUnauthorized(401);
                return;
            }

            const data = await res.json();
            console.log("Campaigns:", data);
            setCampaigns(data);
        } catch (error) {
            console.error("Error fetching campaigns:", error);
            setCampaigns([]);
        } finally {
            setLoading(false);
        }
    }
        fetchCampaigns();
    }, [agentId, startDate, status]);

    return (
        <div className="py-6">
            <div className="max-w-7xl mx-auto lg:px-6 px-4">
                <div>
                    <img src={Logo} alt="Logo" className="w-14" />
                    <h2 className="text-[17px] font-extrabold text-[#0a1628] tracking-tight mb-6">
                        Campagnes
                    </h2>
                </div>

                {/* Filters */}
                <div className="flex items-center gap-4 mb-6 flex-wrap">
                    <input type="text"
                    placeholder="ID de l’assisstant IA"
                    value={agentId}
                    onChange={(e) => setAgentId(e.target.value)}
                    className="border border-[rgba(3,44,166,.14)] text-sm rounded-[9px] p-[7px_12px] bg-white
                    w-65 text-[#0a1628]" />
                    <input type="date"
                    placeholder="Date de début"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="border border-[rgba(3,44,166,.14)] text-sm rounded-[9px] p-[7px_12px] bg-white
                    w-65 text-[#0a1628]" />
                    <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="border border-[rgba(3,44,166,.14)] text-sm rounded-[9px] p-[7px_12px] bg-white
                    w-65 text-[#0a1628]"
                    >
                        <option value="">Tous les statuts</option>
                        <option value="READY">Prête</option>
                        <option value="DRAFT">Brouillon</option>
                        <option value="RUNNING">En cours</option>
                        <option value="PAUSED">En pause</option>
                        <option value="FAILED">Échouée</option>
                        <option value="CANCELLED">Annulée</option>
                        <option value="COMPLETED">Terminée</option>
                    </select>
                </div>

                <Campaigns 
                loading={loading} 
                campaigns={campaigns}
                setCampaigns={setCampaigns} />
            </div>

        </div>
    )
}