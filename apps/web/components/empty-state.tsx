import { Card } from "@workspace/ui/components/card";
import { cn } from "@workspace/ui/lib/utils";
import Image from "next/image";

export function EmptyState({ title, description, className }: { title: string, description: string, className?: string }) {
    return (
        <Card className={cn("h-96 flex items-center justify-center gap-8 text-center", className)}>
            <Image src="/vectors/empty.svg" alt={"Empty Icon"} width={72} height={72} />
            <div className="space-y-3 max-w-80">
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>
        </Card>
    )
}