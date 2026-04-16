import { CalendarMark, Document, Notes, SquareShareLine, Tag, UserCheckRounded } from "@solar-icons/react/ssr";
import { IntegrationHero } from "../_components/integration-hero";
import { IntegrationConnectCard } from "../_components/integration-connect-card";
import { IntegrationFeatureCard } from "../_components/integration-features";
import { IntegrationHeader } from "../_components/integration-header";
import { IntegrationDisconnectCard } from "../_components/integration-disconnect-card";
import { IntegrationLinearSettings } from "./_components/integration-linear-settings";
import Link from "next/link";
import { IntegrationLinearStatCard } from "./_components/integration-linear-stat-card";
import { IntegrationRecentActivityCard } from "../_components/integration-recent-activity";
import type { IntegrationRecentActivity } from "@workspace/types/integrations";

const LINEAR_INTEGRATION_FEATURES = [
    {
        id: "auto-create",
        icon: Document,
        palette: "#EEEDFE",
        title: "Auto-create issues",
        description: "Turn meeting action items into Linear issues with AI-generated titles and descriptions",
    },
    {
        id: "auto-assign",
        icon: UserCheckRounded,
        palette: "#E6F1FB",
        title: "Auto-assign to members",
        description: "Team members mentioned during the meeting are automatically assigned to created issues",
    },
    {
        id: "auto-due",
        icon: CalendarMark,
        palette: "#E1F5EE",
        title: "Automatically set due dates",
        description: "Deadlines mentioned in the meeting are detected by AI and set as issue due dates",
    },
]

const MOCK_LINEAR_RECENT_ACTIVITY: IntegrationRecentActivity[] = [
    {
        id: "1",
        title: "3 issues created — Sprint Planning Q3",
        timestamp: "Just now",
    },
    {
        id: "2",
        title: '@sarah assigned to "Fix auth timeout"',
        timestamp: "2 min ago",
    },
    {
        id: "3",
        title: "Assignment failed — @reza not found in workspace",
        timestamp: "Yesterday",
    },
    {
        id: "4",
        title: "5 issues created — Architecture Review",
        timestamp: "2 days ago",
    },
    {
        id: "5",
        title: 'Due date "30 Jun" set on 2 issues',
        timestamp: "3 days ago",
    },
]



export default function Integration() {
    const platform = "Linear"
    const connectionStatus = "connected"
    const isConnected = connectionStatus === "connected"
    return (
        <div className="p-10 space-y-5 overflow-y-scroll">
            <IntegrationHeader platform={platform} />
            <div className="space-y-5 mx-auto max-w-[640px]">
                <IntegrationHero
                    icon="/vectors/linear-app.svg"
                    platform={platform}
                    tagline="Push decisions and action items into your sprint workflow"
                    status={connectionStatus}
                />
                {!isConnected &&
                    <>
                        <IntegrationConnectCard
                            platform={platform}
                            description="Connect your Linear account to start automatically pushing issues from every meeting. You can choose the destination project and configure assignees after connecting." />
                        <IntegrationFeatureCard features={LINEAR_INTEGRATION_FEATURES} />
                    </>
                }
                {isConnected &&
                    <>
                        <IntegrationDisconnectCard label="Workspace:" value="Acme Engineering" />
                        <IntegrationLinearStatCard />
                        <IntegrationLinearSettings />
                        <IntegrationRecentActivityCard activities={MOCK_LINEAR_RECENT_ACTIVITY} />
                    </>
                }
                <div className="flex items-center gap-5 text-xs text-muted-foreground">
                    <span>By Linear Orbit, Inc.</span>
                    <span>OAuth 2.0</span>
                    <Link href="https://linear.app/developers/oauth-2-0-authentication" target="_blank" rel="noopener noreferrer">Documentation</Link>
                </div>
            </div>
        </div >
    )
}