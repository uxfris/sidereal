import { AttendeeAvatar } from "@/components/attendee-avatar";
import { CalendarMinimalistic, ClockCircle } from "@solar-icons/react/ssr";
import type { Meeting } from "@workspace/types";

export function MeetingDocumentHeader({ meeting }: { meeting: Meeting }) {
    return (
        <section className="space-y-4 pb-8 border-b">
            <h1 className="text-4xl md:text-5xl-custom font-bold">
                {meeting.title}
            </h1>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4 md:gap-6">
                    <div className="flex items-center gap-2 text-sm">
                        <CalendarMinimalistic />
                        {meeting.timestamp}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <ClockCircle />
                        {meeting.duration}
                    </div>
                </div>
                <AttendeeAvatar attendees={meeting.attendees} extra={meeting.extraAttendees} />
            </div>
        </section>
    )
}
