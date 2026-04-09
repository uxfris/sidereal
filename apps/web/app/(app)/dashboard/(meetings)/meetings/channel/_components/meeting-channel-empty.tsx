"use client"

import { Button } from "@workspace/ui/components/button";
import { useState } from "react";
import { JoinMeetingDialog } from "../../../../_components/live-sync/join-meeting-dialog";
import { JoinMeetingSuccessfulDialog } from "../../../../_components/live-sync/join-meeting-successful-dialog";
import { Plus } from "lucide-react";
import { Hashtag } from "@solar-icons/react";

export function MeetingChannelEmpty() {
    const [openForm, setOpenForm] = useState(false)
    const [openSuccess, setOpenSuccess] = useState(false)


    const onSuccess = () => {
        setOpenForm(false)
        setOpenSuccess(true)
    }



    return (
        <div className="px-10 pb-10 h-full">
            <div className="flex flex-col items-center justify-center gap-8 h-full pb-10 bg-card rounded-md">
                <Hashtag size={32} />
                <div className="space-y-4">
                    <h1 className="text-xl font-semibold">
                        This channel is empty
                    </h1>
                    <p className="text-xs text-muted-foreground text-center">
                        Start meetings or add existing ones <br /> to organize your work.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button onClick={() => setOpenForm(true)}>
                        Start meeting
                    </Button>
                    <Button variant="secondary">
                        <Plus />
                        Add existing
                    </Button>
                </div>
                <JoinMeetingDialog open={openForm} onOpenChange={setOpenForm} onSuccess={onSuccess} />
                <JoinMeetingSuccessfulDialog open={openSuccess} onOpenChange={setOpenSuccess} />
            </div>
        </div>
    )
}