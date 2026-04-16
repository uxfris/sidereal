import { MinimalisticMagnifier } from "@solar-icons/react";
import { IntegrationCategoryEnum } from "@workspace/types";
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar";
import { Button } from "@workspace/ui/components/button";
import { Checkbox } from "@workspace/ui/components/checkbox";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@workspace/ui/components/input-group";
import {
    Popover,
    PopoverContent,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from "@workspace/ui/components/popover"
import { Separator } from "@workspace/ui/components/separator";
import { Check, ChevronDown, } from "lucide-react";


export function IntegrationCategoryPopover() {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="xs" className="w-full md:w-fit justify-between text-muted-foreground">
                    Any integration
                    <ChevronDown />
                </Button>
            </PopoverTrigger>
            <PopoverContent side="bottom" align="start" className="w-56 px-1">
                <PopoverHeader>
                    <PopoverTitle className="px-3">
                        Integration category
                    </PopoverTitle>
                </PopoverHeader>
                <Separator />
                <div>
                    {
                        IntegrationCategoryEnum.options.map((category) => (
                            <div key={category} className="flex items-center p-3 hover:bg-secondary rounded-md">
                                <span className="flex-1">{category}</span>
                                <Check size={16} />
                            </div>))
                    }
                </div>
            </PopoverContent>
        </Popover>
    )
}