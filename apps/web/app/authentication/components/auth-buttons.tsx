import { Button } from "@workspace/ui/components/button"
import Image from "next/image"
import { Spinner } from "@workspace/ui/components/spinner"

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
                    {provider.loading ?
                        <Spinner />
                        : (
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