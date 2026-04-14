import { AltArrowLeft } from "@solar-icons/react/ssr";
import Workspace from "./workspace/page";
import { Button } from "@workspace/ui/components/button";
import { SettingSidebar } from "./_components/setting-sidebar";

export default function Settings() {
    return (
        <>
            <div className="md:hidden bg-sidebar h-full">
                <div className="relative flex items-center pt-4 px-1">
                    <Button variant="ghost">
                        <AltArrowLeft />
                    </Button>
                    <span className="absolute left-1/2 -translate-x-1/2 font-semibold">
                        Settings
                    </span>
                </div>
                <SettingSidebar isLayout={false} />
            </div>
            <div className="hidden md:block">
                <Workspace />
            </div>
        </>
    )
}