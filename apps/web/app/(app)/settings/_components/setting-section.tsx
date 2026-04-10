import { cn } from "@workspace/ui/lib/utils";
import { ReactNode } from "react";

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