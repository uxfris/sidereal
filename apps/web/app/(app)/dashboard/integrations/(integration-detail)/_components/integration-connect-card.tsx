import { Button } from "@workspace/ui/components/button";
import { Card, CardContent } from "@workspace/ui/components/card";

export function IntegrationConnectCard(
    { description, platform }: { description: string, platform: string }
) {
    return (
        <Card>
            <CardContent className="space-y-5">
                <p className="text-sm text-muted-foreground">
                    {description}
                </p>
                <Button variant="outline" className="w-full">
                    Connect {platform}
                </Button>
            </CardContent>
        </Card>
    )
}