import { Notes, SquareShareLine, Tag } from "@solar-icons/react/ssr";
import { IntegrationHero } from "../_components/integration-hero";
import { IntegrationConnectCard } from "../_components/integration-connect-card";
import { IntegrationFeatureCard } from "../_components/integration-features";
import { IntegrationSlackPreview } from "./_components/integration-slack-preview";
import { IntegrationHeader } from "../_components/integration-header";
import { IntegrationDisconnectCard } from "../_components/integration-disconnect-card";
import { IntegrationSlackIssueCard } from "./_components/integration-slack-issue-card";
import { IntegrationSlackSettings } from "./_components/integration-slack-settings";
import Link from "next/link";
import { IntegrationRecentActivity } from "@workspace/types/integrations";
import { IntegrationRecentActivityCard } from "../_components/integration-recent-activity";

const SLACK_INTEGRATION_FEATURES = [
    {
        id: "auto-post",
        icon: Notes,
        palette: "#E6F1FB",
        title: "Auto-post summaries to a channel",
        description: "Every meeting summary is posted automatically to the channel you choose when the call ends.",
    },
    {
        id: "tag",
        icon: Tag,
        palette: "#EAF3DE",
        title: "Tag action item owners",
        description: "Action items are posted with @mentions so the right people are notified immediately.",
    },
    {
        id: "send",
        icon: SquareShareLine,
        palette: "#EEEDFE",
        title: "Send a DM to the organizer",
        description: "Optionally deliver a private copy of the summary to the person who called the meeting.",
    },
]


const MOCK_SLACK_RECENT_ACTIVITY: IntegrationRecentActivity[] = [
    {
        id: "1",
        title: "Summary posted to #product — Sprint Retrospective",
        description: "3 action items with @mentions",
        timestamp: "Just now",
    },
    {
        id: "2",
        title: "Summary posted to #engineering — Weekly Sync",
        description: "2 action items with @mentions",
        timestamp: "2 hr ago",
    },
    {
        id: "3",
        title: "Post failed — All Hands",
        description: "Bot removed from #product",
        timestamp: "Yesterday",
    },
    {
        id: "4",
        title: "Summary posted to #product — Tech Review",
        description: "DM also sent to organizer",
        timestamp: "2 days ago",
    },
]



export default function Integration() {
    const platform = "Slack"
    const connectionStatus = "connected"
    const isConnected = connectionStatus === "connected"
    return (
        <div className="p-10 space-y-5 overflow-y-scroll">
            <IntegrationHeader platform={platform} />
            <div className="space-y-5 mx-auto max-w-[640px]">
                <IntegrationHero
                    icon="/vectors/slack.svg"
                    platform={platform}
                    tagline="Send meeting summaries and action items directly to project channels"
                    status={connectionStatus}
                />
                {!isConnected &&
                    <>
                        <IntegrationConnectCard
                            platform={platform}
                            description="Connect your Slack workspace to automatically post summaries, action items, and decisions — no more copy-pasting notes after every meeting." />
                        <IntegrationFeatureCard features={SLACK_INTEGRATION_FEATURES} />
                        <IntegrationSlackPreview />
                    </>
                }
                {isConnected &&
                    <>
                        <IntegrationDisconnectCard label="Connected as" value="jane@acme.com" />
                        <IntegrationSlackIssueCard />
                        <IntegrationSlackSettings />
                        <IntegrationRecentActivityCard activities={MOCK_SLACK_RECENT_ACTIVITY} />
                    </>
                }
                <div className="flex items-center gap-5 text-xs text-muted-foreground">
                    <span>By Slack Technologies</span>
                    <span>OAuth 2.0</span>
                    <Link href="https://slack.com/integrations" target="_blank" rel="noopener noreferrer">Documentation</Link>
                </div>
            </div>
        </div >
    )
}