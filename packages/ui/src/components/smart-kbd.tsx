"use client"

import { usePlatform } from "../hooks/use-platform"


export function SmartKbd({ keys }: { keys: string[] }) {
    const platform = usePlatform()
    const isMac = platform === "mac"

    return <>{isMac ? "⌘" : "Ctrl"} {keys.join()}</>
}
