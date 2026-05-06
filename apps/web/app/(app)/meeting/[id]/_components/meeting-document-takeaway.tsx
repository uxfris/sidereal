import { CopyButton } from "@/components/copy-button";
import type { Meeting } from "@workspace/types";
import { SanitizedHtml } from "@/lib/sanitized-html";

export function MeetingDocumentTakeaway({ meeting }: { meeting: Meeting }) {
    const keyPoints = meeting.keyPoints ?? [];

    if (keyPoints.length === 0) {
        return null;
    }

    return (
        <section className="space-y-4 group/takeaway">
            <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold">
                    Key Takeaways
                </h2>
                <CopyButton group="takeaway" content={keyPoints.join("\n")} />
            </div>
            <ul className="list-disc list-inside pl-2 marker:text-xs space-y-4">
                {keyPoints.map((point, i) => (
                    <li key={i}>
                        <SanitizedHtml html={point} />
                    </li>
                ))}
            </ul>
        </section>
    )
}
