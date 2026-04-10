"use client"


import { Button } from "@workspace/ui/components/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@workspace/ui/components/alert-dialog";
import { toast } from "sonner";


export function DeleteAccountDialog() {

    const leaveWorkspace = () => {
        toast.success("Successfully deleted account");
    };


    return (
        <span className="w-full flex justify-end">
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="destructive">
                        Delete account
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