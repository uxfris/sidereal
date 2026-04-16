import { MeetingDocumentToolbar } from "./_components/meeting-document-toolbar";
import { MeetingDocumentHeader } from "./_components/meeting-document-header";
import { MeetingDocumentOverview } from "./_components/meeting-document-overview";
import { MeetingDocumentTakeaway } from "./_components/meeting-document-takeaway";
import { MeetingDocumentActionItem } from "./_components/meeting-document-action-item";
import { MeetingDocumentTranscript } from "./_components/meeting-document-transcript";
import { MeetingMediaPlayerBar } from "./_components/meeting-media-player-bar";
import { Meeting } from "@workspace/types/meetings";

const MOCK_MEETING: Meeting =
{
    id: "1",
    title: "Client Onboarding: Helios",
    summary: "Initial walkthrough of the API documentation and environment setup for...",
    status: "analyzing",
    timestamp: "10:30",
    duration: "28m",
    attendees: [
        { id: "a", initials: "A" },
        { id: "b", initials: "B" },
    ],
    extraAttendees: 3,
}

export default function MeetingDetail() {
    return (
        <main className="pt-24 px-4 md:px-6 bg-card">
            <div className="mx-auto max-w-[700px] space-y-12 ">
                <header>
                    <MeetingDocumentToolbar meeting={MOCK_MEETING} />
                    <MeetingDocumentHeader />
                </header>
                {/* Content */}
                <MeetingDocumentOverview />
                <MeetingDocumentTakeaway />
                <MeetingDocumentActionItem />
                <MeetingDocumentTranscript />
                <MeetingMediaPlayerBar />
            </div>
        </main>
    )
}



