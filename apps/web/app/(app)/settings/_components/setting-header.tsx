import { AltArrowLeft } from "@solar-icons/react/ssr";
import { Button } from "@workspace/ui/components/button";
import Link from "next/link";

export function SettingHeader({ title, description }: { title: string, description: string }) {
    return (
        <>
            <div className="fixed top-0 w-full py-4 bg-background z-50">
                <div className="md:hidden relative flex items-center">
                    <Button variant="ghost" asChild>
                        <Link href="/settings">
                            <AltArrowLeft />
                            Settings</Link>
                    </Button>
                    <span className="absolute left-1/2 -translate-x-1/2 font-semibold">
                        {title}
                    </span>
                </div>
            </div>
            <div className="hidden md:block space-y-2">
                <h1 className="text-lg font-semibold">
                    {title}
                </h1>
                <p className="text-sm text-muted-foreground">
                    {description}
                </p>
            </div></>
    )
}