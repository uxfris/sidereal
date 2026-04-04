import { Attendee } from "@/app/(app)/dashboard/_types/meetings"
import { SanitizedHtml } from "@/lib/sanitized-html"
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from "@workspace/ui/components/avatar"

export function AttendeeAvatar({ attendees, extra }: { attendees: Attendee[], extra?: number }) {
    return (
        <AvatarGroup>
            {attendees.map((attendee) => (
                <Avatar key={attendee.id} size="sm">
                    <AvatarImage src={attendee.avatarUrl} />
                    <AvatarFallback className="text-xs font-medium"><SanitizedHtml html={attendee.initials} /></AvatarFallback>
                </Avatar>
            ))}
            {extra && <AvatarGroupCount className="text-xs font-medium">+{extra}</AvatarGroupCount>}
        </AvatarGroup>
    )
}