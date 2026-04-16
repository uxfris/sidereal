import { Integration } from "@workspace/types/integrations";
import { IntegrationItem } from "./integration-item";
import Link from "next/link";


export function IntegrationsView({ integrations }: { integrations: Integration[] }) {
    return (
        <div className="h-full overflow-y-auto px-4 md:px-10 pt-6 pb-20 no-scrollbar">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {integrations.map((integration) => {
                    if (integration.status === "coming soon") {
                        return (
                            <IntegrationItem key={integration.id} integration={integration} />
                        )
                    }
                    return (
                        <Link key={integration.id} href={`/dashboard/integrations/${integration.id}`}>
                            <IntegrationItem integration={integration} />
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}