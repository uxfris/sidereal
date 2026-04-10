import { cn } from "@workspace/ui/lib/utils";
import { ElementType, ReactNode } from "react";

type SettingSectionProps = {
    icon?: ElementType
    title: string
    description: string
    children: ReactNode
    borderBottom?: boolean
    childrenWidth?: string
    className?: string
}

export function SettingSection(
    { icon: Icon, title, description, children, borderBottom = true, childrenWidth, className }: SettingSectionProps) {
    return (
        <div className={cn("flex items-center justify-between gap-2 py-5", borderBottom && "border-b border-border", className)}>
            {Icon &&
                <div className="flex items-center justify-center p-1 bg-secondary rounded-sm">
                    <Icon />
                </div>
            }
            <div className={cn("flex-1 min-w-0", childrenWidth ? "space-y-1" : "space-y-2")}>
                <h2 className="text-sm font-semibold">
                    {title}
                </h2>
                <p className="text-sm text-muted-foreground">
                    {description}
                </p>
            </div>
            <div className={cn("shrink-0", childrenWidth ?? "w-[450px]")}>
                {children}
            </div>
        </div>
    )
}