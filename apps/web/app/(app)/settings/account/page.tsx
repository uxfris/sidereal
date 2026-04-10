import { Card, CardContent } from "@workspace/ui/components/card";
import { AccountAvatarSetting } from "./_components/account-avatar-setting";
import { AccountNameSetting } from "./_components/account-name-setting";
import { DeleteAccount } from "./_components/delete-account";
import { AccountEmailSetting } from "./_components/account-email-setting";
import { PushNotificationSetting } from "./_components/push-notification-setting";
import { TwoFactorAuthSetting } from "./_components/two-factor-auth-setting";

export default function Account() {
    return <div className="flex flex-col gap-8 p-10">
        <div className="space-y-2">
            <h1 className="text-lg font-semibold">
                Account settings
            </h1>
            <p className="text-sm text-muted-foreground">
                Personalize how other see and interact with you on Lume.
            </p>
        </div>
        <Card className="py-2">
            <CardContent className="px-5">
                <AccountAvatarSetting />
                <AccountNameSetting />
                <AccountEmailSetting />
            </CardContent>
        </Card>
        <PushNotificationSetting />
        <TwoFactorAuthSetting />
        <DeleteAccount />
    </div>
}

