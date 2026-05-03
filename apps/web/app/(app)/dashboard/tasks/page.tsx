import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs"
import { TaskList } from "./_components/task-list"
import { TaskAIInsight } from "./_components/task-ai-insight"
import { TaskProductivityStats } from "./_components/task-productivity"
import { EmptyState } from "@/components/empty-state";
import { taskApi } from "@workspace/api-client";
import { getServerApiFetchOptions } from "@/lib/server-api";
import { AssigneesProvider } from "./_hooks/use-task-assigness";


export default async function Tasks() {
    const fetchOpts = await getServerApiFetchOptions();
    const [groups, assignees] = await Promise.all([
        taskApi.fetchTasksGroup(fetchOpts),
        taskApi.fetchAssignees(fetchOpts)
    ])
    return (
        <div className="flex flex-col overflow-hidden gap-4 md:gap-8 pt-4 md:pt-10">
            <h1 className="text-base font-semibold px-4 md:px-10">Tasks</h1>
            <Tabs defaultValue="all" className="h-full gap-0">
                <div className="relative px-4 md:px-10 overflow-x-auto md:overflow-visible h-9 overflow-y-visible no-scrollbar">
                    <div className="absolute left-0 right-0 bottom-0 h-px w-full bg-border" />
                    <TabsList variant="line" className="relative w-max justify-start gap-6">
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="assign-to-me">Assigned to Me</TabsTrigger>
                        <TabsTrigger value="from-last-meeting">From Last Meeting</TabsTrigger>
                        <TabsTrigger value="completed">Completed</TabsTrigger>
                    </TabsList>
                </div>
                <TabsContent value="all" className="flex flex-col lg:flex-row overflow-hidden">
                    <div className="flex-1 min-w-0 md:no-scrollbar overflow-y-auto pt-7 pb-36 px-4 md:px-10 space-y-10">
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
                    <div className="hidden lg:block w-[288px] shrink-0 md:no-scrollbar overflow-y-auto pt-7 pb-36 pr-10 space-y-8">
                        <TaskAIInsight />
                        <TaskProductivityStats />
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}