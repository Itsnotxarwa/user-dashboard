import { useState, useEffect } from "react";
import Sidebar from "./sidebar";
import TopBar from "./dashboard-components/TopBar";
import apiFetch from "./shared/apiFetch";


export default function UserDashboard() {

    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        const getProfile = async () => {
        try{

            const res = await apiFetch("https://api.mazia.ai/me/profile");

            if (!res) return;

            if (!res.ok) {
                const errorData = await res.json();
                console.log(errorData);
                return;
            }

            const data = await res.json();
            console.log(data.is_active);
            setIsActive(data.is_active);
            
        } catch(err) {
            alert("Network error, check your connection");
            console.log(err)
        }
    
    };
    getProfile();
    },[])

    return(
        <div className="flex min-h-screen bg-white text-black dark:bg-[#0d1117] dark:text-white">
            <Sidebar />
            <main className="bg-[rgba(3,44,166,0.09)] flex-1 ml-64 dark:bg-transparent">
                <TopBar activeNav={{name: "Tableau de bord"}} isActive={isActive} />
                <div className="py-6">
                    <div className="max-w-7xl mx-auto lg:px-6 px-4"></div>
                </div>
            </main>

        </div>
    )
}