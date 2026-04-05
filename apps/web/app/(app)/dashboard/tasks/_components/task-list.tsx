"use client"

import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import { Card, CardContent } from "@workspace/ui/components/card"
import { ArrowRightLeft, Check, ChevronRight, Copy, Plus } from "lucide-react"
import { AddCircle, AltArrowDown, CheckCircle } from "@solar-icons/react"
import { TaskItem } from "./task-item"
import { TaskGroup } from "../_types/task"
import { formatDate } from "@workspace/ui/lib/date-format"
import { Tooltip, TooltipContent, TooltipTrigger } from "@workspace/ui/components/tooltip"
import { useState } from "react"
import { cn } from "@workspace/ui/lib/utils"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@workspace/ui/components/collapsible"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@workspace/ui/components/dropdown-menu"
import Image from "next/image"

//Mock data

const integrationList = [
    {
        id: "1",
        icon: "/slack.svg",
        label: "Slack",
        isConnected: false,
    },
    {
        id: "2",
        icon: "/hubspot.svg",
        label: "Hubspot",
        isConnected: false,
    },
    {
        id: "3",
        icon: "/trello.svg",
        label: "Trello",
        isConnected: true,
        feature: "Send tasks",
        menu: [
            {
                id: "1",
                name: "Send my tasks",
            },
            {
                id: "2",
                name: "Send all taks",
            },
            {
                id: "3",
                name: "Select tasks",
            },
        ]
    },
    {
        id: "4",
        icon: "/notion.svg",
        label: "Notion",
        isConnected: false,
    },
]



export function TaskList({ tasksGroup }: { tasksGroup: TaskGroup }) {
    const [copied, setCopied] = useState(false)
    const [collapsibleOpen, setCollapsibleOpen] = useState(false)

    const handleCopy = async () => {
        const text = tasksGroup.tasks.map(task => task.title).join("\n")
        await navigator.clipboard.writeText(text)

        setCopied(true)

        setTimeout(() => setCopied(false), 1500)


    }

    return (
        <div className="space-y-4 group/task">
            {/* Header */}
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
                            <DropdownMenuContent className="sm:min-w-48">
                                <DropdownMenuGroup className="space-y-2">
                                    <DropdownMenuLabel>Project Destination</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    {integrationList.map((item) =>
                                        !item.isConnected ?
                                            (<DropdownMenuItem key={item.id} className="gap-3" onSelect={() => console.log("menu is clicked", item.label)}>
                                                <Image src={`/vectors/${item.icon}`} alt={item.label} width={14} height={14} />
                                                <h5 className="text-sm font-medium">{item.label}</h5>
                                                <AddCircle />
                                            </DropdownMenuItem>)
                                            :
                                            (
                                                <DropdownMenuSub key={item.id}>
                                                    <DropdownMenuSubTrigger className="gap-3">
                                                        <Image src={`/vectors/${item.icon}`} alt={item.label} width={14} height={14} />
                                                        <div>
                                                            <div className="flex items-center gap-1">
                                                                <h5 className="text-sm font-medium">{item.label}</h5>
                                                                <CheckCircle weight="Bold" className="text-green-300 dark:text-green-600" />
                                                            </div>
                                                            <p className="text-xs text-muted-foreground">{item.feature}</p>
                                                        </div>
                                                    </DropdownMenuSubTrigger>
                                                    <DropdownMenuSubContent>
                                                        {item.menu?.map((menu) => (
                                                            <DropdownMenuItem key={menu.id} onSelect={() => console.log("menu is clicked", menu.name)}>
                                                                {menu.name}
                                                            </DropdownMenuItem>
                                                        ))}
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
            {/* Item Action Card */}
            <Card>
                <CardContent>
                    {
                        tasksGroup.tasks.filter((item => !item.isCompleted)).map((item) => (<TaskItem key={item.id} item={item} />))
                    }
                </CardContent>
            </Card>
            {tasksGroup.tasks.filter((item => item.isCompleted)).length > 0 && <Collapsible open={collapsibleOpen} onOpenChange={setCollapsibleOpen} className="space-y-1">
                <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="xs" className="bg-transparent aria-expanded:bg-transparent">
                        <AltArrowDown className={cn("transition-all duration-200 rotate-0", collapsibleOpen && "rotate-180")} />
                        <span >1 Completed</span>
                    </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <Card>
                        <CardContent>
                            {/* Item Actions List*/}
                            {
                                tasksGroup.tasks.filter((item => item.isCompleted)).map((item) =>
                                    (<TaskItem key={item.id} item={item} />))
                            }
                        </CardContent>
                    </Card>
                </CollapsibleContent>
            </Collapsible>}

            <Button variant="ghost"><Plus /> New Task</Button>
        </div>
    )
}

