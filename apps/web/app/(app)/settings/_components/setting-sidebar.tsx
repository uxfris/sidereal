"use client"

import {
    AltArrowLeft,
    Card,
    UserCircle,
    UsersGroupRounded,
} from "@solar-icons/react/ssr";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@workspace/ui/components/avatar";
import Link from "next/link";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@workspace/ui/lib/utils";

type SidebarItem = {
    label: string;
    href: string;
    icon?: ReactNode;
    avatar?: {
        src?: string;
        fallback: string;
    };
    exact?: boolean;
};

type SidebarSection = {
    title: string;
    items: SidebarItem[];
};

const sections: SidebarSection[] = [
    {
        title: "Workspace",
        items: [
            {
                label: "Fris's Sidereal",
                href: "/settings/workspace",
                avatar: { fallback: "F" },
                exact: true,
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

// --- matching logic ---
function isActivePath(
    pathname: string,
    href: string,
    exact?: boolean
) {
    if (exact) return pathname === href;
    return pathname === href || pathname.startsWith(href + "/");
}

function SidebarItemRow({
    item,
    pathname,
}: {
    item: SidebarItem;
    pathname: string;
}) {
    const active = isActivePath(pathname, item.href, item.exact);

    return (
        <li className="group/menu-item relative">
            <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                data-active={active}
                className={cn(
                    "group/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden transition-colors",
                    "text-sidebar-foreground",
                    "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    "data-[active=true]:bg-sidebar-accent",
                    "data-[active=true]:text-sidebar-accent-foreground",
                    "data-[active=true]:font-medium"
                )}
            >
                {item.avatar ? (
                    <Avatar size="sm">
                        <AvatarImage src={item.avatar.src} />
                        <AvatarFallback className="bg-primary text-primary-foreground rounded-md">
                            {item.avatar.fallback}
                        </AvatarFallback>
                    </Avatar>
                ) : (
                    <div className="px-1 text-sidebar-foreground group-data-[active=true]/menu-button:text-sidebar-accent-foreground">
                        {item.icon}
                    </div>
                )}

                <span className="truncate">{item.label}</span>
            </Link>
        </li>
    );
}

function SidebarSectionBlock({
    section,
    pathname,
}: {
    section: SidebarSection;
    pathname: string;
}) {
    const sectionId = `section-${section.title
        .toLowerCase()
        .replace(/\s+/g, "-")}`;

    return (
        <section aria-labelledby={sectionId} className="space-y-1">
            <h2
                id={sectionId}
                className="px-2 text-xs font-medium text-sidebar-foreground/70"
            >
                {section.title}
            </h2>

            <nav>
                <ul className="space-y-1">
                    {section.items.map((item) => (
                        <SidebarItemRow
                            key={item.label}
                            item={item}
                            pathname={pathname}
                        />
                    ))}
                </ul>
            </nav>
        </section>
    );
}

export function SettingSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-3xs bg-sidebar text-sidebar-foreground px-3 py-4 space-y-4">
            <Link href="/dashboard" className="w-fit pl-2 pr-4 py-2 rounded-md flex items-center justify-start gap-2 mb-4 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                <AltArrowLeft />
                <span className="text-sm font-medium">
                    Go back
                </span>
            </Link>
            {sections.map((section) => (
                <SidebarSectionBlock
                    key={section.title}
                    section={section}
                    pathname={pathname}
                />
            ))}
        </aside>
    );
}