import { MeetingDocumentToolbar } from "./_components/meeting-document-toolbar";
import { MeetingDocumentHeader } from "./_components/meeting-document-header";
import { MeetingDocumentOverview } from "./_components/meeting-document-overview";
import { MeetingDocumentTakeaway } from "./_components/meeting-document-takeaway";
import { MeetingDocumentActionItem } from "./_components/meeting-document-action-item";
import { MeetingDocumentTranscript } from "./_components/meeting-document-transcript";

export default function MeetingDetail() {
    return (
        <main className="mx-auto max-w-900 space-y-12 pt-24 px-6">
            <header>
                <MeetingDocumentToolbar />
                <MeetingDocumentHeader />
            </header>
            {/* Content */}
            <MeetingDocumentOverview />
            <MeetingDocumentTakeaway />
            <MeetingDocumentActionItem />
            <MeetingDocumentTranscript />
        </main>
    )
}



