import { Button } from "@workspace/ui/components/button";
import { Card, CardContent } from "@workspace/ui/components/card";
import { SettingSection } from "../../_components/setting-section";


export function LeaveWorkspace() {
    return (
        <Card className="py-2">
            <CardContent className="px-5 opacity-80">
                <SettingSection
                    title="Leave workspace"
                    description={
                        true ?
                            "You cannot leave your last workspace. Your account must be a member of at least one workspace." :
                            "Once you leave, you'll lose access to this workspace. You must still be a member of at least one workspace."
                    }
                    borderBottom={false}>
                    <span className="w-full flex justify-end">
                        <Button disabled={true} variant="destructive">Leave workspace</Button>
                    </span>
                </SettingSection>
            </CardContent>
        </Card>
    )
}