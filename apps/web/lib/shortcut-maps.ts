import { ShortcutMap } from "@/types/shortcuts";
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
    },
    selectall: {
        display: ["⌘", "A"],
        key: "a",
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
    },
    selectall: {
        display: ["Ctrl", "A"],
        key: "a",
        ctrl: true,
    }
}

export function getShortcutMap(platform: Platform): ShortcutMap {
    return platform === "mac" ? macShortcuts : windowsShortcuts
}