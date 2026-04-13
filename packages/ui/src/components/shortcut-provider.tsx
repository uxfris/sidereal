"use client"

import { createContext, useContext, useEffect, useRef } from "react"
import { usePlatform } from "@workspace/ui/components/platform-provider"
import { getShortcutMap } from "@workspace/ui/lib/shortcut-maps"
import { ShortcutAction } from "@workspace/ui/types/shortcuts"

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
            const target = e.target as HTMLElement

            const isTyping =
                target.tagName === "INPUT" ||
                target.tagName === "TEXTAREA" ||
                target.isContentEditable

            if (isTyping) return // ✅ DON'T hijack shortcuts

            for (const action in shortcutMap) {
                const combo = shortcutMap[action as ShortcutAction]

                const match =
                    e.key?.toLowerCase() === combo.key &&
                    (!!combo.meta === e.metaKey) &&
                    (!!combo.ctrl === e.ctrlKey)

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