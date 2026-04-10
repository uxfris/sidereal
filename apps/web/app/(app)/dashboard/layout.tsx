import { SidebarProvider } from "@workspace/ui/components/sidebar";
import { AppSidebar } from "./_components/sidebar/app-sidebar";
import { MobileHeader } from "./_components/sidebar/mobile-sidebar-header";
import { cookies } from "next/headers";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {

    const cookieStore = await cookies();
    const isSidebarOpen = cookieStore.get("sidebar_state")?.value === "true" || !cookieStore.has("sidebar_state");

    return (
        <SidebarProvider defaultOpen={isSidebarOpen}>
            <AppSidebar />
            <main className="flex flex-1 flex-col h-screen overflow-hidden">
                <MobileHeader />
                {children}
            </main>
        </SidebarProvider>
    )
}