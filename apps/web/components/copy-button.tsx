"use client"

import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"
import { Check, Copy } from "lucide-react"
import { useState } from "react"

export function CopyButton({ content, group }: { content: string, group?: string }) {

    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        await navigator.clipboard.writeText(content)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            className={group && cn("opacity-0 transition-opacity duration-300", `group-hover/${group}:opacity-100`)}
            onClick={handleCopy}
        >
            <span className="relative w-4 h-4">
                <Copy className={cn("absolute transition-all duration-200", copied ? "scale-0 opacity-0" : "scale-100 opacity-100")} />
                <Check className={cn("absolute transition-all duration-200", copied ? "scale-100 opacity-100" : "scale-0 opacity-0")} />
            </span>
        </Button>
    )
}