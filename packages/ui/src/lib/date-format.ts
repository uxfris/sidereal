export function formatDate(dateString: string) {
    const date = new Date(dateString)

    const parts = new Intl.DateTimeFormat('en-US', {
        weekday: 'short',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    }).formatToParts(date)

    const map: any = {}
    parts.forEach(p => map[p.type] = p.value)

    return `${map.weekday}, ${map.month} ${map.year} ${map.hour}:${map.minute} ${map.dayPeriod}`
}