import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Button } from "@workspace/ui/components/button";
import { Check } from "lucide-react";
import { pricingPlans } from "@workspace/types/pricing"
import { Separator } from "@workspace/ui/components/separator";
import { Switch } from "@workspace/ui/components/switch";
import { Badge } from "@workspace/ui/components/badge";
import { cn } from "@workspace/ui/lib/utils";

export function BillingPlan() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    <CardContent className="space-y-10 px-0">
                        <div className="space-y-8">
                            <div className="space-y-2 px-8">
                                <h2 className="text-4xl font-bold">
                                    {plan.price === 0 ? "Free" : plan.price}
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                    {plan.description}
                                </p>
                            </div>
                            <div className="space-y-6">
                                {<Separator className={cn(plan.id !== "studio-pro" && "hidden md:block opacity-0")} />}
                                <div className={cn("flex items-center gap-2 px-8", plan.id !== "studio-pro" && "hidden md:block opacity-0")}>
                                    <Switch disabled={plan.id !== "studio-pro"} />
                                    <span className="flex-1 text-sm font-medium">Annual</span>
                                    <Badge>
                                        Save $50
                                    </Badge>
                                </div>
                                {<Separator className={cn(plan.id !== "studio-pro" && "hidden md:block")} />}
                            </div>
                            <div className="px-8">
                                <Button disabled={plan.currentPlan || plan.price === 0} variant="outline" className="w-full">
                                    {plan.currentPlan ? "Current Plan" : plan.ctaLabel}
                                </Button>
                            </div>
                            <div className="space-y-4 px-8">
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