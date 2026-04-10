import { Card, CardContent } from "@workspace/ui/components/card";
import { WorkspaceAvatarSetting } from "./_components/workspace-avatar-setting";
import { WorkspaceNameSetting } from "./_components/workspace-name-setting";
import { WorkspaceHandleSetting } from "./_components/workspace-handle-setting";
import { LeaveWorkspace } from "./_components/leave-workspace";

export default function Workspace() {
    return <div className="flex flex-col gap-8 px-10 p-10">
        <div className="space-y-2">
            <h1 className="text-lg font-semibold">
                Workspace settings
            </h1>
            <p className="text-sm text-muted-foreground">
                Workspace allow you to collaborate on projects in real time.
            </p>
        </div>
        <Card className="py-2">
            <CardContent className="px-5">
                <WorkspaceAvatarSetting />
                <WorkspaceNameSetting />
                <WorkspaceHandleSetting />
            </CardContent>
        </Card>
        <LeaveWorkspace />
    </div>
}

