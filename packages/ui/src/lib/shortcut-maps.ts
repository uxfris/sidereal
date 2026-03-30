import { Platform, ShortcutMap } from "@worksapce/ui/types/shortcuts";

const macShortcuts: ShortcutMap = {
    sidebar: {
        display: ["⌘", "."],
        key: ".",
        meta: true,
    },
    search: {
        display: ["⌘", "K"],
        key: "k",
        meta: true,
    }
}

const windowsShortcuts: ShortcutMap = {
    sidebar: {
        display: ["Ctrl", "."],
        key: ".",
        ctrl: true,
    },
    search: {
        display: ["Ctrl", "K"],
        key: "k",
        ctrl: true,
    }
}

export function getShortcutMap(platform: Platform): ShortcutMap {
    return platform === "mac" ? macShortcuts : windowsShortcuts
}