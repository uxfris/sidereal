import { Badge } from "@workspace/ui/components/badge";
import { cn } from "@workspace/ui/lib/utils";
import Image from "next/image";

const statusVariant = {
    connected: "Connected",
    disconnected: "Not connected",
}

export function IntegrationHero(
    { icon, platform, tagline, status }: { icon: string, platform: string, tagline: string, status: "connected" | "disconnected" }
) {

    const isConnected = status === "connected"

    return (
        <div className="flex items-center gap-4">
            <Image src={icon} alt="" width={48} height={48} />
            <div className="flex flex-col md:flex-row flex-1 items-start justify-between gap-4">
                <div className="flex-1 space-y-px">
                    <h2 className="text-3xl font-semibold">{platform}</h2>
                    <p className="text-sm text-muted-foreground">
                        {tagline}
                    </p>
                </div>
                <div className="flex items-center gap-1">
                    <Badge variant={isConnected ? "default" : "secondary"} className={cn(!isConnected && "border-muted-foreground/20")}>
                        <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground dark:bg-white" />
                        {statusVariant[status]}</Badge>
                </div>
            </div>
        </div>
    )
}