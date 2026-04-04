import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs"
import { TaskList } from "./_components/task-list"

export default function Tasks() {
    return (
        <div className="flex flex-col overflow-hidden gap-10 p-10">
            <h1 className="text-base font-semibold">Tasks</h1>
            <Tabs defaultValue="all" className="gap-10">
                <TabsList variant="line">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="assign-to-me">Assigned to Me</TabsTrigger>
                    <TabsTrigger value="from-last-meeting">From Last Meeting</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="flex flex-col lg:flex-row overflow-hidden gap-10">
                    <div className="flex-1 min-w-0">
                        <TaskList />
                    </div>
                    <div className="w-[288px] shrink-0">AI Insight placeholder</div>
                </TabsContent>
            </Tabs>
        </div>
    )
}