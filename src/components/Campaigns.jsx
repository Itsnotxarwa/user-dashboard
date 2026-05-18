
export default function Campaigns() {
    return(
        <div className="flex min-h-screen bg-white text-black">
            <Sidebar />
            <main className="bg-[rgba(3,44,166,0.09)] flex-1">
                <TopBar activeNav={{name: "Campagnes"}} />

            </main>
        </div>
    )
}