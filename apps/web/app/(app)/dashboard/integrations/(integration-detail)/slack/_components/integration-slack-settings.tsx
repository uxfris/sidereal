import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent } from "@workspace/ui/components/card";
import { Separator } from "@workspace/ui/components/separator";
import { Switch } from "@workspace/ui/components/switch";
import { IntegrationSettingItem } from "../../_components/integration-setting-item";

export function IntegrationSlackSettings() {
    return (
        <div className="space-y-4">
            <h2 className="text-xs text-muted-foreground uppercase">Settings</h2>
            <Card>
                <CardContent className="space-y-4">
                    <IntegrationSettingItem
                        id="channel"
                        label="Default channel"
                        description="Where summaries are posted after each meeting"
                        trailing={
                            <div className="flex items-center gap-4">
                                <Badge variant="outline">
                                    # Product
                                </Badge>
                                <Button
                                    variant="outline" size="xs">
                                    Change
                                </Button>
                            </div>
                        }
                    />
                    <Separator />
                    <IntegrationSettingItem
                        id="auto-post"
                        label="Post summaries automatically"
                        description="Send without requiring manual approval"
                        trailing={
                            <Switch id="auto-post" />
                        } />
                    <Separator />
                    <IntegrationSettingItem
                        id="tag"
                        label="Tag action item owners"
                        description="Mention assigned people in the post"
                        trailing={
                            <Switch id="tag" />
                        } />
                    <Separator />
                    <IntegrationSettingItem
                        id="dm"
                        label="Send DM to organizer"
                        description="Also send a private copy to the meeting host"
                        trailing={
                            <Switch id="dm" />
                        } />
                    <Separator />
                    <IntegrationSettingItem
                        id="transcript-link"
                        label="Include transcript link"
                        description="Add a link to the full transcript at the end"
                        trailing={
                            <Switch id="transcript-link" />
                        } />
                </CardContent>
            </Card>
        </div>
    )
}

