import { Button } from "@workspace/ui/components/button";
import { Field, FieldError } from "@workspace/ui/components/field";
import { Input } from "@workspace/ui/components/input";
import { Spinner } from "@workspace/ui/components/spinner";

export function EmailForm({ form, onSubmit }: any) {
    return (
        <form onSubmit={onSubmit} className="w-full flex flex-col gap-3">

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

            <Button type="submit" size="lg" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? <Spinner /> : "Continue with Email"}
            </Button>
        </form>
    )
}