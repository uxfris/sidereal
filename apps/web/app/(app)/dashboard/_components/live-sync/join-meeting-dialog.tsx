import { Button } from "@workspace/ui/components/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@workspace/ui/components/dialog"
import { Input } from "@workspace/ui/components/input"
import { Separator } from "@workspace/ui/components/separator"
import { Field, FieldContent, FieldError, FieldLabel } from "@workspace/ui/components/field"
import z from "zod"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from "@workspace/ui/components/select"
import { useEffect } from "react"

const spokenLanguages = [
    { label: "English", value: "en" },
    { label: "Spanish", value: "es" },
    { label: "French", value: "fr" },
    { label: "German", value: "de" },
    { label: "Italian", value: "it" },
    { label: "Chinese", value: "zh" },
    { label: "Japanese", value: "ja" },
] as const

const schema = z.object({
    url: z.string()
        .min(1, "Meeting url is required")
        .url("Must be a valid URL (https://example.com)")
        .refine((val) => val.includes("meet.google.com") ||
            val.includes("teams.microsoft.com"),
            "Only Google Meet or Microsoft Teams link are allowed"
        ),
    name: z.string().optional(),
    language: z.string()
})




type JoinMeetingDialogProps = {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSuccess: () => void,
    meetingUrl?: string
}

export function JoinMeetingDialog({ open, onOpenChange, onSuccess, meetingUrl }: JoinMeetingDialogProps) {




    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            url: "",
            name: "",
            language: "en",
        }
    })

    useEffect(() => {
        if (!open) {
            form.reset()
        }
    }, [open, form])



    const joinMeeting = async (data: z.infer<typeof schema>) => {
        if (meetingUrl) {
            console.log("Joining:", meetingUrl)
        }
        else {
            console.log("Joining:", data.url)
        }
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
                <form className="space-y-6 py-2" onSubmit={form.handleSubmit(joinMeeting)}>
                    {!meetingUrl &&
                        <Field>
                            <FieldLabel htmlFor="meeting-url">
                                Meeting Url
                            </FieldLabel>
                            <Input
                                {...form.register("url")}
                                id="meeting-url"
                                placeholder="Paste meeting URL (Google Meet, Teams)"
                                className="h-12"
                            />
                            {form.formState.errors.url?.message && <p className="text-sm text-destructive">{form.formState.errors.url.message}</p>}
                        </Field>}
                    <Field className="gap-3">
                        <FieldLabel htmlFor="meeting-name">
                            Meeting name (Optional)
                        </FieldLabel>
                        <Input
                            {...form.register("name")}
                            id="meeting-name"
                            placeholder="e.g., Weekly Sync"
                        />
                    </Field>
                    <Controller
                        name="language"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field orientation="responsive" data-invalid={fieldState.invalid}>
                                <FieldContent>
                                    <FieldLabel htmlFor="meeting-language">
                                        Meeting Language
                                    </FieldLabel>
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </FieldContent>
                                <Select
                                    name={field.name}
                                    value={field.value}
                                    onValueChange={field.onChange}
                                >
                                    <SelectTrigger
                                        id="meeting-language"
                                        aria-invalid={fieldState.invalid}
                                        className="min-w-[120px]"
                                    >
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent position="item-aligned">
                                        <SelectItem value="auto">Auto</SelectItem>
                                        <SelectSeparator />
                                        {spokenLanguages.map((language) => (
                                            <SelectItem key={language.value} value={language.value}>
                                                {language.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </Field>
                        )}
                    />
                    <DialogFooter>
                        <div className="flex justify-end gap-3">
                            <DialogClose asChild>
                                <Button variant="ghost" type="button">Close</Button>
                            </DialogClose>
                            <Button type="submit">Join Now</Button>
                        </div>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

