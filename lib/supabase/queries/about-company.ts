/**
 * lib/supabase/queries/about-company.ts
 *
 * Replaces: sanity/lib/queries.ts → aboutCompanyQuery
 * GROQ equivalent:
 *   *[_type == "aboutCompany"][0]{
 *     heading, leadText, introHeading, introBody,
 *     "introImage": introImage.asset->url,
 *     missionHeading, missionBody,
 *     values[]{title, description},
 *     markets[]{flag, name, label, description},
 *     metaTitle, metaDescription
 *   }
 */
import { getServerClient } from '../server'
import type { AboutCompanyRow } from '../types'

export async function getAboutCompany(): Promise<AboutCompanyRow | null> {
  const supabase = getServerClient()

  const { data, error } = await supabase
    .from('about_company')
    .select('*')
    .limit(1)
    .maybeSingle()

  if (error) {
    console.error('[Supabase] getAboutCompany error:', error.message)
    return null
  }

  return data
}
