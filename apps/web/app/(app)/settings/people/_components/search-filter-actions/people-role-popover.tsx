import { Button } from "@workspace/ui/components/button";
import { Field, FieldLabel, FieldTitle } from "@workspace/ui/components/field";
import {
    Popover,
    PopoverContent,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from "@workspace/ui/components/popover"
import { RadioGroup, RadioGroupItem } from "@workspace/ui/components/radio-group";
import { Separator } from "@workspace/ui/components/separator";
import { cn } from "@workspace/ui/lib/utils";
import { Check, ChevronDown, X, } from "lucide-react";
import { useState } from "react";


export function PeopleRolePopover(
    { filterValue, onFilterChange }: { filterValue: string, onFilterChange: (value: string) => void }
) {

    const items = [
        {
            value: "all",
            label: "All roles"
        },
        {
            value: "owner",
            label: "Owner"
        },
        {
            value: "member",
            label: "Member"
        },
        {
            value: "admin",
            label: "Admin"
        },
        {
            value: "guest",
            label: "Guest"
        },
    ]

    const [open, setOpen] = useState(false)

    const normalizedValue = filterValue || "all"
    const selected = items.find(i => i.value === normalizedValue)
    const isDefault = normalizedValue === "all"

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    size="xs"
                    className={cn(
                        "flex-1 justify-between",
                        isDefault
                            ? "text-muted-foreground"
                            : "bg-popover-foreground text-popover"
                    )}
                    onClick={(e) => {
                        const target = e.target as HTMLElement

                        // 👇 if clicking the X, DON'T open popover
                        if (target.closest("[data-clear]")) return

                        // otherwise open popover (your existing logic)
                    }}
                >
                    {selected?.label ?? "All roles"}

                    {isDefault && <ChevronDown />}

                    {!isDefault && (
                        <span
                            data-clear
                            className="cursor-pointer hover:opacity-60"
                            onClick={(e) => {
                                e.stopPropagation()
                                onFilterChange("all")
                            }}
                        >
                            <X />
                        </span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent side="bottom" align="start" className="w-36 px-1">
                <PopoverHeader>
                    <PopoverTitle className="px-3">
                        Role
                    </PopoverTitle>
                </PopoverHeader>
                <Separator />
                {
                    items.map((item) => (
                        <button key={item.value}
                            onClick={() => {
                                onFilterChange(item.value)
                                setOpen(false)
                            }}
                            className="hover:bg-secondary px-3 py-2 rounded-md flex items-center justify-between">
                            <span className="text-sm">{item.label}</span>
                            {normalizedValue === item.value && <Check size={14} />}
                        </button>
                    ))
                }
            </PopoverContent>
        </Popover>
    )
}