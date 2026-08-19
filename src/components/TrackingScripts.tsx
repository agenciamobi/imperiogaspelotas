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
  const script = document.createElement("script");
  script.id = id;
  Object.entries(attrs).forEach(([key, value]) => script.setAttribute(key, value));
  if (body) script.text = body;
  document.head.appendChild(script);
  return script;
}

function appendMeta(id: string, name: string, content: string) {
  if (!content) return;
  const existing = document.getElementById(id);
  if (existing) {
    existing.setAttribute("content", content);
    return;
  }
  const meta = document.createElement("meta");
  meta.id = id;
  meta.setAttribute("name", name);
  meta.setAttribute("content", content);
  document.head.appendChild(meta);
}

function setMeta(selector: string, attr: string, value?: string | null) {
  if (!value) return;
  const element = document.querySelector(selector);
  if (element) element.setAttribute(attr, value);
}

function setCanonical(url?: string | null) {
  if (!url) return;
  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.appendChild(canonical);
  }
  canonical.href = url.replace(/\/$/, "") + "/";
  setMeta('meta[property="og:url"]', "content", canonical.href);
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

    // SEO defaults are homepage-only. Internal routes own their metadata and robots,
    // so an admin default must never overwrite product, bairro or 404 directives.
    const isHomePage = window.location.pathname === "/" || window.location.pathname === "";

    if (isHomePage) {
      if (data.seo_default_title) {
        document.title = data.seo_default_title;
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
      if (data.seo_robots) {
        setMeta('meta[name="robots"]', "content", data.seo_robots);
      }
      if (data.seo_canonical_base) {
        setCanonical(data.seo_canonical_base);
      }
    }

    if (data.seo_og_image_url) {
      setMeta('meta[property="og:image"]', "content", data.seo_og_image_url);
      setMeta('meta[name="twitter:image"]', "content", data.seo_og_image_url);
    }

    window.__imperio_integrations = {
      google_ads_id: data.google_ads_id,
      google_ads_conv_label_whatsapp: data.google_ads_conv_label_whatsapp,
      google_ads_conv_label_phone: data.google_ads_conv_label_phone,
      ga4_measurement_id: data.ga4_measurement_id,
      meta_pixel_id: data.meta_pixel_id,
    };

    const adsValid = Boolean(data.google_ads_id && AW_REGEX.test(data.google_ads_id));
    const ga4Valid = Boolean(data.ga4_measurement_id && GA4_REGEX.test(data.ga4_measurement_id));
    const gtmValid = Boolean(data.gtm_id && GTM_REGEX.test(data.gtm_id));
    const pixelValid = Boolean(data.meta_pixel_id && PIXEL_REGEX.test(data.meta_pixel_id));

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
${ga4Valid ? `gtag('config', '${data.ga4_measurement_id}');` : ""}`,
      );
    }

    if (gtmValid) {
      appendScript(
        "gtm-init",
        {},
        `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${data.gtm_id}');`,
      );
      if (!document.getElementById("gtm-noscript")) {
        const noscript = document.createElement("noscript");
        noscript.id = "gtm-noscript";
        noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${data.gtm_id}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
        document.body.insertBefore(noscript, document.body.firstChild);
      }
    }

    if (pixelValid) {
      appendScript(
        "fb-pixel-init",
        {},
        `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${data.meta_pixel_id}');
fbq('track', 'PageView');`,
      );
      if (!document.getElementById("fb-pixel-noscript")) {
        const noscript = document.createElement("noscript");
        noscript.id = "fb-pixel-noscript";
        noscript.innerHTML = `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${data.meta_pixel_id}&ev=PageView&noscript=1" alt="" />`;
        document.body.appendChild(noscript);
      }
    }

    if (data.google_site_verification) {
      appendMeta("meta-google-verify", "google-site-verification", data.google_site_verification);
    }
    if (data.bing_site_verification) {
      appendMeta("meta-bing-verify", "msvalidate.01", data.bing_site_verification);
    }

    if (data.custom_head_html && !document.getElementById("custom-head-html")) {
      const wrapper = document.createElement("div");
      wrapper.id = "custom-head-html";
      wrapper.style.display = "none";
      wrapper.innerHTML = data.custom_head_html;
      Array.from(wrapper.querySelectorAll("script")).forEach((oldScript) => {
        const script = document.createElement("script");
        Array.from(oldScript.attributes).forEach((attribute) => script.setAttribute(attribute.name, attribute.value));
        script.text = oldScript.text;
        document.head.appendChild(script);
      });
      document.head.appendChild(wrapper);
    }

    if (data.custom_body_html && !document.getElementById("custom-body-html")) {
      const wrapper = document.createElement("div");
      wrapper.id = "custom-body-html";
      wrapper.style.display = "none";
      wrapper.innerHTML = data.custom_body_html;
      Array.from(wrapper.querySelectorAll("script")).forEach((oldScript) => {
        const script = document.createElement("script");
        Array.from(oldScript.attributes).forEach((attribute) => script.setAttribute(attribute.name, attribute.value));
        script.text = oldScript.text;
        document.body.appendChild(script);
      });
      document.body.appendChild(wrapper);
    }
  }, [data]);

  return null;
}
