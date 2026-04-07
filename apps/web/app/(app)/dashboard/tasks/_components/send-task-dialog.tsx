import { Button } from "@workspace/ui/components/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@workspace/ui/components/dialog"
import { Separator } from "@workspace/ui/components/separator"
import { Field, FieldLabel } from "@workspace/ui/components/field"
import { SelectInput } from "@/components/select-input"
import { ActionItem } from "@workspace/types/task"
import Image from "next/image"

type SendTaskDialogProps = {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSuccess: () => void,
    tasks: ActionItem[]

}

export function SendTaskDialog({ open, onOpenChange, onSuccess, tasks }: SendTaskDialogProps) {
    const handleSubmit = async () => {
        console.log("Joining:", tasks)
        await new Promise((res) => setTimeout(res, 500))

        // Trigger success flow
        onSuccess()
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md gap-4">
                <DialogHeader>
                    {/* TODO: change the platform icon and name */}
                    <DialogTitle className="flex items-center gap-2">
                        <Image src={"/vectors/trello.svg"} alt={""} width={20} height={20} />
                        Send {tasks.length} tasks to Trello</DialogTitle>
                </DialogHeader>
                <Separator />
                <div className="space-y-6 py-2">
                    <Field className="gap-3">
                        <FieldLabel htmlFor="board">
                            Board
                        </FieldLabel>
                        <SelectInput
                            defaultValue="marketing"
                            id="board"
                            items={[
                                { label: "Marketing Team", value: "marketing" },
                                { label: "Product Roadmap", value: "product" },
                                { label: "Sprint Board", value: "sprint" },
                                { label: "Personal Tasks", value: "personal" }
                            ]}
                        />
                    </Field>

                    <Field className="gap-3">
                        <FieldLabel htmlFor="list">
                            List
                        </FieldLabel>
                        <SelectInput
                            defaultValue="todo"
                            id="list"
                            items={[
                                { label: "To Do", value: "todo" },
                                { label: "In Progress", value: "inprogress" },
                                { label: "Review", value: "review" },
                                { label: "Done", value: "done" }
                            ]}
                        />
                    </Field>
                </div>
                <DialogFooter>
                    <div className="flex justify-end gap-3">
                        <DialogClose asChild>
                            <Button variant="ghost" type="button">Close</Button>
                        </DialogClose>
                        <Button onClick={handleSubmit}>Send</Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}