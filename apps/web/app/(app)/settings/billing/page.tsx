import { BillingCredits } from "./_components/billing-credits";
import { BillingPlan } from "./_components/billing-plan";

export default function Billing() {
    return <div className="flex flex-col gap-8 p-12">
        <div className="space-y-2">
            <h1 className="text-lg font-semibold">
                Plans & credits
            </h1>
            <p className="text-sm text-muted-foreground">
                Manage your subscription plan and storage balance.
            </p>
        </div>
        <BillingCredits />
        <BillingPlan />
    </div>
}