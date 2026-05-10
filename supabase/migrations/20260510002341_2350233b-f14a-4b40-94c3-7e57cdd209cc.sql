-- Analytics: page_views and pagespeed_cache
CREATE TABLE public.page_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  path text NOT NULL,
  referrer text,
  user_agent text,
  visitor_id text NOT NULL,
  session_id text NOT NULL,
  duration_ms integer DEFAULT 0,
  is_bounce boolean DEFAULT true,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_page_views_created_at ON public.page_views(created_at DESC);
CREATE INDEX idx_page_views_path ON public.page_views(path);
CREATE INDEX idx_page_views_visitor ON public.page_views(visitor_id);
CREATE INDEX idx_page_views_session ON public.page_views(session_id);

ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert pageviews"
ON public.page_views FOR INSERT TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Anyone can update own session pageviews"
ON public.page_views FOR UPDATE TO anon, authenticated
USING (true) WITH CHECK (true);

CREATE POLICY "Admins read pageviews"
ON public.page_views FOR SELECT TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- pagespeed cache
CREATE TABLE public.pagespeed_cache (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL,
  strategy text NOT NULL CHECK (strategy IN ('mobile','desktop')),
  performance integer,
  seo integer,
  accessibility integer,
  best_practices integer,
  lcp_ms numeric,
  inp_ms numeric,
  cls numeric,
  raw jsonb,
  fetched_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (url, strategy)
);

ALTER TABLE public.pagespeed_cache ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins read pagespeed"
ON public.pagespeed_cache FOR SELECT TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Aggregation functions (security definer, admin only)
CREATE OR REPLACE FUNCTION public.analytics_summary(from_ts timestamptz, to_ts timestamptz)
RETURNS TABLE(pageviews bigint, unique_visitors bigint, unique_sessions bigint, bounce_rate numeric, avg_duration_ms numeric)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT has_role(auth.uid(), 'admin'::app_role) THEN
    RAISE EXCEPTION 'forbidden';
  END IF;
  RETURN QUERY
  WITH pv AS (
    SELECT * FROM page_views WHERE created_at >= from_ts AND created_at < to_ts
  ),
  sess AS (
    SELECT session_id, COUNT(*) AS c FROM pv GROUP BY session_id
  )
  SELECT
    (SELECT COUNT(*) FROM pv)::bigint,
    (SELECT COUNT(DISTINCT visitor_id) FROM pv)::bigint,
    (SELECT COUNT(*) FROM sess)::bigint,
    COALESCE(ROUND(100.0 * (SELECT COUNT(*) FROM sess WHERE c = 1)::numeric / NULLIF((SELECT COUNT(*) FROM sess),0), 2), 0),
    COALESCE((SELECT AVG(duration_ms) FROM pv WHERE duration_ms > 0), 0);
END;
$$;

CREATE OR REPLACE FUNCTION public.analytics_timeseries(from_ts timestamptz, to_ts timestamptz)
RETURNS TABLE(day date, pageviews bigint, unique_visitors bigint)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT has_role(auth.uid(), 'admin'::app_role) THEN
    RAISE EXCEPTION 'forbidden';
  END IF;
  RETURN QUERY
  SELECT date_trunc('day', created_at)::date AS day,
         COUNT(*)::bigint AS pageviews,
         COUNT(DISTINCT visitor_id)::bigint AS unique_visitors
  FROM page_views
  WHERE created_at >= from_ts AND created_at < to_ts
  GROUP BY 1 ORDER BY 1;
END;
$$;

CREATE OR REPLACE FUNCTION public.analytics_top_pages(from_ts timestamptz, to_ts timestamptz, lim integer DEFAULT 20)
RETURNS TABLE(path text, pageviews bigint, unique_visitors bigint, avg_duration_ms numeric)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT has_role(auth.uid(), 'admin'::app_role) THEN
    RAISE EXCEPTION 'forbidden';
  END IF;
  RETURN QUERY
  SELECT pv.path,
         COUNT(*)::bigint,
         COUNT(DISTINCT pv.visitor_id)::bigint,
         COALESCE(AVG(NULLIF(pv.duration_ms,0)), 0)
  FROM page_views pv
  WHERE pv.created_at >= from_ts AND pv.created_at < to_ts
  GROUP BY pv.path
  ORDER BY 2 DESC
  LIMIT lim;
END;
$$;