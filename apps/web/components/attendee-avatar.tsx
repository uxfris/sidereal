import { SanitizedHtml } from "@/lib/sanitized-html"
import { Attendee } from "@workspace/types"
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@workspace/ui/components/avatar"

export function AttendeeAvatar({
  attendees,
  extra,
}: {
  attendees: Attendee[]
  extra?: number
}) {
  return (
    <AvatarGroup>
      {attendees.map((attendee) => (
        <Avatar key={attendee.id} size="sm">
          <AvatarImage src={attendee.avatarUrl} />
          <AvatarFallback className="text-xs font-medium">
            <SanitizedHtml html={attendee.initials} />
          </AvatarFallback>
        </Avatar>
      ))}
      {extra != null && extra > 0 && (
        <AvatarGroupCount className="text-xs font-medium">
          +{extra}
        </AvatarGroupCount>
      )}
    </AvatarGroup>
  )
}
