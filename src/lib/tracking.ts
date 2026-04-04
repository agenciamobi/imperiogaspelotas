// Google Ads Tracking & UTM Utilities

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

// Google Ads conversion ID placeholder
export const GOOGLE_ADS_ID = "AW-XXXXXXXXXX";
export const CONVERSION_LABEL_WHATSAPP = "XXXXX_whatsapp";
export const CONVERSION_LABEL_PHONE = "XXXXX_phone";

// UTM parameter keys
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid"] as const;
const STORAGE_KEY = "imperio_utm";

export interface UtmParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  gclid?: string;
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
export function trackGoogleAdsConversion(label: string): void {
  if (typeof window.gtag === "function") {
    window.gtag("event", "conversion", {
      send_to: `${GOOGLE_ADS_ID}/${label}`,
    });
  }
}

// Pre-defined event helpers
export const trackWhatsAppClick = (location: string) => {
  trackConversion("whatsapp_click", { event_category: "engagement", event_label: location });
  trackGoogleAdsConversion(CONVERSION_LABEL_WHATSAPP);
};

export const trackPhoneClick = (location: string) => {
  trackConversion("phone_click", { event_category: "engagement", event_label: location });
  trackGoogleAdsConversion(CONVERSION_LABEL_PHONE);
};

export const trackProductClick = (productName: string) => {
  trackConversion("product_click", { event_category: "ecommerce", event_label: productName });
  trackGoogleAdsConversion(CONVERSION_LABEL_WHATSAPP);
};

export const trackCtaClick = (ctaName: string) => {
  trackConversion("cta_click", { event_category: "engagement", event_label: ctaName });
};
