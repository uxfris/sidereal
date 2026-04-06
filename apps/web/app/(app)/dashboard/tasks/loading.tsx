import { Spinner } from "@workspace/ui/components/spinner";

export default function Loading() {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <Spinner />
        </div>
    )
}