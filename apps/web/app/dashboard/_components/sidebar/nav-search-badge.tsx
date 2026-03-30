import { SmartKbd } from "@workspace/ui/components/smart-kbd"

export function SearchBadge() {
    return (
        <div className="text-xs gap-0.5 px-1 py-0.5 rounded-sm border border-foreground/10 bg-muted brightness-95">
            <SmartKbd keys={["K"]} />
        </div>
    )
}