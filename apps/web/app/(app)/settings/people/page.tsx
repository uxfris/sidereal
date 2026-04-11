import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs";
import { SettingHeader } from "../_components/setting-header";
import { PeopleSearchFilterAction } from "./_components/search-filter-actions/people-filter-search-action";
import { PeopleDataTable } from "./_components/people-data-table";
import { peopleColumns } from "./_components/columns/people-column";

import { WorkspacePeopleInvitationTable, WorkspacePeopleTable } from "@workspace/types/people";
import { peopleInvitationColumns } from "./_components/columns/people-invitation-column";
import { InvitationEmpty } from "./_components/people-invitation-empty";

export const workspacePeopleMock: WorkspacePeopleTable = [
    {
        id: "usr_001",
        name: "Fris El",
        email: "uxfris@gmail.com",
        avatarInitials: "F",
        role: "owner",
        joinedAt: "2026-03-24T00:00:00.000Z",
        isCurrentUser: true,
    },
    {
        id: "usr_002",
        name: "Sarah Chen",
        email: "sarah@example.com",
        avatarInitials: "SC",
        role: "admin",
        joinedAt: "2026-03-28T00:00:00.000Z",
        isCurrentUser: false,
    },
    {
        id: "usr_003",
        name: "Alex Morgan",
        email: "alex@example.com",
        avatarInitials: "AM",
        role: "member",
        joinedAt: "2026-04-01T00:00:00.000Z",
        isCurrentUser: false,
    },
];

export const workspacePeopleInvitationMock: WorkspacePeopleInvitationTable = [
    {
        id: "usr_001",
        name: "Fris El",
        email: "uxfris@gmail.com",
        avatarInitials: "F",
        role: "owner",
        invitedAt: "2026-03-24T00:00:00.000Z",
    },
    {
        id: "usr_002",
        name: "Sarah Chen",
        email: "sarah@example.com",
        avatarInitials: "SC",
        role: "admin",
        invitedAt: "2026-03-28T00:00:00.000Z",
    },
    {
        id: "usr_003",
        name: "Alex Morgan",
        email: "alex@example.com",
        avatarInitials: "AM",
        role: "member",
        invitedAt: "2026-04-01T00:00:00.000Z",
    },
];


export default function People() {

    return (
        <div className="flex flex-col gap-8 p-12">
            <SettingHeader
                title="People"
                description="Inviting people to Fris's Lume gives access to workspace shared projects and credits. You have 1 builder in this workspace."
            />
            <Tabs defaultValue="all" className="space-y-4">
                <TabsList className="gap-2">
                    <TabsTrigger value="all" className="px-4">
                        All
                    </TabsTrigger>
                    <TabsTrigger value="invited" className="px-4">
                        Invited
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="all">
                    <PeopleDataTable columns={peopleColumns} data={workspacePeopleMock} />
                </TabsContent>
                <TabsContent value="invited">
                    <div className="space-y-2">
                        <PeopleSearchFilterAction />
                        {workspacePeopleInvitationMock.length === 0 && <InvitationEmpty />}
                        {workspacePeopleInvitationMock.length !== 0 && <PeopleDataTable columns={peopleInvitationColumns} data={workspacePeopleInvitationMock} />}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}