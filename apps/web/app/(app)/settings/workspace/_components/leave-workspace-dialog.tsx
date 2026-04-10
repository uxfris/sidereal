"use client"


import { Button } from "@workspace/ui/components/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@workspace/ui/components/alert-dialog";
import { toast } from "sonner";


export function LeaveWorkspaceDialog({ hasOtherOwners }: { hasOtherOwners: boolean }) {

    const leaveWorkspace = () => {
        toast.success("Successfully left workspace", {
            description: "You can rejoin anytime with an invitation."
        });
    };


    return (
        <span className="w-full flex justify-end">
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button disabled={!hasOtherOwners} variant="destructive">
                        Leave workspace
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Leave workspace?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to leave this workspace?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction variant="destructive" onClick={leaveWorkspace}>
                            Leave workspace
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </span>
    )
}