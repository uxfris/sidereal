import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@workspace/ui/components/select"

type item = {
    value: string
    label: string
}

type SelectInput = {
    defaultValue: string
    id: string
    placeholder?: string
    items: item[]
}

export function SelectInput({ defaultValue, id, placeholder, items }: SelectInput) {

    return (
        <Select defaultValue={defaultValue}>
            <SelectTrigger id={id} className="w-full bg-input">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {items.map((item) => <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>)}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}