import { Integration } from "@workspace/types/integrations";
import { IntegrationItem } from "./integration-item";


export function IntegrationsView({ integrations }: { integrations: Integration[] }) {
    return (
        <div className="h-full overflow-y-auto px-10 pt-6 pb-20">
            <div className="grid grid-cols-3 gap-6">
                {integrations.map((integration) => (
                    <IntegrationItem integration={integration} />
                ))}
            </div>
        </div>
    )
}