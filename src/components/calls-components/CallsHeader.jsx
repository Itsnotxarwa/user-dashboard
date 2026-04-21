import { useState } from "react";

export default function CallsHeader({ onChange, sessions }) {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(20);

    const handleChange = (newPage, newLimit) => {
        setPage(newPage);
        setLimit(newLimit);
        onChange?.(newPage, newLimit); 
    };
    
    return (
    <div className="flex items-center justify-between mb-4">
        <h2 className="text-[17px] font-extrabold text-[#0a1628] tracking-tight">
            Historique des appels
        </h2>
        {sessions?.length > 0 && (
        <div className="flex items-center gap-2">
            {/* Page */}
            <div className="flex items-center gap-1.5">
                <label className="text-xs text-[#9aabca]">Page</label>
                <input
                    type="number"
                    min="1"
                    value={page}
                    onChange={(e) =>
                    handleChange(Number(e.target.value), limit)
                    }
                    className="w-15 px-2 py-1 text-xs text-center rounded-lg border
                    border-[rgba(3,44,166,.14)] outline-none
                    focus:ring-2 focus:ring-[#032ca6]"
                />
            </div>
            {/* Limit */}
            <div className="flex items-center gap-1.5">
                <label className="text-xs text-[#9aabca]">Limit</label>
                <input
                    type="number"
                    min="1"
                    max="100"
                    value={limit}
                    onChange={(e) =>
                    handleChange(page, Number(e.target.value))
                    }
                    className="w-15 px-2 py-1 text-xs text-center rounded-lg border
                    border-[rgba(3,44,166,.14)] outline-none
                    focus:ring-2 focus:ring-[#032ca6]"
                />
            </div>
        </div>
        )}
    </div>
    );
}