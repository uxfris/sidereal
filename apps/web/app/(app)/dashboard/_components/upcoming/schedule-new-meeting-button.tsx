import { Button } from "@workspace/ui/components/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@workspace/ui/components/dialog";
import { Separator } from "@workspace/ui/components/separator";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export function ScheduleNewMeetingButton() {
    return (
        <Dialog>
            <DialogTrigger>
                <Button variant="ghost" size="xs" className="text-primary">
                    Schedule new meeting
                    <ArrowRight />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md gap-4">
                <DialogHeader>
                    <DialogTitle>
                        Schedule Meeting
                    </DialogTitle>
                </DialogHeader>
                <Separator />
                <DialogDescription>
                    Your AI Notetaker will be invited to the calendar meeting to record, transcribe and summarize.
                </DialogDescription>
                <Button variant="secondary">
                    <Image src={"/vectors/google-calendar.svg"} alt={""} width={14} height={14} />
                    Google Calendar
                </Button>
                <Button variant="secondary">

                    <Image src={"/vectors/outlook.svg"} alt={""} width={16} height={16} />
                    Microsoft Outlook
                </Button>

            </DialogContent>
        </Dialog>
    )
}