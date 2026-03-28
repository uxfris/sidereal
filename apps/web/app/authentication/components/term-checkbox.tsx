import { Checkbox } from "@workspace/ui/components/checkbox";
import { Field, FieldError, FieldGroup, FieldLabel } from "@workspace/ui/components/field";
import Link from "next/link";
import { Controller } from "react-hook-form";

export function TermCheckbox({ form }: any) {
    return (
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
    )
}