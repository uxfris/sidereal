import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent } from "@workspace/ui/components/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs";
import { CircleCheck } from "lucide-react";
import Image from "next/image";

import { Integration } from "@workspace/types/integrations"
import { cn } from "@workspace/ui/lib/utils";

const MOCK_INTEGRATION: Integration[] = [
    {
        "id": "slack-assistant-1",
        "name": "Slack Assistant",
        "description": "Send meeting summaries and action items directly to project channels.",
        "category": "communication",
        "logo": "/vectors/slack.svg",
        "status": "connected",
        "actionLabel": "Connect",
        "featured": true
    },
    {
        "id": "zoom-sync-1",
        "name": "Zoom Sync",
        "description": "Automatically sync meeting recordings and transcripts.",
        "category": "video",
        "logo": "/vectors/google-calendar.svg",
        "status": "coming soon",
        "actionLabel": "Connect"
    },
    {
        "id": "notion-bridge-1",
        "name": "Notion Bridge",
        "description": "Push notes and tasks into your Notion workspace.",
        "category": "productivity",
        "logo": "/vectors/notion.svg",
        "status": "disconnected",
        "actionLabel": "Connect"
    },
    {
        "id": "slack-assistant-2",
        "name": "Slack Assistant",
        "description": "Send meeting summaries and action items directly to project channels.",
        "category": "communication",
        "logo": "/vectors/slack.svg",
        "status": "connected",
        "actionLabel": "Connect",
        "featured": true
    },
    {
        "id": "zoom-sync-2",
        "name": "Zoom Sync",
        "description": "Automatically sync meeting recordings and transcripts.",
        "category": "video",
        "logo": "/vectors/google-calendar.svg",
        "status": "coming soon",
        "actionLabel": "Connect"
    },
    {
        "id": "notion-bridge-2",
        "name": "Notion Bridge",
        "description": "Push notes and tasks into your Notion workspace.",
        "category": "productivity",
        "logo": "/vectors/notion.svg",
        "status": "disconnected",
        "actionLabel": "Connect"
    },
    {
        "id": "slack-assistant-3",
        "name": "Slack Assistant",
        "description": "Send meeting summaries and action items directly to project channels.",
        "category": "communication",
        "logo": "/vectors/slack.svg",
        "status": "connected",
        "actionLabel": "Connect",
        "featured": true
    },
    {
        "id": "zoom-sync-3",
        "name": "Zoom Sync",
        "description": "Automatically sync meeting recordings and transcripts.",
        "category": "video",
        "logo": "/vectors/google-calendar.svg",
        "status": "coming soon",
        "actionLabel": "Connect"
    },
    {
        "id": "notion-bridge-3",
        "name": "Notion Bridge",
        "description": "Push notes and tasks into your Notion workspace.",
        "category": "productivity",
        "logo": "/vectors/notion.svg",
        "status": "disconnected",
        "actionLabel": "Connect"
    },
    {
        "id": "slack-assistant-4",
        "name": "Slack Assistant",
        "description": "Send meeting summaries and action items directly to project channels.",
        "category": "communication",
        "logo": "/vectors/slack.svg",
        "status": "connected",
        "actionLabel": "Connect",
        "featured": true
    },
    {
        "id": "zoom-sync-4",
        "name": "Zoom Sync",
        "description": "Automatically sync meeting recordings and transcripts.",
        "category": "video",
        "logo": "/vectors/google-calendar.svg",
        "status": "coming soon",
        "actionLabel": "Connect"
    },
    {
        "id": "notion-bridge-4",
        "name": "Notion Bridge",
        "description": "Push notes and tasks into your Notion workspace.",
        "category": "productivity",
        "logo": "/vectors/notion.svg",
        "status": "disconnected",
        "actionLabel": "Connect"
    },
    {
        "id": "notion-bridge-5",
        "name": "Notion Bridge",
        "description": "Push notes and tasks into your Notion workspace.",
        "category": "productivity",
        "logo": "/vectors/notion.svg",
        "status": "disconnected",
        "actionLabel": "Connect"
    },
    {
        "id": "notion-bridge-6",
        "name": "Notion Bridge",
        "description": "Push notes and tasks into your Notion workspace.",
        "category": "productivity",
        "logo": "/vectors/notion.svg",
        "status": "disconnected",
        "actionLabel": "Connect"
    },
    {
        "id": "notion-bridge-7",
        "name": "Notion Bridge",
        "description": "Push notes and tasks into your Notion workspace.",
        "category": "productivity",
        "logo": "/vectors/notion.svg",
        "status": "disconnected",
        "actionLabel": "Connect"
    },
    {
        "id": "notion-bridge-8",
        "name": "Notion Bridge",
        "description": "Push notes and tasks into your Notion workspace.",
        "category": "productivity",
        "logo": "/vectors/notion.svg",
        "status": "disconnected",
        "actionLabel": "Connect"
    },
];




export default function Integrations() {
    return (
        <div className="flex-1 flex flex-col overflow-hidden pt-10 gap-10">
            <h1 className="text-base font-semibold px-10">
                Integrations
            </h1>
            <Tabs defaultValue="all" className="flex-1 flex flex-col min-h-0 overflow-hidden">
                <TabsList className="mx-10 shrink-0">
                    <TabsTrigger value="all" className="px-6">
                        All
                    </TabsTrigger>
                    <TabsTrigger value="video" className="px-6">
                        Video
                    </TabsTrigger>
                    <TabsTrigger value="communication" className="px-6">
                        Communication
                    </TabsTrigger>
                    <TabsTrigger value="productivity" className="px-6">
                        Productivity
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="flex-1 min-h-0">
                    <div className="h-full overflow-y-auto px-10 pt-6 pb-20">
                        <div className="grid grid-cols-3 gap-6">
                            {MOCK_INTEGRATION.map((integration) => (
                                <Card key={integration.id} className="flex flex-col h-full">
                                    <CardContent className="flex flex-col gap-6 px-6 py-2 h-full">
                                        <div className="flex justify-between">
                                            <Image src={integration.logo} alt="slack" width={48} height={48} />
                                            {integration.status !== "disconnected" &&
                                                <Badge variant={integration.status === "connected" ? "default" : "secondary"}>
                                                    {integration.status === "connected" && <CircleCheck />}
                                                    <span className="uppercase">{integration.status}</span>
                                                </Badge>}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold">
                                                {integration.name}
                                            </h3>
                                            <p className="text-sm text-muted-foreground line-clamp-2">
                                                {integration.description}
                                            </p>
                                        </div>
                                        <Button variant={integration.status === "connected" ? "outline" : "default"} size="xl"
                                            className={cn("mt-auto w-full", integration.status === "coming soon" && "opacity-50 cursor-not-allowed")}
                                        >
                                            {integration.status === "connected" ? "Configure" : "Connect"}
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}