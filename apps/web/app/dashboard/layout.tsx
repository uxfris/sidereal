import { SidebarInset, SidebarProvider } from "@workspace/ui/components/sidebar";
import { AppSidebar } from "./_components/sidebar/app-sidebar";
import { PlatformProvider } from "@workspace/ui/hooks/use-platform";
import { getPlatform } from "@workspace/ui/lib/platform";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const platform = await getPlatform();
    return (
        <PlatformProvider initialPlatform={platform}>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <main className="flex flex-1 flex-col overflow-hidden">
                        {children}
                    </main>
                </SidebarInset>
            </SidebarProvider>
        </PlatformProvider>
    )
}