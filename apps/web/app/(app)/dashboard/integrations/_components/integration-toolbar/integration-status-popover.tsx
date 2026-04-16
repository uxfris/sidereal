import { IntegrationStatusEnum } from "@workspace/types/integrations";
import { Button } from "@workspace/ui/components/button";
import {
    Popover,
    PopoverContent,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from "@workspace/ui/components/popover"
import { Separator } from "@workspace/ui/components/separator";
import { Check, ChevronDown, } from "lucide-react";


export function IntegrationStatusPopover() {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="xs" className="w-full md:w-fit justify-between text-muted-foreground">
                    Any status
                    <ChevronDown />
                </Button>
            </PopoverTrigger>
            <PopoverContent side="bottom" align="start" className="w-40 px-1">
                <PopoverHeader>
                    <PopoverTitle className="px-3">
                        Status
                    </PopoverTitle>
                </PopoverHeader>
                <Separator />
                <div>
                    {
                        IntegrationStatusEnum.options.map((status) => (
                            <div key={status} className="flex items-center p-3 hover:bg-secondary rounded-md">
                                <span className="flex-1">{status}</span>
                                <Check size={16} />
                            </div>
                        ))
                    }
                </div>
            </PopoverContent>
        </Popover>
    )
}