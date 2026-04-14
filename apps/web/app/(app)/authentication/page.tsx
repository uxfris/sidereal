"use client"

import React from "react"
import { AuthHeader } from "./components/auth-header"
import { EmailForm } from "./components/email-form"
import { TermCheckbox } from "./components/term-checkbox"
import { useAuthForm } from "./hooks/use-auth-form"
import { AuthButtons } from "./components/auth-buttons"
import { loginWithEmail, loginWithGoogle, loginWithMicrosoft } from "./services/auth.service"
import { useAuthController } from "./hooks/use-auth-controller"
import { AUTH_PROVIDERS } from "./config/auth-providers"

export default function AuthenticationPage() {
    const { form, showEmail, setShowEmail, requireAgreement, validateEmailForm } = useAuthForm()
    const { loadingProvider, error, handleAuth } = useAuthController()

    const handleEmailSubmit = async (data: { email: string }) => {

        const ok = await validateEmailForm()
        if (!ok) return

        await handleAuth("email", () => loginWithEmail(data.email), '/dashboard')
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="flex flex-col gap-9 px-4 py-16 mx-4 w-full md:max-w-126.5 bg-card rounded-md items-center">
                <AuthHeader />
                <div className="flex flex-col gap-3 px-4 md:px-12 w-full">
                    <AuthButtons providers={AUTH_PROVIDERS.filter(p => p.id === "email" ? !showEmail : true)
                        .map(provider => ({
                            ...provider,
                            onClick: async () => {
                                const ok = await requireAgreement()
                                if (!ok) return

                                if (provider.id === "google") {
                                    await handleAuth(provider.id, loginWithGoogle)
                                }
                                if (provider.id === "microsoft") {
                                    await handleAuth(provider.id, loginWithMicrosoft)
                                }
                                if (provider.id === "email") {
                                    setShowEmail(true)
                                }
                            },
                            loading: loadingProvider === provider.id
                        }))
                    } />
                    {showEmail && (
                        <EmailForm form={form} onSubmit={form.handleSubmit(handleEmailSubmit)} />
                    )}
                    {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
                </div>
                <TermCheckbox form={form} />
            </div>
        </div>
    )
}

