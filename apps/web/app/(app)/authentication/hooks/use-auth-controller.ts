import React from "react";
import { authProviderId } from "../config/auth-providers";

export function useAuthController() {
    const [loadingProvider, setLoadingProvider] = React.useState<authProviderId | null>(null)
    const [error, setError] = React.useState<string | null>(null)

    const handleAuth = async (provider: authProviderId,
        action: () => Promise<any>,
        redirectTo?: string
    ) => {
        setError(null)
        setLoadingProvider(provider)

        try {
            const result = await action()

            if (redirectTo) {
                window.location.href = redirectTo
            }
            return result
        } catch (error: any) {
            setError(error.message || "An error occurred during authentication")
        }
        finally {
            setLoadingProvider(null)

        }
    }

    return {
        loadingProvider,
        error,
        handleAuth
    }
}