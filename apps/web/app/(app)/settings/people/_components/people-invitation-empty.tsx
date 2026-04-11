import LogoIcon from "@/assets/icons/logo-icon";

export function InvitationEmpty() {
    return (
        <div className="flex flex-col items-center justify-center text-center gap-8 h-96">
            <div className="w-20 h-20">
                <LogoIcon color="#2B3437" />
            </div>
            <h3 className="text-2xl font-semibold">No Invitations found</h3>

        </div>
    )
}