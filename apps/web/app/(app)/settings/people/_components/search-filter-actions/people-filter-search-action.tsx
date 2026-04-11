import { PeopleSearch } from "./people-search";
import { PeopleSelect } from "./people-select";
import { PeopleRolePopover } from "./people-role-popover";
import { PeopleExport } from "./people-export";
import { PeopleLinkInvite } from "./people-link-invite";
import { PeopleInviteMembers } from "./people-invite-members";


export function PeopleSearchFilterAction() {
    return (
        <div className="flex justify-between">
            <div className="flex items-center gap-2">
                <PeopleSearch />
                <PeopleRolePopover />
            </div>
            <div className="flex items-center gap-2">
                <PeopleSelect />
                <PeopleExport />
                <PeopleLinkInvite />
                <PeopleInviteMembers />
            </div>
        </div>
    )
}