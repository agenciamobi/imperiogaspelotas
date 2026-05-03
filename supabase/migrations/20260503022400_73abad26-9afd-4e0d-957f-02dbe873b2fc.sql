CREATE TABLE public.site_integrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  google_ads_id text,
  google_ads_conv_label_whatsapp text,
  google_ads_conv_label_phone text,
  ga4_measurement_id text,
  gtm_id text,
  meta_pixel_id text,
  google_site_verification text,
  bing_site_verification text,
  custom_head_html text,
  custom_body_html text,
  enabled boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.site_integrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read integrations"
  ON public.site_integrations FOR SELECT
  TO public USING (true);

CREATE POLICY "Auth insert integrations"
  ON public.site_integrations FOR INSERT
  TO authenticated WITH CHECK (true);

CREATE POLICY "Auth update integrations"
  ON public.site_integrations FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Auth delete integrations"
  ON public.site_integrations FOR DELETE
  TO authenticated USING (true);

CREATE TRIGGER set_integrations_updated_at
  BEFORE UPDATE ON public.site_integrations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER set_landing_pages_updated_at
  BEFORE UPDATE ON public.landing_pages
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.site_integrations (enabled) VALUES (true);
