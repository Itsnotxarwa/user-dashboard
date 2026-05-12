import { useState, useEffect } from "react";
import KpiCards from "./kpiCards";
import CallsBarChart from "./CallsBarChart.jsx";
import CallSummary from "./CallsSummary.jsx";
import { handleUnauthorized } from "../../utils/auth.js";

export default function CallsOverview({ range }) {
    const [calls, setCalls] = useState(null);

    useEffect(() => {
            const fetchCalls = async () => {
                try {
                const token = localStorage.getItem("token");
        
                const res = await fetch(`https://api.voixup.fr/me/calls/overview`,{
                    headers: 
                    {
                        accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
    
                if (res.status === 401) {
                    handleUnauthorized(401);
                    return;
                }
    
                const data = await res.json();
                setCalls(data);
            } catch (err) {
                console.error(err)
                setCalls(null);
            }
        }
            fetchCalls();
        },[]);

        if (!calls) {
            return (
            <div className="flex items-center justify-center h-64">
                <svg className="w-[3.25em] origin-center animate-[spin_2s_linear_infinite]" 
                viewBox="25 25 50 50">
                    <circle
                    className="loading-circle" 
                    r="20" cy="50" cx="50"></circle>
                </svg>
            </div>
            );
        }
    return(
        <div>
            {calls && 
                <KpiCards calls={calls} />
            }

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-5">
                {/* Chart */}
                <div className="col-span-3 bg-white rounded-2xl p-5 border border-[rgba(3,44,166,.09)]
                shadow-[0_2px_8px_rgba(3,44,166,.05)] bg-linear-to-br from-white to-[rgba(3,44,166,0.04)]">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <div className="text-lg font-bold text-slate-800"
                            style={{fontFamily: "'Cabinet Grotesk',sans-serif"}}>
                                Daily Call Volume
                            </div>
                            <div className="text-xs text-slate-400 mt-0.5">
                                Last {range} days
                            </div>
                        </div>
                        {calls &&
                        <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-[rgba(3,44,166,.07)]
                        text-[#032ca6] border border-[rgba(3,44,166,.14)]">
                            {range === "30" ? calls?.volume.calls_last_30_days : calls?.volume.calls_last_7_days} calls
                        </span>
                        }  
                    </div>
                    {calls && 
                        <CallsBarChart 
                        last7Days={calls.daily_counts.last_7_days} 
                        last30Days={calls.daily_counts.last_30_days}
                        range={range}
                        /> 
                    } 
                </div>

                {calls && 
                    <CallSummary calls={calls} />
                }
            </div>
        </div>
    )
}