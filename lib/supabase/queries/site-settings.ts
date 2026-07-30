/**
 * lib/supabase/queries/site-settings.ts
 *
 * Replaces: sanity/lib/queries.ts → siteSettingsQuery
 * GROQ equivalent:
 *   *[_type == "siteSettings"][0]{ companyName, tagline, ... }
 */
import { getServerClient } from '../server'
import type { SiteSettingsRow } from '../types'

export async function getSiteSettings(): Promise<SiteSettingsRow | null> {
  const supabase = getServerClient()

  const { data, error } = await supabase
    .from('site_settings')
    .select('*')
    .limit(1)
    .maybeSingle()

  if (error) {
    console.error('[Supabase] getSiteSettings error:', error.message)
    return null
  }

  return data
}
