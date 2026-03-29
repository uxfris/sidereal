import { Sidebar } from "./_components/sidebar/sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen overflow-hidden bg-background">
            {/* Sidebar — we'll build this next */}
            <aside className="w-66 shrink-0 border-r border-border flex flex-col bg-sidebar">
                <Sidebar />
            </aside>
            <main className="flex-1 overflow-y-auto">
                {children}
            </main>
            {/* Right panel — we'll build this later */}
            <aside className="w-[288px] shrink-0 border-l border-border flex flex-col">
                <p className="text-xs text-muted-foreground p-4">Right panel placeholder</p>
            </aside>
        </div>
    )
}