import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, MessageCircle, Truck, Shield, Clock, Star, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { WHATSAPP_NUMBER, PHONE_DISPLAY, PHONE_LANDLINE, getWhatsAppLink } from "@/lib/constants";
import { trackWhatsAppClick, trackPhoneClick, appendUtmToWhatsAppLink } from "@/lib/tracking";
import type { Tables } from "@/integrations/supabase/types";

type LandingPage = Tables<"landing_pages">;

interface TrustItem {
  icon: string;
  title: string;
  description: string;
}

interface Testimonial {
  name: string;
  text: string;
  rating: number;
}

const iconMap: Record<string, React.ReactNode> = {
  truck: <Truck className="w-8 h-8" />,
  shield: <Shield className="w-8 h-8" />,
  clock: <Clock className="w-8 h-8" />,
  star: <Star className="w-8 h-8" />,
};

export default function LandingPromo() {
  const { slug = "promo" } = useParams();
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState<LandingPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    supabase
      .from("landing_pages")
      .select("*")
      .eq("slug", slug)
      .eq("is_active", true)
      .single()
      .then(({ data }) => {
        setPage(data);
        setLoading(false);
      });
  }, [slug]);

  // Set document title
  useEffect(() => {
    if (page?.meta_title) {
      document.title = page.meta_title;
    }
    if (page?.meta_description) {
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute("content", page.meta_description);
    }
    if (page?.bg_color) {
      const themeMeta = document.querySelector('meta[name="theme-color"]');
      if (themeMeta) themeMeta.setAttribute("content", page.bg_color);
    }
  }, [page?.meta_title, page?.meta_description, page?.bg_color]);

  // Countdown timer
  useEffect(() => {
    if (!page?.offer_valid_until) return;
    const target = new Date(page.offer_valid_until).getTime();
    const interval = setInterval(() => {
      const now = Date.now();
      const diff = target - now;
      if (diff <= 0) {
        setCountdown("Oferta encerrada");
        clearInterval(interval);
        return;
      }
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setCountdown(`${h}h ${m}m ${s}s`);
    }, 1000);
    return () => clearInterval(interval);
  }, [page?.offer_valid_until]);

  const trackEvent = (eventType: string, source: string) => {
    if (!page) return;
    supabase.from("lp_events").insert({
      landing_page_id: page.id,
      event_type: eventType,
      source,
      utm_source: searchParams.get("utm_source") || sessionStorage.getItem("utm_source") || null,
      utm_campaign: searchParams.get("utm_campaign") || sessionStorage.getItem("utm_campaign") || null,
    }).then(() => {});
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white" />
      </div>
    );
  }

  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary text-primary-foreground">
        <p className="text-xl">Página não encontrada</p>
      </div>
    );
  }

  const trustItems = (page.trust_items as unknown as TrustItem[]) || [];
  const testimonials = (page.testimonials as unknown as Testimonial[]) || [];
  const waLink = appendUtmToWhatsAppLink(getWhatsAppLink(page.whatsapp_message || undefined));

  const handleWhatsApp = (source: string) => {
    trackWhatsAppClick("landing_promo");
    trackEvent("whatsapp_click", source);
    window.open(waLink, "_blank");
  };

  const handlePhone = (source: string) => {
    trackPhoneClick("landing_promo");
    trackEvent("phone_click", source);
    window.location.href = `tel:+55${WHATSAPP_NUMBER}`;
  };

  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section
          className="relative min-h-[80vh] flex items-center justify-center text-center px-4 py-16"
          style={{
            background: `linear-gradient(135deg, ${page.bg_color || "hsl(var(--primary))"} 0%, ${page.bg_color || "hsl(var(--primary))"}cc 100%)`,
          }}
        >
          {page.hero_image_url && (
            <img
              src={page.hero_image_url}
              alt=""
              fetchPriority="high"
              loading="eager"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover opacity-20"
            />
          )}
          <div className="relative z-10 max-w-3xl mx-auto">
            {page.hero_badge && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-block bg-cta text-white px-6 py-2 rounded-full text-sm font-bold mb-6 animate-pulse"
              >
                {page.hero_badge}
              </motion.div>
            )}

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6"
            >
              {page.hero_title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto"
            >
              {page.hero_subtitle}
            </motion.p>

            {/* Main CTA */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <button
                onClick={() => handleWhatsApp("hero")}
                className="w-full sm:w-auto bg-cta hover:bg-cta-hover text-white font-bold text-lg md:text-xl px-10 py-5 rounded-xl shadow-2xl transition-all hover:scale-105 flex items-center justify-center gap-3 mx-auto"
              >
                <MessageCircle className="w-7 h-7" />
                {page.offer_cta_text}
              </button>

              <button
                onClick={() => handlePhone("hero")}
                className="w-full sm:w-auto bg-white/15 border-2 border-white/40 text-white font-semibold text-base px-8 py-3 rounded-xl hover:bg-white/25 transition-all flex items-center justify-center gap-2 mx-auto"
              >
                <Phone className="w-5 h-5" />
                {page.phone_cta_text} — {PHONE_DISPLAY}
              </button>
            </motion.div>

            {/* Countdown */}
            {countdown && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-6 text-white/80 text-sm"
              >
                ⏰ Oferta termina em: <span className="font-bold text-cta text-base">{countdown}</span>
              </motion.div>
            )}
          </div>
        </section>

        {/* Trust Items */}
        {trustItems.length > 0 && (
          <section className="py-12 bg-accent">
            <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
              {trustItems.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center p-4"
                >
                  <div className="text-primary mx-auto mb-2 flex justify-center">
                    {iconMap[item.icon] || <CheckCircle className="w-8 h-8" />}
                  </div>
                  <h3 className="font-bold text-foreground text-sm md:text-base">{item.title}</h3>
                  <p className="text-muted-foreground text-xs md:text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Offer Section */}
        <section className="py-16 bg-background">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-4xl font-extrabold text-foreground mb-4">
                {page.offer_title}
              </h2>
              <p className="text-muted-foreground text-lg mb-8">{page.offer_description}</p>

              {(page.offer_price || page.offer_original_price) && (
                <div className="mb-8">
                  {page.offer_original_price && (
                    <p className="text-muted-foreground line-through text-lg">
                      De: {page.offer_original_price}
                    </p>
                  )}
                  {page.offer_price && (
                    <p className="text-4xl md:text-5xl font-extrabold text-primary">
                      {page.offer_price}
                    </p>
                  )}
                </div>
              )}

              <button
                onClick={() => handleWhatsApp("offer")}
                className="bg-cta hover:bg-cta-hover text-white font-bold text-lg px-10 py-5 rounded-xl shadow-xl transition-all hover:scale-105 flex items-center justify-center gap-3 mx-auto"
              >
                <MessageCircle className="w-6 h-6" />
                {page.offer_cta_text}
              </button>
            </motion.div>
          </div>
        </section>

        {/* Testimonials */}
        {testimonials.length > 0 && (
          <section className="py-16 bg-accent">
            <div className="max-w-4xl mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-extrabold text-center text-foreground mb-10">
                O que nossos clientes dizem
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {testimonials.map((t, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-card rounded-xl p-6 shadow-md"
                  >
                    <div className="flex gap-1 mb-3">
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <Star key={j} className="w-4 h-4 fill-cta text-cta" />
                      ))}
                    </div>
                    <p className="text-foreground italic mb-3">"{t.text}"</p>
                    <p className="text-sm font-semibold text-muted-foreground">— {t.name}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Final CTA */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-4">
              Não perca esta oportunidade!
            </h2>
            <p className="text-primary-foreground/80 mb-8 text-lg">
              Peça agora e receba na sua porta em até 60 minutos.
            </p>
            <div className="space-y-4">
              <button
                onClick={() => handleWhatsApp("final_cta")}
                className="w-full sm:w-auto bg-cta hover:bg-cta-hover text-white font-bold text-lg px-10 py-5 rounded-xl shadow-2xl transition-all hover:scale-105 flex items-center justify-center gap-3 mx-auto"
              >
                <MessageCircle className="w-7 h-7" />
                {page.offer_cta_text}
              </button>
              <p className="text-primary-foreground/60 text-sm">
                Ou ligue: <a href={`tel:+55${WHATSAPP_NUMBER}`} className="underline">{PHONE_DISPLAY}</a> | <a href="tel:+555332739559" className="underline">{PHONE_LANDLINE}</a>
              </p>
            </div>
          </div>
        </section>

        {/* Minimal footer */}
        <footer className="py-6 bg-foreground text-background text-center text-sm">
          <p>© {new Date().getFullYear()} Império Gás e Água — Pelotas RS</p>
          <p className="mt-1 opacity-60">Revenda Autorizada</p>
        </footer>
      </div>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: page.hero_title,
            description: page.meta_description,
            brand: { "@type": "Brand", name: "Liquigás" },
            offers: {
              "@type": "Offer",
              priceCurrency: "BRL",
              availability: "https://schema.org/InStock",
              seller: {
                "@type": "LocalBusiness",
                name: "Império Gás e Água",
                telephone: "+5553991162002",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Pelotas",
                  addressRegion: "RS",
                  addressCountry: "BR",
                },
              },
            },
          }),
        }}
      />
    </>
  );
}
