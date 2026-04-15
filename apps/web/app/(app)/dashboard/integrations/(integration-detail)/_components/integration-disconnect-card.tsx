import { Button } from "@workspace/ui/components/button";
import { Card, CardContent } from "@workspace/ui/components/card";

export function IntegrationDisconnectCard(
    { email }: { email: string }
) {
    return (
        <Card className="py-2">
            <CardContent className="flex items-center justify-between">
                <p className="text-sm">
                    Connected as <span className="font-semibold">{email}</span>
                </p>
                <Button variant="outline" size="xs">
                    Disconnect
                </Button>
            </CardContent>
        </Card>
    )
}