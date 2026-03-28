import React from "react";
import { AuthFormValues, authSchema } from "../schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export function useAuthForm() {
    const [showEmail, setShowEmail] = React.useState(false)

    const form = useForm<AuthFormValues>({
        resolver: zodResolver(authSchema),
        defaultValues: {
            email: "",
            agreed: false
        }
    })

    const agreed = form.watch("agreed")

    React.useEffect(() => {
        if (!agreed) {
            setShowEmail(false)
            form.resetField("email")
        }
    }, [agreed, form])

    const requireAgreement = async () => {
        return await form.trigger("agreed")
    }

    const validateEmailForm = async () => {
        return await form.trigger()
    }

    return {
        form,
        showEmail,
        setShowEmail,
        requireAgreement,
        validateEmailForm
    }

}