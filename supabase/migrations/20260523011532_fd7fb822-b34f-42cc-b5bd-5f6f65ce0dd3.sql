
CREATE OR REPLACE FUNCTION public.analytics_utm_breakdown(
  from_ts timestamptz,
  to_ts timestamptz,
  lim integer DEFAULT 50
)
RETURNS TABLE(
  utm_source text,
  utm_medium text,
  utm_campaign text,
  pageviews bigint,
  unique_visitors bigint,
  unique_sessions bigint,
  bounce_rate numeric,
  avg_duration_ms numeric,
  share_pct numeric
)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
DECLARE
  total bigint;
BEGIN
  IF NOT has_role(auth.uid(), 'admin'::app_role) THEN
    RAISE EXCEPTION 'forbidden';
  END IF;

  SELECT COUNT(*) INTO total
  FROM page_views
  WHERE created_at >= from_ts AND created_at < to_ts;

  RETURN QUERY
  WITH pv AS (
    SELECT
      COALESCE(NULLIF(TRIM(utm_source),''), '(direto)') AS s,
      COALESCE(NULLIF(TRIM(utm_medium),''), '(sem mídia)') AS m,
      COALESCE(NULLIF(TRIM(utm_campaign),''), '(sem campanha)') AS c,
      visitor_id, session_id, duration_ms, is_bounce
    FROM page_views
    WHERE created_at >= from_ts AND created_at < to_ts
  ),
  sess AS (
    SELECT s, m, c, session_id, COUNT(*) AS cnt
    FROM pv GROUP BY s, m, c, session_id
  )
  SELECT
    p.s, p.m, p.c,
    COUNT(*)::bigint AS pageviews,
    COUNT(DISTINCT p.visitor_id)::bigint AS unique_visitors,
    (SELECT COUNT(*) FROM sess x WHERE x.s = p.s AND x.m = p.m AND x.c = p.c)::bigint AS unique_sessions,
    COALESCE(ROUND(
      100.0 * (SELECT COUNT(*) FROM sess x WHERE x.s = p.s AND x.m = p.m AND x.c = p.c AND x.cnt = 1)::numeric
      / NULLIF((SELECT COUNT(*) FROM sess x WHERE x.s = p.s AND x.m = p.m AND x.c = p.c), 0), 2
    ), 0) AS bounce_rate,
    COALESCE(AVG(NULLIF(p.duration_ms,0)), 0) AS avg_duration_ms,
    COALESCE(ROUND(100.0 * COUNT(*)::numeric / NULLIF(total, 0), 2), 0) AS share_pct
  FROM pv p
  GROUP BY p.s, p.m, p.c
  ORDER BY pageviews DESC
  LIMIT lim;
END;
$$;
