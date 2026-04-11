import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Button } from "@workspace/ui/components/button";
import { Check } from "lucide-react";
import { pricingPlans } from "@workspace/types/pricing"

export function BillingPlan() {
    return (
        <div className="grid grid-cols-3 gap-6">
            {pricingPlans.map((plan) => (
                <Card key={plan.id} className="py-8">
                    <CardHeader className="px-8">
                        <CardTitle>
                            {plan.name}
                        </CardTitle>
                        <CardDescription>
                            {plan.tagline}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-10 px-8">
                        <div className="space-y-8">
                            <div className="space-y-2">
                                <h2 className="text-4xl font-bold">
                                    {plan.price === 0 ? "Free" : plan.price}
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                    {plan.description}
                                </p>
                            </div>
                            <Button disabled={plan.currentPlan || plan.price === 0} variant="outline" className="w-full">
                                {plan.currentPlan ? "Current Plan" : plan.ctaLabel}
                            </Button>
                            <div className="space-y-4">
                                <ul className="space-y-4 text-sm font-medium">
                                    {
                                        plan.features.map((feature) => (
                                            <li key={feature} className="flex items-center gap-3">
                                                <Check size={16} />
                                                {feature}
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>

                    </CardContent>

                </Card>
            ))}
        </div>
    )
}