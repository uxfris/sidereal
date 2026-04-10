import { Card, CardContent } from "@workspace/ui/components/card";
import { SettingSection } from "../../_components/setting-section";
import { DeleteAccountDialog } from "./delete-account-dialog";

export function DeleteAccount() {
    return (
        <Card className="py-2">
            <CardContent className="px-5">
                <SettingSection
                    title="Delete account"
                    description="Permanently delete your Sidereal account. This cannot be undone."
                    borderBottom={false}
                >
                    <DeleteAccountDialog />
                </SettingSection>
            </CardContent>
        </Card>
    );
}

