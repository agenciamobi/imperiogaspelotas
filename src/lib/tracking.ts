// Google Ads Tracking & UTM Utilities

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    fbq?: (...args: unknown[]) => void;
    __imperio_integrations?: SiteIntegrations;
  }
}

export interface SiteIntegrations {
  google_ads_id?: string | null;
  google_ads_conv_label_whatsapp?: string | null;
  google_ads_conv_label_phone?: string | null;
  ga4_measurement_id?: string | null;
  meta_pixel_id?: string | null;
}

const AW_REGEX = /^AW-\d+$/;

function getIntegrations(): SiteIntegrations {
  if (typeof window === "undefined") return {};
  return window.__imperio_integrations || {};
}

// UTM parameter keys
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid", "wbraid", "gbraid", "fbclid"] as const;
const STORAGE_KEY = "imperio_utm";

export interface UtmParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  gclid?: string;
  wbraid?: string;
  gbraid?: string;
  fbclid?: string;
}

/** Capture UTM params from URL and persist in sessionStorage */
export function captureUtmParams(): void {
  try {
    const params = new URLSearchParams(window.location.search);
    const utm: UtmParams = {};
    let hasAny = false;

    for (const key of UTM_KEYS) {
      const val = params.get(key);
      if (val) {
        utm[key] = val;
        hasAny = true;
      }
    }

    if (hasAny) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(utm));
    }
  } catch {
    // silent fail for SSR or privacy mode
  }
}

/** Get stored UTM params */
export function getUtmParams(): UtmParams {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

/** Build a readable UTM summary for WhatsApp messages */
function getUtmSummary(): string {
  const utm = getUtmParams();
  const parts: string[] = [];

  if (utm.utm_source) parts.push(`Origem: ${utm.utm_source}`);
  if (utm.utm_medium) parts.push(`Mídia: ${utm.utm_medium}`);
  if (utm.utm_campaign) parts.push(`Campanha: ${utm.utm_campaign}`);
  if (utm.gclid) parts.push("Via: Google Ads");

  return parts.length > 0 ? `\n[${parts.join(" | ")}]` : "";
}

/** Append UTM tracking info to a WhatsApp link */
export function appendUtmToWhatsAppLink(whatsappUrl: string): string {
  const summary = getUtmSummary();
  if (!summary) return whatsappUrl;

  try {
    const url = new URL(whatsappUrl);
    const currentText = url.searchParams.get("text") || "";
    url.searchParams.set("text", currentText + summary);
    return url.toString();
  } catch {
    return whatsappUrl;
  }
}

/** Track a conversion event via gtag */
export function trackConversion(
  eventName: string,
  params?: Record<string, string | number | boolean>
): void {
  const utm = getUtmParams();

  // Google Ads gtag
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, {
      ...params,
      ...utm,
    });
  }

  // Also push to dataLayer for GTM compatibility
  if (window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...params,
      ...utm,
    });
  }
}

/** Track Google Ads conversion (purchase/lead) */
export function trackGoogleAdsConversion(label?: string | null): void {
  if (!label) return;
  const { google_ads_id } = getIntegrations();
  if (!google_ads_id || !AW_REGEX.test(google_ads_id)) return;
  if (typeof window.gtag !== "function") return;
  window.gtag("event", "conversion", {
    send_to: `${google_ads_id}/${label}`,
  });
}

/** Track Meta Pixel event in parallel */
export function trackMetaPixelEvent(eventName: string, params?: Record<string, unknown>): void {
  const { meta_pixel_id } = getIntegrations();
  if (!meta_pixel_id) return;
  if (typeof window.fbq !== "function") return;
  window.fbq("track", eventName, params || {});
}

// Pre-defined event helpers
export const trackWhatsAppClick = (location: string) => {
  trackConversion("whatsapp_click", { event_category: "engagement", event_label: location });
  trackConversion("generate_lead", { event_category: "lead", event_label: location, method: "whatsapp" });
  trackGoogleAdsConversion(getIntegrations().google_ads_conv_label_whatsapp);
  trackMetaPixelEvent("Lead", { content_name: "WhatsApp Click", source: location });
};

export const trackPhoneClick = (location: string) => {
  trackConversion("phone_click", { event_category: "engagement", event_label: location });
  trackConversion("generate_lead", { event_category: "lead", event_label: location, method: "phone" });
  trackGoogleAdsConversion(getIntegrations().google_ads_conv_label_phone);
  trackMetaPixelEvent("Contact", { content_name: "Phone Click", source: location });
};

export const trackProductClick = (productName: string) => {
  trackConversion("product_click", { event_category: "ecommerce", event_label: productName });
  trackGoogleAdsConversion(getIntegrations().google_ads_conv_label_whatsapp);
  trackMetaPixelEvent("ViewContent", { content_name: productName });
};

export const trackCtaClick = (ctaName: string) => {
  trackConversion("cta_click", { event_category: "engagement", event_label: ctaName });
};
