export function SettingHeader({ title, description }: { title: string, description: string }) {
    return (
        <div className="space-y-2">
            <h1 className="text-lg font-semibold">
                {title}
            </h1>
            <p className="text-sm text-muted-foreground">
                {description}
            </p>
        </div>
    )
}