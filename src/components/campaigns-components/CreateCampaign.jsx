import { Plus, X } from "lucide-react";
import { useState, useEffect } from "react";
import apiFetch from "../shared/apiFetch";

export default function CreateCampaign({ onClose, onCancel, setCampaigns }) {
    const [agents, setAgents] = useState([]);

    useEffect(() => {
        const fetchAgents = async () => {
            try {

        const res = await apiFetch(`https://api.mazia.ai/me/agents`);

        if (!res) return;
        
        if (!res.ok) {
            const data = await res.json();
            alert(data.message || "Échec de la récupération des agents");
            setAgents([]);
        }
            const data = await res.json();
            setAgents(data);

            } catch (err) {
            console.error(err);
            alert("Erreur réseau, vérifiez votre connexion");
            setAgents([]);
            }
        };

        fetchAgents();
    },[]);

    const [loading, setLoading] = useState(false);

    const [campaignData, setCampaignData] = useState({
        name: "",
        agent_id: "",
        start_date: "",
        batch_size: 1,
        time_slots: [],
    });
 
    const addTimeSlot = () => {
        if(campaignData.time_slots.length >= 2) {
            alert("Maximum de 2 créneaux horaires autorisés");
            return;
        }

        setCampaignData(prev => ({
            ...prev,
            time_slots: [...prev.time_slots, { start_time: "", end_time: "" }],
        }));
    };

    const removeTimeSlot = (index) => {
        setCampaignData(prev => ({
            ...prev,
            time_slots: prev.time_slots.filter((_, i) => i !== index),
        }));
    };

    const handleTimeSlotChange = (index, field, value) => {
        setCampaignData(prev => {
            const updatedSlots = [...prev.time_slots];
            updatedSlots[index] = { ...updatedSlots[index], [field]: value };
            return { ...prev, time_slots: updatedSlots };
        });
    };

    const [errors, setErrors] = useState({
        name: "",
        agent_id: "",
        start_date: "",
        batch_size: "",
        time_slots: "",
    });

    const createCampaign = async () => {
        if (loading) return;

         // validate all fields at once
        const newErrors = {
            name: !campaignData.name.trim() ? "Le nom de la campagne est requis" : "",
            agent_id: !campaignData.agent_id ? "Veuillez sélectionner un agent" : "",
            start_date: !campaignData.start_date ? "La date de début est requise" : "",
            batch_size: (!campaignData.batch_size || campaignData.batch_size < 1) ? "La taille du lot doit être au moins de 1" : "",
            time_slots: campaignData.time_slots.length === 0
                ? "Au moins un créneau horaire est requis"
                : campaignData.time_slots.some(s => !s.start_time || !s.end_time)
                ? "Veuillez remplir tous les horaires des créneaux"
                : "",
        };

        setErrors(newErrors);

        if (Object.values(newErrors).some(e => e !== "")) return;

        try {
            setLoading(true);

            const res = await apiFetch(`https://api.mazia.ai/me/campaign`, {
                method: "POST",
                body: JSON.stringify({
                    name: campaignData.name,
                    agent_id: campaignData.agent_id,
                    start_date: campaignData.start_date,
                    batch_size: campaignData.batch_size,
                    time_slots: campaignData.time_slots,
                }),
            });

            if (!res) return;

            const data = await res.json();

            if (!res.ok) {
                setErrors(prev => ({ ...prev, name: data?.detail || "Échec de la création de la campagne" }));
            }

            setCampaigns(prev => [...prev, data]);
            onClose();
        } catch (error) {
            console.error(error);
            setErrors(prev => ({ ...prev, name: error?.message || "Une erreur est survenue" }));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center
        bg-[rgba(10,22,40,0.38)] backdrop-blur-sm p-5">
            <div className="bg-white/90 border border-[rgba(3,44,166,0.15)] rounded-3xl
            shadow-[0_24px_80px_rgba(3,44,166,0.18)] w-full lg:max-w-md overflow-hidden
            animate-[popIn_0.22s_cubic-bezier(0.34,1.56,0.64,1)_both] max-h-[90vh]
            flex flex-col">

                {/* Header */}
                <div className="flex items-center gap-3 px-6 py-5 border-b shrink-0 border border-[rgba(3,44,166,0.08)]
                bg-linear-to-br from-white to-[rgba(3,44,166,0.04)]">
                    <div className="flex-1 min-w-0">
                        <div className="font-bold text-slate-900 text-base tracking-tight"
                            style={{ fontFamily: "'Cabinet Grotesk',sans-serif" }}>
                            Nouvelle campagne
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5 truncate">
                            Remplissez les détails de la campagne ci-dessous
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] px-2.5 py-1 rounded-full font-medium bg-[rgba(3,44,166,0.07)]
                        text-[#032ca6] border border-[rgba(3,44,166,0.14)]">
                            Nouvelle campagne
                        </span>
                        <button
                            className="w-7.5 h-7.5 rounded-lg border border-[rgba(3,44,166,0.12)]
                            bg-[rgba(3,44,166,0.04)] text-[#9aabca] cursor-pointer text-[16px] flex items-center
                            justify-center"
                            onClick={onClose}>
                            <X />
                        </button>
                    </div>
                </div>
 
                {/* Form */}
                <div className="overflow-y-auto scroll flex-1 px-6 py-5 space-y-4">
                    <div>
                        <label className="block mb-1.5 text-[10px] text-[#7a8bb5] tracking-wider uppercase">
                            Nom de la campagne <span className="text-[#ef4444]">*</span>
                        </label>
                        <input
                            value={campaignData.name}
                            onChange={(e) => setCampaignData({ ...campaignData, name: e.target.value })}
                            placeholder="Ma campagne"
                            className="w-full px-3 py-2 text-sm border rounded-md outline-none
                            border-gray-300 placeholder-gray-400 focus:border-[#032ca6]"
                        />
                        {errors.name && <p className="mt-1 text-[10px] text-[#f85149]">{errors.name}</p>}
                    </div>
 
                    <div>
                        <label className="block mb-1.5 text-[10px] text-[#7a8bb5] tracking-wider uppercase">
                            Agent <span className="text-[#ef4444]">*</span>
                        </label>
                        <select
                            value={campaignData.agent_id}
                            onChange={(e) => setCampaignData({ ...campaignData, agent_id: e.target.value })}
                            className="w-full px-3 py-2 text-sm border rounded-md outline-none
                            border-gray-300 placeholder-gray-400 focus:border-[#032ca6]">
                            <option value="">Sélectionnez un agent</option>
                            {agents
                                ?.filter((agent) => agent.type === "outbound")
                                .map((agent) => (
                                    <option key={agent.id} value={agent.id}>
                                        {agent.name}
                                    </option>
                                ))}
                        </select>
                        {errors.agent_id && <p className="mt-1 text-[10px] text-[#f85149]">{errors.agent_id}</p>}
                    </div>
 
                    <div>
                        <label className="block mb-1.5 text-[10px] text-[#7a8bb5] tracking-wider uppercase">
                            Date de début <span className="text-[#ef4444]">*</span>
                        </label>
                        <input
                            className="w-full px-3 py-2 text-sm border rounded-md outline-none
                            border-gray-300 placeholder-gray-400 focus:border-[#032ca6]"
                            value={campaignData.start_date}
                            onChange={(e) => setCampaignData({ ...campaignData, start_date: e.target.value })}
                            type="date"
                        />
                        {errors.start_date && <p className="mt-1 text-[10px] text-[#f85149]">{errors.start_date}</p>}
                    </div>
 
                    <div>
                        <label className="block mb-1.5 text-[10px] text-[#7a8bb5] tracking-wider uppercase">
                            Taille du lot <span className="text-[#ef4444]">*</span>
                        </label>
                        <input
                            className="w-full px-3 py-2 text-sm border rounded-md outline-none
                            border-gray-300 placeholder-gray-400 focus:border-[#032ca6]"
                            value={campaignData.batch_size}
                            onChange={(e) => setCampaignData({ ...campaignData, batch_size: Number(e.target.value) })}
                            type="number" min={1} max={500}
                        />
                        {errors.batch_size && <p className="mt-1 text-[10px] text-[#f85149]">{errors.batch_size}</p>}
                    </div>
 
                    {/* Time Slots */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-[10px] text-[#7a8bb5] tracking-wider uppercase">
                                Créneaux horaires <span className="text-[#ef4444]">*</span>
                            </label>
                            <button
                                className="text-[10px] px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1
                                bg-[rgba(3,44,166,.08)] text-[#032ca6] border border-[rgba(3,44,166,.16)]"
                                onClick={addTimeSlot}
                                disabled={campaignData.time_slots.length >= 2}
                                >
                                <Plus size={12} />
                                Ajouter un créneau
                            </button>
                        </div>
 
                        {campaignData.time_slots.length === 0 && (
                            <p className="text-[11px] text-[#b0bdd4] text-center py-3 border border-dashed
                            border-[rgba(3,44,166,0.15)] rounded-xl">
                                Aucun créneau horaire ajouté pour le moment
                            </p>
                        )}

                        {errors.time_slots && <p className="mt-1 text-[10px] text-[#f85149]">{errors.time_slots}</p>}
 
                        <div className="space-y-2">
                            {campaignData.time_slots.map((slot, index) => (
                                <div key={index}
                                    className="flex items-center gap-2 p-[10px_12px] rounded-[10px]
                                    bg-[rgba(3,44,166,.03)] border border-[rgba(3,44,166,.09)]">
                                    <span className="text-xs text-[#7a8bb5] whitespace-nowrap">Début</span>
                                    <input
                                        type="time"
                                        value={slot.start_time}
                                        onChange={(e) => handleTimeSlotChange(index, "start_time", e.target.value)}
                                        className="w-full px-3 py-2 text-sm border rounded-md outline-none
                                        border-gray-300 focus:border-[#032ca6]"
                                    />
                                    <span className="text-xs text-[#7a8bb5] whitespace-nowrap">Fin</span>
                                    <input
                                        type="time"
                                        value={slot.end_time}
                                        onChange={(e) => handleTimeSlotChange(index, "end_time", e.target.value)}
                                        className="w-full px-3 py-2 text-sm border rounded-md outline-none
                                        border-gray-300 focus:border-[#032ca6]"
                                    />
                                    <button
                                        className="w-6 h-6 shrink-0 rounded-md border border-[rgba(220,38,38,.18)]
                                        bg-[rgba(220,38,38,.06)] text-[#dc2626] cursor-pointer flex items-center
                                        justify-center"
                                        onClick={() => removeTimeSlot(index)}>
                                        <X size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
 
                {/* Footer */}
                <div className="flex items-center justify-end px-6 py-4 border-t
                border-[rgba(3,44,166,0.08)] bg-[rgba(3,44,166,0.015)] shrink-0">
                    <div className="flex gap-2.5">
                        <button
                            onClick={onCancel}
                            className="cursor-pointer px-5 py-2.5 rounded-xl text-xs font-medium text-slate-500
                            hover:text-slate-700 transition-all border border-[rgba(3,44,166,0.13)]
                            bg-[rgba(3,44,166,0.04)]">
                            Annuler
                        </button>
                        <button
                            disabled={loading}
                            onClick={createCampaign}
                            className={`cursor-pointer px-6 py-2.5 rounded-xl text-xs font-bold text-white
                                ${loading ? "opacity-50 cursor-not-allowed bg-[#032ca6]" : "bg-[#032ca6] border border-[#032ca6]"}
                            transition-all flex items-center gap-1.5`}
                            style={{ boxShadow: "0 4px 14px rgba(3,44,166,0.25)" }}>
                            {loading ? "Création en cours..." : "Créer la campagne"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}