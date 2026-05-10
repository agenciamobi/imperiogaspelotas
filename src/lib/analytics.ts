import { supabase } from "@/integrations/supabase/client";

const VID_KEY = "imperio_vid";
const SID_KEY = "imperio_sid";
const SID_TS_KEY = "imperio_sid_ts";
const SESSION_TIMEOUT_MS = 30 * 60 * 1000;
const BOT_RE = /bot|crawler|spider|crawling|preview|lighthouse|headless/i;

let isAdminCache: boolean | null = null;
let currentPageviewId: string | null = null;
let currentPageviewStart = 0;

function uuid(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function getVisitorId(): string {
  let v = localStorage.getItem(VID_KEY);
  if (!v) { v = uuid(); localStorage.setItem(VID_KEY, v); }
  return v;
}

function getSessionId(): string {
  const now = Date.now();
  const last = Number(sessionStorage.getItem(SID_TS_KEY) || 0);
  let sid = sessionStorage.getItem(SID_KEY);
  if (!sid || now - last > SESSION_TIMEOUT_MS) {
    sid = uuid();
    sessionStorage.setItem(SID_KEY, sid);
  }
  sessionStorage.setItem(SID_TS_KEY, String(now));
  return sid;
}

async function checkIsAdmin(): Promise<boolean> {
  if (isAdminCache !== null) return isAdminCache;
  try {
    const { data: s } = await supabase.auth.getSession();
    if (!s.session?.user) { isAdminCache = false; return false; }
    const { data } = await supabase
      .from("user_roles").select("role").eq("user_id", s.session.user.id).eq("role", "admin").maybeSingle();
    isAdminCache = !!data;
    return isAdminCache;
  } catch { return false; }
}

supabase.auth.onAuthStateChange(() => { isAdminCache = null; });

function readUtm() {
  try {
    const raw = sessionStorage.getItem("imperio_utm");
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

export async function trackPageview(path: string) {
  if (typeof window === "undefined") return;
  if (path.startsWith("/admin")) return;
  if (BOT_RE.test(navigator.userAgent)) return;
  if (await checkIsAdmin()) return;

  // flush previous duration
  flushDuration();

  const utm = readUtm();
  const visitor_id = getVisitorId();
  const session_id = getSessionId();

  const { data, error } = await supabase
    .from("page_views")
    .insert({
      path,
      referrer: document.referrer || null,
      user_agent: navigator.userAgent,
      visitor_id,
      session_id,
      utm_source: utm.utm_source || null,
      utm_medium: utm.utm_medium || null,
      utm_campaign: utm.utm_campaign || null,
    })
    .select("id").single();

  if (!error && data) {
    currentPageviewId = data.id;
    currentPageviewStart = Date.now();
  }
}

export function flushDuration() {
  if (!currentPageviewId || !currentPageviewStart) return;
  const ms = Date.now() - currentPageviewStart;
  const id = currentPageviewId;
  currentPageviewId = null;
  currentPageviewStart = 0;
  // fire and forget
  supabase.from("page_views").update({ duration_ms: ms }).eq("id", id).then(() => {});
}

if (typeof window !== "undefined") {
  window.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") flushDuration();
  });
  window.addEventListener("beforeunload", () => flushDuration());
}