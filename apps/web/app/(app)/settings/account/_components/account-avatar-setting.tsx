"use client"

import { Pen } from "@solar-icons/react";
import { SettingSection } from "../../_components/setting-section";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@workspace/ui/components/tooltip";
import { toast } from "sonner";

export function AccountAvatarSetting() {

    const updateAvatar = () => {
        toast.success("Updated avatar", {
            description: "Succesfully uploaded new avatar"
        })
    }

    return (
        <SettingSection
            title="Avatar"
            description="Set your profile avatar."
            className="flex-row">
            <div className="relative w-10 h-10 rounded-sm overflow-hidden">
                <div className="bg-primary w-full h-full flex items-center justify-center">
                    <span className="text-sm font-medium text-primary-foreground">
                        F
                    </span>
                </div>
                <TooltipProvider delayDuration={600}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button
                                onClick={updateAvatar}
                                className="absolute inset-0 bg-foreground/80 flex items-center justify-center opacity-0 hover:opacity-100 cursor-pointer"
                            >
                                <Pen className="text-primary-foreground" />
                            </button>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                            Upload a new profile avatar
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </SettingSection>
    )
}