import { Notes, SquareShareLine, Tag } from "@solar-icons/react/ssr";
import { IntegrationHero } from "../_components/integration-hero";
import { IntegrationConnectCard } from "../_components/integration-connect-card";
import { IntegrationFeatureCard } from "../_components/integration-features";
import { IntegrationSlackPreview } from "./_components/integration-slack-preview";
import { IntegrationHeader } from "../_components/integration-header";

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

export default function Integration() {
    const platform = "Slack"
    return (
        <div className="p-10 space-y-9 overflow-y-scroll">
            <IntegrationHeader platform={platform} />
            <div className="space-y-9 mx-auto max-w-[640px]">
                <IntegrationHero
                    icon="/vectors/slack.svg"
                    platform={platform}
                    description="Send meeting summaries and action items directly to project channels"
                    status="disconnected"
                />
                <IntegrationConnectCard
                    platform={platform}
                    description="Connect your Slack workspace to automatically post summaries, action items, and decisions — no more copy-pasting notes after every meeting."

                />
                <IntegrationFeatureCard features={SLACK_INTEGRATION_FEATURES} />
                <IntegrationSlackPreview />
            </div>
        </div >
    )
}