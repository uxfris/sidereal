import { Button } from "@workspace/ui/components/button"
import Image from "next/image"


type AuthProviders = {
    id: string,
    label: string,
    iconPath?: string,
    onClick: () => void
}

export function AuthButtons({ providers }: { providers: AuthProviders[] }) {
    return (
        <>
            {providers.map((provider) => (
                <Button key={provider.id} type="button" variant="outline" size="lg" className="w-full" onClick={provider.onClick}>
                    {provider.iconPath && <Image src={provider.iconPath} alt={provider.id} width={16} height={16} />}
                    {provider.label}
                </Button>
            ))}
        </>
    )
}