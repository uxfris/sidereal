"use client"

import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import { Card, CardContent } from "@workspace/ui/components/card"
import { ArrowRightLeft, Copy, Plus } from "lucide-react"
import { ActionItem } from "../_types/task"
import { AltArrowDown } from "@solar-icons/react"
import { TaskItem } from "./task-item"

export const mockActionItems: ActionItem[] = [
    {
        id: "ai-001",
        title: "Refine Q3 product roadmap",
        description: "Incorporate feedback from Marcus and align with engineering capacity.",
        isCompleted: false,
        assignee: {
            id: "u-001",
            name: "Marcus Chen",
            initials: "MC",
            avatarUrl: "https://i.pravatar.cc/150?img=11",
        },
    },
    {
        id: "ai-002",
        title: "Prepare Q3 budget proposal",
        description: "Work with finance to finalize projected costs and ROI.",
        isCompleted: true,
        assignee: {
            id: "u-002",
            name: "Sarah Kim",
            initials: "SK",
            avatarUrl: "https://i.pravatar.cc/150?img=5",
        },
    },
    {
        id: "ai-003",
        title: "Schedule stakeholder review meeting",
        description: "Coordinate availability with leadership team.",
        isCompleted: false,
        assignee: null,
    },
    {
        id: "ai-004",
        title: "Update product documentation",
        description: "Add new API changes and migration guide.",
        isCompleted: false,
        assignee: {
            id: "u-003",
            name: "Daniel Rivera",
            initials: "DR",
            avatarUrl: "https://i.pravatar.cc/150?img=12",
        },
    },
    {
        id: "ai-005",
        title: "Define Q3 success metrics",
        description: "Finalize KPIs for growth, retention, and engagement.",
        isCompleted: false,
        assignee: {
            id: "u-004",
            name: "Aisha Patel",
            initials: "AP",
            avatarUrl: "https://i.pravatar.cc/150?img=20",
        },
    },
]

export function TaskList() {
    return (
        <div className=" space-y-4">
            {/* Header */}
            <div className="w-full flex items-center">
                <div className="bg-primary self-stretch w-1 rounded-full" aria-hidden={true} />
                <div className="w-full pl-4">
                    <div className="w-full flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <h2 className="text-xl font-semibold truncate">Q3 Strategy Planning</h2>
                            <Badge variant="secondary" className="text-muted-foreground">2 items</Badge>
                            <Button variant="ghost" size="icon"><Copy /></Button>
                        </div>
                        <Button variant="secondary" className="hidden md:flex">
                            <ArrowRightLeft />
                            Sync to
                        </Button>
                    </div>
                    <time dateTime="2025-03-01T14:30:00" className="text-xs text-muted-foreground">Thu, Mar 2025 02:30 PM</time>
                </div>
            </div>
            {/* Item Action Card */}
            <Card>
                <CardContent>
                    {
                        mockActionItems.filter((item => !item.isCompleted)).map((item) => (<TaskItem key={item.id} />))
                    }
                </CardContent>
            </Card>
            <div className="flex items-center gap-2">
                <AltArrowDown />
                <span className="text-xs font-medium to-muted-foreground">1 Completed</span>
            </div>
            <Card>
                <CardContent>
                    {/* Item Actions List*/}
                    {
                        mockActionItems.filter((item => item.isCompleted)).map((item) =>
                            (<TaskItem key={item.id} />))
                    }
                </CardContent>
            </Card>
            <Button variant="ghost"><Plus /> New Task</Button>
        </div>
    )
}

