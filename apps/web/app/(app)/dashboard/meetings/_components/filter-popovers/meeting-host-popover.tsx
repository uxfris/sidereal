import { MinimalisticMagnifier } from "@solar-icons/react";
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
import { ChevronDown, } from "lucide-react";

// Mock data
const MOCK_HOSTS = [
    {
        id: "1",
        fullname: "Fris El",
        avatar_url: "",
        initials: "FE",
        isChecked: false,
    },
    {
        id: "2",
        fullname: "Kevin Hou",
        avatar_url: "",
        initials: "KH",
        isChecked: true,
    }
]


export function MeetingHostPopover() {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="xs" className="flex-1 justify-between text-muted-foreground">
                    Any host
                    <ChevronDown />
                </Button>
            </PopoverTrigger>
            <PopoverContent side="bottom" align="start" className="w-64 px-1">
                <PopoverHeader>
                    <PopoverTitle className="px-3">
                        Hosted by
                    </PopoverTitle>
                </PopoverHeader>
                <Separator />
                <div className="flex items-center gap-2 px-3">
                    <InputGroup className="bg-input">
                        <InputGroupInput placeholder="search host" />
                        <InputGroupAddon>
                            <MinimalisticMagnifier />
                        </InputGroupAddon>
                    </InputGroup>
                    <Button size="xs" variant="ghost">Clear all</Button>
                </div>
                <div>
                    {
                        MOCK_HOSTS.map((host) => (
                            <div key={host.id} className="flex items-center p-3 hover:bg-secondary rounded-md">
                                <div className="flex flex-1 items-center gap-2">
                                    <Avatar size="sm">
                                        <AvatarImage src={host.avatar_url} />
                                        <AvatarFallback>{host.initials}</AvatarFallback>
                                    </Avatar>
                                    <p className="text-sm font-medium text-popover-foreground line-clamp-1">{host.fullname}</p>
                                </div>
                                <Checkbox checked={host.isChecked} onClick={(e) => e.stopPropagation()} />
                            </div>
                        ))
                    }
                </div>
            </PopoverContent>
        </Popover>
    )
}