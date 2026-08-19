import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Clock, MapPin, MessageCircle, Phone, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import MobileBar from "@/components/MobileBar";
import {
  BUSINESS_HOURS,
  BUSINESS_NAME,
  PHONE_DISPLAY,
  PHONE_LANDLINE,
  SITE_URL,
  WHATSAPP_MESSAGES,
  WHATSAPP_NUMBER,
  getWhatsAppLink,
} from "@/lib/constants";
import { appendUtmToWhatsAppLink, trackPhoneClick, trackWhatsAppClick } from "@/lib/tracking";
import { motion } from "framer-motion";
import type { PageData } from "@/lib/pages-data";
import { resolveSeoPage } from "@/lib/seo-page-content";

interface Props {
  page: PageData;
}

const PageTemplate = ({ page }: Props) => {
  const seoPage = resolveSeoPage(page);

  useEffect(() => {
    document.title = seoPage.title;
    const url = `${SITE_URL}${seoPage.path}`;

    const setMeta = (selector: string, attribute: string, value: string) => {
      let element = document.querySelector(selector) as HTMLMetaElement | HTMLLinkElement | null;

      if (!element) {
        if (selector.startsWith("link")) {
          element = document.createElement("link");
          (element as HTMLLinkElement).rel = "canonical";
        } else {
          element = document.createElement("meta");
          const match = selector.match(/\[(.+?)="(.+?)"\]/);
          if (match) (element as HTMLMetaElement).setAttribute(match[1], match[2]);
        }
        document.head.appendChild(element);
      }

      element.setAttribute(attribute, value);
    };

    setMeta('meta[name="description"]', "content", seoPage.metaDescription);
    setMeta('meta[name="robots"]', "content", "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1");
    setMeta('link[rel="canonical"]', "href", url);
    setMeta('meta[property="og:type"]', "content", "website");
    setMeta('meta[property="og:url"]', "content", url);
    setMeta('meta[property="og:title"]', "content", seoPage.title);
    setMeta('meta[property="og:description"]', "content", seoPage.metaDescription);
    setMeta('meta[name="twitter:title"]', "content", seoPage.title);
    setMeta('meta[name="twitter:description"]', "content", seoPage.metaDescription);

    window.scrollTo(0, 0);
  }, [page, seoPage.metaDescription, seoPage.path, seoPage.title]);

  const pageUrl = `${SITE_URL}${seoPage.path}`;
  const organizationId = `${SITE_URL}/#organization`;
  const webSiteId = `${SITE_URL}/#website`;
  const webPageId = `${pageUrl}#webpage`;

  const mainEntity =
    seoPage.schemaType === "Product"
      ? {
          "@type": "Product",
          "@id": `${pageUrl}#product`,
          name: seoPage.h1,
          description: seoPage.metaDescription,
          url: pageUrl,
          category: seoPage.slug === "agua-mineral-20l" ? "Água mineral" : "Botijão de GLP",
        }
      : seoPage.schemaType === "Service"
        ? {
            "@type": "Service",
            "@id": `${pageUrl}#service`,
            name: seoPage.h1,
            description: seoPage.metaDescription,
            url: pageUrl,
            provider: { "@id": organizationId },
            areaServed: {
              "@type": "City",
              name: "Pelotas",
              containedInPlace: {
                "@type": "State",
                name: "Rio Grande do Sul",
              },
            },
          }
        : null;

  const schemaGraph: Record<string, unknown>[] = [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: BUSINESS_NAME,
      url: `${SITE_URL}/`,
      telephone: [PHONE_DISPLAY, PHONE_LANDLINE],
      areaServed: {
        "@type": "City",
        name: "Pelotas",
      },
    },
    {
      "@type": "WebSite",
      "@id": webSiteId,
      url: `${SITE_URL}/`,
      name: BUSINESS_NAME,
      inLanguage: "pt-BR",
      publisher: { "@id": organizationId },
    },
    {
      "@type": seoPage.schemaType === "ContactPage" ? "ContactPage" : "WebPage",
      "@id": webPageId,
      url: pageUrl,
      name: seoPage.title,
      description: seoPage.metaDescription,
      inLanguage: "pt-BR",
      isPartOf: { "@id": webSiteId },
      about: { "@id": organizationId },
      ...(mainEntity ? { mainEntity: { "@id": mainEntity["@id"] } } : {}),
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Início",
          item: `${SITE_URL}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: seoPage.h1,
          item: pageUrl,
        },
      ],
    },
  ];

  if (mainEntity) schemaGraph.push(mainEntity);

  if (seoPage.faqs.length > 0) {
    schemaGraph.push({
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      mainEntity: seoPage.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.a,
        },
      })),
    });
  }

  const schemaLD = {
    "@context": "https://schema.org",
    "@graph": schemaGraph,
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-32 sm:pt-44">
        <section className="bg-gradient-to-br from-primary via-primary to-primary/90 py-16 sm:py-20 relative overflow-hidden">
          <div className="texture-business-dark" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-sm text-primary-foreground/70">
                <Link to="/" className="inline-flex items-center gap-2 hover:text-primary-foreground transition-colors">
                  <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                  Início
                </Link>
                <span aria-hidden="true">/</span>
                <span aria-current="page" className="text-primary-foreground/90">{seoPage.h1}</span>
              </nav>

              <Badge variant="secondary" className="mb-4">
                <MapPin className="w-3 h-3 mr-1" aria-hidden="true" />
                Pelotas RS
              </Badge>

              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-4 text-primary-foreground">
                {seoPage.h1}
              </h1>

              <p className="text-lg text-primary-foreground/80 max-w-3xl mb-8 leading-8">
                {seoPage.description}
              </p>

              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg" className="bg-cta hover:bg-cta-hover rounded-full font-bold shadow-lg text-white">
                  <a
                    href={appendUtmToWhatsAppLink(getWhatsAppLink(WHATSAPP_MESSAGES.order))}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${seoPage.h1}: pedir pelo WhatsApp`}
                    onClick={() => trackWhatsAppClick(`page_${seoPage.slug}_hero`)}
                  >
                    <MessageCircle className="w-5 h-5" aria-hidden="true" />
                    Pedir pelo WhatsApp
                  </a>
                </Button>
                <Button asChild size="lg" className="bg-white/15 border-2 border-white/40 text-white hover:bg-white/25 rounded-full font-bold">
                  <a
                    href={`tel:+${WHATSAPP_NUMBER}`}
                    aria-label={`${seoPage.h1}: ligar para ${BUSINESS_NAME}`}
                    onClick={() => trackPhoneClick(`page_${seoPage.slug}_hero`)}
                  >
                    <Phone className="w-5 h-5" aria-hidden="true" />
                    {PHONE_DISPLAY}
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-14 sm:py-16" aria-label="Informações de atendimento">
          <div className="container mx-auto px-4">
            <div className="grid sm:grid-cols-3 gap-6 text-center">
              {[
                {
                  icon: Truck,
                  title: "Atendimento em Pelotas",
                  desc: "Informe seu endereço para confirmar cobertura, disponibilidade e prazo.",
                },
                {
                  icon: Clock,
                  title: "Horário de atendimento",
                  desc: BUSINESS_HOURS,
                },
                {
                  icon: MessageCircle,
                  title: "Pedido direto",
                  desc: "Faça a consulta pelo WhatsApp ou telefone e confirme os dados antes da entrega.",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  className="space-y-3 rounded-2xl border border-border bg-card p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                >
                  <item.icon className="w-8 h-8 text-primary mx-auto" aria-hidden="true" />
                  <h2 className="font-display text-lg font-bold">{item.title}</h2>
                  <p className="text-sm text-muted-foreground leading-6">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {seoPage.contentSections.length > 0 && (
          <section className="py-16 bg-muted/50" aria-label={`Informações sobre ${seoPage.h1}`}>
            <div className="container mx-auto px-4 max-w-5xl">
              <div className="grid gap-8 lg:grid-cols-2">
                {seoPage.contentSections.map((section, index) => (
                  <motion.article
                    key={section.title}
                    className={index === 0 && seoPage.contentSections.length % 2 === 1 ? "lg:col-span-2" : ""}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <h2 className="font-display text-2xl sm:text-3xl font-black text-foreground">
                      {section.title}
                    </h2>
                    <div className="mt-4 space-y-4 text-muted-foreground leading-7">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>
        )}

        {seoPage.relatedLinks.length > 0 && (
          <section className="py-14 sm:py-16" aria-labelledby="related-pages-title">
            <div className="container mx-auto px-4 max-w-5xl">
              <div className="max-w-2xl">
                <h2 id="related-pages-title" className="font-display text-2xl sm:text-3xl font-black text-foreground">
                  Informações relacionadas em Pelotas
                </h2>
                <p className="mt-3 text-muted-foreground leading-7">
                  Continue pelas páginas que ajudam a escolher o produto, entender o atendimento ou confirmar seu pedido.
                </p>
              </div>

              <nav className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-label="Páginas relacionadas">
                {seoPage.relatedLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40 hover:bg-muted"
                  >
                    <span className="font-display text-lg font-bold text-foreground">{link.label}</span>
                    <span className="mt-2 block text-sm leading-6 text-muted-foreground">{link.description}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </section>
        )}

        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4 max-w-3xl">
            <motion.h2
              className="font-display text-2xl sm:text-3xl font-black text-foreground text-center mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Perguntas frequentes
            </motion.h2>

            <div className="space-y-5">
              {seoPage.faqs.map((faq, index) => (
                <motion.article
                  key={faq.q}
                  className="bg-background rounded-xl p-6 shadow-sm"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                >
                  <h3 className="font-bold text-foreground mb-2">{faq.q}</h3>
                  <p className="text-sm text-muted-foreground leading-6">{faq.a}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-primary relative overflow-hidden">
          <div className="texture-business-dark" />
          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
              <h2 className="font-display text-2xl sm:text-3xl font-black mb-4 text-primary-foreground">
                Confirme seu pedido em Pelotas
              </h2>
              <p className="text-primary-foreground/80 mb-6 max-w-2xl mx-auto leading-7">
                Atendimento {BUSINESS_HOURS.toLowerCase()}. Informe seu endereço para confirmar disponibilidade e prazo de entrega.
              </p>
              <Button asChild size="lg" className="bg-cta hover:bg-cta-hover rounded-full font-bold text-lg px-10 shadow-xl text-white">
                <a
                  href={appendUtmToWhatsAppLink(getWhatsAppLink(WHATSAPP_MESSAGES.order))}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${seoPage.h1}: confirmar pedido pelo WhatsApp`}
                  onClick={() => trackWhatsAppClick(`page_${seoPage.slug}_cta_final`)}
                >
                  <MessageCircle className="w-5 h-5" aria-hidden="true" />
                  Pedir pelo WhatsApp
                </a>
              </Button>
            </motion.div>
          </div>
        </section>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLD) }} />
      </main>

      <Footer />
      <WhatsAppFloat />
      <MobileBar />
    </div>
  );
};

export default PageTemplate;
