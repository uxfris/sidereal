import { CheckCircle, InfoCircle, VideocameraAdd } from "@solar-icons/react"
import { Button } from "@workspace/ui/components/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@workspace/ui/components/dialog"

type JoinMeetingSuccessfulDialogProps = {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function JoinMeetingSuccessfulDialog({ open, onOpenChange }: JoinMeetingSuccessfulDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md pt-10 gap-8 text-center">
                <DialogHeader className="flex items-center">
                    <div className="w-fit bg-muted p-3 rounded-md">
                        <CheckCircle weight="Bold" size={32} className="text-primary" />
                    </div>
                </DialogHeader>
                <div className="w-full px-6 space-y-3">
                    <DialogTitle className="text-2xl font-semibold">
                        Lume assistant has been
                        invited to the meeting
                    </DialogTitle>
                    <p className="text-base text-muted-foreground">Once joined, Lume assistant will automatically
                        start taking notes.</p>
                </div>
                <Button size="lg" className="mx-4">
                    <VideocameraAdd />
                    Open meeting
                </Button>
                <DialogFooter className="bg-muted text-left">
                    <div className="flex gap-3 text-muted-foreground">
                        <InfoCircle weight="Bold" size={24} />
                        <p>Lume needs to stay inside the meeting for at least 3
                            minutes to process the meeting transcript.</p>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}