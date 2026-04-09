"use client"

import { Clapperboard, CloseCircle, Videocamera } from "@solar-icons/react";
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent } from "@workspace/ui/components/card";
import { Progress } from "@workspace/ui/components/progress";
import { toast } from "sonner";
import { Upload } from "@workspace/types/upload"

const MOCK_UPLOADS: Upload[] = [
    {
        "id": "1",
        "title": "Product Demo Video",
        "progress": 100,
        "status": "completed",
        "size": "120 MB",
        "timestamp": "2026-04-09T10:15:30Z",
        "type": "video"
    },
    {
        "id": "2",
        "title": "Podcast Episode 12",
        "progress": 65,
        "status": "uploading",
        "size": "45 MB",
        "timestamp": "2026-04-09T10:20:10Z",
        "type": "audio"
    },
    {
        "id": "3",
        "title": "Project Documentation",
        "progress": 100,
        "status": "completed",
        "size": "8 MB",
        "timestamp": "2026-04-09T09:50:00Z",
        "type": "pdf"
    },
    {
        "id": "4",
        "title": "Tutorial Recording",
        "progress": 30,
        "status": "uploading",
        "size": "250 MB",
        "timestamp": "2026-04-09T10:25:45Z",
        "type": "video"
    },
    {
        "id": "5",
        "title": "Interview Audio",
        "progress": 0,
        "status": "pending",
        "size": "32 MB",
        "timestamp": "2026-04-09T10:30:00Z",
        "type": "audio"
    },
    {
        "id": "6",
        "title": "Research Paper",
        "progress": 100,
        "status": "completed",
        "size": "2.5 MB",
        "timestamp": "2026-04-08T16:40:12Z",
        "type": "pdf"
    }
]


export function RecentUploads() {

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                    Queue & Recent Uploads
                </h2>
                <Button variant="ghost">
                    Clear History
                </Button>
            </div>
            <Card>
                <CardContent>
                    {MOCK_UPLOADS.map((upload) => <RecentUploadItem key={upload.id} item={upload} />)}
                </CardContent>
            </Card>

        </div >
    )
}



export function RecentUploadItem({ item }: { item: Upload }) {
    const { id, title, progress, status, size, timestamp, type } = item

    const cancelUpload = () => {
        toast("Upload cancelled",
            {
                position: "bottom-center",
                action: {
                    label: "Undo",
                    onClick: () => { }
                }
            }
        )
    }


    return (
        <div className="flex items-center justify-between gap-6 py-4">
            <div className="w-12 h-12 bg-accent-3 flex items-center justify-center rounded-md">
                <Clapperboard weight="Bold" size={20} />
            </div>
            <div className="flex-1 space-y-2">
                <div>
                    <h4 className="text-sm font-semibold">
                        Site_Walkthrough_NYC_v2.mp4
                    </h4>
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                            142 MB • Uploading...
                        </span>
                        <span className="text-xs font-semibold text-primary">
                            74%
                        </span>
                    </div>
                </div>
                <Progress value={33} />
            </div>
            <Button variant="ghost" className=" w-9 h-9 rounded-full" onClick={cancelUpload}>
                <CloseCircle />
            </Button>
        </div>
    )
}