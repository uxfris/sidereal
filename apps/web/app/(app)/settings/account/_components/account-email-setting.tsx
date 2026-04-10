import { Input } from "@workspace/ui/components/input";
import { SettingSection } from "../../_components/setting-section";

export function AccountEmailSetting() {
    const initialValue = "fris.el@lume.com"


    return (
        <>
            <SettingSection
                title="Email"
                description="The name that appears on your profile."
                borderBottom={false}
            >
                <Input
                    disabled
                    value={initialValue}
                    className="h-12" />
            </SettingSection>
        </>
    )
}