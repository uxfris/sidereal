import { Platform, ShortcutMap } from "../types/shortcuts";

const macShortcuts: ShortcutMap = {
    sidebar: {
        display: ["⌘", "."],
        event: ["meta", "."]
    },
    search: {
        display: ["⌘", "K"],
        event: ["meta", "k"]
    }
}

const windowsShortcuts: ShortcutMap = {
    sidebar: {
        display: ["Ctrl", "."],
        event: ["ctrl", "."]
    },
    search: {
        display: ["Ctrl", "K"],
        event: ["ctrl", "k"]
    }
}

export function getShortcutMap(platform: Platform): ShortcutMap {
    return platform === "mac" ? macShortcuts : windowsShortcuts
}