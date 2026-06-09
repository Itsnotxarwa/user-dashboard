import { NavLink } from "react-router-dom";
import { LayoutDashboard, ChartColumn, Bot, Settings, Target, LogOut } from "lucide-react";
import Logo from "../assets/image.png";
import apiFetch from "./shared/apiFetch";


export default function Sidebar() {

    const links = [
        { name: "dashboard", label: "Tableau de bord", href: "/", icon: <LayoutDashboard size={20} /> },
        { name: "history", label: "Historique des appels", href: "/history", icon: <ChartColumn size={20} /> },
        { name: "bot", label: "Mon IA téléphonique", href:"/bot", icon: <Bot size={20} /> },
        { name: "campaigns", label: "Campagnes", href: "/campaigns", icon: <Target size={20} /> },
        { name: "settings", label: "Réglages", href: "/settings", icon: <Settings size={20} /> },
    ];

    const handleLogout = async () => {
    try {

        const res = await apiFetch(
            "https://api.mazia.ai/me/logout",
            {
                method: "POST",
            }
        );

        if (!res.ok) {
            console.error("Logout failed");
        }

    } catch (err) {
        console.error(err);
    } finally {
        window.location.href = "https://auth.mazia.ai/";
    }
};


    return(
            <aside className="flex flex-col w-64 px-4 md:px-6 h-screen
            py-8 transition-all duration-300 ease-in-out justify-between">
                <div>
                <div className="flex items-center justify-center">
                    <img src={Logo} alt="Mazia" className="w-30" />
                </div>
                
                <nav className="space-y-2 mt-18">
                    {links.map((link) => (
                        <NavLink
                        to={link.href}
                        key={link.name}
                        className={({ isActive }) => `flex items-start justify-start text-left transition-all 
                        duration-300 transform cursor-pointer gap-3 px-4 py-2 text-nowrap text-sm
                            ${isActive
                                ? "text-black font-medium bg-gray-100"
                                : "text-gray-500 hover:bg-gray-100 hover:scale-105"
                            }`
                        }
                        >
                            {link.icon}
                            <span className="transition-all duration-300 ease-in-out">{link.label}</span>
                        </NavLink>
                    ))}
                </nav>
                </div>

                <div className="border-t border-gray-100 py-3">
                    <div className="flex items-center gap-0.5 p-2.5 rounded-xl bg-gray-50 
                    border border-gray-100 relative">
                        <div className="flex-1">
                            <p className="hidden text-sm font-700 text-gray-900 leading-tight tracking-tight font-semibold">
                            </p>
                            <p className="text-xs text-gray-400 mt-0.5 font-normal">
                                
                            </p>
                        </div>
                        <button
                        onClick={handleLogout}
                        className="w-7 h-7 flex items-center justify-center rounded-lg 
                        bg-white border border-gray-200 text-gray-300 cursor-pointer
                        hover:bg-red-50 hover:border-red-200 hover:text-red-400 
                        transition-all duration-300 shrink-0"
                        >
                            <LogOut size={14} />
                        </button>
                    </div>
                </div>
                
            </aside>

    )
}