import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@workspace/ui/components/dialog"
import { useEffect, useState } from "react"
import { Field } from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"
import { MinimalisticMagnifier } from "@solar-icons/react"
import MeetingItem from "../meetings/meeting-item"
import { useDebounce } from "@workspace/ui/hooks/use-debouce"
import { Meeting } from "@workspace/types"




// ── Mock data ──────────────────────────────────────────
const meetings: Meeting[] = [
    {
        id: "1",
        title: "Client<mark>Onboarding</mark>: Helios",
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

//Delete this later

function delay(ms: number, signal?: AbortSignal) {
    return new Promise((resolve, reject) => {
        const id = setTimeout(resolve, ms)

        if (signal) {
            signal.addEventListener("abort", () => {
                clearTimeout(id)
                reject(new DOMException("Aborted", "AbortError"))
            })
        }
    })
}


export function SearchDialog({ openSearch, onOpenSearchChange }: { openSearch: boolean, onOpenSearchChange: (open: boolean) => void }) {
    const [query, setQuery] = useState("")
    const [results, setResults] = useState<Meeting[]>([])
    const [loading, setLoading] = useState(false)

    const debounceQuery = useDebounce(query, 350)

    useEffect(() => {
        if (!debounceQuery) {
            setResults([])
            return
        }
        const controller = new AbortController()

        async function search() {
            setLoading(true)

            try {
                // const res = await fetch(
                //     `/api/search/meetings?q=${encodeURIComponent(debounceQuery)}`,
                //     { signal: controller.signal }
                // )
                // const data = await res.json()

                //Mock data
                await delay(500, controller.signal)
                const data = meetings

                setResults(data)
            } catch (error) {
                if (error != "AbortError") {
                    console.log(error)
                }
            }
            finally {
                setLoading(false)
            }
        }
        search()

        return () => controller.abort()

    }, [debounceQuery])

    // For backend reference
    // const fuse = useMemo(() => {
    //     return new Fuse(meetings, {
    //         keys: [
    //             { name: "title", weight: 0.4 },
    //             { name: "summary", weight: 0.3 },
    //             { name: "status", weight: 0.1 },
    //             { name: "timestamp", weight: 0.05 },
    //             { name: "duration", weight: 0.05 },
    //             { name: "attendees.initials", weight: 0.1 },
    //         ],
    //         threshold: 0.4, //lower = stricter, higher = fuzzier
    //         includeMatches: true, //REQUIRED for highlighting
    //         ignoreLocation: true,
    //     })
    // }, [])

    // const result = query ?
    //     fuse.search(query)
    //     : meetings.map((m) => ({ item: m, matches: [] as FuseResultMatch[] }))


    return (
        <Dialog open={openSearch} onOpenChange={onOpenSearchChange}>
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
                {!query && <div className="flex-1 overflow-y-auto flex flex-col gap-5">
                    {meetings.map((meeting) => (<div key={meeting.id} className="border border-border rounded-md">
                        <MeetingItem meeting={meeting} />
                    </div>))}
                </div>}
                {loading && <span >Loading...</span>}
                {!loading && results.length === 0 && debounceQuery && (
                    <span>No result found</span>
                )}
                {!loading && query && <div className="flex-1 overflow-y-auto flex flex-col gap-5">
                    {results.map((meeting) => (<div key={meeting.id} className="border border-border rounded-md">
                        <MeetingItem meeting={meeting} />
                    </div>))}
                </div>}

            </DialogContent>
        </Dialog>
    )
}