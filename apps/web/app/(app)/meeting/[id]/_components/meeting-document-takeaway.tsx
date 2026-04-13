import { CopyButton } from "@/components/copy-button";
import { Copy } from "@solar-icons/react/ssr";
import { Button } from "@workspace/ui/components/button";

export function MeetingDocumentTakeaway() {
    return (
        <section className="space-y-4 group/takeaway">
            <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold">
                    Key Takeaways
                </h2>
                <CopyButton group="takeaway" content="" />
            </div>
            <ul className="list-disc list-inside pl-2 marker:text-xs space-y-4">
                <li>
                    Transition to asynchronous update cycles for non- critical engineering sprints.
                </li>
                <li>
                    Allocation of $450k surplus to the Studio B equipment refresh.
                </li>
                <li>
                    Immediate freeze on North Hemisphere hiring until Q1 2024.
                </li>
            </ul>
        </section>
    )
}