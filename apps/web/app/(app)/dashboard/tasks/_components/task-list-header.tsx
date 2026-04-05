import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import { ArrowRightLeft, Check, Copy } from "lucide-react"
import { CheckCircle, LinkMinimalistic } from "@solar-icons/react"
import { formatDate } from "@workspace/ui/lib/date-format"
import { Tooltip, TooltipContent, TooltipTrigger } from "@workspace/ui/components/tooltip"
import { cn } from "@workspace/ui/lib/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@workspace/ui/components/dropdown-menu"
import Image from "next/image"
import { useState } from "react"
import { TaskGroup } from "../_types/task"

//Mock data

const MockIntegrationList = [
    {
        id: "1",
        icon: "/vectors/asana.svg",
        label: "Asana",
        isConnected: false,
    },
    {
        id: "2",
        icon: "/vectors/clickup.svg",
        label: "ClickUp",
        isConnected: false,
    },
    {
        id: "3",
        icon: "/vectors/googletasks.svg",
        label: "Google Tasks",
        isConnected: false,
    },
    {
        id: "4",
        icon: "/vectors/jira.svg",
        label: "Jira Projects",
        isConnected: false,
    },
    {
        id: "5",
        icon: "/vectors/linear-app.svg",
        label: "Linear App",
        isConnected: false,
    },
    {
        id: "6",
        icon: "/vectors/ms-planner.svg",
        label: "Microsoft Planner",
        isConnected: false,
    },
    {
        id: "7",
        icon: "/vectors/ms-todo.svg",
        label: "Microsoft To Do",
        isConnected: false,
    },
    {
        id: "8",
        icon: "/vectors/trello.svg",
        label: "Trello",
        isConnected: true,
        feature: "Send tasks",
    }
]




export function TaskListHeader({ tasksGroup }: { tasksGroup: TaskGroup }) {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        const text = tasksGroup.tasks.map(task => task.title).join("\n")
        await navigator.clipboard.writeText(text)

        setCopied(true)

        setTimeout(() => setCopied(false), 1500)


    }


    return (
        <div className="w-full flex items-center">
            <div className="bg-primary self-stretch w-1 rounded-full" aria-hidden={true} />
            <div className="w-full pl-4">
                <div className="w-full flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <h2 className="text-xl font-semibold truncate">{tasksGroup.title}</h2>
                        <Badge variant="secondary" className="text-muted-foreground">{tasksGroup.tasks.length} items</Badge>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="opacity-0 group-hover/task:opacity-100 transition-opacity duration-300"
                                    onClick={handleCopy}
                                >
                                    <span className="relative w-4 h-4">
                                        <Copy className={cn("absolute transition-all duration-200", copied ? "scale-0 opacity-0" : "scale-100 opacity-100")} />
                                        <Check className={cn("absolute transition-all duration-200", copied ? "scale-100 opacity-100" : "scale-0 opacity-0")} />
                                    </span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Copy {tasksGroup.tasks.length} items</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" className="hidden md:flex">
                                <ArrowRightLeft />
                                Sync to
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="sm:min-w-52">
                            <DropdownMenuGroup className="space-y-2">
                                <DropdownMenuLabel>Project Destination</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                {MockIntegrationList.map((item) =>
                                    !item.isConnected ?
                                        (<DropdownMenuItem key={item.id} className="gap-3" onSelect={() => console.log("menu is clicked", item.label)}>
                                            <Image src={item.icon} alt={item.label} width={14} height={14} />
                                            <div className="flex-1">
                                                <h5 className="text-sm font-medium">{item.label}</h5>
                                                <p className="text-xs text-muted-foreground">Connect</p>
                                            </div>
                                            <LinkMinimalistic />
                                        </DropdownMenuItem>)
                                        :
                                        (
                                            <DropdownMenuSub key={item.id}>
                                                <DropdownMenuSubTrigger className="gap-3">
                                                    <Image src={item.icon} alt={item.label} width={14} height={14} />
                                                    <div>
                                                        <div className="flex items-center gap-1">
                                                            <h5 className="text-sm font-medium">{item.label}</h5>
                                                            <CheckCircle weight="Bold" className="text-green-300 dark:text-green-600" />
                                                        </div>
                                                        <p className="text-xs text-muted-foreground">{item.feature}</p>
                                                    </div>
                                                </DropdownMenuSubTrigger>
                                                <DropdownMenuSubContent>
                                                    <DropdownMenuItem onSelect={() => { }}>
                                                        Send my taks
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onSelect={() => { }}>
                                                        Send all taks
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onSelect={() => { }}>
                                                        Select tasks
                                                    </DropdownMenuItem>
                                                </DropdownMenuSubContent>
                                            </DropdownMenuSub>
                                        )
                                )}
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <time dateTime={tasksGroup.timestamp} className="text-xs text-muted-foreground">{formatDate(tasksGroup.timestamp)}</time>
            </div>
        </div>
    )
}