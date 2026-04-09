"use client"

import { Button } from "@workspace/ui/components/button";
import LogoIcon from "@/assets/icons/logo-icon";
import { JoinMeetingDialog } from "../../../_components/live-sync/join-meeting-dialog";
import { useState } from "react";
import { JoinMeetingSuccessfulDialog } from "../../../_components/live-sync/join-meeting-successful-dialog";

export function MeetingEmpty() {
    const [openForm, setOpenForm] = useState(false)
    const [openSuccess, setOpenSuccess] = useState(false)


    const onSuccess = () => {
        setOpenForm(false)
        setOpenSuccess(true)
    }



    return (
        <div className="px-10 pb-10 h-full">
            <div className="flex flex-col items-center justify-center gap-8 h-full pb-10 bg-card rounded-md">
                <div className="w-12">
                    <LogoIcon color="#2B3437" />
                </div>
                <h1 className="text-xl font-semibold">
                    Meetings you created will appear here
                </h1>
                <Button variant="outline" onClick={() => setOpenForm(true)}>
                    Start meeting
                </Button>
                <JoinMeetingDialog open={openForm} onOpenChange={setOpenForm} onSuccess={onSuccess} />
                <JoinMeetingSuccessfulDialog open={openSuccess} onOpenChange={setOpenSuccess} />
            </div>
        </div>
    )
}