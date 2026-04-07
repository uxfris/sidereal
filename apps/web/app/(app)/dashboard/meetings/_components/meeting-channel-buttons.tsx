import { Hashtag } from "@solar-icons/react/ssr";
import { Button } from "@workspace/ui/components/button";
import Link from "next/link";

export function MeetingChannelButtons() {
    return (
        <div className="flex flex-wrap items-center gap-2">
            {[
                { id: "1", label: "Design Sprint" },
                { id: "2", label: "Side Projects" },

            ].map((channel) => (
                <Button key={channel.id} variant="outline" className="shrink-0" asChild>
                    <Link href={`/meetings/${channel.id}`}>
                        <Hashtag />
                        {channel.label}
                    </Link>
                </Button>
            ))}
        </div>
    )
}