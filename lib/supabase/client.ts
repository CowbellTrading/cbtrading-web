/**
 * lib/supabase/client.ts
 *
 * Browser-side Supabase client.
 * Uses the public anon key — subject to RLS policies.
 * Import in 'use client' components only.
 *
 * Usage:
 *   import { createBrowserClient } from '@/lib/supabase/client'
 *   const supabase = createBrowserClient()
 */
import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnon) {
  throw new Error(
    '[Supabase] NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be set in .env.local'
  )
}

/**
 * Returns a typed Supabase client safe for browser usage.
 * Call once per component; client is internally cached.
 */
export function createBrowserClient() {
  return createClient<Database>(supabaseUrl, supabaseAnon, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  })
}

// Singleton instance for client components that don't need SSR isolation
let _browserClient: ReturnType<typeof createBrowserClient> | null = null

export function getBrowserClient() {
  if (!_browserClient) {
    _browserClient = createBrowserClient()
  }
  return _browserClient
}
