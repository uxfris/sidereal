import { TrashBin2 } from "@solar-icons/react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@workspace/ui/components/alert-dialog";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";


const MOCK_MEETINGS = [
    {
        id: "1",
        name: "Product Strategy",
    },
    {
        id: "2",
        name: "Design Systems",
    },
    {
        id: "3",
        name: "Marketing",
    }
]

export function DeleteMeetingsDialog() {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button size="xs" variant="destructive" className="bg-transparent text-destructive hover:text-destructive hover:bg-destructive/20">
                    <TrashBin2 />
                    Delete
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Delete Meetings
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete these meetings? This action cannot be undone
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="px-4 max-h-64 overflow-y-auto">
                    {MOCK_MEETINGS.map((meeting) =>
                        <li key={meeting.id} className="text-sm font-medium text-muted-foreground">
                            {meeting.name}
                        </li>)}
                </div>
                <div className="space-y-2">
                    <p className="text-sm to-muted-foreground">To confirm deletion, type <span className="font-semibold">DELETE {MOCK_MEETINGS.length}</span> below:</p>
                    <Input autoFocus placeholder={`Delete ${MOCK_MEETINGS.length}`} />
                </div>
                <AlertDialogFooter>
                    <AlertDialogCancel variant="ghost">
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction variant="destructive">
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}