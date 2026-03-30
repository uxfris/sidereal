// lib/types/shortcuts.ts

export type Platform = "mac" | "windows" | "linux"

export type ShortcutAction =
    | "sidebar"
    | "search"

export type KeyCombo = {
    display: string[]   // What user sees (⌘ K)
    event: string[]     // What we listen for (meta + k)
}

export type ShortcutMap = Record<ShortcutAction, KeyCombo>