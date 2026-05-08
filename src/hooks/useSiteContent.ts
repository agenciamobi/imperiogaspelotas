import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SITE_CONTENT_DEFAULTS } from "@/lib/site-content-defaults";

const cache = new Map<string, any>();
const listeners = new Map<string, Set<(d: any) => void>>();
let allFetched = false;
let fetchPromise: Promise<void> | null = null;

async function fetchAll() {
  if (fetchPromise) return fetchPromise;
  fetchPromise = (async () => {
    const { data } = await supabase.from("site_content").select("section, data");
    if (data) {
      data.forEach((row: any) => {
        cache.set(row.section, row.data);
        listeners.get(row.section)?.forEach((cb) => cb(row.data));
      });
    }
    allFetched = true;
  })();
  return fetchPromise;
}

export function useSiteContent<T = any>(section: string): T {
  const fallback = SITE_CONTENT_DEFAULTS[section] || {};
  const merged = { ...fallback, ...(cache.get(section) || {}) };
  const [data, setData] = useState<T>(merged as T);

  useEffect(() => {
    let alive = true;
    if (!listeners.has(section)) listeners.set(section, new Set());
    const cb = (d: any) => {
      if (alive) setData({ ...fallback, ...d } as T);
    };
    listeners.get(section)!.add(cb);
    if (!allFetched) {
      fetchAll();
    } else if (cache.has(section)) {
      cb(cache.get(section));
    }
    return () => {
      alive = false;
      listeners.get(section)?.delete(cb);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section]);

  return data;
}

export function invalidateSiteContent() {
  cache.clear();
  allFetched = false;
  fetchPromise = null;
  fetchAll();
}