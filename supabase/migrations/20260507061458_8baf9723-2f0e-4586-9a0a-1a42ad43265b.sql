ALTER TABLE public.site_integrations
  ADD COLUMN IF NOT EXISTS seo_default_title text,
  ADD COLUMN IF NOT EXISTS seo_default_description text,
  ADD COLUMN IF NOT EXISTS seo_default_keywords text,
  ADD COLUMN IF NOT EXISTS seo_og_image_url text,
  ADD COLUMN IF NOT EXISTS seo_canonical_base text,
  ADD COLUMN IF NOT EXISTS seo_robots text DEFAULT 'index, follow, max-image-preview:large';