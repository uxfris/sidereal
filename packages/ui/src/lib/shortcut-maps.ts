import { ShortcutMap } from "@workspace/ui/types/shortcuts";
import { Platform } from "@workspace/ui/components/platform-provider";

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
        display: ["Ctrl", "k"],
        key: "k",
        ctrl: true,
    }
}

export function getShortcutMap(platform: Platform): ShortcutMap {
    return platform === "mac" ? macShortcuts : windowsShortcuts
}