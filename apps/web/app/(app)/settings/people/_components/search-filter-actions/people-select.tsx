import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@workspace/ui/components/tooltip";

export function PeopleSelect(
    { selectionMode, onSelectionModeChange }: {
        selectionMode: boolean,
        onSelectionModeChange: (mode: boolean) => void,
    }
) {
    return (
        <TooltipProvider delayDuration={700}>
            <Tooltip>
                <TooltipTrigger asChild >
                    <Button variant={selectionMode ? "default" : "outline"} size="icon-xs" onClick={() => {
                        onSelectionModeChange(!selectionMode)
                    }}>
                        <div className={cn("w-4 h-4 rounded-sm border border-dashed", selectionMode ? "border-primary-foreground" : "border-muted-foreground")} />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    Select members
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}