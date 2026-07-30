import type { Metadata } from 'next'
import ResourcesClient from './ResourcesClient'
import { getAllResources } from '@/lib/supabase'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Resources & Downloads',
  description: 'Industry guides, compliance overviews, market reports, and product data from Cowbell Keystone Trading Ireland Limited.',
}

export default async function ResourcesPage() {
  // getAllResources() returns [] gracefully on error — ResourcesClient uses local fallback
  const resources = await getAllResources()
  return <ResourcesClient resources={resources} />
}
