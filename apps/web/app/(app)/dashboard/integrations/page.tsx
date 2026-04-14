import { Integration } from "@workspace/types/integrations"
import { IntegrationsView } from "./_components/integrations-view";
import { IntegrationToolbar } from "./_components/integration-toolbar/integration-toolbar";

const MOCK_INTEGRATIONS: Integration[] = [
    {
        id: "google-calendar",
        name: "Google Calendar",
        description: "Automatically record and transcribe Google Meet calls in real-time",
        category: "Calendar & Scheduling",
        logo: "/vectors/google-calendar.svg",
        status: "disconnected",
    },
    {
        id: "outlook-calendar",
        name: "Outlook Calendar",
        description: "Automatically detect and join every meeting from your Microsoft calendar",
        category: "Calendar & Scheduling",
        logo: "/vectors/outlook.svg",
        status: "disconnected",
    },
    {
        id: "slack-assistant",
        name: "Slack Assistant",
        description: "Send meeting summaries and action items directly to project channels",
        category: "communication",
        logo: "/vectors/slack.svg",
        status: "connected",
    },
    {
        id: "notion",
        name: "Notion",
        description: "Save meeting notes and action items to Notion workspace automatically",
        category: "Knowledge / Docs",
        logo: "/vectors/notion.svg",
        status: "connected",
    },
    {
        id: "linear",
        name: "Linear",
        description: "Push decisions and action items into your sprint workflow",
        category: "Project Management",
        logo: "/vectors/linear-app.svg",
        status: "disconnected",
    },
    {
        id: "jira",
        name: "Jira",
        description: "Turn action items into Jira tickets automatically so nothing gets lost",
        category: "Project Management",
        logo: "/vectors/jira.svg",
        status: "coming soon",
    },
    {
        id: "asana",
        name: "Asana",
        description: "Turn action items into Asana tasks so nothing gets missed",
        category: "Project Management",
        logo: "/vectors/asana.svg",
        status: "coming soon",
    },
    {
        id: "clickup",
        name: "ClickUp",
        description: "Sync meeting follow-ups into the workspace your team already runs on",
        category: "Project Management",
        logo: "/vectors/clickup.svg",
        status: "coming soon",
    },
    {
        id: "hubspot",
        name: "HubSpot",
        description: "Log customer meeting notes and follow-ups directly to your CRM",
        category: "CRM / Sales",
        logo: "/vectors/hubspot.svg",
        status: "coming soon",
    },
];



export default function Integrations() {
    return (
        <div className="flex-1 flex flex-col overflow-hidden pt-4 md:pt-10">
            <div className="space-y-6">
                <h1 className="hidden md:block text-base font-semibold px-4 md:px-10">
                    Integrations
                </h1>
                <IntegrationToolbar />
            </div>
            <IntegrationsView integrations={MOCK_INTEGRATIONS} />
        </div>
    )
}