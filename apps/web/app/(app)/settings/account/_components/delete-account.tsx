"use client"

import { Card, CardContent } from "@workspace/ui/components/card";
import { SettingSection } from "../../_components/setting-section";
import { Button } from "@workspace/ui/components/button";
import { ConfirmWorkspaceDeletionDialog } from "./confirm-workspace-deletion-dialog";
import { useState } from "react";

export function DeleteAccount() {

    const [openWorkspace, setOpenWorkspace] = useState(false)
    const [openEmail, setOpenEmail] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)


    return (
        <Card className="py-2">
            <CardContent className="px-5">
                <SettingSection
                    title="Delete account"
                    description="Permanently delete your Sidereal account. This cannot be undone."
                    borderBottom={false}
                >
                    <span className="flex justify-end">
                        <Button variant="destructive" onClick={() => setOpenWorkspace(true)}>
                            Delete account
                        </Button>
                    </span>
                </SettingSection>
            </CardContent>
            <ConfirmWorkspaceDeletionDialog open={openWorkspace} onOpenChange={setOpenWorkspace} />
        </Card>
    );
}

