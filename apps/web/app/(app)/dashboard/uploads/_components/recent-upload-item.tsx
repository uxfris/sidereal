import { CheckCircle, Clapperboard, CloseCircle, Document, FileSmile, Soundwave, Videocamera } from "@solar-icons/react";
import { Button } from "@workspace/ui/components/button";
import { Progress } from "@workspace/ui/components/progress";
import { toast } from "sonner";
import { Upload } from "@workspace/types/upload"
import { formatTimeAgoIntl } from "@workspace/ui/lib/date-format";
import { Badge } from "@workspace/ui/components/badge";
import { cn } from "@workspace/ui/lib/utils";



export function RecentUploadItem({ item, className }: { item: Upload, className?: string }) {
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
        <div className={cn("flex items-center justify-between gap-4 md:gap-6 py-4 hover:bg-secondary rounded-md px-4", className)}>
            <div className={cn("w-12 h-12 flex items-center justify-center rounded-md",
                type === "video" && "bg-accent-2",
                type === "audio" && "bg-accent-3",
                type === "pdf" && "bg-accent"
            )}>
                {type === "video" && <Clapperboard weight="Bold" size={20} />}
                {type === "audio" && <Soundwave weight="Bold" size={20} />}
                {type === "pdf" && <Document weight="Bold" size={20} />}
            </div>
            <div className="flex-1 space-y-2">
                <div>
                    <h4 className="text-sm font-semibold">
                        {title}
                    </h4>
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                            {size} • {" "}
                            {status === "uploading" && "Uploading..."}
                            {status === "analyzing" && "ingesting..."}
                            {status === "processed" && formatTimeAgoIntl(timestamp)}
                        </span>
                        {status !== "processed" && <span className="text-xs font-semibold text-primary">
                            {status === "analyzing" ? "Analyzing" : `${progress}%`}
                        </span>}
                    </div>
                </div>
                {status !== "processed" && <Progress value={progress} indicatorClassName={
                    cn(status === "analyzing" && "bg-primary/50")
                } />}
            </div>
            {status !== "processed" && <Button variant="ghost" className=" w-9 h-9 rounded-full" onClick={cancelUpload}>
                <CloseCircle />
            </Button>}
            {
                status === "processed" &&
                <Badge variant="outline" className="w-fit px-1 md:px-2">
                    <span>
                        <CheckCircle />
                    </span>
                    <span className="hidden md:block">Processed</span>
                </Badge>
            }
        </div>
    )
}