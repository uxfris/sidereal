import { cn } from "@workspace/ui/lib/utils";
import { ElementType, ReactNode } from "react";

type SettingSectionProps = {
    title: string
    description: string
    children: ReactNode
    borderBottom?: boolean
    childrenWidth?: string
    className?: string
    isChild?: boolean
}

export function SettingSection(
    { title, description, children, borderBottom = true, childrenWidth, className, isChild = false }: SettingSectionProps) {
    return (
        <div className={cn("flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-2 py-5", borderBottom && "border-b border-border", className)}>
            <div className={cn("flex-1 min-w-0", childrenWidth ? "space-y-1" : "space-y-1 md:space-y-2")}>
                <h2 className={cn("font-semibold", isChild ? "text-sm" : "text-base")}>
                    {title}
                </h2>
                <p className="text-sm text-muted-foreground">
                    {description}
                </p>
            </div>
            <div className={cn("shrink-0", childrenWidth ?? "md:w-3/6")}>
                {children}
            </div>
        </div>
    )
}