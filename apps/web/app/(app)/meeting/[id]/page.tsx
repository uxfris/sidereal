import { AttendeeAvatar } from "@/components/attendee-avatar";
import { CreditLeftCard } from "@/components/credit-left-card";
import { AltArrowDown, AltArrowLeft, CalendarMinimalistic, ClockCircle, Copy, Download, InfoCircle, Pen, Refresh, Restart, Share, Star, Stars } from "@solar-icons/react/ssr";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@workspace/ui/components/dropdown-menu";
import Link from "next/link";
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



