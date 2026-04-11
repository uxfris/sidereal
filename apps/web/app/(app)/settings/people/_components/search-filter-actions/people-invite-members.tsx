import { UserPlus } from "@solar-icons/react/ssr";
import { Button } from "@workspace/ui/components/button";

export function PeopleInviteMembers() {
    return (
        <Button size="xs">
            <UserPlus />
            Invite members
        </Button>
    )
}