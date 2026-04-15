import { Badge } from "@workspace/ui/components/badge";
import Image from "next/image";

const statusVariant = {
    connected: "Connected",
    disconnected: "Not connected",
}

export function IntegrationHero(
    { icon, platform, description, status }: { icon: string, platform: string, description: string, status: "connected" | "disconnected" }
) {
    return (
        <div className="flex items-center gap-4">
            <Image src={icon} alt="" width={48} height={48} />
            <div className="flex flex-1 items-start justify-between">
                <div className="flex-1 space-y-px">
                    <h2 className="text-3xl font-semibold">{platform}</h2>
                    <p className="text-sm text-muted-foreground">
                        {description}
                    </p>
                </div>
                <div className="flex items-center gap-1">
                    <Badge variant="secondary" className="border-muted-foreground/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                        {statusVariant[status]}</Badge>
                </div>
            </div>
        </div>
    )
}