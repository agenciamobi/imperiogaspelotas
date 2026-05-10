import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const CACHE_HOURS = 6;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const auth = req.headers.get("Authorization");
    if (!auth) return json({ error: "unauthorized" }, 401);

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: auth } } }
    );

    const { data: userData } = await supabase.auth.getUser();
    if (!userData?.user) return json({ error: "unauthorized" }, 401);

    const { data: roleRow } = await supabase
      .from("user_roles").select("role").eq("user_id", userData.user.id).eq("role", "admin").maybeSingle();
    if (!roleRow) return json({ error: "forbidden" }, 403);

    const body = await req.json().catch(() => ({}));
    const url: string = body.url;
    const strategy: string = body.strategy === "desktop" ? "desktop" : "mobile";
    const force: boolean = !!body.force;
    if (!url || !/^https?:\/\//.test(url)) return json({ error: "invalid url" }, 400);

    const admin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    if (!force) {
      const { data: cached } = await admin
        .from("pagespeed_cache")
        .select("*")
        .eq("url", url).eq("strategy", strategy).maybeSingle();
      if (cached) {
        const ageH = (Date.now() - new Date(cached.fetched_at).getTime()) / 36e5;
        if (ageH < CACHE_HOURS) return json({ ...cached, cached: true });
      }
    }

    const apiKey = Deno.env.get("PAGESPEED_API_KEY") || "";
    const params = new URLSearchParams({ url, strategy });
    ["performance","seo","accessibility","best-practices"].forEach(c => params.append("category", c));
    if (apiKey) params.set("key", apiKey);

    const psiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?${params}`;
    const r = await fetch(psiUrl);
    if (!r.ok) {
      const text = await r.text();
      return json({ error: `PSI ${r.status}`, details: text.slice(0, 500) }, 502);
    }
    const psi = await r.json();
    const cats = psi.lighthouseResult?.categories || {};
    const audits = psi.lighthouseResult?.audits || {};
    const score = (k: string) => cats[k]?.score != null ? Math.round(cats[k].score * 100) : null;
    const row = {
      url, strategy,
      performance: score("performance"),
      seo: score("seo"),
      accessibility: score("accessibility"),
      best_practices: score("best-practices"),
      lcp_ms: audits["largest-contentful-paint"]?.numericValue ?? null,
      inp_ms: audits["interaction-to-next-paint"]?.numericValue ?? audits["max-potential-fid"]?.numericValue ?? null,
      cls: audits["cumulative-layout-shift"]?.numericValue ?? null,
      raw: { categories: cats },
      fetched_at: new Date().toISOString(),
    };
    const { data: upserted, error } = await admin
      .from("pagespeed_cache")
      .upsert(row, { onConflict: "url,strategy" })
      .select().single();
    if (error) return json({ error: error.message }, 500);
    return json({ ...upserted, cached: false });
  } catch (e) {
    return json({ error: (e as Error).message }, 500);
  }
});

function json(b: unknown, status = 200) {
  return new Response(JSON.stringify(b), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}