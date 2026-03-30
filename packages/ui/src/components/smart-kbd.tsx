"use client"

import * as React from "react"

export function SmartKbd({ keys }: { keys: string[] }) {
    const [isMac, setIsMac] = React.useState(false)

    React.useEffect(() => {
        // 1. Check for modern User-Agent Client Hints (Chrome/Edge 90+)
        const platform = (navigator as any).userAgentData?.platform

        if (platform) {
            setIsMac(platform.toLowerCase().includes("mac"))
        } else {
            // 2. Fallback for Safari/Firefox using userAgent string
            setIsMac(/Mac|iPhone|iPod|iPad/i.test(navigator.userAgent))
        }
    }, [])

    return <>{isMac ? "⌘" : "Ctrl"} {keys.join()}</>
}
