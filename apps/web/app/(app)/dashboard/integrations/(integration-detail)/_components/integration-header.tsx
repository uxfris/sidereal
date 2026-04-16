import { ArrowLeft, LayersMinimalistic } from "@solar-icons/react/ssr";
import { Button } from "@workspace/ui/components/button";
import Link from "next/link";

export function IntegrationHeader(
    { platform }: { platform: string }
) {
    return (
        <div className="hidden md:flex items-center gap-3 -ml-4">
            <Button variant="ghost" asChild>
                <Link href="/dashboard/integrations">
                    <ArrowLeft />
                </Link>
            </Button>
            <LayersMinimalistic />
            <h1 className="text-base font-semibold">{platform}</h1>
        </div>
    )
}