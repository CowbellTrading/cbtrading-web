import type { Metadata } from 'next'
import ResourcesClient from './ResourcesClient'
import { getAllResources } from '@/lib/supabase'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Industry Resources & Downloads | Cowbell Keystone',
  description: 'Industry guides, compliance overviews, market reports, and product data from Cowbell Keystone Trading Ireland Limited.',
  alternates: {
    canonical: 'https://cb-trading.ie/resources',
  },
  openGraph: {
    title: 'Industry Resources & Downloads | Cowbell Keystone',
    description: 'Industry guides, compliance overviews, market reports, and product data from Cowbell Keystone Trading Ireland Limited.',
    url: 'https://cb-trading.ie/resources',
    siteName: 'Cowbell Keystone Trading Ireland',
    locale: 'en_IE',
    type: 'website',
  },
}

export default async function ResourcesPage() {
  // getAllResources() returns [] gracefully on error — ResourcesClient uses local fallback
  const resources = await getAllResources()
  return (
    <>
      {/* ── JSON-LD Breadcrumb Schema ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://cb-trading.ie"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Resources",
                "item": "https://cb-trading.ie/resources"
              }
            ]
          }),
        }}
      />
      <ResourcesClient resources={resources} />
    </>
  )
}
