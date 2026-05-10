import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type Period = "today" | "yesterday" | "7d" | "30d";

export function periodRange(p: Period): { from: Date; to: Date } {
  const now = new Date();
  const start = new Date(now); start.setHours(0,0,0,0);
  const end = new Date(start); end.setDate(end.getDate()+1);
  if (p === "today") return { from: start, to: end };
  if (p === "yesterday") {
    const f = new Date(start); f.setDate(f.getDate()-1);
    return { from: f, to: start };
  }
  const days = p === "7d" ? 7 : 30;
  const f = new Date(start); f.setDate(f.getDate()-days+1);
  return { from: f, to: end };
}

export function useTrafficSummary(p: Period) {
  const { from, to } = periodRange(p);
  return useQuery({
    queryKey: ["analytics-summary", p],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("analytics_summary", {
        from_ts: from.toISOString(), to_ts: to.toISOString(),
      });
      if (error) throw error;
      return data?.[0] ?? null;
    },
    refetchInterval: 60_000,
  });
}

export function useTimeseries(p: Period) {
  const { from, to } = periodRange(p);
  return useQuery({
    queryKey: ["analytics-ts", p],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("analytics_timeseries", {
        from_ts: from.toISOString(), to_ts: to.toISOString(),
      });
      if (error) throw error;
      return data ?? [];
    },
  });
}

export function useTopPages(p: Period) {
  const { from, to } = periodRange(p);
  return useQuery({
    queryKey: ["analytics-top", p],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("analytics_top_pages", {
        from_ts: from.toISOString(), to_ts: to.toISOString(), lim: 20,
      });
      if (error) throw error;
      return data ?? [];
    },
  });
}

export function useAllPagespeed() {
  return useQuery({
    queryKey: ["pagespeed-all"],
    queryFn: async () => {
      const { data, error } = await supabase.from("pagespeed_cache").select("*");
      if (error) throw error;
      return data ?? [];
    },
  });
}

export async function runPagespeed(url: string, strategy: "mobile"|"desktop", force = false) {
  const { data, error } = await supabase.functions.invoke("pagespeed-insights", {
    body: { url, strategy, force },
  });
  if (error) throw error;
  return data;
}