"use client"

import { Bolt } from "@solar-icons/react"
import { Button } from "@workspace/ui/components/button"
import {
    Card,
    CardContent,
} from "@workspace/ui/components/card"
import { Input } from "@workspace/ui/components/input"
import { useState } from "react"

export function LiveSyncCard() {
    const [url, setUrl] = useState("")

    function handleJoin() {
        if (!url.trim()) return
        console.log("Joining:", url)
    }
    return <Card className="w-full p-0">
        <CardContent className="p-8 space-y-6">
            {/* Header */}
            <div className="space-y-1">
                <h2 className="text-lg font-semibold">Live Sync</h2>
                <p className="text-sm text-muted-foreground">Add the Lume assistant to your current active meeting.</p>
            </div>
            {/* Input */}
            <div className="flex gap-3">
                <Input
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Paste meeting URL (Google Meet, Teams)"
                    className="flex-1"
                    onKeyDown={(e) => e.key === "Enter" && handleJoin()} />
                <Button size="xl" className="shrink-0 gap-2">
                    <Bolt />
                    Join Now</Button>
            </div>
        </CardContent>
    </Card>
}