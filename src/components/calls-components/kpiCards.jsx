import { CheckCircle, Clock, Forward, Phone } from "lucide-react"

export default function KpiCards({ calls }) {
    if (!calls) return null;

    const formatDuration = (seconds) => {
        if (!seconds) return "0s";

        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);

        if (mins === 0) return `${secs}s`;

        return `${mins}m ${secs}s`;
    };

    const Cards = [
        {
            title: "Appels Totaux",
            icon: Phone,
            value: calls.volume.total_calls,
            desc: calls.volume.calls_last_30_days + "sur les 30 derniers jours"
        },
        {
            title: "Taux de Réponse",
            icon: CheckCircle,
            value: calls.rates.answer_rate + "%",
            desc: calls.call_status.answered + " répondus " + " - " + calls.call_status.voicemail + " messagerie",
        },
        {
            title: "Durée Moyenne",
            icon: Clock,
            value: formatDuration(calls.time.avg_duration_seconds),
            desc: "Total: " + formatDuration(calls.time.total_duration_seconds),
        },
        {
            title: "Sortants",
            icon: Forward,
            value: calls.call_type.outbound,
            desc: "vs " + calls.call_type.inbound + " entrants",
        }
    ]
    return(
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
            {Cards.map((card, i) => {
                const Icon = card.icon;
                return(
                <div 
                key={i} 
                className="group relative bg-linear-to-br from-white to-[#032ca6]/20  
                rounded-xl p-4 shadow-md transition-all border border-[#032ca6]/5
                duration-300 hover:scale-[1.02]">
                    <div className="relative z-50">
                        <div className="flex items-start justify-between">
                            <h3 className="text-xs font-medium tracking-widest text-[#7a8bb5] uppercase">
                                {card.title}
                            </h3>
                            <div className="w-8.5 h-8.5 rounded-[10px] bg-[linear-gradient(135deg,rgba(3,44,166,0.10),rgba(3,44,166,0.04))]
                            border border-[rgba(3,44,166,0.12)] flex items-center justify-center
                            text-[14px] text-[#032ca6] shrink-0">
                                <Icon size={16} />
                            </div>
                        </div>
                        <div className="mt-3">
                            <span className="text-2xl tracking-tighter text-[#0a1628] font-semibold leading-0.5">
                                {card.value}
                            </span>
                        </div>
                        <div className="pt-2.5 border-t border-[rgba(3,44,166,0.08)]">
                            <span className="text-xs">
                                {card.desc}
                            </span>
                        </div>
                    </div>
                </div>
            )})}
        </div>
    )
}