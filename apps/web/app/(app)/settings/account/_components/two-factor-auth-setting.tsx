import { Card, CardContent } from "@workspace/ui/components/card";
import { SettingSection } from "../../_components/setting-section";
import { Button } from "@workspace/ui/components/button";
import { ShieldMinimalistic } from "@solar-icons/react/ssr";

export function TwoFactorAuthSetting() {
    return (
        <Card className="py-2">
            <CardContent className="px-5">
                <SettingSection
                    title="Two-factor authentication"
                    description="Secure your account with one-time code via authenticator app or SMS."
                    borderBottom={false}
                >
                    <SettingSection
                        icon={ShieldMinimalistic}
                        title="Re-uthentication required"
                        description="For security, please re-authenticate to manage two-factor settings."
                        childrenWidth="w-36"
                        borderBottom={false}
                        className="items-start">
                        <Button variant="outline">
                            Reauthenticate
                        </Button>
                    </SettingSection>
                </SettingSection>
            </CardContent>
        </Card>
    )
}