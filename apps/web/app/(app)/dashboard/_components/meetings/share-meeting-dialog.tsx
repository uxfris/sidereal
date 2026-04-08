import { Global, Hourglass, LinkMinimalistic, MinimalisticMagnifier } from "@solar-icons/react";
import { Meeting } from "@workspace/types/meetings";
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar";
import { Button } from "@workspace/ui/components/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@workspace/ui/components/dialog";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@workspace/ui/components/input-group";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs";
import { toast } from "sonner";


export function ShareMeetingDialog({ meeting, open, onOpenChange, }: { meeting: Meeting, open: boolean, onOpenChange: (open: boolean) => void }) {

    const copyMeetingLink = async () => {
        await navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_APP_URL}/meetings/${meeting.id}`)
        toast.success("Copied to clipboard")
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:min-w-md">
                <DialogHeader>
                    <DialogTitle>
                        Share meeting
                    </DialogTitle>
                </DialogHeader>
                <Tabs>
                    <TabsList variant="line" className="w-full justify-start gap-6">
                        <TabsTrigger value="share">
                            Share
                        </TabsTrigger>
                        <TabsTrigger value="embed">
                            Embed
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="share" className="space-y-5 pt-8">
                        <div className="flex items-center gap-3">
                            <InputGroup className="bg-input">
                                <InputGroupInput
                                    placeholder="Name or Email"
                                />
                                <InputGroupAddon>
                                    <MinimalisticMagnifier />
                                </InputGroupAddon>
                            </InputGroup>
                            <Button size="xs">
                                Invite
                            </Button>
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-xs font-medium text-muted-foreground">
                                Teammates with access
                            </h3>
                            <div className="overflow-y-auto max-h-48">
                                {[1, 2, 3].map((user) => (
                                    <div key={user} className="flex items-center p-3 hover:bg-secondary rounded-md">
                                        <div className="flex flex-1 items-center gap-2">
                                            <Avatar size="sm">
                                                <AvatarImage src="" />
                                                <AvatarFallback>{"FE"}</AvatarFallback>
                                            </Avatar>
                                            <p className="text-xs font-medium text-popover-foreground line-clamp-1">{"Fris EL"}</p>
                                        </div>
                                        <span className="text-xs text-muted-foreground-2">Host</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="embed" className="pt-8">
                        <div className="flex flex-col items-center justify-center gap-4 h-[220px] bg-background rounded-md">
                            <Hourglass size={36} />
                            <p className="text-sm text-muted-foreground text-center">This functionality will be <br /> available in the next release.</p>
                        </div>
                    </TabsContent>
                </Tabs>

                <DialogFooter>
                    <div className="flex flex-1 items-center">
                        <div className="flex items-center justify-center p-1.5 border border-border rounded-md">
                            <Global />
                        </div>
                        <Select value="team-anyone">
                            <SelectTrigger className="border-none">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="team-anyone">Teammates & anyone with link</SelectItem>
                                    <SelectItem value="team-participants">Teammates & participants</SelectItem>
                                    <SelectItem value="teammates">Teammates</SelectItem>
                                    <SelectItem value="participants">Participants</SelectItem>
                                    <SelectItem value="owner">Only owner</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button variant="outline" onClick={copyMeetingLink}>
                        <LinkMinimalistic />
                        Copy link
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}