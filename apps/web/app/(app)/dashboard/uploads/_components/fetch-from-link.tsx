"use client"

import { LinkMinimalistic } from "@solar-icons/react";
import { Button } from "@workspace/ui/components/button";
import { Field, FieldLabel } from "@workspace/ui/components/field";
import { Input } from "@workspace/ui/components/input";

export function FetchFromLink() {
    return (
        <div className="flex flex-col flex-2 bg-secondary p-6 rounded-md">
            <div className="flex-1 space-y-4">
                <div className="flex items-center gap-2">
                    <LinkMinimalistic size={20} />
                    <h2 className="text-lg font-semibold">
                        Remote Source
                    </h2>
                </div>
                <p className="text-sm text-muted-foreground">
                    Import directly from Cloud Storage or
                    secure CAD URLs.
                </p>
            </div>
            <div className="space-y-4">
                <Field>
                    <FieldLabel>
                        SOURCE URL
                    </FieldLabel>
                    <Input
                        className="bg-secondary brightness-95 h-12"
                        placeholder="https://cloud.sidereal.io/share/..." />
                </Field>
                <Button variant="outline" size="xl" className="brightness-90 w-full">
                    Fetch from Link
                </Button>
            </div>
        </div>
    )
}