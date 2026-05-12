import { useState, useMemo, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function CallsBarChart({ last7Days, last30Days, range }) {
    const data = useMemo(() => {
        const source = (range === "30" ? last30Days : last7Days) || [];
        
        return (source || []).map((item) => ({
            day: item.date,      
            appels: item.count,   
        }));
    }, [range, last30Days, last7Days]);

    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsSmallScreen(window.innerWidth < 768);
        handleResize(); 
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    
    return (
    <div className="w-full bg-white p-4 rounded-lg shadow-md">
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[...data].reverse()}>
                <defs>
                    <linearGradient id="colorCalls" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#032ca6" stopOpacity={1}/>
                        <stop offset="60%" stopColor="#1a6bff" stopOpacity={1} />
                        <stop offset="100%" stopColor="rgba(3,44,166,0.12)" stopOpacity={1}/>
                    </linearGradient>
                </defs>
                <XAxis 
                interval={0}
                angle={isSmallScreen ? -90 : -45}
                textAnchor={isSmallScreen ? "end" : "end"}
                dataKey="day" 
                height={isSmallScreen ? 80 : 60}
                tickFormatter={(day) =>
                new Date(day).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "short",
                })
                } 
                tick={{ dy: isSmallScreen ? 16 : 10, dx:-5, fontSize: 12, fill: "#a0b0e0" }} 
                tickLine={false}
                stroke="#a0b0e0" />
                <YAxis hide />
                <Tooltip />
                <Legend />
                <Bar dataKey="appels" fill="url(#colorCalls)" radius={[8, 8, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    </div>
);
}