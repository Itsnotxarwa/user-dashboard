import { useState, useEffect } from "react";
import Sidebar from "./sidebar";
import TopBar from "./dashboard-components/TopBar";
import { handleUnauthorized } from "../utils/auth";


export default function UserDashboard() {
    const [token] = useState(() => {
        const params = new URLSearchParams(window.location.search);
        const urlToken = params.get("token");
        if (urlToken) {
            localStorage.setItem("token", urlToken);
            return urlToken;
        }
        return localStorage.getItem("token");
    });

    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        const getProfile = async () => {
        try{
            const token = localStorage.getItem("token");
            console.log("TOKEN:", token);

            const res = await fetch("https://api.voixup.fr/me/profile", {
                headers: {
                "Authorization": `Bearer ${token}`,
                "accept": "application/json"
                }   
            });

            if (res.status === 401) {
                handleUnauthorized(401);
                return;
            }

            if (!res.ok) {
                const errorData = await res.json();
                console.log(errorData);
                return;
            }

            const data = await res.json();
            console.log(data);
            setIsActive(data.is_active);
            
        } catch(err) {
            console.log(err)
        }
    
    };
    getProfile();
    },[])

    return(
        <div className="flex min-h-screen bg-white text-black">
            <Sidebar />
            <main className="bg-linear-to-br from-white to-[rgba(3,44,166,0.09)] flex-1">
                <TopBar activeNav={{name: "Tableau de bord"}} isActive={isActive} />
            </main>

        </div>
    )
}