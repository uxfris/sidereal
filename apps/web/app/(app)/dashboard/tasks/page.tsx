import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs"
import { TaskList } from "./_components/task-list"
import { TaskAIInsight } from "./_components/task-ai-insight"
import { TaskProductivityStats } from "./_components/task-productivity"
import { EmptyState } from "@/components/empty-state";
import { taskApi } from "@workspace/api-client/task.api";
import { AssigneesProvider } from "./_hooks/use-task-assigness";


export default async function Tasks() {
    const [groups, assignees] = await Promise.all([
        taskApi.fetchTasksGroup(),
        taskApi.fetchAssignees()
    ])
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
                        {groups.length === 0 &&
                            <EmptyState
                                title="No task yet"
                                description="Lume is waiting for your first meeting to begin automatically capturing action items and strategic takeaways."
                                className="h-full" />}

                        <AssigneesProvider assignees={assignees}>
                            {
                                groups.map((taskGroup) => <TaskList key={taskGroup.id} tasksGroup={taskGroup} />)
                            }
                        </AssigneesProvider>
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