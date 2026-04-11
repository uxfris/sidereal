import { DownloadMinimalistic } from "@solar-icons/react/ssr";
import { Button } from "@workspace/ui/components/button";

export function PeopleExport() {
    return (
        <Button size="xs" variant="secondary">
            <DownloadMinimalistic />
            Export
        </Button>
    )
}