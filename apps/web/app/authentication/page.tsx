"use client"

import React from "react"
import { AuthHeader } from "./components/AuthHeader"
import { EmailForm } from "./components/EmailForm"
import { TermCheckbox } from "./components/TermCheckbox"
import { useAuthForm } from "./hooks/useAuthForm"
import { AuthButtons } from "./components/AuthButtons"
import { loginWithEmail, loginWithGoogle, loginWithMicrosoft } from "./services/auth.service"

export default function AuthenticationPage() {
    const { form, showEmail, setShowEmail, requireAgreement, validateEmailForm } = useAuthForm()


    const handleGoogle = async () => {
        const ok = await requireAgreement();
        if (!ok) return

        await loginWithGoogle()
    }

    const handleMicrosoft = async () => {
        const ok = await requireAgreement();
        if (!ok) return

        await loginWithMicrosoft()
    }

    // Email Submit
    const handleEmailSubmit = async (data: any) => {
        const ok = await validateEmailForm();
        if (!ok) return

        await loginWithEmail(data.email)
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="flex flex-col gap-9 px-4 py-16 mx-4 w-full md:max-w-126.5 bg-card rounded-md items-center">
                <AuthHeader />
                <div className="flex flex-col gap-3 px-12 w-full">
                    <AuthButtons providers={[
                        {
                            id: "google",
                            label: "Continue with Google",
                            iconPath: "/vectors/google.svg",
                            onClick: handleGoogle
                        },
                        {
                            id: "microsoft",
                            label: "Continue with Microsoft",
                            iconPath: "/vectors/microsoft.svg",
                            onClick: handleMicrosoft
                        },
                        {
                            id: "email",
                            label: "Continue with Email",
                            onClick: async () => {
                                const ok = await requireAgreement();
                                if (ok) {
                                    setShowEmail(true);
                                }
                            }
                        }
                    ]} />
                    {showEmail && (
                        <EmailForm form={form} onSubmit={form.handleSubmit(handleEmailSubmit)} />
                    )}
                </div>
                <TermCheckbox form={form} />
            </div>
        </div>
    )
}

