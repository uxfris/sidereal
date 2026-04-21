import React from "react"
import { authProviderId } from "../config/auth-providers"

export function useAuthController() {
    const [loadingProvider, setLoadingProvider] = React.useState<authProviderId | null>(null)
    const [error, setError] = React.useState<string | null>(null)

    const handleAuth = async (
        provider: authProviderId,
        action: () => Promise<any> | void
    ) => {
        setError(null)
        setLoadingProvider(provider)

        try {
            await action() // ← triggers redirect
        } catch (error: any) {
            setError(error.message || "Authentication failed")
            setLoadingProvider(null)
        }
    }

    return {
        loadingProvider,
        error,
        handleAuth
    }
}