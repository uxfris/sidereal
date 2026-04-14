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
                    <div className="flex flex-col lg:flex-row md:items-center justify-between gap-4 lg:gap-2 p-5 border border-dashed rounded-md">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center rounded-full bg-secondary p-2">
                                <ShieldMinimalistic />
                            </div>
                            <div className="flex-1 min-w-0 space-y-1">
                                <h2 className="font-semibold text-sm">
                                    Re-uthentication required
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                    For security, please re-authenticate to manage two-factor settings.
                                </p>
                            </div>
                        </div>
                        <div className="shrink-0 w-full lg:w-fit">
                            <Button variant="outline" size="sm" className="w-full">
                                Reauthenticate
                            </Button>
                        </div>
                    </div>
                </SettingSection>
            </CardContent>
        </Card>
    )
}