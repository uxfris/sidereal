// shortcut-provider.tsx
"use client"

import { createContext, useContext, useEffect, useRef } from "react"
import { ShortcutAction } from "../types/shortcuts"
import { usePlatform } from "./platform-provider"
import { getShortcutMap } from "../lib/shortcut-maps"

type HandlerMap = Partial<Record<ShortcutAction, () => void>>

const ShortcutContext = createContext<{
    register: (action: ShortcutAction, handler: () => void) => void
}>({
    register: () => { }
})

export function ShortcutProvider({ children }: { children: React.ReactNode }) {
    const platform = usePlatform()
    const shortcutMap = getShortcutMap(platform)

    const handlersRef = useRef<HandlerMap>({})

    const register = (action: ShortcutAction, handler: () => void) => {
        handlersRef.current[action] = handler
    }

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            for (const action in shortcutMap) {
                const combo = shortcutMap[action as ShortcutAction]

                const match = combo.event.every((key) => {
                    if (key === "meta") return e.metaKey
                    if (key === "ctrl") return e.ctrlKey
                    return e.key.toLowerCase() === key
                })

                if (match) {
                    e.preventDefault()
                    handlersRef.current[action as ShortcutAction]?.()
                }
            }
        }

        document.addEventListener("keydown", handleKeyDown)
        return () => document.removeEventListener("keydown", handleKeyDown)
    }, [shortcutMap])

    return (
        <ShortcutContext.Provider value={{ register }}>
            {children}
        </ShortcutContext.Provider>
    )
}

export const useShortcutRegister = () => useContext(ShortcutContext)