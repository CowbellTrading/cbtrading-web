/**
 * lib/supabase/server.ts
 *
 * Server-side Supabase clients for Next.js Server Components and API Routes.
 *
 * Two clients are provided:
 *
 *  1. getServerClient()
 *     - Uses the anon key + RLS
 *     - Safe for all server-side reads (pages, layouts)
 *     - Never exposes service role to the browser
 *
 *  2. getAdminClient()
 *     - Uses the service_role key — BYPASSES ALL RLS
 *     - Only for trusted server-side mutations (API routes, scripts)
 *     - Never import this in client components or pass to the browser
 *
 * Usage:
 *   import { getServerClient } from '@/lib/supabase/server'
 *   const supabase = getServerClient()
 *   const { data } = await supabase.from('services').select('*')
 */
import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

const supabaseUrl         = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnon        = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE_KEY!

function assertEnv(name: string, value: string | undefined): asserts value is string {
  if (!value) {
    throw new Error(`[Supabase] Missing environment variable: ${name}`)
  }
}

/**
 * Server-side read client (anon key, RLS enforced).
 * Use in Server Components for all public data fetching.
 */
export function getServerClient() {
  assertEnv('NEXT_PUBLIC_SUPABASE_URL',      supabaseUrl)
  assertEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY', supabaseAnon)

  return createClient<Database>(supabaseUrl, supabaseAnon, {
    auth: {
      persistSession: false,   // no cookie/session on server
      autoRefreshToken: false,
    },
  })
}

/**
 * Server-side admin client (service_role key, RLS BYPASSED).
 * Use ONLY in API routes and server-side scripts.
 * Never expose to the browser or client components.
 */
export function getAdminClient() {
  assertEnv('NEXT_PUBLIC_SUPABASE_URL',  supabaseUrl)
  assertEnv('SUPABASE_SERVICE_ROLE_KEY', supabaseServiceRole)

  return createClient<Database>(supabaseUrl, supabaseServiceRole, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}
