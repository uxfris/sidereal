"use client"

import { Button } from "@workspace/ui/components/button";
import { Card, CardContent } from "@workspace/ui/components/card";
import { Upload } from "@workspace/types/upload"
import Link from "next/link";
import { UploadEmpty } from "./upload-empty";
import { RecentUploadItem } from "./recent-upload-item";

const MOCK_UPLOADS: Upload[] = [
    {
        "id": "1",
        "title": "Product Demo Video",
        "progress": 100,
        "status": "processed",
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
        "status": "processed",
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
        "progress": 100,
        "status": "analyzing",
        "size": "32 MB",
        "timestamp": "2026-04-09T10:30:00Z",
        "type": "audio"
    },
    {
        "id": "6",
        "title": "Research Paper",
        "progress": 100,
        "status": "processed",
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
                {MOCK_UPLOADS.length !== 0 && <Button variant="ghost">
                    Clear History
                </Button>}
            </div>
            <Card>
                <CardContent className="px-2">
                    {MOCK_UPLOADS.length === 0 && <UploadEmpty />}
                    {MOCK_UPLOADS.map((upload) => {
                        if (upload.status === "processed") {
                            return <Link key={upload.id} href="/meeting/id">
                                <RecentUploadItem item={upload} />
                            </Link>
                        }
                        return <RecentUploadItem key={upload.id} item={upload} className=" cursor-progress" />
                    }
                    )}
                </CardContent>
            </Card>

        </div >
    )
}

