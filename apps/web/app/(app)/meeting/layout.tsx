export default function MeetingLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen overflow-hidden">
            <main className="flex-1 overflow-y-auto w-xl">
                {children}
            </main>
        </div>
    )
}