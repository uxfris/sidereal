import { PeopleSearch } from "./people-search";
import { PeopleSelect } from "./people-select";
import { PeopleRolePopover } from "./people-role-popover";
import { PeopleExport } from "./people-export";
import { PeopleLinkInvite } from "./people-link-invite";
import { PeopleInviteMembers } from "./people-invite-members";


export function PeopleSearchFilterAction(
    { searchValue, onSearchChange, filterValue, onFilterChange, selectionMode, onSelectionModeChange }: {
        searchValue: string, onSearchChange: (value: string) => void,
        filterValue: string, onFilterChange: (value: string) => void,
        selectionMode: boolean,
        onSelectionModeChange: (mode: boolean) => void,
    }

) {
    return (
        <div className="flex justify-between">
            <div className="flex items-center gap-2">
                <PeopleSearch value={searchValue} onChange={onSearchChange} />
                <PeopleRolePopover filterValue={filterValue} onFilterChange={onFilterChange} />
            </div>
            <div className="flex items-center gap-2">
                <PeopleSelect selectionMode={selectionMode} onSelectionModeChange={onSelectionModeChange} />
                <PeopleExport />
                <PeopleLinkInvite />
                <PeopleInviteMembers />
            </div>
        </div>
    )
}