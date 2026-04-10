import { SettingSidebar } from "./_components/setting-sidebar";

export default function SettingLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen overflow-hidden">
            <SettingSidebar />
            <main className="flex-1 overflow-y-auto">
                {children}
            </main>
        </div>
    )
}