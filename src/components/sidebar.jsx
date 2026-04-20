import { NavLink } from "react-router-dom";
import { LayoutDashboard, ChartColumn, Bot, Settings } from "lucide-react";
import Logo from "../assets/image.png";


export default function Sidebar() {

    const links = [
        { name: "dashboard", label: "Tableau de bord", href: "/", icon: <LayoutDashboard size={20} /> },
        { name: "history", label: "Historique des appels", href: "/history", icon: <ChartColumn size={20} /> },
        { name: "bot", label: "Mon IA téléphonique", href:"/bot", icon: <Bot size={20} /> },
        { name: "settings", label: "Réglages", href: "/settings", icon: <Settings size={20} /> },
    ];


    return(
            <aside className="flex flex-col w-64 px-4 md:px-6 h-screen
            py-8 transition-all duration-300 ease-in-out">
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
                
            </aside>

    )
}