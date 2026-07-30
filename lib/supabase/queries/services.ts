/**
 * lib/supabase/queries/services.ts
 *
 * Replaces: sanity/lib/queries.ts → allServicesQuery + serviceBySlugQuery
 *
 * GROQ allServicesQuery equivalent:
 *   *[_type == "service"] | order(orderRank){
 *     _id, title, slug, summary, heroImage, icon, orderRank
 *   }
 *
 * GROQ serviceBySlugQuery equivalent:
 *   *[_type == "service" && slug.current == $slug][0]{
 *     _id, title, slug, summary, heroImage,
 *     overview, features[]{title, description},
 *     industriesServed, whyCowbell,
 *     metaTitle, metaDescription
 *   }
 */
import { getServerClient } from '../server'
import type { ServiceRow } from '../types'

/**
 * Fetch all services ordered by order_rank.
 * Used on: homepage service strip, [slug]/page.tsx related services
 */
export async function getAllServices(): Promise<ServiceRow[]> {
  const supabase = getServerClient()

  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('order_rank', { ascending: true })

  if (error) {
    console.error('[Supabase] getAllServices error:', error.message)
    return []
  }

  return data ?? []
}

/**
 * Fetch a single service by its URL slug.
 * Used on: /[slug] dynamic page
 */
export async function getServiceBySlug(slug: string): Promise<ServiceRow | null> {
  const supabase = getServerClient()

  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('slug', slug)
    .maybeSingle()

  if (error) {
    console.error(`[Supabase] getServiceBySlug(${slug}) error:`, error.message)
    return null
  }

  return data
}

/**
 * Fetch just the fields needed for nav/strips (lighter payload).
 * Used on: Navigation.tsx if fetching from DB, service cards
 */
export async function getServicesForNav(): Promise<
  Pick<ServiceRow, 'id' | 'title' | 'slug' | 'icon' | 'summary' | 'order_rank'>[]
> {
  const supabase = getServerClient()

  const { data, error } = await supabase
    .from('services')
    .select('id, title, slug, icon, summary, order_rank')
    .order('order_rank', { ascending: true })

  if (error) {
    console.error('[Supabase] getServicesForNav error:', error.message)
    return []
  }

  return data ?? []
}
