import { Hashtag, InfoCircle, UsersGroupRounded } from "@solar-icons/react";
import { Button } from "@workspace/ui/components/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@workspace/ui/components/dialog";
import { MoveRight } from "lucide-react";


const MOCK_WORKSPACE = [
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
    },
]

export function MoveToWorkspaceDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="xs" variant="ghost">
                    <UsersGroupRounded />
                    Transfer
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        Move to workspace
                    </DialogTitle>
                    <DialogDescription>
                        Select a workspace to move the selected meetings to.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col max-h-64 pb-2 overflow-y-auto">
                    <div className="flex-1 space-y-3">
                        {MOCK_WORKSPACE.length === 0 &&
                            <div className="h-56 flex flex-col items-center justify-center gap-6">
                                <Hashtag size={40} />
                                <div className="space-y-2 text-center">
                                    <h4 className="text-sm font-medium text-muted-foreground">
                                        No other workspace available
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
                                        To move meetings, you must first create a new workspace.
                                    </p>
                                </div>
                            </div>}
                        {MOCK_WORKSPACE.map((workspace) =>
                            <Button key={workspace.id} variant={workspace.id === "1" ? "secondary" : "outline"} className="w-full justify-start">
                                <Hashtag />
                                {workspace.name}
                            </Button>
                        )}
                    </div>
                </div>
                {MOCK_WORKSPACE.length > 0 && <div className="flex items-center gap-2">
                    <InfoCircle />
                    <div className="flex gap-1 items-center">
                        <span className="text-sm text-muted-foreground">2 meetings selected</span>
                        <MoveRight size={12} />
                        <span className="text-sm text-muted-foreground font-semibold">Product Strategy</span>
                    </div>
                </div>}
                <DialogFooter>
                    <div className="flex items-center justify-end gap-3">
                        <DialogClose asChild>
                            <Button variant="ghost">
                                Close
                            </Button>
                        </DialogClose>
                        <Button>
                            <Hashtag />
                            Move to workspace
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}