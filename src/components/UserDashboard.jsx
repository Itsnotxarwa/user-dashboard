import useState from "react";
import Sidebar from "./sidebar";
import TopBar from "./dashboard-components/TopBar";


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

    const getProfile = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("https://api.voixup.fr/me/profile", {
        headers: {
        "Authorization": `Bearer ${token}`,
        "accept": "application/json"
        }   
    });

    const data = await res.json();
    console.log(data);
    };

    return(
        <div className="flex min-h-screen bg-white text-black">
            <Sidebar />
            <main className="bg-linear-to-br from-white to-[rgba(3,44,166,0.09)] flex-1 flex-1">
                <TopBar activeNav={{name: "Tableau de bord"}} />
            </main>

        </div>
    )
}