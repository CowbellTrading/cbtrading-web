/**
 * lib/supabase/queries/homepage.ts
 *
 * Replaces: sanity/lib/queries.ts → homepageQuery
 * GROQ equivalent:
 *   *[_type == "homepage"][0]{
 *     heroHeadline, heroSubtext, heroImage,
 *     heroCta1Label, heroCta2Label,
 *     aboutHeading, aboutBody, aboutImage,
 *     keyFigures[]{number, label},
 *     sustainHeading, sustainBody, sustainImage,
 *     metaTitle, metaDescription
 *   }
 */
import { getServerClient } from '../server'
import type { HomepageRow } from '../types'

export async function getHomepage(): Promise<HomepageRow | null> {
  const supabase = getServerClient()

  const { data, error } = await supabase
    .from('homepage')
    .select('*')
    .limit(1)
    .maybeSingle()

  if (error) {
    console.error('[Supabase] getHomepage error:', error.message)
    return null
  }

  return data
}
