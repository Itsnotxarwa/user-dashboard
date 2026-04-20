export default function UserInfo({profile}) {
    const userInfo =[
        {
            label: "ID utilisateur",
            value: profile.id,
        },
        {
            label: "Email",
            value: profile.email,
        },
        {
            label: "Rôle",
            value: profile.role,
        },
        {
            label: "Tenant ID",
            value: profile.tenant_id,
        },
        {
            label: "Compte créé le",
            value: profile.created_at,
        },
        {
            label: "Statut",
            value: profile.is_active
        }
        ]
    return(
        <div className="p-6">
            <h2 className="text-lg font-extrabold mb-4 tracking-tight"
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
                            {profile?.email ? profile.email
                            .split("")
                            .map(w => w.charAt(0).toUpperCase())
                            .slice(0,2)
                            .join("") 
                            : ""}
                        </div>
                        <div>
                            <div className="text-xs mt-0.5 text-slate-500">
                                {profile.email}
                            </div>
                        </div>
                        <div className="ml-auto">
                            <span className={`flex items-center gap-1.5 ml-2 text-xs font-medium py-1 px-2.5 rounded-[20px] border
                            ${profile.is_active ? "text-[#059669] bg-[rgba(5,150,105,.08)] border-[rgba(5,150,105,.20)]" 
                            : "text-[#9ca3af] bg-[#9ca3af34] border-[#9ca3af34]"}`}>
                                <span className={`w-1.5 h-1.5 rounded-full
                                    ${profile.is_active? "bg-[#22c55e] shadow-[0_0_5px_#22c55e]" : "bg-[#6b7280] shadow-[0_0_5px_#6b7280]"}`}>
                                </span>
                                <span className="text-[10px] text-slate-400">
                                    {profile.is_active ? "Active" : "Inactive"}
                                </span>
                            </span>
                        </div>
                        </div>
                    </div>

                    {userInfo.map((info,i) => (
                        <div
                        key={i}
                        className="flex items-center gap-3.5 pb-4 mb-4 border-b border-[rgba(3,44,166,.08)]">
                            <span className="text-sm font-medium text-gray-600 text-medium">{info.label}</span>
                            <span>{info.value}</span>
                        </div>
                    ))}
                    </div>
                </div>
    )
}