import { SettingSidebar } from "./_components/setting-sidebar";

export default function SettingLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen">
            <SettingSidebar />
            <main className="flex-1">
                {children}
            </main>
        </div>
    )
}