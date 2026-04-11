"use client"

import { DownloadMinimalistic } from "@solar-icons/react";
import { Button } from "@workspace/ui/components/button";
import { toast } from "sonner";

export function PeopleExport() {

    const exportCSV = () => {
        toast.success("Export ready. Download should begin shortly")
    }

    return (
        <Button size="xs" variant="secondary" onClick={exportCSV}>
            <DownloadMinimalistic />
            Export
        </Button>
    )
}