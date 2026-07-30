/**
 * lib/supabase/storage.ts
 *
 * Storage helper utilities for building and managing
 * Supabase Storage public URLs.
 *
 * Replaces: sanity/lib/image.ts → urlFor()
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''

// ── Bucket names (keep in sync with 001_initial_schema.sql) ──────────
export const BUCKETS = {
  siteImages:         'site-images',
  serviceImages:      'service-images',
  productDatasheets:  'product-datasheets',
  resourceFiles:      'resource-files',
  resourceThumbnails: 'resource-thumbnails',
} as const

export type BucketName = typeof BUCKETS[keyof typeof BUCKETS]

/**
 * Build a public URL for a file in a Supabase Storage bucket.
 *
 * @param bucket  - Bucket name (use BUCKETS constants)
 * @param path    - File path within the bucket, e.g. 'logo.png'
 * @returns Full public URL string
 *
 * @example
 *   getStorageUrl(BUCKETS.siteImages, 'logo.png')
 *   // → https://xyz.supabase.co/storage/v1/object/public/site-images/logo.png
 */
export function getStorageUrl(bucket: BucketName, path: string): string {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${cleanPath}`
}

/**
 * Check whether a given URL is a Supabase Storage URL.
 * Useful for distinguishing /public/images/ local files from hosted files.
 */
export function isSupabaseStorageUrl(url: string): boolean {
  return url.includes('/storage/v1/object/public/')
}

/**
 * Returns the URL as-is if it's already a full URL (http/https),
 * otherwise prepends the Supabase Storage base for the given bucket.
 *
 * Use this to safely handle both:
 *   - Legacy file_url values stored as '/resources/file.pdf' (local public/)
 *   - New Supabase Storage paths stored as 'resource-files/file.pdf'
 */
export function resolveFileUrl(
  rawUrl: string,
  bucket: BucketName
): string {
  if (!rawUrl) return ''
  if (rawUrl.startsWith('http://') || rawUrl.startsWith('https://')) return rawUrl
  if (rawUrl.startsWith('/')) return rawUrl  // local /public/ file
  return getStorageUrl(bucket, rawUrl)
}
