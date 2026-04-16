export function IntegrationLinearStatCard() {

    const MOCK_INTEGRATION_STAT = [
        {
            id: "issue",
            number: "24",
            label: "Issues created",
        },
        {
            id: "assign",
            number: "18",
            label: "Auto-assigned",
        },
        {
            id: "7",
            number: "7",
            label: "Meetings connected",
        },
    ]

    return (
        <div className="flex items-center gap-2">
            {MOCK_INTEGRATION_STAT.map((stat) => (
                <div key={stat.id} className="px-5 py-2 bg-secondary rounded-lg flex-1">
                    <h2 className="text-lg font-semibold">{stat.number}</h2>
                    <p className="text-xs">{stat.label}</p>
                </div>

            ))}
        </div>
    )
}