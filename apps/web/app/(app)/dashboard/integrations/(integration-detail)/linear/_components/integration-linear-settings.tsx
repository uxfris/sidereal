import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent } from "@workspace/ui/components/card";
import { Separator } from "@workspace/ui/components/separator";
import { Switch } from "@workspace/ui/components/switch";
import { IntegrationSettingItem } from "../../_components/integration-setting-item";

export function IntegrationLinearSettings() {
    return (
        <div className="space-y-4">
            <h2 className="text-xs text-muted-foreground uppercase">Settings</h2>
            <Card>
                <CardContent className="space-y-4">
                    <IntegrationSettingItem
                        id="auto-create-issues"
                        label="Auto-create issues"
                        description="Create an issue from every action item"
                        trailing={<Switch id="auto-create-issues" />}
                    />

                    <Separator />

                    <IntegrationSettingItem
                        id="auto-assign"
                        label="Auto-assign to participants"
                        description="Match names to workspace members"
                        trailing={<Switch id="auto-assign" />}
                    />

                    <Separator />

                    <IntegrationSettingItem
                        id="auto-due-date"
                        label="Automatically set due date"
                        description="Based on deadlines mentioned in the meeting"
                        trailing={<Switch id="auto-due-date" />}
                    />

                    <Separator />

                    <IntegrationSettingItem
                        id="default-priority"
                        label="Default priority"
                        description="For issues without urgency context"
                        trailing={
                            <div className="flex items-center gap-2">
                                <Button variant="outline" size="xs">
                                    Urgent
                                </Button>
                                <Button variant="outline" size="xs">
                                    Medium
                                </Button>
                                <Button variant="outline" size="xs">
                                    Low
                                </Button>
                            </div>
                        }
                    />

                    <Separator />

                    <IntegrationSettingItem
                        id="default-project"
                        label="Default project"
                        description="ENG / Backend Platform"
                        trailing={
                            <Button
                                variant="ghost"
                                size="xs"
                                className="text-primary"
                            >
                                Change
                            </Button>
                        }
                    />
                </CardContent>
            </Card>
        </div>
    )
}

