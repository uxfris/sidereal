import { usePlatform } from "@workspace/ui/components/platform-provider";
import { getShortcutMap } from "@workspace/ui/lib/shortcut-maps";
import { ShortcutAction } from "@workspace/ui/types/shortcuts";

export function useShortcut(action: ShortcutAction) {
    const platform = usePlatform()
    const map = getShortcutMap(platform)

    return map[action];
}