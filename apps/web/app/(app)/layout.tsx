import { Geist, Geist_Mono } from "next/font/google"
import "@workspace/ui/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@workspace/ui/lib/utils"
import { TooltipProvider } from "@workspace/ui/components/tooltip"
import { PlatformProvider } from "@workspace/ui/components/platform-provider"
import { ShortcutProvider } from "@/components/shortcut-provider"
import { Toaster } from "@workspace/ui/components/sonner"
import { getPlatform } from "@/lib/platform"
import { QueryProvider } from "@/components/query-provider"

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
  const platform = await getPlatform()
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        fontSans.variable
      )}
    >
      <body>
        <ThemeProvider>
          <TooltipProvider>
            <PlatformProvider initialPlatform={platform}>
              <ShortcutProvider>
                <QueryProvider>{children}</QueryProvider>
              </ShortcutProvider>
              <Toaster />
            </PlatformProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
