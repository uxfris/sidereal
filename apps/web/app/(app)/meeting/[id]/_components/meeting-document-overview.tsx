import { Stars } from "@solar-icons/react/ssr";
import type { Meeting } from "@workspace/types";
import { SanitizedHtml } from "@/lib/sanitized-html";

export function MeetingDocumentOverview({ meeting }: { meeting: Meeting }) {
    return (
        <section className="bg-secondary rounded-md p-6">
            <div className="flex gap-4 items-start">
                <Stars weight="Bold" className="w-20 text-2xl text-primary" />
                <div className="space-y-3">
                    <p className="text-sm text-primary font-semibold uppercase">Overview</p>
                    <p className="text-base font-medium">
                        <SanitizedHtml html={meeting.summary} />
                    </p>
                </div>
            </div>
        </section>
    )
}
