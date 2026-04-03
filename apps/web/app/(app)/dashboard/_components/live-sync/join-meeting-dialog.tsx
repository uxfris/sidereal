import { Bolt } from "@solar-icons/react"
import { Button } from "@workspace/ui/components/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@workspace/ui/components/dialog"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@workspace/ui/components/select"
import { Input } from "@workspace/ui/components/input"
import { Separator } from "@workspace/ui/components/separator"
import { Field, FieldLabel } from "@workspace/ui/components/field"

type JoinMeetingDialogProps = {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSuccess: () => void,
    url: string

}

export function JoinMeetingDialog({ open, onOpenChange, onSuccess, url }: JoinMeetingDialogProps) {
    const handleSubmit = async () => {
        if (!url.trim()) return
        console.log("Joining:", url)
        await new Promise((res) => setTimeout(res, 500))

        // Trigger success flow
        onSuccess()
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md gap-4">
                <DialogHeader>
                    <DialogTitle>Join Meeting</DialogTitle>
                </DialogHeader>
                <Separator />
                <div className="space-y-6 py-2">
                    <Field className="gap-3">
                        <FieldLabel htmlFor="meeting-name">
                            Meeting name (Optional)
                        </FieldLabel>
                        <Input
                            id="meeting-name"
                            placeholder="e.g., Weekly Sync"
                            readOnly
                        />
                    </Field>
                    <Field className="gap-3">
                        <FieldLabel htmlFor="meeting-language">
                            Meeting Language
                        </FieldLabel>
                        <Select defaultValue="english">
                            <SelectTrigger id="meeting-language" className="w-full bg-input">
                                <SelectValue placeholder={"English"} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="english">English</SelectItem>
                                    <SelectItem value="deutch">Deutch</SelectItem>
                                    <SelectItem value="spain">Spain</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </Field>
                </div>
                <DialogFooter>
                    <div className="flex justify-end gap-3">
                        <DialogClose asChild>
                            <Button variant="ghost" type="button">Close</Button>
                        </DialogClose>
                        <Button onClick={handleSubmit}>Join Now</Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}