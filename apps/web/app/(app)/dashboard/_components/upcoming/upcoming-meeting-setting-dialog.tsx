import { SelectInput } from "@/components/select-input"
import { CalendarAdd, Global, Letter, Lock, SettingsMinimalistic } from "@solar-icons/react"
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
import { Field, FieldGroup, FieldLabel } from "@workspace/ui/components/field"
import { Separator } from "@workspace/ui/components/separator"

export function UpcomingMeetingSettingDialog() {
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button variant="ghost"><SettingsMinimalistic /></Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Meeting Settings</DialogTitle>
                    </DialogHeader>
                    <Separator />
                    <FieldGroup className="py-2">
                        <div className="flex gap-2">
                            <CalendarAdd className="mt-px" />
                            <Field>
                                <FieldLabel htmlFor="auto-join">Auto-join calendar meetings</FieldLabel>
                                <SelectInput defaultValue="all" id="auto-join" items={
                                    [
                                        { label: "All Meetings with web-conf link", value: "all" },
                                        { label: "Only meetings that I own", value: "mine" },
                                        { label: "Only meetings with teammates", value: "teammates" },
                                        { label: "Only when I invite vivi@lume.ai", value: "invite-only" }
                                    ]
                                } />
                            </Field>
                        </div>
                        <div className="flex gap-2">
                            <Letter className="mt-px" />
                            <Field className="gap-3">
                                <FieldLabel htmlFor="email-recap">Send email recap to</FieldLabel>
                                <SelectInput defaultValue="everyone" id="email-recap" items={
                                    [
                                        { label: "Everyone on the invite", value: "everyone" },
                                        { label: "Only me and participants from my Lume workspace", value: "workspace" },
                                        { label: "Only me", value: "only-me" },
                                    ]
                                } />
                            </Field>
                        </div>
                        <div className="flex gap-2">
                            <Lock className="mt-px" />
                            <Field className="gap-3">
                                <FieldLabel htmlFor="meeting-privacy">Meeting Privacy</FieldLabel>
                                <SelectInput defaultValue="anyone" id="meeting-privacy" items={
                                    [
                                        { label: "Teammates & anyone with Link", value: "anyone" },
                                        { label: "Teammates and participants", value: "teammates-participants" },
                                        { label: "Teammates", value: "teammates" },
                                        { label: "Participants", value: "participants" },
                                        { label: "Only owner", value: "only-owner" },
                                    ]
                                } />
                            </Field>
                        </div>
                        <div className="flex gap-2">
                            <Global className="mt-px" />
                            <Field className="gap-3">
                                <FieldLabel htmlFor="meeting-language">
                                    Meeting Language
                                </FieldLabel>
                                <SelectInput defaultValue="en" id="meeting-language" items={
                                    [
                                        { label: "Auto-detect", value: "auto" },
                                        { label: "English (Global)", value: "en" },
                                        { label: "Deutch", value: "de" },
                                        { label: "Spanish", value: "es" }
                                    ]
                                } />

                            </Field>
                        </div>

                    </FieldGroup>
                    <DialogFooter>
                        <div className="flex justify-end gap-3">
                            <DialogClose asChild>
                                <Button variant="ghost">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Save changes</Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}