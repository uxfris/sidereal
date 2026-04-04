import { Attendee } from "@/app/(app)/dashboard/_types/meetings"
import { highlightWithMatches } from "@/lib/search/highlight-with-matches"
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from "@workspace/ui/components/avatar"
import { FuseResultMatch } from "fuse.js"

type AttendeeAvatarProps = {
    attendees: Attendee[]
    extra?: number
    matches?: FuseResultMatch[] | readonly FuseResultMatch[] | undefined
}

export function AttendeeAvatar({ attendees, extra, matches }: AttendeeAvatarProps) {
    return (
        <AvatarGroup>
            {attendees.map((attendee) => (
                <Avatar key={attendee.id} size="sm">
                    <AvatarImage src={attendee.avatarUrl} />
                    <AvatarFallback className="text-xs font-medium">{highlightWithMatches(attendee.initials, matches, "attendees.initials")}</AvatarFallback>
                </Avatar>
            ))}
            {extra && <AvatarGroupCount className="text-xs font-medium">+{extra}</AvatarGroupCount>}
        </AvatarGroup>
    )
}