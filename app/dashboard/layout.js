export default function DashboardLayout({children}) {
    return (
        <div className="flex flex-col gap-y-4">
            <nav className="bg-black text-white">This is a shared naxbar for dashboard segment</nav>
            {children}
        </div>
    )
}