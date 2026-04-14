import {
    Card,
    UserCircle,
    UsersGroupRounded,
} from "@solar-icons/react";
import { ReactNode } from "react";



export type SidebarItem = {
    label: string;
    href: string;
    icon?: ReactNode;
    avatar?: {
        src?: string;
        fallback: string;
    };
    exact?: boolean;
};

export type SidebarSection = {
    title: string;
    items: SidebarItem[];
};



export const sections: SidebarSection[] = [
    {
        title: "Workspace",
        items: [
            {
                label: "Fris's Sidereal",
                href: "/settings/workspace",
                avatar: { fallback: "F" },

            },
            {
                label: "People",
                href: "/settings/people",
                icon: <UsersGroupRounded />,
            },
            {
                label: "Plans & credits",
                href: "/settings/billing",
                icon: <Card />,
            },
        ],
    },
    {
        title: "Account",
        items: [
            {
                label: "Fris El",
                href: "/settings/account",
                icon: <UserCircle />,
            },
        ],
    },
];