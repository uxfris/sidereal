import DOMPurify from "dompurify"

export function HighlightText({ html }: { html: string }) {
    const clean = DOMPurify.sanitize(html)
    return (
        <span dangerouslySetInnerHTML={{ __html: clean }} />
    )
}