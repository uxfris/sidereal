"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import React from "react"
import LogoIcon from "@/assets/icons/logo-icon"
import { Button } from "@workspace/ui/components/button"
import { Checkbox } from "@workspace/ui/components/checkbox"
import { FieldGroup, Field, FieldLabel, FieldError } from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"
import Image from "next/image"
import Link from "next/link"

// ✅ Flatten schema
const formSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    agreed: z.boolean().refine((value) => value === true, {
        "message": "You must agree to the terms to continue."
    })
})

type FormValues = z.infer<typeof formSchema>

export default function AuthenticationPage() {
    const [showEmail, setShowEmail] = React.useState(false)

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            agreed: false
        },
    })

    const agreed = form.watch("agreed")

    React.useEffect(() => {
        if (!agreed) {
            setShowEmail(false)
            form.resetField("email")
        }
    }, [agreed, form])

    const onSubmit = (data: FormValues) => {
        console.log("Email login", data)
    }

    const handleProtectedAction = async (action: () => void) => {
        const isValid = await form.trigger("agreed")

        if (!isValid) return
        action()
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="flex flex-col gap-9 px-4 py-16 mx-4 w-full md:max-w-126.5 bg-card rounded-md items-center">

                {/* Header */}
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

                {/* Auth Options */}
                <div className="flex flex-col gap-3 px-12 w-full">
                    {/* Auth Buttons */}
                    <Button variant="outline" size="lg" className="w-full" onClick={() => handleProtectedAction(() => console.log("Google Sign In"))}>
                        <Image src="/vectors/google.svg" alt="Google Icon" width={16} height={16} />
                        Sign in with Google
                    </Button>

                    <Button variant="outline" size="lg" className="w-full" onClick={() => handleProtectedAction(() => console.log("Microsoft Sign In"))}>
                        <Image src="/vectors/microsoft.svg" alt="Microsoft Icon" width={16} height={16} />
                        Sign in with Microsoft
                    </Button>
                    {/* Email */}
                    {!showEmail && (
                        <Button
                            variant="outline"
                            size="lg"
                            className="w-full"
                            type="button"
                            onClick={() => handleProtectedAction(() => setShowEmail(true))}
                        >
                            Sign in with Email
                        </Button>
                    )}
                    {/* Email Form */}
                    {showEmail && (
                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-3">

                            <Field data-invalid={!!form.formState.errors.email}>
                                <Input
                                    {...form.register("email")}
                                    placeholder="name@company.com"
                                    aria-invalid={!!form.formState.errors.email}
                                />
                                {form.formState.errors.email && (
                                    <FieldError errors={[form.formState.errors.email]} />
                                )}
                            </Field>

                            <Button type="submit" size="lg" className="w-full">
                                Continue with Email
                            </Button>
                        </form>
                    )}



                </div>

                {/* Terms */}
                <Controller
                    name="agreed"
                    control={form.control}
                    render={({ field }) => (
                        <FieldGroup className="w-full items-center gap-2">
                            <Field orientation="horizontal" className="w-auto">
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={(v) => field.onChange(v === true)}
                                />
                                <FieldLabel className="font-normal text-xs">
                                    I agree to the <Link href="/terms" target="_blank" className="underline">
                                        Terms of Service
                                    </Link> and <Link href="/privacy" target="_blank" className="underline">
                                        Privacy Policy
                                    </Link>
                                </FieldLabel>
                            </Field>
                            {form.formState.errors.agreed && <FieldError className="text-xs -ml-20" errors={[form.formState.errors.agreed]} />}
                        </FieldGroup>
                    )}

                />

            </div>
        </div>
    )
}

