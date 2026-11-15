/**
 * schema.org data for search engines, as a JSON-LD script in the page
 * (src/lib/seo/structuredData.ts builds it). "<" is escaped so no text in
 * the data can close the script early.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  )
}
