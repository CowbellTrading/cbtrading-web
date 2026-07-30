/**
 * lib/supabase/queries/resources.ts
 *
 * Replaces: sanity/lib/queries.ts → allResourcesQuery
 *
 * GROQ equivalent:
 *   *[_type == "resource" && published == true] | order(publishedAt desc){
 *     _id, title, category, description, gated, publishedAt,
 *     "fileUrl": file.asset->url,
 *     "fileSize": file.asset->size,
 *     "thumbnailUrl": thumbnail.asset->url
 *   }
 */
import { getServerClient } from '../server'
import type { ResourceRow, ResourceCategory } from '../types'

/**
 * Fetch all published resources, newest first.
 * Used on: /resources page
 */
export async function getAllResources(): Promise<ResourceRow[]> {
  const supabase = getServerClient()

  const { data, error } = await supabase
    .from('resources')
    .select('*')
    .eq('published', true)
    .order('published_at', { ascending: false })

  if (error) {
    console.error('[Supabase] getAllResources error:', error.message)
    return []
  }

  return data ?? []
}

/**
 * Fetch published resources filtered by category.
 */
export async function getResourcesByCategory(
  category: ResourceCategory
): Promise<ResourceRow[]> {
  const supabase = getServerClient()

  const { data, error } = await supabase
    .from('resources')
    .select('*')
    .eq('published', true)
    .eq('category', category)
    .order('published_at', { ascending: false })

  if (error) {
    console.error(`[Supabase] getResourcesByCategory(${category}) error:`, error.message)
    return []
  }

  return data ?? []
}

/**
 * Fetch a single resource by ID (for generating signed URLs, gated access, etc.)
 */
export async function getResourceById(id: string): Promise<ResourceRow | null> {
  const supabase = getServerClient()

  const { data, error } = await supabase
    .from('resources')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  if (error) {
    console.error(`[Supabase] getResourceById(${id}) error:`, error.message)
    return null
  }

  return data
}
