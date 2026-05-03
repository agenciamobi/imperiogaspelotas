import { useEffect } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, Phone, ArrowLeft, Clock, MapPin, Flame, Droplets, Truck, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import MobileBar from "@/components/MobileBar";
import { getWhatsAppLink, WHATSAPP_MESSAGES, PHONE_DISPLAY, PHONE_LANDLINE, BUSINESS_HOURS, WHATSAPP_NUMBER } from "@/lib/constants";
import { trackWhatsAppClick, trackPhoneClick, appendUtmToWhatsAppLink } from "@/lib/tracking";
import { motion } from "framer-motion";
import type { PageData } from "@/lib/pages-data";

interface Props {
  page: PageData;
}

const PageTemplate = ({ page }: Props) => {
  useEffect(() => {
    document.title = page.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", page.metaDescription);
    window.scrollTo(0, 0);
  }, [page]);

  const schemaLD = () => {
    if (page.schemaType === "Product") {
      return {
        "@context": "https://schema.org",
        "@type": "Product",
        name: page.h1,
        description: page.metaDescription,
        brand: { "@type": "Brand", name: "Liquigás" },
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          areaServed: { "@type": "Place", name: "Pelotas, RS, Brasil" },
          seller: { "@type": "LocalBusiness", name: "Império Gás e Água", telephone: ["+555399116-2002", "+555332739559"] },
        },
      };
    }
    if (page.schemaType === "FAQPage") {
      return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: page.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      };
    }
    return {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Império Gás e Água",
      description: page.metaDescription,
      telephone: ["+555399116-2002", "+555332739559"],
      address: { "@type": "PostalAddress", addressLocality: "Pelotas", addressRegion: "RS", addressCountry: "BR" },
      openingHours: "Mo-Su 09:00-22:00",
      areaServed: { "@type": "Place", name: "Pelotas, RS, Brasil" },
    };
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-32 sm:pt-44">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary via-primary to-primary/90 py-16 sm:py-20 relative overflow-hidden">
          <div className="texture-business-dark" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Link to="/" className="inline-flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-primary-foreground mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Voltar para a página inicial
              </Link>

              <Badge variant="secondary" className="mb-4">
                <MapPin className="w-3 h-3 mr-1" />
                Pelotas RS
              </Badge>

              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-4 text-primary-foreground">
                {page.h1}
              </h1>

              <p className="text-lg text-primary-foreground/80 max-w-2xl mb-8">
                {page.description}
              </p>

              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg" className="bg-cta hover:bg-cta-hover rounded-full font-bold shadow-lg text-white">
                  <a href={appendUtmToWhatsAppLink(getWhatsAppLink(WHATSAPP_MESSAGES.order))} target="_blank" rel="noopener noreferrer" title={`${page.h1} - Pedir pelo WhatsApp`} onClick={() => trackWhatsAppClick(`page_${page.path}_hero`)}>
                    <MessageCircle className="w-5 h-5" />
                    Pedir pelo WhatsApp
                  </a>
                </Button>
                <Button asChild size="lg" className="bg-white/15 border-2 border-white/40 text-white hover:bg-white/25 rounded-full font-bold">
                  <a href={`tel:+${WHATSAPP_NUMBER}`} title={`Ligar para Império Gás - ${page.h1}`} onClick={() => trackPhoneClick(`page_${page.path}_hero`)}>
                    <Phone className="w-5 h-5" />
                    {PHONE_DISPLAY}
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Info Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid sm:grid-cols-3 gap-6 text-center">
              {[
                { icon: Truck, title: "Entrega Rápida", desc: "Receba em até 60 minutos em todos os bairros de Pelotas RS." },
                { icon: Clock, title: "Horário Estendido", desc: BUSINESS_HOURS },
                { icon: MessageCircle, title: "Peça pelo WhatsApp", desc: "Faça seu pedido sem sair de casa, direto pelo celular." },
              ].map((v, i) => (
                <motion.div key={v.title} className="space-y-3" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <v.icon className="w-8 h-8 text-primary mx-auto" />
                  <h3 className="font-display text-lg font-bold">{v.title}</h3>
                  <p className="text-sm text-muted-foreground">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4 max-w-3xl">
            <motion.h2 className="font-display text-2xl sm:text-3xl font-black text-foreground text-center mb-10" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              Perguntas Frequentes
            </motion.h2>

            <div className="space-y-6" itemScope itemType="https://schema.org/FAQPage">
              {page.faqs.map((faq, i) => (
                <motion.div key={i} className="bg-background rounded-xl p-6 shadow-sm" itemScope itemProp="mainEntity" itemType="https://schema.org/Question" initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <h3 className="font-bold text-foreground mb-2" itemProp="name">{faq.q}</h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-sm text-muted-foreground" itemProp="text">{faq.a}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-16 bg-primary relative overflow-hidden">
          <div className="texture-business-dark" />
          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
              <h2 className="font-display text-2xl sm:text-3xl font-black mb-4 text-primary-foreground">
                Peça Agora — {page.h1}
              </h2>
              <p className="text-primary-foreground/80 mb-6 max-w-lg mx-auto">
                Atendimento {BUSINESS_HOURS.toLowerCase()}. Entrega rápida em Pelotas RS.
              </p>
              <Button asChild size="lg" className="bg-cta hover:bg-cta-hover rounded-full font-bold text-lg px-10 shadow-xl text-white">
                <a href={appendUtmToWhatsAppLink(getWhatsAppLink(WHATSAPP_MESSAGES.order))} target="_blank" rel="noopener noreferrer" title={`${page.h1} - Peça agora pelo WhatsApp`} onClick={() => trackWhatsAppClick(`page_${page.path}_cta_final`)}>
                  <MessageCircle className="w-5 h-5" />
                  Pedir pelo WhatsApp
                </a>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* JSON-LD */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLD()) }} />
      </main>

      <Footer />
      <WhatsAppFloat />
      <MobileBar />
    </div>
  );
};

export default PageTemplate;
