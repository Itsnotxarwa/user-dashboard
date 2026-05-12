import Logo from "../../assets/image.png"

export default function CallsHeader({range, setRange}) {
    
    return (
    <div className="flex items-center justify-between mb-6">
        <div>
            <img src={Logo} alt="Logo" className="w-14" />
            <h2 className="text-[17px] font-extrabold text-[#0a1628] tracking-tight">
                Historique des appels
            </h2>
        </div>
        <div className="flex gap-2">
            <select 
            value={range}
            onChange={(e) => setRange(e.target.value)}
            className="px-3 py-2 rounded-xl text-xs bg-white cursor-pointer border 
            border-[rgba(3,44,166,.14)] text-[#374152]"
            style={{fontFamily: "'DM Mono',monospace"}}>
                <option value="7">7 derniers jours</option>
                <option value="30">30 derniers jours</option>
            </select>
        </div>
    </div>
    );
}