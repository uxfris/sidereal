import { Field, FieldContent, FieldDescription, FieldLabel } from "@workspace/ui/components/field";
import { ReactNode } from "react";

export function IntegrationSettingItem({ id, label, description, trailing }: { id: string, label: string, description: string, trailing?: ReactNode }) {
    return (
        <Field orientation="horizontal">
            <FieldContent>
                <FieldLabel htmlFor={id}>{label}</FieldLabel>
                <FieldDescription>{description}</FieldDescription>
            </FieldContent>
            {trailing}
        </Field>
    )
}