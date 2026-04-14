import { Card, CardContent } from "@workspace/ui/components/card";
import { SettingSection } from "../../_components/setting-section";
import { Switch } from "@workspace/ui/components/switch"

export function PushNotificationSetting() {
    return (
        <Card className="py-2">
            <CardContent className="px-5">
                <SettingSection
                    title="Push Notifications"
                    description="Enable push notifications to stay in the loop."
                    borderBottom={false}
                    className="items-start"

                >
                    <SettingSection
                        title="Meeting Summaries"
                        description="Enable Automated AI notes after every session."
                        borderBottom={false}
                        childrenWidth="w-9"
                        className="items-start flex-row"
                        isChild={true}
                    >
                        <Switch />
                    </SettingSection>
                    <SettingSection
                        title="Insight Reports"
                        description="Weekly creative analytics and project progress."
                        borderBottom={false}
                        childrenWidth="w-9"
                        className="items-start flex-row"
                        isChild={true}
                    >
                        <Switch />
                    </SettingSection>
                    <SettingSection
                        title="Collaboration Alerts"
                        description="When someone mentions you or invites you."
                        borderBottom={false}
                        childrenWidth="w-9"
                        className="items-start flex-row"
                        isChild={true}
                    >
                        <Switch />
                    </SettingSection>
                </SettingSection>
            </CardContent>
        </Card>
    )
}