// types/shortcuts.ts

export type ShortcutAction =
    | "sidebar"
    | "search"

export type KeyCombo = {
    display: string[]
    key: string
    meta?: boolean
    ctrl?: boolean
    shift?: boolean
    alt?: boolean
}

export type ShortcutMap = Record<ShortcutAction, KeyCombo>