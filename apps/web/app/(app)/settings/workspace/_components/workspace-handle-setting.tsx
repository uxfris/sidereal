import { Button } from "@workspace/ui/components/button";
import { SettingSection } from "../../_components/setting-section";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@workspace/ui/components/dialog";
import Image from "next/image";
import { Field, FieldDescription, FieldLabel } from "@workspace/ui/components/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@workspace/ui/components/input-group";

export function WorkspaceHandleSetting() {
    return (
        <SettingSection
            title="Workspace handle"
            description="Set a handle for the workspace profile page."
            borderBottom={false}>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="text-sm">
                        Set handle
                    </Button>
                </DialogTrigger>
                <DialogContent className="p-0  overflow-hidden">
                    <DialogHeader>
                        <DialogTitle asChild>
                            <div className="relative w-full h-40 bg-accent flex items-center justify-center pointer-events-none">
                                <div className="absolute inset-0">
                                    <Image src="/vectors/dialog-header-background.svg" alt="" fill className="object-cover" />
                                </div>
                                <span className="z-10">
                                    lume.ai/@yourusername
                                </span>
                            </div>
                        </DialogTitle>
                    </DialogHeader>
                    <div className="px-10 py-3 space-y-8">
                        <Field>
                            <FieldLabel htmlFor="handle"
                                className="text-base text-foreground font-semibold normal-case mb-1">
                                Set your workspace handle
                            </FieldLabel>
                            <InputGroup className="bg-input h-12">
                                <InputGroupInput placeholder="username" />
                                <InputGroupAddon>
                                    <p className="text-muted-foreground-2">@</p>
                                </InputGroupAddon>
                            </InputGroup>
                            <FieldDescription className="text-xs text-muted-foreground-2">
                                Up to 20 characters (letters, numbers or _)
                            </FieldDescription>
                        </Field>
                        <div className="space-y-3">
                            <p className="text-sm font-medium text-muted-foreground">
                                Suggestions
                            </p>
                            <div className="flex items-center gap-3 justify-between">
                                <Button className="flex-1 rounded-full" variant="secondary">
                                    frisside
                                </Button>
                                <Button className="flex-1 rounded-full" variant="secondary">
                                    sidfris_co
                                </Button>
                                <Button className="flex-1 rounded-full" variant="secondary">
                                    friss_hub
                                </Button>
                            </div>
                        </div>
                    </div>
                    <DialogFooter className="px-16 pb-12">
                        <div className="flex justify-end gap-3">
                            <DialogClose asChild>
                                <Button variant="ghost">
                                    Close
                                </Button>
                            </DialogClose>
                            <Button>
                                Save
                            </Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </SettingSection>
    )
}