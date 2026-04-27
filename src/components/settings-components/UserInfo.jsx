export default function UserInfo({profile}) {
    if (!profile) {
        return <div className="p-6">Loading...</div>
    }
    const formatDate = (date) => {
        if (!date) return "-";
        return new Date(date).toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "short",
        day: "numeric",
        });
    };

    const formatStatus = (status) => {
        return status ? "Actif" : "Inactif";
    };

    const formatRole = (role) => {
        if (!role) return "-";
        return role === "tenant" ? "Utilisateur" : role;
    };

    const userInfo =[
        {
            label: "Email",
            value: profile?.email,
        },
        {
            label: "Rôle",
            value: formatRole(profile?.role),
        },
        {
            label: "Compte créé le",
            value: formatDate(profile?.created_at),
        },
        {
            label: "Statut",
            value: (
                <span className={`text-xs px-2 py-0.5 rounded-full
                    ${profile?.is_active
                    ? "bg-green-100 text-green-600"
                    : "bg-gray-100 text-gray-500"}`}>
                    {formatStatus(profile?.is_active)}
                </span>
            )
        }
    ]

    return(
        <div className="p-6">
            <h2 className="text-lg font-extrabold mb-4 tracking-tight text-[#0a1628]"
            style={{fontFamily: "'Cabinet', sans-serif"}}>
                Réglages
            </h2>

            <div className="p-6 bg-white rounded-2xl">
                <div className="mb-3.5">
                    <div className="flex items-center gap-3.5 pb-4 mb-4 border-b border-[rgba(3,44,166,.08)]">
                        <div className="w-12 h-12 rounded-2xl flex items-center 
                        justify-center text-white text-sm font-black shrink-0 
                        bg-linear-to-br from-[#0366a6] to-[#1e40af] 
                        shadow-[0_6px_18px_rgba(3,44,166,.22)]">
                            
                        </div>
                        <div>
                            <div className="text-xs mt-0.5 text-slate-500">
                                {profile.email}
                            </div>
                        </div>
                        <div className="ml-auto">
                            <span className={`flex items-center gap-1.5 ml-2 text-xs font-medium py-1 px-2.5 rounded-[20px] border
                            ${profile?.is_active ? "text-[#059669] bg-[rgba(5,150,105,.08)] border-[rgba(5,150,105,.20)]" 
                            : "text-[#9ca3af] bg-[#9ca3af34] border-[#9ca3af34]"}`}>
                                <span className={`w-1.5 h-1.5 rounded-full
                                    ${profile?.is_active? "bg-[#22c55e] shadow-[0_0_5px_#22c55e]" : "bg-[#6b7280] shadow-[0_0_5px_#6b7280]"}`}>
                                </span>
                                <span className="text-xs">
                                    {profile?.is_active ? "Actif" : "Inactif"}
                                </span>
                            </span>
                        </div>
                        </div>
                    </div>

                    {userInfo.map((info,i) => (
                        <div
                        key={i}
                        className="flex items-center justify-between gap-3.5 pb-4 mb-4 border-b border-[rgba(3,44,166,.08)]">
                            <span className="text-sm font-medium text-gray-600 text-medium">{info.label}</span>
                            <span>{info.value}</span>
                        </div>
                    ))}
                    </div>
                </div>
    )
}