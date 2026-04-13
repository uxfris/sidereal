import LogoIcon from "@/assets/icons/logo-icon";
import { Button } from "@workspace/ui/components/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@workspace/ui/components/dialog";
import { Progress } from "@workspace/ui/components/progress";
import { Check } from "lucide-react";

export function BillingCredits() {


    return (
        <div className="grid grid-cols-3 gap-6">
            <div className="space-y-3 p-4 bg-primary rounded-lg">
                <div className="flex items-center gap-2">
                    <LogoIcon className="w-14 h-14 text-primary-foreground" />
                    <div>
                        <h2 className="text-base font-semibold text-primary-foreground">
                            Your're on Free Plan
                        </h2>
                        <p className="text-sm text-primary-foreground/50">
                            Upgrade anytime
                        </p>
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Check size={14} className="text-primary-foreground" />
                        <span className="text-sm text-primary-foreground">5 meetings/month</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Check size={14} className="text-primary-foreground" />
                        <span className="text-sm text-primary-foreground">800 mins of storage/seat</span>
                    </div>
                </div>
                <ManageBillingDialog />
            </div>
            <div className="col-span-2 flex flex-col gap-3">
                <div className="space-y-4 p-4 bg-card rounded-lg h-full">
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold">
                            Meeting Processed
                        </h3>
                        <p className="text-muted-foreground font-semibold">
                            <span className="text-foreground">3</span> / 5
                        </p>
                    </div>
                    <Progress value={70} className="h-2" />
                </div>
                <div className="space-y-4 p-4 bg-card rounded-lg h-full">
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold">
                            Cloud storage
                        </h3>
                        <p className="text-muted-foreground font-semibold">
                            <span className="text-foreground">400</span> / 800 minutes

                        </p>
                    </div>
                    <Progress value={70} className="h-2" />
                </div>
            </div>
        </div>
    )
}

export function ManageBillingDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="secondary" className="w-full mt-3">
                    Manage
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Manage Plan
                    </DialogTitle>
                    <DialogDescription>
                        Subscription & billing settings
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center gap-2 p-2 bg-secondary rounded-lg">
                    <LogoIcon className="w-14 h-14" />
                    <div>
                        <h2 className="font-semibold">
                            Your're on Studio Pro
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            renews on April 12, 2026
                        </p>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="secondary" className="flex-1">
                        Edit billing information
                    </Button>
                    <Button className="flex-1">
                        Invoice & payments
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}