import { useState, useEffect } from "react";
import Sidebar from "./sidebar";
import TopBar from "./dashboard-components/TopBar";
import UserInfo from "./settings-components/UserInfo";
import ChangePassword from "./settings-components/ChangePassword";
import apiFetch from "./shared/apiFetch";
import DarkMode from "./settings-components/DarkMode";


export default function Settings() {
    const [profile, setProfile] = useState(null);

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
            console.log(data);
            setProfile(data);
            
        } catch(err) {
            alert("Network error, check your connection");
            console.log(err)
        }
    
    };
    getProfile();
    },[]);
    
    return(
        <div className="flex min-h-screen bg-white text-black">
            <Sidebar />
            <main className="bg-[rgba(3,44,166,0.09)] flex-1">
                <TopBar activeNav={{name: "Réglages"}} />
                <div className="py-6">
                    <div className="max-w-7xl mx-auto lg:px-6 px-4">
                        <UserInfo profile={profile} />
                        <DarkMode />
                        <ChangePassword />
                    </div>
                </div>
            </main>
        </div>
    )
}