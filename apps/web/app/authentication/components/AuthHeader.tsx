import LogoIcon from "@/assets/icons/logo-icon";

export function AuthHeader() {
    return (
        <div className="flex flex-col items-center gap-5 w-full">
            <div className="w-14 h-14 md:w-16 md:h-16">
                <LogoIcon color="#2B3437" />
            </div>
            <h1 className="text-2xl md:text-4xl font-medium text-center">
                Welcome to Sidereal
            </h1>
            <p className="text-sm md:text-base text-muted-foreground text-center">
                We recommend using your work email <br />
                or email with the most used calendar.
            </p>
        </div>
    )
}