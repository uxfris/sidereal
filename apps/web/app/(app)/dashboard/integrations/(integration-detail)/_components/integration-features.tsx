import { Card, CardContent } from "@workspace/ui/components/card";
import { IntegrationFeature } from "../_types/integration-feature.js";

export function IntegrationFeatureCard(
    { features }: { features: IntegrationFeature[] }
) {
    return (
        <div className="space-y-4">
            <h3 className="text-xs text-muted-foreground uppercase">What you'll get</h3>
            <div className="space-y-2">
                {features.map((feature) => (
                    <Card key={feature.id}>
                        <CardContent className="flex items-center gap-4">
                            <div
                                style={{ backgroundColor: feature.palette }}
                                className={"w-12 h-12 rounded-lg flex items-center justify-center"}>
                                <feature.icon className="text-2xl text-black" />
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-sm font-semibold">{feature.title}</h4>
                                <p className="text-xs text-muted-foreground">
                                    {feature.description}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}