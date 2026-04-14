"use client"

import { FullScreen, Play, SkipNext, SkipPrevious, VolumeLoud } from "@solar-icons/react"
import { Button } from "@workspace/ui/components/button"
import { Progress } from "@workspace/ui/components/progress"
import { useState } from "react"

export function MeetingMediaPlayerBar() {
    const [progress, setProgress] = useState(30)
    const [volume, setVolume] = useState(70)
    const [isPlaying, setIsPlaying] = useState(false)
    const [speed, setSpeed] = useState(1)

    return (
        <div className="fixed bottom-0 inset-x-0 py-4 px-8 bg-card border-t space-y-1 md:space-y-0">
            <div className="flex flex-col items-center gap-2">
                <Progress value={progress} className="md:hidden" />
                <div className="w-full flex items-center justify-between">
                    <span className="md:hidden text-xs font-semibold">
                        04:22
                    </span>
                    <span className="md:hidden text-xs font-semibold">
                        -85:38
                    </span>
                </div>
            </div>
            <div className="flex items-center justify-center gap-6">
                <div className="flex items-center gap-4 shrink-0">
                    <Button size="xs" className="md:hidden">
                        1X
                    </Button>
                    <Button size="icon-xl" className="hidden md:flex rounded-full">
                        <Play weight="Bold" />
                    </Button>
                    <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <SkipPrevious />
                        </Button>
                        <Button size="icon-xl" className="md:hidden rounded-full">
                            <Play weight="Bold" />
                        </Button>
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <SkipNext />
                        </Button>
                    </div>
                    <span className="hidden md:flex text-xs font-semibold">
                        04:22 / 90:00
                    </span>
                </div>
                <Progress value={progress} className="hidden md:flex flex-1" />
                <div className="flex shrink-0 items-center gap-6">
                    <div className="hidden md:flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <VolumeLoud />
                        </Button>
                        <Progress value={80} className="w-20" indicatorClassName="bg-muted-foreground" />
                    </div>
                    <Button size="xs" className="hidden md:flex">
                        1X
                    </Button>
                    <Button size="xs" variant="outline">
                        <FullScreen />
                    </Button>
                </div>
            </div>
        </div>

    )
}