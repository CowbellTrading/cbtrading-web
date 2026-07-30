/**
 * lib/supabase/queries/products.ts
 *
 * Replaces: sanity/lib/queries.ts → productsByServiceQuery + allProductsQuery
 *
 * GROQ productsByServiceQuery equivalent:
 *   *[_type == "product" && service->slug.current == $slug && published == true]{
 *     _id, name, grade, description, applications, category,
 *     "datasheetUrl": datasheet.asset->url
 *   }
 *
 * GROQ allProductsQuery equivalent:
 *   *[_type == "product" && published == true] | order(category, name){
 *     _id, name, grade, category, description, applications,
 *     "datasheetUrl": datasheet.asset->url
 *   }
 *
 * Key difference from Sanity:
 *   Sanity used a document reference (service->slug.current).
 *   Supabase uses a direct FK column (service_slug text).
 */
import { getServerClient } from '../server'
import type { ProductRow } from '../types'

/**
 * Fetch all published products linked to a specific service slug.
 * Used on: /[slug] dynamic page (sidebar product list)
 */
export async function getProductsByServiceSlug(serviceSlug: string): Promise<ProductRow[]> {
  const supabase = getServerClient()

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('service_slug', serviceSlug)
    .eq('published', true)
    .order('category', { ascending: true })
    .order('name',     { ascending: true })

  if (error) {
    console.error(`[Supabase] getProductsByServiceSlug(${serviceSlug}) error:`, error.message)
    return []
  }

  return data ?? []
}

/**
 * Fetch all published products across all services.
 * Currently unused on pages (allProductsQuery was defined but unused).
 */
export async function getAllProducts(): Promise<ProductRow[]> {
  const supabase = getServerClient()

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('published', true)
    .order('category', { ascending: true })
    .order('name',     { ascending: true })

  if (error) {
    console.error('[Supabase] getAllProducts error:', error.message)
    return []
  }

  return data ?? []
}
