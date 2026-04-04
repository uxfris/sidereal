import DOMPurify from "isomorphic-dompurify"

export function SanitizedHtml({ html }: { html: string }) {
    const clean = DOMPurify.sanitize(html)
    return (
        <span dangerouslySetInnerHTML={{ __html: clean }} />
    )
}