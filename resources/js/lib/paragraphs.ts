/**
 * The About text is stored as HTML paragraphs. These convert it to plain paragraphs separated by a blank line
 * for editing, and back again when saving. Any other HTML in the text, such as links, is left as it is.
 */
export function htmlToParagraphs(html: string | null | undefined): string {
    if (!html) return '';

    return html
        .trim()
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<\/p>\s*<p[^>]*>/gi, '\n\n')
        .replace(/^<p[^>]*>/i, '')
        .replace(/<\/p>$/i, '');
}

export function paragraphsToHtml(text: string | null | undefined): string {
    if (!text) return '';

    return text
        .split(/\n\s*\n/)
        .map((paragraph) => paragraph.trim())
        .filter((paragraph) => paragraph !== '')
        .map((paragraph) => `<p>${paragraph.replace(/\n/g, '<br>')}</p>`)
        .join('');
}
