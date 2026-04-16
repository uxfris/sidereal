import { z } from "zod"

export const authSchema = z.object({
    email: z.email("Please enter a valid email address"),
    agreed: z.boolean().refine((value) => value === true, {
        "message": "You must agree to the terms to continue."
    })
})


export type AuthFormValues = z.infer<typeof authSchema>