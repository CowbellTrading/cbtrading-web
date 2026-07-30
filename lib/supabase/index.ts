/**
 * lib/supabase/index.ts
 *
 * Central barrel export for all Supabase utilities.
 * Import from here instead of deep paths:
 *
 *   import { getServerClient, getAllServices } from '@/lib/supabase'
 */

// Clients
export { getServerClient, getAdminClient }        from './server'
export { createBrowserClient, getBrowserClient }  from './client'

// Types
export type {
  Database,
  Tables,
  SiteSettingsRow,
  HomepageRow,
  AboutCompanyRow,
  ServiceRow,
  ProductRow,
  ResourceRow,
  ProductCategory,
  ResourceCategory,
  RichTextContent,
  PortableTextBlock,
} from './types'

// Queries
export { getSiteSettings }                        from './queries/site-settings'
export { getHomepage }                            from './queries/homepage'
export { getAboutCompany }                        from './queries/about-company'
export { getAllServices, getServiceBySlug, getServicesForNav } from './queries/services'
export { getProductsByServiceSlug, getAllProducts }            from './queries/products'
export { getAllResources, getResourcesByCategory, getResourceById } from './queries/resources'
