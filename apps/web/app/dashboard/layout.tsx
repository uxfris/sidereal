import { SidebarInset, SidebarProvider } from "@workspace/ui/components/sidebar";
import { AppSidebar } from "./_components/sidebar/app-sidebar";
import { getPlatform } from "@workspace/ui/lib/platform";
import { PlatformProvider } from "@workspace/ui/components/platform-provider";
import { ShortcutProvider } from "@workspace/ui/components/shortcut-provider";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const platform = await getPlatform();
    return (
        <PlatformProvider initialPlatform={platform}>
            <ShortcutProvider>
                <SidebarProvider>
                    <AppSidebar />
                    <SidebarInset>
                        <main className="flex flex-1 flex-col overflow-hidden">
                            {children}
                        </main>
                    </SidebarInset>
                </SidebarProvider>
            </ShortcutProvider>
        </PlatformProvider>
    )
}