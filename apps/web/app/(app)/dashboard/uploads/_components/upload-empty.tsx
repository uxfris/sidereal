import { FileSmile } from "@solar-icons/react";

export function UploadEmpty() {
    return (
        <div className="flex flex-col min-h-56 items-center justify-center text-center gap-4 px-8">
            <FileSmile size={64} />
            <div className="space-y-2">
                <h2 className="text-lg font-semibold">
                    Your queue is empty
                </h2>
                <p className="text-sm text-muted-foreground">
                    Recently uploaded files and active
                    progress will appear here.
                </p>
            </div>
        </div>
    )
}

