import { AttendeeAvatar } from "@/components/attendee-avatar";
import { CalendarMinimalistic, ClockCircle } from "@solar-icons/react/ssr";


export function MeetingDocumentHeader() {
    return (
        <section className="space-y-4 pb-8 border-b">
            <h1 className="text-5xl-custom font-bold">
                Q4 Strategy Planning
            </h1>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-sm">
                        <CalendarMinimalistic />
                        October 24, 2026
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <ClockCircle />
                        10:00 AM · 90m
                    </div>
                </div>
                <AttendeeAvatar attendees={[
                    { id: "a", initials: "A" },
                    { id: "b", initials: "B" },
                    { id: "c", initials: "B" },
                ]} extra={5} />
            </div>
        </section>
    )
}