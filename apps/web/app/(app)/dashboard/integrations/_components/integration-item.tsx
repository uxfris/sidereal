import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent } from "@workspace/ui/components/card";
import { CircleCheck } from "lucide-react";
import Image from "next/image";

import { cn } from "@workspace/ui/lib/utils";
import { Integration } from "@workspace/types/integrations";

export function IntegrationItem({ integration }: { integration: Integration }) {
    return (
        <Card key={integration.id} className="flex flex-col h-full">
            <CardContent className="flex flex-col gap-6 px-6 py-2 h-full">
                <div className="flex justify-between">
                    <Image src={integration.logo} alt="slack" width={48} height={48} />
                    {integration.status !== "disconnected" &&
                        <Badge variant={integration.status === "connected" ? "default" : "secondary"}>
                            {integration.status === "connected" && <CircleCheck />}
                            <span className="uppercase">{integration.status}</span>
                        </Badge>}
                </div>
                <div>
                    <h3 className="text-lg font-semibold">
                        {integration.name}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                        {integration.description}
                    </p>
                </div>
                <Button variant={integration.status === "connected" ? "outline" : "default"} size="xl"
                    className={cn("mt-auto w-full", integration.status === "coming soon" && "opacity-50 cursor-not-allowed")}
                >
                    {integration.status === "connected" ? "Configure" : "Connect"}
                </Button>
            </CardContent>
        </Card>
    )
}