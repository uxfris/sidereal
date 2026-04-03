"use client"

import { Bolt } from "@solar-icons/react"
import { Button } from "@workspace/ui/components/button"
import {
    Card,
    CardContent,
} from "@workspace/ui/components/card"
import { Input } from "@workspace/ui/components/input"
import { useState } from "react"
import { JoinMeetingDialog } from "./join-meeting-dialog"
import { JoinMeetingSuccessfulDialog } from "./join-meeting-successful-dialog"

export function LiveSyncCard() {
    const [url, setUrl] = useState("")
    const [openForm, setOpenForm] = useState(false)
    const [openSuccess, setOpenSuccess] = useState(false)

    const handleJoin = () => {
        if (!url.trim()) return
        setOpenForm(true)

    }

    const handleSuccess = () => {
        setOpenForm(false)
        setOpenSuccess(true)
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
                    className="h-12 flex-1"
                    onKeyDown={(e) => e.key === "Enter" && handleJoin()} />
                <Button size="xl" className="shrink-0 gap-2" onClick={handleJoin}>
                    <Bolt />
                    Join Now</Button>
                <JoinMeetingDialog open={openForm} onOpenChange={setOpenForm} onSuccess={handleSuccess} url={url} />
                <JoinMeetingSuccessfulDialog open={openSuccess} onOpenChange={setOpenSuccess} />
            </div>
        </CardContent>
    </Card>
}