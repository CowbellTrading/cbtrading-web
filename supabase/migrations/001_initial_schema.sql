-- =========================================================
-- cbtrading-web · Supabase Foundation
-- Migration: 001_initial_schema.sql
-- Run this in: Supabase Dashboard → SQL Editor
-- =========================================================

-- ─────────────────────────────────────────────────────────
-- EXTENSIONS
-- ─────────────────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


-- =========================================================
-- TABLES
-- =========================================================

-- ─────────────────────────────────────────────────────────
-- 1. site_settings  (singleton — max 1 row)
-- ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS site_settings (
  id              uuid        DEFAULT uuid_generate_v4() PRIMARY KEY,
  company_name    text        NOT NULL DEFAULT 'Cowbell Keystone Trading Ireland Limited',
  tagline         text,
  logo_url        text,           -- Supabase Storage public URL (site-images bucket)
  founded         integer,
  reg_number      text,
  vat_number      text,
  address1        text,
  address2        text,
  city            text,
  country         text,
  phone           text,
  email           text,
  linkedin        text,
  twitter         text,
  updated_at      timestamptz DEFAULT now()
);

-- Enforce singleton: only one row may ever exist
CREATE UNIQUE INDEX IF NOT EXISTS site_settings_singleton_idx ON site_settings ((true));


-- ─────────────────────────────────────────────────────────
-- 2. homepage  (singleton — max 1 row)
-- ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS homepage (
  id                  uuid        DEFAULT uuid_generate_v4() PRIMARY KEY,
  hero_headline       text,
  hero_subtext        text,
  hero_image_url      text,       -- Supabase Storage public URL (site-images bucket)
  hero_cta1_label     text        DEFAULT 'Explore Our Services',
  hero_cta2_label     text        DEFAULT 'Contact Us',
  about_heading       text,
  about_body          jsonb,      -- Portable Text blocks OR plain text string
  about_image_url     text,       -- Supabase Storage public URL
  key_figures         jsonb,      -- [{number: string, label: string}]
  sustain_heading     text,
  sustain_body        text,
  sustain_image_url   text,       -- Supabase Storage public URL
  meta_title          text,
  meta_description    text,
  updated_at          timestamptz DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS homepage_singleton_idx ON homepage ((true));


-- ─────────────────────────────────────────────────────────
-- 3. about_company  (singleton — max 1 row)
-- ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS about_company (
  id                  uuid        DEFAULT uuid_generate_v4() PRIMARY KEY,
  heading             text        NOT NULL DEFAULT 'Our Story',
  lead_text           text,
  intro_heading       text,
  intro_body          jsonb,      -- Portable Text blocks OR plain text string
  intro_image_url     text,       -- Supabase Storage public URL (site-images bucket)
  mission_heading     text,
  mission_body        text,
  values              jsonb,      -- [{title: string, description: string}]
  markets             jsonb,      -- [{flag: string, name: string, label: string, description: string}]
  meta_title          text,
  meta_description    text,
  updated_at          timestamptz DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS about_company_singleton_idx ON about_company ((true));


-- ─────────────────────────────────────────────────────────
-- 4. services
-- ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS services (
  id                  uuid        DEFAULT uuid_generate_v4() PRIMARY KEY,
  title               text        NOT NULL,
  slug                text        NOT NULL UNIQUE,
  icon                text,       -- emoji character, e.g. '♻️'
  summary             text        NOT NULL,
  hero_image_url      text,       -- Supabase Storage public URL (service-images bucket)
  overview            jsonb,      -- Portable Text blocks OR plain text string
  features            jsonb,      -- [{title: string, description: string}]
  industries_served   text[],     -- array of industry name strings
  why_cowbell         text,
  order_rank          integer     DEFAULT 99,
  meta_title          text,
  meta_description    text,
  created_at          timestamptz DEFAULT now(),
  updated_at          timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS services_order_idx ON services (order_rank ASC NULLS LAST);
CREATE INDEX IF NOT EXISTS services_slug_idx  ON services (slug);


-- ─────────────────────────────────────────────────────────
-- 5. products
-- ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS products (
  id              uuid    DEFAULT uuid_generate_v4() PRIMARY KEY,
  name            text    NOT NULL,
  category        text    NOT NULL CHECK (category IN ('virgin', 'recycled', 'packaging', 'industrial')),
  grade           text,
  description     text,
  applications    text[],
  datasheet_url   text,           -- Supabase Storage public URL (product-datasheets bucket)
  service_slug    text    REFERENCES services(slug) ON DELETE SET NULL ON UPDATE CASCADE,
  published       boolean DEFAULT true,
  created_at      timestamptz DEFAULT now(),
  updated_at      timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS products_service_idx   ON products (service_slug);
CREATE INDEX IF NOT EXISTS products_category_idx  ON products (category);
CREATE INDEX IF NOT EXISTS products_published_idx ON products (published, name) WHERE published = true;


-- ─────────────────────────────────────────────────────────
-- 6. resources
-- ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS resources (
  id              uuid    DEFAULT uuid_generate_v4() PRIMARY KEY,
  title           text    NOT NULL,
  category        text    NOT NULL CHECK (category IN (
                    'datasheets', 'catalogues', 'certifications',
                    'sustainability', 'machinery', 'consulting'
                  )),
  description     text,
  file_url        text    NOT NULL,   -- Supabase Storage public URL (resource-files bucket)
  file_size       bigint,             -- size in bytes
  thumbnail_url   text,               -- Supabase Storage public URL (resource-thumbnails bucket)
  gated           boolean DEFAULT false,
  published       boolean DEFAULT true,
  published_at    timestamptz DEFAULT now(),
  created_at      timestamptz DEFAULT now(),
  updated_at      timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS resources_published_idx ON resources (published_at DESC) WHERE published = true;
CREATE INDEX IF NOT EXISTS resources_category_idx  ON resources (category);
CREATE INDEX IF NOT EXISTS resources_gated_idx     ON resources (gated);


-- =========================================================
-- UPDATED_AT TRIGGER
-- =========================================================
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_site_settings_updated_at
  BEFORE UPDATE ON site_settings
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER trg_homepage_updated_at
  BEFORE UPDATE ON homepage
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER trg_about_company_updated_at
  BEFORE UPDATE ON about_company
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER trg_services_updated_at
  BEFORE UPDATE ON services
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER trg_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER trg_resources_updated_at
  BEFORE UPDATE ON resources
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();


-- =========================================================
-- ROW LEVEL SECURITY (RLS)
-- =========================================================
ALTER TABLE site_settings  ENABLE ROW LEVEL SECURITY;
ALTER TABLE homepage        ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_company   ENABLE ROW LEVEL SECURITY;
ALTER TABLE services        ENABLE ROW LEVEL SECURITY;
ALTER TABLE products        ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources       ENABLE ROW LEVEL SECURITY;

-- ── Public READ (anon + authenticated) ───────────────────

CREATE POLICY "site_settings: public read"
  ON site_settings FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "homepage: public read"
  ON homepage FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "about_company: public read"
  ON about_company FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "services: public read"
  ON services FOR SELECT
  TO anon, authenticated
  USING (true);

-- Only published products are visible to the public
CREATE POLICY "products: public read published only"
  ON products FOR SELECT
  TO anon, authenticated
  USING (published = true);

-- Only published resources are visible to the public
CREATE POLICY "resources: public read published only"
  ON resources FOR SELECT
  TO anon, authenticated
  USING (published = true);

-- ── Authenticated admin WRITE (insert/update/delete) ─────
-- Authenticated users (admin session) can do everything.
-- For production: add custom JWT claim check:
--   auth.jwt() ->> 'user_role' = 'admin'

CREATE POLICY "site_settings: admin write"
  ON site_settings FOR ALL
  TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "homepage: admin write"
  ON homepage FOR ALL
  TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "about_company: admin write"
  ON about_company FOR ALL
  TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "services: admin write"
  ON services FOR ALL
  TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "products: admin write"
  ON products FOR ALL
  TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "resources: admin write"
  ON resources FOR ALL
  TO authenticated
  USING (true) WITH CHECK (true);


-- =========================================================
-- STORAGE BUCKETS
-- 10 MB limit for images · 50 MB for PDFs
-- =========================================================
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
  (
    'site-images',
    'site-images',
    true,
    10485760,
    ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/svg+xml']
  ),
  (
    'service-images',
    'service-images',
    true,
    10485760,
    ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
  ),
  (
    'product-datasheets',
    'product-datasheets',
    true,
    52428800,
    ARRAY['application/pdf']
  ),
  (
    'resource-files',
    'resource-files',
    true,
    52428800,
    ARRAY['application/pdf']
  ),
  (
    'resource-thumbnails',
    'resource-thumbnails',
    true,
    10485760,
    ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
  )
ON CONFLICT (id) DO NOTHING;

-- ── Storage Object RLS Policies ───────────────────────────

-- site-images
CREATE POLICY "site-images: public read"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'site-images');

CREATE POLICY "site-images: admin insert"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'site-images');

CREATE POLICY "site-images: admin update"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'site-images');

CREATE POLICY "site-images: admin delete"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'site-images');

-- service-images
CREATE POLICY "service-images: public read"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'service-images');

CREATE POLICY "service-images: admin insert"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'service-images');

CREATE POLICY "service-images: admin update"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'service-images');

CREATE POLICY "service-images: admin delete"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'service-images');

-- product-datasheets
CREATE POLICY "product-datasheets: public read"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'product-datasheets');

CREATE POLICY "product-datasheets: admin insert"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'product-datasheets');

CREATE POLICY "product-datasheets: admin update"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'product-datasheets');

CREATE POLICY "product-datasheets: admin delete"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'product-datasheets');

-- resource-files
CREATE POLICY "resource-files: public read"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'resource-files');

CREATE POLICY "resource-files: admin insert"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'resource-files');

CREATE POLICY "resource-files: admin update"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'resource-files');

CREATE POLICY "resource-files: admin delete"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'resource-files');

-- resource-thumbnails
CREATE POLICY "resource-thumbnails: public read"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'resource-thumbnails');

CREATE POLICY "resource-thumbnails: admin insert"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'resource-thumbnails');

CREATE POLICY "resource-thumbnails: admin update"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'resource-thumbnails');

CREATE POLICY "resource-thumbnails: admin delete"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'resource-thumbnails');


-- =========================================================
-- SEED DATA
-- Matches the current hardcoded FALLBACK values in code.
-- Safe to re-run — all inserts use ON CONFLICT DO NOTHING.
-- =========================================================

INSERT INTO site_settings (
  company_name, tagline, phone, email,
  address1, city, country,
  linkedin, twitter, founded
) VALUES (
  'Cowbell Keystone Trading Ireland Limited',
  'Sustainable Industrial Trading & Material Supply Solutions',
  '+353 89 489 8717',
  'info@cb-trading.ie',
  'Kilmartin Grove',
  'Dublin',
  'Ireland',
  'https://linkedin.com/company/cowbell-keystone',
  'https://x.com/cowbellkeystone',
  2024
) ON CONFLICT DO NOTHING;


INSERT INTO homepage (
  hero_headline, hero_subtext,
  hero_cta1_label, hero_cta2_label,
  about_heading,
  sustain_heading, sustain_body
) VALUES (
  'Sustainable Industrial Trading & Material Supply Solutions',
  'Cowbell Keystone Trading Ireland Limited is an Ireland-based trading and consulting company specializing in plastic raw materials, recycled materials, packaging solutions, forklift leasing, manufacturing consultancy, and machinery representation.',
  'Explore Our Services',
  'Request a Quote',
  'Bridging the Gap in European Supply Chains',
  'Committed to a Sustainable Future',
  'We actively source eco-friendly alternatives, including recycled plastics and biodegradable packaging, while optimizing logistics routes to reduce carbon footprints across our supply chain.'
) ON CONFLICT DO NOTHING;


INSERT INTO about_company (
  heading, lead_text,
  intro_heading,
  mission_heading, mission_body
) VALUES (
  'Our Story',
  'A specialist B2B trading partner connecting European industrial suppliers with businesses across Ireland and Spain.',
  'Bridging European Supply Chains',
  'Making European Trade Simpler',
  'We exist to remove friction from B2B trade. Whether that means sourcing the right polymer grade, managing customs documentation, or identifying a more cost-effective packaging format — our mission is to help your business operate more efficiently and profitably across European markets.'
) ON CONFLICT DO NOTHING;


INSERT INTO services (title, slug, icon, summary, order_rank)
VALUES
  ('Plastic Raw Materials',    'plastic-raw-materials',    '♻️', 'High-quality virgin and recycled polymers for manufacturing.',         1),
  ('Packaging Solutions',      'packaging-solutions',      '📦', 'Industrial and commercial packaging materials.',                       2),
  ('Forklift Leasing',         'forklift-leasing',         '🚜', 'Flexible material handling equipment solutions.',                     3),
  ('Consulting Services',      'consulting-services',      '📊', 'Supply chain optimization and market entry strategy.',                 4),
  ('Machinery Representation', 'machinery-representation', '⚙️', 'Connecting Irish and Spanish buyers with European manufacturers.',     5)
ON CONFLICT (slug) DO NOTHING;


-- Note: file_url values below use the current /public/resources/ paths.
-- After uploading PDFs to Supabase Storage (Phase 3), update these
-- to the full Supabase Storage public URLs.
INSERT INTO resources (title, category, description, file_url, file_size, gated, published_at)
VALUES
  (
    'Plastic Raw Materials Overview', 'datasheets',
    'A comprehensive overview of the raw materials, quality standards, and sourcing best practices.',
    '/resources/Plastic Raw Materials Overview.pdf', 4621, false, '2025-03-01T00:00:00Z'
  ),
  (
    'Recycled Polymer Guide', 'datasheets',
    'Breaking down the latest recycled polymer standards and how they affect procurement decisions.',
    '/resources/Recycled Polymer Guide.pdf', 4621, false, '2025-01-01T00:00:00Z'
  ),
  (
    'Packaging Solutions Brochure', 'catalogues',
    'A detailed brochure showcasing our complete line of industrial packaging solutions.',
    '/resources/Packaging Solutions Brochure.pdf', 4588, false, '2024-11-01T00:00:00Z'
  ),
  (
    'Machinery Representation Overview', 'machinery',
    'Quick-reference guide covering our represented machinery brands and technical capabilities.',
    '/resources/Machinery Representation Overview.pdf', 4501, false, '2024-10-01T00:00:00Z'
  ),
  (
    'Supply Chain Consulting Guide', 'consulting',
    'An analysis of demand trends, logistics, and supply chain consulting services.',
    '/resources/Supply Chain Consulting Guide.pdf', 4650, true, '2025-02-01T00:00:00Z'
  ),
  (
    'Sustainability Commitment Statement', 'sustainability',
    'Our commitment to sustainable practices, reducing carbon footprint, and circular economy.',
    '/resources/Sustainability Commitment Statement.pdf', 4402, false, '2024-09-01T00:00:00Z'
  )
ON CONFLICT DO NOTHING;
