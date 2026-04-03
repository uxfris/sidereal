import { SidebarProvider } from "@workspace/ui/components/sidebar";
import { AppSidebar } from "./_components/sidebar/app-sidebar";
import { getPlatform } from "@workspace/ui/lib/platform";
import { PlatformProvider } from "@workspace/ui/components/platform-provider";
import { ShortcutProvider } from "@workspace/ui/components/shortcut-provider";
import { MobileHeader } from "./_components/sidebar/mobile-sidebar-header";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const platform = await getPlatform();
    return (
        <PlatformProvider initialPlatform={platform}>
            <ShortcutProvider>
                <SidebarProvider>
                    <AppSidebar />
                    <main className="flex flex-1 flex-col h-screen overflow-hidden">
                        <MobileHeader />
                        {children}
                    </main>
                </SidebarProvider>
            </ShortcutProvider>
        </PlatformProvider>
    )
}