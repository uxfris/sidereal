import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@workspace/ui/components/dialog"
import { AppSidebarMenuButton } from "./nav-item"
import { NavItem } from "../../_types/nav-item"
import { SmartKbd } from "@workspace/ui/components/smart-kbd"
import { useEffect, useMemo, useState } from "react"
import { useShortcutRegister } from "@workspace/ui/components/shortcut-provider"
import { Field } from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"
import { MinimalisticMagnifier } from "@solar-icons/react"
import MeetingItem from "../meetings/meeting-item"
import { RecentMeeting } from "../../_types/meetings"
import Fuse, { FuseResultMatch } from "fuse.js"


// ── Mock data ──────────────────────────────────────────
const meetings: RecentMeeting[] = [
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
    },
    {
        id: "2",
        title: "Q4 Strategy Planning",
        summary: "Focus on Q4 revenue targets, engineering headcount, and the new design system...",
        status: "processed",
        timestamp: "14:00",
        duration: "42m",
        attendees: [
            { id: "a", initials: "A" },
            { id: "b", initials: "B" },
        ],
        extraAttendees: 3,
    },
    {
        id: "3",
        title: "Weekly Design Sync",
        summary: `Reviewing the new "Silent Partner" design system tokens. Team discussed the transition from standard grids to tonal architecture.`,
        status: "processed",
        timestamp: "Oct 22, 2024",
        duration: "45m",
        attendees: [
            { id: "c", initials: "C" },
            { id: "d", initials: "D" },
        ],
        extraAttendees: 3,
    },
    {
        id: "4",
        title: "Brand Refresh Kickoff",
        summary: "Aligning on the new visual direction, moodboards, and stakeholder expectations for...",
        status: "processed",
        timestamp: "Oct 18, 2024",
        duration: "2h 15m",
        attendees: [
            { id: "e", initials: "E" },
        ],
        extraAttendees: 2,
    },
]



export function NavSearch({ item }: { item: NavItem }) {
    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState("")
    const { register } = useShortcutRegister()

    useEffect(() => {
        register("search", () => setOpen((prev) => !prev))
    }, [])


    const fuse = useMemo(() => {
        return new Fuse(meetings, {
            keys: [
                { name: "title", weight: 0.4 },
                { name: "summary", weight: 0.3 },
                { name: "status", weight: 0.1 },
                { name: "timestamp", weight: 0.05 },
                { name: "duration", weight: 0.05 },
                { name: "attendees.initials", weight: 0.1 },
            ],
            threshold: 0.4, //lower = stricter, higher = fuzzier
            includeMatches: true, //REQUIRED for highlighting
            ignoreLocation: true,
        })
    }, [])

    const result = query ?
        fuse.search(query)
        : meetings.map((m) => ({ item: m, matches: [] as FuseResultMatch[] }))

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="w-full">
                <AppSidebarMenuButton item={{
                    ...item,
                    badge: <div className="text-xs gap-0.5 px-1 py-0.5 rounded-sm border border-foreground/10 bg-muted brightness-95 group-data-[state=collapsed]:hidden">
                        <SmartKbd action="search" />
                    </div>
                }} />
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl h-[80vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle className="sr-only">
                        Search Meetings
                    </DialogTitle>
                    <Field orientation="horizontal" className="gap-0">
                        <MinimalisticMagnifier size={18} />
                        <Input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            type="search" placeholder="Search meetings by title or keyword" className="text-lg font-medium bg-transparent" />
                    </Field>
                </DialogHeader>
                <div>
                    {!query && <h3 className="text-[10px] text-muted-foreground font-medium">RECENT MEETINGS</h3>}
                </div>
                <div className="flex-1 overflow-y-auto flex flex-col gap-5">
                    {result.map(({ item, matches }) => (<div key={item.id} className="border border-border rounded-md">
                        <MeetingItem meeting={item} matches={matches} />
                    </div>))}
                </div>
            </DialogContent>
        </Dialog>

    )
}

