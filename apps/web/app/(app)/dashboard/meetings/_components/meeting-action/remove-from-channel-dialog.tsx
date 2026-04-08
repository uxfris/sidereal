import { Hashtag, TrashBin2 } from "@solar-icons/react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@workspace/ui/components/alert-dialog";
import { Button } from "@workspace/ui/components/button";


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

export function RemoveFromChannelDialog() {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button size="xs" variant="ghost">
                    <Hashtag />
                    Remove from channel
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Remove Meetings from the channel
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to remove these meetings from this channel? The project will remain in your workspace.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="px-4 max-h-64 overflow-y-auto">
                    {MOCK_MEETINGS.map((meeting) =>
                        <li key={meeting.id} className="text-sm font-medium text-muted-foreground">
                            {meeting.name}
                        </li>)}
                </div>
                <AlertDialogFooter>
                    <AlertDialogCancel asChild>
                        <Button variant="ghost">
                            Cancel
                        </Button>
                    </AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <Button>
                            Remove
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}