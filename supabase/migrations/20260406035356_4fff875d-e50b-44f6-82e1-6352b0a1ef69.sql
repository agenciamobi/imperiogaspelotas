
CREATE TABLE public.lp_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  landing_page_id uuid REFERENCES public.landing_pages(id) ON DELETE CASCADE NOT NULL,
  event_type text NOT NULL,
  source text,
  utm_source text,
  utm_campaign text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.lp_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert events" ON public.lp_events FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Authenticated can read events" ON public.lp_events FOR SELECT TO authenticated USING (true);

CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.landing_pages
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
