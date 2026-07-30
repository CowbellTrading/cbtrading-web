/**
 * Supabase TypeScript types for cbtrading-web
 * Auto-mirrors the SQL schema in 001_initial_schema.sql
 * Import: import type { Database, Tables } from '@/lib/supabase/types'
 */

// ── Portable Text (Sanity-compatible rich text format) ──────────────
export interface PortableTextBlock {
  _type: 'block'
  _key: string
  style?: string
  children: Array<{
    _type: 'span'
    _key: string
    text: string
    marks?: string[]
  }>
  markDefs?: Array<{ _key: string; _type: string; href?: string }>
}

export type RichTextContent = PortableTextBlock[] | string | null

// ── Row types (match DB columns exactly) ────────────────────────────

export interface SiteSettingsRow {
  id: string
  company_name: string
  tagline: string | null
  logo_url: string | null
  founded: number | null
  reg_number: string | null
  vat_number: string | null
  address1: string | null
  address2: string | null
  city: string | null
  country: string | null
  phone: string | null
  email: string | null
  linkedin: string | null
  twitter: string | null
  updated_at: string
}

export interface HomepageRow {
  id: string
  hero_headline: string | null
  hero_subtext: string | null
  hero_image_url: string | null
  hero_cta1_label: string | null
  hero_cta2_label: string | null
  about_heading: string | null
  about_body: RichTextContent
  about_image_url: string | null
  key_figures: Array<{ number: string; label: string }> | null
  sustain_heading: string | null
  sustain_body: string | null
  sustain_image_url: string | null
  meta_title: string | null
  meta_description: string | null
  updated_at: string
}

export interface AboutCompanyRow {
  id: string
  heading: string
  lead_text: string | null
  intro_heading: string | null
  intro_body: RichTextContent
  intro_image_url: string | null
  mission_heading: string | null
  mission_body: string | null
  values: Array<{ title: string; description: string }> | null
  markets: Array<{
    flag: string
    name: string
    label: string
    description: string
  }> | null
  meta_title: string | null
  meta_description: string | null
  updated_at: string
}

export interface ServiceRow {
  id: string
  title: string
  slug: string
  icon: string | null
  summary: string
  hero_image_url: string | null
  overview: RichTextContent
  features: Array<{ title: string; description: string }> | null
  industries_served: string[] | null
  why_cowbell: string | null
  order_rank: number
  meta_title: string | null
  meta_description: string | null
  created_at: string
  updated_at: string
}

export type ProductCategory = 'virgin' | 'recycled' | 'packaging' | 'industrial'

export interface ProductRow {
  id: string
  name: string
  category: ProductCategory
  grade: string | null
  description: string | null
  applications: string[] | null
  datasheet_url: string | null
  service_slug: string | null
  published: boolean
  created_at: string
  updated_at: string
}

export type ResourceCategory =
  | 'datasheets'
  | 'catalogues'
  | 'certifications'
  | 'sustainability'
  | 'machinery'
  | 'consulting'

export interface ResourceRow {
  id: string
  title: string
  category: ResourceCategory
  description: string | null
  file_url: string
  file_size: number | null
  thumbnail_url: string | null
  gated: boolean
  published: boolean
  published_at: string
  created_at: string
  updated_at: string
}

// ── Insert types (omit auto-generated fields) ────────────────────────

export type SiteSettingsInsert = Omit<SiteSettingsRow, 'id' | 'updated_at'>
export type HomepageInsert     = Omit<HomepageRow,     'id' | 'updated_at'>
export type AboutCompanyInsert = Omit<AboutCompanyRow, 'id' | 'updated_at'>
export type ServiceInsert      = Omit<ServiceRow,      'id' | 'created_at' | 'updated_at'>
export type ProductInsert      = Omit<ProductRow,      'id' | 'created_at' | 'updated_at'>
export type ResourceInsert     = Omit<ResourceRow,     'id' | 'created_at' | 'updated_at'>

// ── Update types (all fields optional except id) ─────────────────────

export type SiteSettingsUpdate = Partial<SiteSettingsInsert>
export type HomepageUpdate     = Partial<HomepageInsert>
export type AboutCompanyUpdate = Partial<AboutCompanyInsert>
export type ServiceUpdate      = Partial<ServiceInsert>
export type ProductUpdate      = Partial<ProductInsert>
export type ResourceUpdate     = Partial<ResourceInsert>

// ── Supabase Database definition (for createClient generic) ──────────

export interface Database {
  public: {
    Tables: {
      site_settings: {
        Row:    SiteSettingsRow
        Insert: SiteSettingsInsert
        Update: SiteSettingsUpdate
      }
      homepage: {
        Row:    HomepageRow
        Insert: HomepageInsert
        Update: HomepageUpdate
      }
      about_company: {
        Row:    AboutCompanyRow
        Insert: AboutCompanyInsert
        Update: AboutCompanyUpdate
      }
      services: {
        Row:    ServiceRow
        Insert: ServiceInsert
        Update: ServiceUpdate
      }
      products: {
        Row:    ProductRow
        Insert: ProductInsert
        Update: ProductUpdate
      }
      resources: {
        Row:    ResourceRow
        Insert: ResourceInsert
        Update: ResourceUpdate
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: {
      product_category: ProductCategory
      resource_category: ResourceCategory
    }
  }
}

// ── Convenience helper type ─────────────────────────────────────────
export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row']
