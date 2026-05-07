import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { SiteIntegrations } from "@/lib/tracking";

const AW_REGEX = /^AW-\d+$/;
const GA4_REGEX = /^G-[A-Z0-9]+$/;
const GTM_REGEX = /^GTM-[A-Z0-9]+$/;
const PIXEL_REGEX = /^\d{6,}$/;

interface IntegrationsRow extends SiteIntegrations {
  gtm_id?: string | null;
  google_site_verification?: string | null;
  bing_site_verification?: string | null;
  custom_head_html?: string | null;
  custom_body_html?: string | null;
  enabled?: boolean | null;
  seo_default_title?: string | null;
  seo_default_description?: string | null;
  seo_default_keywords?: string | null;
  seo_og_image_url?: string | null;
  seo_canonical_base?: string | null;
  seo_robots?: string | null;
}

function appendScript(id: string, attrs: Record<string, string>, body?: string): HTMLScriptElement {
  const existing = document.getElementById(id);
  if (existing) return existing as HTMLScriptElement;
  const s = document.createElement("script");
  s.id = id;
  Object.entries(attrs).forEach(([k, v]) => s.setAttribute(k, v));
  if (body) s.text = body;
  document.head.appendChild(s);
  return s;
}

function appendMeta(id: string, name: string, content: string) {
  if (!content) return;
  const existing = document.getElementById(id);
  if (existing) {
    existing.setAttribute("content", content);
    return;
  }
  const m = document.createElement("meta");
  m.id = id;
  m.setAttribute("name", name);
  m.setAttribute("content", content);
  document.head.appendChild(m);
}

export default function TrackingScripts() {
  const [data, setData] = useState<IntegrationsRow | null>(null);

  useEffect(() => {
    supabase
      .from("site_integrations")
      .select("*")
      .limit(1)
      .maybeSingle()
      .then(({ data }) => {
        if (data) setData(data as IntegrationsRow);
      });
  }, []);

  useEffect(() => {
    if (!data || data.enabled === false) return;

    // SEO meta tags overrides
    const setMeta = (selector: string, attr: string, value: string) => {
      if (!value) return;
      const el = document.querySelector(selector);
      if (el) el.setAttribute(attr, value);
    };
    if (data.seo_default_title) {
      // Only override if current title still matches initial (avoid clobbering page-specific titles)
      if (!document.title || document.title.includes("Império")) {
        document.title = data.seo_default_title;
      }
      setMeta('meta[property="og:title"]', "content", data.seo_default_title);
      setMeta('meta[name="twitter:title"]', "content", data.seo_default_title);
    }
    if (data.seo_default_description) {
      setMeta('meta[name="description"]', "content", data.seo_default_description);
      setMeta('meta[property="og:description"]', "content", data.seo_default_description);
      setMeta('meta[name="twitter:description"]', "content", data.seo_default_description);
    }
    if (data.seo_default_keywords) {
      setMeta('meta[name="keywords"]', "content", data.seo_default_keywords);
    }
    if (data.seo_og_image_url) {
      setMeta('meta[property="og:image"]', "content", data.seo_og_image_url);
      setMeta('meta[name="twitter:image"]', "content", data.seo_og_image_url);
    }
    if (data.seo_robots) {
      setMeta('meta[name="robots"]', "content", data.seo_robots);
    }

    // Expose for tracking.ts
    window.__imperio_integrations = {
      google_ads_id: data.google_ads_id,
      google_ads_conv_label_whatsapp: data.google_ads_conv_label_whatsapp,
      google_ads_conv_label_phone: data.google_ads_conv_label_phone,
      ga4_measurement_id: data.ga4_measurement_id,
      meta_pixel_id: data.meta_pixel_id,
    };

    const adsValid = data.google_ads_id && AW_REGEX.test(data.google_ads_id);
    const ga4Valid = data.ga4_measurement_id && GA4_REGEX.test(data.ga4_measurement_id);
    const gtmValid = data.gtm_id && GTM_REGEX.test(data.gtm_id);
    const pixelValid = data.meta_pixel_id && PIXEL_REGEX.test(data.meta_pixel_id);

    // gtag.js (Google Ads + GA4 share the same loader)
    if (adsValid || ga4Valid) {
      const primaryId = data.google_ads_id && adsValid ? data.google_ads_id : data.ga4_measurement_id!;
      appendScript("gtag-loader", {
        async: "true",
        src: `https://www.googletagmanager.com/gtag/js?id=${primaryId}`,
      });
      appendScript(
        "gtag-init",
        {},
        `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
${adsValid ? `gtag('config', '${data.google_ads_id}');` : ""}
${ga4Valid ? `gtag('config', '${data.ga4_measurement_id}');` : ""}`
      );
    }

    // Google Tag Manager
    if (gtmValid) {
      appendScript(
        "gtm-init",
        {},
        `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${data.gtm_id}');`
      );
      // GTM noscript fallback
      if (!document.getElementById("gtm-noscript")) {
        const ns = document.createElement("noscript");
        ns.id = "gtm-noscript";
        ns.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${data.gtm_id}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
        document.body.insertBefore(ns, document.body.firstChild);
      }
    }

    // Meta Pixel
    if (pixelValid) {
      appendScript(
        "fb-pixel-init",
        {},
        `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${data.meta_pixel_id}');
fbq('track', 'PageView');`
      );
      if (!document.getElementById("fb-pixel-noscript")) {
        const ns = document.createElement("noscript");
        ns.id = "fb-pixel-noscript";
        ns.innerHTML = `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${data.meta_pixel_id}&ev=PageView&noscript=1" alt="" />`;
        document.body.appendChild(ns);
      }
    }

    // Site verification meta tags
    if (data.google_site_verification) {
      appendMeta("meta-google-verify", "google-site-verification", data.google_site_verification);
    }
    if (data.bing_site_verification) {
      appendMeta("meta-bing-verify", "msvalidate.01", data.bing_site_verification);
    }

    // Custom head HTML (admin-trusted)
    if (data.custom_head_html && !document.getElementById("custom-head-html")) {
      const wrap = document.createElement("div");
      wrap.id = "custom-head-html";
      wrap.style.display = "none";
      wrap.innerHTML = data.custom_head_html;
      // Move scripts so they execute
      Array.from(wrap.querySelectorAll("script")).forEach((old) => {
        const s = document.createElement("script");
        Array.from(old.attributes).forEach((a) => s.setAttribute(a.name, a.value));
        s.text = old.text;
        document.head.appendChild(s);
      });
      document.head.appendChild(wrap);
    }

    // Custom body HTML
    if (data.custom_body_html && !document.getElementById("custom-body-html")) {
      const wrap = document.createElement("div");
      wrap.id = "custom-body-html";
      wrap.style.display = "none";
      wrap.innerHTML = data.custom_body_html;
      Array.from(wrap.querySelectorAll("script")).forEach((old) => {
        const s = document.createElement("script");
        Array.from(old.attributes).forEach((a) => s.setAttribute(a.name, a.value));
        s.text = old.text;
        document.body.appendChild(s);
      });
      document.body.appendChild(wrap);
    }
  }, [data]);

  return null;
}