import { Button } from "@workspace/ui/components/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@workspace/ui/components/dialog";



export function TitleMenuDialog({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Create folder
                    </DialogTitle>
                    <DialogDescription>
                        Create a folder and add the folder to it
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <div className="flex items-center gap-3 justify-end">
                        <DialogClose asChild>
                            <Button variant="ghost">
                                Close
                            </Button>
                        </DialogClose>
                        <Button>
                            Create
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}