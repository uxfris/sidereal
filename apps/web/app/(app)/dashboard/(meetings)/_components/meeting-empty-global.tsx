import LogoIcon from "@/assets/icons/logo-icon";
import { Button } from "@workspace/ui/components/button";
import Link from "next/link";

type Variant = "starred" | "created" | "shared"

const contentMap = {
    starred: {
        description: "Star meetings to access them quickly from any workspace",
        showBrowse: true
    },
    created: {
        description: "Star meetings to access them quickly from any workspace",
        showBrowse: false
    },
    shared: {
        description: "Star meetings to access them quickly from any workspace",
        showBrowse: false
    },
}

export function MeetingEmptyGlobal({ variant }: { variant: Variant }) {
    const { description, showBrowse } = contentMap[variant]

    return (
        <div className="px-10 pb-10 h-full">
            <div className="flex flex-col items-center justify-center gap-8 h-full pb-10 bg-card rounded-md">
                <LogoIcon className="w-12 h-12" />
                <h1 className="text-xl font-semibold max-w-64 text-center">
                    {description}
                </h1>
                {showBrowse && <Button variant="outline" asChild>
                    <Link href="/dashboard/meetings">
                        Browse meetings
                    </Link>
                </Button>}
            </div>
        </div>
    )
}