import { Geist, Geist_Mono } from "next/font/google"
import "@workspace/ui/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@workspace/ui/lib/utils";
import { TooltipProvider } from "@workspace/ui/components/tooltip";
import { PlatformProvider } from "@workspace/ui/components/platform-provider";
import { ShortcutProvider } from "@workspace/ui/components/shortcut-provider";
import { Toaster } from "@workspace/ui/components/sonner";
import { getPlatform } from "@workspace/ui/lib/platform";

const fontSans = Geist({
    subsets: ["latin"],
    variable: "--font-sans",
})

const fontMono = Geist_Mono({
    subsets: ["latin"],
    variable: "--font-mono",
})

export default async function AppLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const platform = await getPlatform();
    return (
        <html
            lang="en"
            suppressHydrationWarning
            className={cn("antialiased", fontMono.variable, "font-sans", fontSans.variable)}
        >
            <body>
                <ThemeProvider>
                    <TooltipProvider>
                        <PlatformProvider initialPlatform={platform}>
                            <ShortcutProvider>
                                {children}
                            </ShortcutProvider>
                            <Toaster />
                        </PlatformProvider>
                    </TooltipProvider>
                </ThemeProvider>

            </body>
        </html>
    )
}
