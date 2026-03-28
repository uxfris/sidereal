import { Button } from "@workspace/ui/components/button"
import Image from "next/image"


type AuthProviders = {
    id: string,
    label: string,
    iconPath?: string,
    onClick: () => void,
    loading?: boolean
}

export function AuthButtons({ providers }: { providers: AuthProviders[] }) {
    return (
        <>
            {providers.map((provider) => (
                <Button key={provider.id} type="button" variant="outline" size="lg" className="w-full" onClick={provider.onClick} disabled={provider.loading}>
                    {provider.loading ? (
                        <span className="flex items-center justify-center">
                            <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></span>
                        </span>
                    ) : (
                        <>
                            {provider.iconPath && <Image src={provider.iconPath} alt={provider.id} width={16} height={16} />}
                            {provider.label}
                        </>
                    )}
                </Button>
            ))}
        </>
    )
}