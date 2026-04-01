import { Icon } from "@solar-icons/react/lib/types"

export type NavItem = {
    label: string,
    url: string,
    icon: Icon,
    active?: boolean,
    badge?: React.ReactNode,
    isSearch?: boolean,
    isMeetings?: boolean,
}

