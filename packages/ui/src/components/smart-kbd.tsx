"use client"

import { useShortcut } from "@workspace/ui/hooks/use-shortcut"
import { ShortcutAction } from "@workspace/ui/types/shortcuts"


export function SmartKbd({ action }: { action: ShortcutAction }) {
    const shortcut = useShortcut(action)

    return <>{shortcut.display.join("")}</>
}
