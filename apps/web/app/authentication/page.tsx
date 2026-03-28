"use client"

import LogoIcon from "@/assets/icons/logo-icon";
import { Button } from "@workspace/ui/components/button";
import { Checkbox } from "@workspace/ui/components/checkbox";
import { FieldGroup, Field, FieldLabel } from "@workspace/ui/components/field";
import Image from "next/image";
import React from "react";

export default function AuthenticationPage() {
    const [checked, setChecked] = React.useState(false)

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="flex items-center justify-center flex-col gap-9 px-4 py-16 mx-4 w-full md:max-w-126.5 bg-card rounded-md">
                <div className="flex flex-col items-center justify-center gap-5 w-full">
                    <div className="w-14 h-14 md:w-16 md:h-16"><LogoIcon color="#2B3437" /></div>
                    <h1 className="text-2xl md:text-4xl font-medium text-center">Welcome to Sidereal</h1>
                    <p className="text-sm md:text-base text-muted-foreground text-center">We recommend using your work email <br /> or email with the most used calendar.</p>
                </div>
                <div className="flex flex-col items-center justify-center gap-3 px-12 w-full">
                    <Button variant="outline" size="lg" className="w-full">
                        <Image src="/vectors/google.svg" alt="Google Icon" width={20} height={20} />
                        Sign in with Google
                    </Button>
                    <Button variant="outline" size="lg" className="w-full">
                        <Image src="/vectors/microsoft.svg" alt="Microsoft Icon" width={20} height={20} />
                        Sign in with Microsoft
                    </Button>
                    <Button variant="outline" size="lg" className="w-full">
                        Sign in with Email
                    </Button>
                </div>


                <FieldGroup className="w-full items-center">
                    <Field orientation="horizontal" data-invalid="false" className="w-auto">
                        <Checkbox
                            id="terms-checkbox-invalid"
                            name="terms-checkbox-invalid"
                            aria-invalid="false"
                        />
                        <FieldLabel htmlFor="terms-checkbox-invalid" className="font-normal text-xs">
                            I agree to the Terms of Service and Privacy Policy
                        </FieldLabel>
                    </Field>
                </FieldGroup>
            </div>
        </div>
    )
}