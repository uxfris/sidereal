import { usePlatform } from "../components/platform-provider";
import { getShortcutMap } from "../lib/shortcut-maps";
import { ShortcutAction } from "../types/shortcuts";

export function useShortcut(action: ShortcutAction) {
    const platform = usePlatform()
    const map = getShortcutMap(platform)

    return map[action];
}