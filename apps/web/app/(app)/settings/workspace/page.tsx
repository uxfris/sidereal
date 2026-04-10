import { Button } from "@workspace/ui/components/button";
import { Card, CardContent } from "@workspace/ui/components/card";
import { cn } from "@workspace/ui/lib/utils";
import { ReactNode } from "react";

export default function Workspace() {
    return <div className="flex flex-col gap-8 px-10 pt-10">
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
                <SettingSection
                    title="Avatar"
                    description="Set an avatar to your workspace.">
                    <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
                        <span className="text-sm font-medium text-primary-foreground">
                            F
                        </span>
                    </div>
                </SettingSection>
                <SettingSection
                    title="Name"
                    description="Your full workspace name, as visible to others."
                >
                    <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
                        <span className="text-sm font-medium text-primary-foreground">
                            F
                        </span>
                    </div>
                </SettingSection>
                <SettingSection
                    title="Workspace handle"
                    description="Set a handle for the workspace profile page."
                    borderBottom={false}>
                    <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
                        <span className="text-sm font-medium text-primary-foreground">
                            F
                        </span>
                    </div>
                </SettingSection>
            </CardContent>
        </Card>
        <Card className="py-2">
            <CardContent className="px-5 opacity-80">
                <SettingSection
                    title="Leave workspace"
                    description="You cannot leave your last workspace. Your account must be a member of at least one workspace."
                    borderBottom={false}>
                    <span className="w-full flex justify-end">
                        <Button disabled={true} variant="destructive">Leave workspace</Button>
                    </span>
                </SettingSection>
            </CardContent>
        </Card>
    </div>
}

export function SettingSection({ title, description, children, borderBottom = true }: {
    title: string, description: string, children: ReactNode, borderBottom?: boolean
}) {
    return (
        <div className={cn("flex items-center justify-between py-5", borderBottom && "border-b border-border")}>
            <div className="flex-1 min-w-0 space-y-2">
                <h2 className="text-sm font-semibold">
                    {title}
                </h2>
                <p className="text-sm text-muted-foreground">
                    {description}
                </p>
            </div>
            <div className="shrink-0 w-96">
                {children}
            </div>
        </div>
    )
}