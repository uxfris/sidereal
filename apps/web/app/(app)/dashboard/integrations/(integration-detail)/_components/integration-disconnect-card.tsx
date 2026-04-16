import { Button } from "@workspace/ui/components/button";
import { Card, CardContent } from "@workspace/ui/components/card";

export function IntegrationDisconnectCard(
    { label, value }: { label: string, value: string }
) {
    return (
        <Card className="py-2">
            <CardContent className="flex items-center justify-between">
                <p className="text-sm">
                    {label} <span className="font-semibold">{value}</span>
                </p>
                <Button variant="outline" size="xs">
                    Disconnect
                </Button>
            </CardContent>
        </Card>
    )
}