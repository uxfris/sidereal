import { FuseResultMatch } from "fuse.js"


export function highlightWithMatches(
    text: string,
    matches: FuseResultMatch[] | readonly FuseResultMatch[] | undefined,
    key: string
) {
    if (!matches) return text

    const match = matches.find((m) => m.key?.includes(key))
    if (!match) return text

    const indices = match.indices
    const result: React.ReactNode[] = []

    let lastIndex = 0

    indices.forEach(([start, end], i) => {
        if (lastIndex < start) {
            result.push(text.slice(lastIndex, start))
        }

        result.push(
            <mark key={i} className="bg-yellow-200 px-0 m-0 leading-none align-baseline rounded-sm" >
                {text.slice(start, end + 1)}
            </mark>
        )

        lastIndex = end + 1
    })

    if (lastIndex < text.length) {
        result.push(text.slice(lastIndex))
    }

    return result
}