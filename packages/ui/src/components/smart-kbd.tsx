"use client"

import { useShortcut } from "../hooks/use-shortcut"
import { ShortcutAction } from "../types/shortcuts"


export function SmartKbd({ action }: { action: ShortcutAction }) {
    const shortcut = useShortcut(action)

    return <>{shortcut.display.join("")}</>
}
