import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs"
import { TaskList } from "./_components/task-list"
import { TaskAIInsight } from "./_components/task-ai-insight"
import { TaskProductivityStats } from "./_components/task-productivity"
import { TaskGroup } from "./_types/task";
import { EmptyState } from "@/components/empty-state";

export const mockTaskGroups: TaskGroup[] = [
    {
        id: "group-1",
        title: "Website Redesign",
        timestamp: "2025-03-20T14:30:00Z",
        tasks: [
            {
                id: "task-1",
                title: "Create wireframes",
                isCompleted: false,
                assignee: {
                    id: "user-1",
                    name: "Alice Johnson",
                    initials: "AJ",
                    avatarUrl: "https://i.pravatar.cc/150?img=1"
                }
            },
            {
                id: "task-2",
                title: "Design landing page",
                isCompleted: false,
                assignee: {
                    id: "user-2",
                    name: "Bob Smith",
                    initials: "BS",
                    avatarUrl: "https://i.pravatar.cc/150?img=2"
                }
            },
            {
                id: "task-3",
                title: "Prepare design assets",
                isCompleted: false,
                assignee: null
            }
        ]
    },
    {
        id: "group-2",
        title: "Mobile App Launch",
        timestamp: "2025-03-22T09:00:00Z",
        tasks: [
            {
                id: "task-4",
                title: "Fix login bug",
                isCompleted: true,
                assignee: {
                    id: "user-3",
                    name: "Charlie Lee",
                    initials: "CL",
                    avatarUrl: "https://i.pravatar.cc/150?img=3"
                }
            },
            {
                id: "task-5",
                title: "Implement push notifications",
                isCompleted: false,
                assignee: {
                    id: "user-1",
                    name: "Alice Johnson",
                    initials: "AJ",
                    avatarUrl: "https://i.pravatar.cc/150?img=1"
                }
            }
        ]
    },
    {
        id: "group-3",
        title: "Marketing Campaign",
        timestamp: "2025-03-25T16:45:00Z",
        tasks: [
            {
                id: "task-6",
                title: "Write email copy",
                isCompleted: false,
                assignee: null
            },
            {
                id: "task-7",
                title: "Design social media banners",
                isCompleted: true,
                assignee: {
                    id: "user-2",
                    name: "Bob Smith",
                    initials: "BS",
                    avatarUrl: "https://i.pravatar.cc/150?img=2"
                }
            },
            {
                id: "task-8",
                title: "Schedule posts",
                isCompleted: false,
                assignee: {
                    id: "user-3",
                    name: "Charlie Lee",
                    initials: "CL",
                    avatarUrl: "https://i.pravatar.cc/150?img=3"
                }
            }
        ]
    }
];


export default function Tasks() {
    return (
        <div className="flex flex-col overflow-hidden gap-8 px-10 pt-10">
            <h1 className="text-base font-semibold">Tasks</h1>
            <Tabs defaultValue="all" className="gap-4 h-full">
                <TabsList variant="line" className="w-full justify-start gap-6">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="assign-to-me">Assigned to Me</TabsTrigger>
                    <TabsTrigger value="from-last-meeting">From Last Meeting</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="flex flex-col lg:flex-row overflow-hidden gap-10">
                    <div className="flex-1 min-w-0 md:no-scrollbar overflow-y-auto pt-7 pb-36 space-y-10">
                        {mockTaskGroups.length === 0 &&
                            <EmptyState
                                title="No task yet"
                                description="Lume is waiting for your first meeting to begin automatically capturing action items and strategic takeaways."
                                className="h-full" />}

                        {
                            mockTaskGroups.map((taskGroup) => <TaskList key={taskGroup.id} tasksGroup={taskGroup} />)
                        }
                    </div>
                    <div className="hidden lg:block w-[288px] shrink-0 md:no-scrollbar overflow-y-auto pt-7 pb-36 space-y-8">
                        <TaskAIInsight />
                        <TaskProductivityStats />
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}