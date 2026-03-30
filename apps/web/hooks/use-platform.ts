"use client"

import React, { createContext, useContext, useState } from "react"

export type Platform = "mac" | "windows" | "linux" | "unknown"

export const PlatformContext = createContext<Platform>("unknown")

export function PlatformProvider({
    children,
    initialPlatform,
}: {
    children: React.ReactNode
    initialPlatform: Platform
}) {
    const [platform] = useState<Platform>(initialPlatform)

    return (
        <PlatformContext.Provider value= { platform } >
        { children }
        </PlatformContext.Provider>
  )
}

export function usePlatform(): Platform {
    return useContext(PlatformContext)
}