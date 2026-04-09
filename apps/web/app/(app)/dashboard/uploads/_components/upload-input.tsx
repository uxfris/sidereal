import { Upload } from "@solar-icons/react/ssr";
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent } from "@workspace/ui/components/card";

export function UploadInput() {
    return (
        <Card className="flex-5">
            <CardContent className="flex flex-col flex-5 items-center justify-center gap-8 text-center py-8">
                <div className="w-20 h-20 bg-secondary rounded-md flex items-center justify-center">
                    <Upload weight="Bold" size={32} />
                </div>
                <div className="space-y-2">
                    <h1 className="text-2xl font-semibold">
                        Upload a file to generate a transcript
                    </h1>
                    <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">
                            Browse or drag and drop MP3, M4A, WAV, MP4 or WEBM files
                        </p>
                        <p className="text-sm text-muted-foreground">
                            (Max video size 100 MB, MAx audio size: 500MB)
                        </p>
                    </div>
                </div>
                <Button size="xl">
                    Browse Files
                </Button>

            </CardContent>
        </Card>
    )
}