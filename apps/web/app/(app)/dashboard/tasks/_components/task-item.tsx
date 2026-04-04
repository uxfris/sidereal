import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar"
import { Button } from "@workspace/ui/components/button"
import { Checkbox } from "@workspace/ui/components/checkbox"
import { TrashBin2 } from "@solar-icons/react"

export function TaskItem() {
    return (
        <div className="flex items-start gap-3 py-3">
            <Checkbox className="w-5 h-5 border-2" />
            <p className="flex-1 line-clamp-2">
                Refine the Q3 product roadmap based on Marcus's
                feedback
            </p>
            <Button variant="ghost" size="icon-xs"><TrashBin2 size={1} className="mt-1 text-destructive" /></Button>
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </div>
    )
}