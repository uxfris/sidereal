import { Integration } from "@workspace/types/integrations";
import { IntegrationItem } from "./integration-item";


export function IntegrationsView({ integrations }: { integrations: Integration[] }) {
    return (
        <div className="h-full overflow-y-auto px-4 md:px-10 pt-6 pb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {integrations.map((integration) => (
                    <IntegrationItem key={integration.id} integration={integration} />
                ))}
            </div>
        </div>
    )
}