import LogoIcon from "@/assets/icons/logo-icon";

export function CreatedByMeEmpty() {
    return (
        <div className="px-10 pb-10 h-full">
            <div className="flex flex-col items-center justify-center gap-8 h-full pb-10 bg-card rounded-md">
                <div className="w-12">
                    <LogoIcon color="#2B3437" />
                </div>
                <h1 className="text-xl font-semibold">
                    Meetings you created will appear here
                </h1>
            </div>
        </div>
    )
}