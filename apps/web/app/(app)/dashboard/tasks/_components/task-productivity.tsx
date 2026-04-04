
import { SanitizedHtml } from "@/lib/sanitized-html";
import { Stars } from "@solar-icons/react/ssr";
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Separator } from "@workspace/ui/components/separator";

export function TaskProductivityStats() {
    return (
        <Card className="px-5 py-8 bg-secondary/40 border border-border">
            <CardHeader >
                <h3 className="text-base font-semibold">Productivity Stats</h3>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="w-full flex gap-4">
                    <div className="flex-1 space-y-1">
                        <h4 className="text-xs font-semibold uppercase">
                            Resolved
                        </h4>
                        <data className="text-2xl text-primary font-semibold">14</data>
                    </div>
                    <div className="flex-1 space-y-1">
                        <h4 className="text-xs font-semibold uppercase">
                            Overdue
                        </h4>
                        <data className="text-2xl text-destructive font-semibold">14</data>
                    </div>
                </div>
                <div className="space-y-4">
                    <Separator className="border-muted brightness-95" />
                    <p className="text-muted-foreground">
                        You're completing tasks{" "}
                        <span className="text-primary font-semibold" >15% faster</span>
                        {" "} than last week. Keep it up!
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}