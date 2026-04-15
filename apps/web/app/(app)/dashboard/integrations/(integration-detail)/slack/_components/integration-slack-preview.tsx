import LogoIcon from "@/assets/icons/logo-icon";
import { Card, CardContent } from "@workspace/ui/components/card";
import { Separator } from "@workspace/ui/components/separator";

export function IntegrationSlackPreview() {
    return (
        <div className="space-y-4">
            <h3 className="text-xs text-muted-foreground uppercase">preview</h3>
            <div className="p-3 rounded-lg bg-secondary border border-foreground/5 space-y-3">
                <h4 className="text-xs font-medium text-muted-foreground">HOW IT LOOKS IN SLACK</h4>
                <Card>
                    <CardContent className="space-y-2">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                                <LogoIcon />
                                <span className="text-sm font-medium">Lume</span>
                            </div>
                            <span className="text-xs text-muted-foreground">Today at 3:42 PM</span>
                        </div>
                        <p>
                            <span className="text-sm font-semibold">Weekly Design Sync</span> — summary ready
                        </p>
                        <Separator />
                        <p>
                            Key Decision: Finalize new onboarding by Friday. Ship button redesign to staging this week.
                        </p>
                        <Separator />
                        <p>
                            Action items:
                            <span className="text-blue-600 dark:text-blue-400"> @jane </span>
                            update Figma components ·
                            <span className="text-blue-600 dark:text-blue-400"> @tom </span>
                            review PR #204 ·
                            <span className="text-blue-600 dark:text-blue-400"> @sara </span>
                            write release notes
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}