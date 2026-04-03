import { Card } from "@workspace/ui/components/card";
import Image from "next/image";

export function RecentMeetingsEmpty() {
    return (
        <Card className="h-96 flex items-center justify-center gap-8 text-center">
            <Image src="/vectors/empty.svg" alt={"Empty Icon"} width={72} height={72} />
            <div className="space-y-3 max-w-80">
                <h3 className="text-lg font-semibold">No recent activity yet</h3>
                <p className="text-sm text-muted-foreground">Your meeting summaries and section items will appear here once your first session is processed.</p>
            </div>
        </Card>
    )
}