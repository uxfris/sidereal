import { SettingHeader } from "../_components/setting-header";
import { BillingCredits } from "./_components/billing-credits";
import { BillingPlan } from "./_components/billing-plan";

export default function Billing() {
    return <div className="flex flex-col gap-8 p-12">
        <SettingHeader
            title="Plans & credits"
            description="Manage your subscription plan and storage balance."
        />
        <BillingCredits />
        <BillingPlan />
    </div>
}