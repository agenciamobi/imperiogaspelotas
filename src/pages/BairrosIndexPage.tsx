import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import MobileBar from "@/components/MobileBar";
import { Button } from "@/components/ui/button";
import { bairros } from "@/lib/bairros";
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

const PAGE_PATH = "/bairros-atendidos-pelotas";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const PAGE_TITLE = "Bairros Atendidos em Pelotas RS | Império Gás e Água";
const PAGE_DESCRIPTION =
  "Consulte os bairros apresentados como área de atendimento da Império Gás e Água em Pelotas/RS. Confirme cobertura, disponibilidade e prazo para seu endereço pelo WhatsApp.";

const BairrosIndexPage = () => {
  useEffect(() => {
    document.title = PAGE_TITLE;

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

    setMeta('meta[name="description"]', "content", PAGE_DESCRIPTION);
    setMeta('meta[name="robots"]', "content", "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1");
    setMeta('link[rel="canonical"]', "href", PAGE_URL);
    setMeta('meta[property="og:type"]', "content", "website");
    setMeta('meta[property="og:url"]', "content", PAGE_URL);
    setMeta('meta[property="og:title"]', "content", PAGE_TITLE);
    setMeta('meta[property="og:description"]', "content", PAGE_DESCRIPTION);
    setMeta('meta[name="twitter:title"]', "content", PAGE_TITLE);
    setMeta('meta[name="twitter:description"]', "content", PAGE_DESCRIPTION);

    window.scrollTo(0, 0);
  }, []);

  const organizationId = `${SITE_URL}/#organization`;
  const webSiteId = `${SITE_URL}/#website`;

  const schemaLD = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: BUSINESS_NAME,
        url: `${SITE_URL}/`,
        telephone: [PHONE_DISPLAY, PHONE_LANDLINE],
        areaServed: { "@type": "City", name: "Pelotas" },
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
        "@type": "CollectionPage",
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: PAGE_TITLE,
        description: PAGE_DESCRIPTION,
        inLanguage: "pt-BR",
        isPartOf: { "@id": webSiteId },
        about: { "@id": organizationId },
        mainEntity: { "@id": `${PAGE_URL}#bairros` },
      },
      {
        "@type": "ItemList",
        "@id": `${PAGE_URL}#bairros`,
        name: "Bairros apresentados como área de atendimento em Pelotas",
        numberOfItems: bairros.length,
        itemListElement: bairros.map((bairro, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: bairro.nome,
          url: `${SITE_URL}/bairro/${bairro.slug}`,
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${PAGE_URL}#breadcrumb`,
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
            name: "Bairros atendidos em Pelotas",
            item: PAGE_URL,
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-32 sm:pt-44">
        <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/90 py-16 sm:py-20 text-primary-foreground">
          <div className="texture-business-dark" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-primary-foreground/70">
                <Link to="/" className="inline-flex items-center gap-2 hover:text-primary-foreground transition-colors">
                  <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                  Início
                </Link>
                <span aria-hidden="true">/</span>
                <span aria-current="page" className="text-primary-foreground/90">Bairros atendidos</span>
              </nav>

              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold border border-white/15">
                <MapPin className="w-4 h-4" aria-hidden="true" />
                Pelotas, Rio Grande do Sul
              </div>

              <h1 className="mt-5 max-w-4xl font-display text-3xl sm:text-4xl md:text-5xl font-black leading-tight">
                Bairros atendidos em Pelotas
              </h1>

              <p className="mt-5 max-w-3xl text-lg leading-8 text-primary-foreground/80">
                Consulte as áreas apresentadas no site para pedidos de gás de cozinha e água mineral em Pelotas.
                O endereço completo é usado para confirmar cobertura, disponibilidade e prazo antes da entrega.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" className="rounded-full bg-cta text-white hover:bg-cta-hover font-bold">
                  <a
                    href={appendUtmToWhatsAppLink(getWhatsAppLink(WHATSAPP_MESSAGES.order))}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Consultar atendimento em Pelotas pelo WhatsApp"
                    onClick={() => trackWhatsAppClick("bairros_hub_hero")}
                  >
                    <MessageCircle className="w-5 h-5" aria-hidden="true" />
                    Consultar pelo WhatsApp
                  </a>
                </Button>
                <Button asChild size="lg" className="rounded-full border-2 border-white/40 bg-white/10 text-white hover:bg-white/20 font-bold">
                  <a
                    href={`tel:+${WHATSAPP_NUMBER}`}
                    aria-label="Ligar para consultar atendimento em Pelotas"
                    onClick={() => trackPhoneClick("bairros_hub_hero")}
                  >
                    <Phone className="w-5 h-5" aria-hidden="true" />
                    {PHONE_DISPLAY}
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-14 sm:py-16" aria-labelledby="como-confirmar-cobertura">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid gap-5 sm:grid-cols-3">
              <article className="rounded-2xl border border-border bg-card p-6">
                <MapPin className="w-7 h-7 text-primary" aria-hidden="true" />
                <h2 id="como-confirmar-cobertura" className="mt-4 font-display text-lg font-bold text-foreground">Confirme pelo endereço</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  O bairro ajuda a localizar a região, mas a confirmação final é feita com o endereço informado no pedido.
                </p>
              </article>
              <article className="rounded-2xl border border-border bg-card p-6">
                <Clock className="w-7 h-7 text-primary" aria-hidden="true" />
                <h2 className="mt-4 font-display text-lg font-bold text-foreground">Horário informado</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{BUSINESS_HOURS}. Para pedidos próximos ao encerramento, confirme a possibilidade de entrega.</p>
              </article>
              <article className="rounded-2xl border border-border bg-card p-6">
                <MessageCircle className="w-7 h-7 text-primary" aria-hidden="true" />
                <h2 className="mt-4 font-display text-lg font-bold text-foreground">Pedido direto</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  WhatsApp {PHONE_DISPLAY} · Telefone {PHONE_LANDLINE}. Informe produto e endereço para receber a previsão.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="bg-muted py-16" aria-labelledby="lista-bairros">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="max-w-3xl">
              <h2 id="lista-bairros" className="font-display text-2xl sm:text-3xl font-black text-foreground">
                Áreas de atendimento apresentadas no site
              </h2>
              <p className="mt-3 text-muted-foreground leading-7">
                Selecione um bairro para abrir a página local. A disponibilidade deve ser confirmada para o endereço exato no momento do pedido.
              </p>
            </div>

            <nav className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" aria-label="Bairros atendidos em Pelotas">
              {bairros.map((bairro, index) => (
                <motion.div
                  key={bairro.slug}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: Math.min(index, 8) * 0.03 }}
                >
                  <Link
                    to={`/bairro/${bairro.slug}`}
                    className="block h-full rounded-2xl border border-border bg-background p-5 transition-colors hover:border-primary/40 hover:bg-card"
                    aria-label={`Ver atendimento no bairro ${bairro.nome}, Pelotas`}
                  >
                    <span className="inline-flex items-center gap-2 font-display text-lg font-bold text-foreground">
                      <MapPin className="w-4 h-4 text-primary" aria-hidden="true" />
                      {bairro.nome}
                    </span>
                    <span className="mt-2 block text-sm leading-6 text-muted-foreground">
                      Consulte gás de cozinha e água mineral para este bairro e confirme seu endereço pelo WhatsApp.
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>
          </div>
        </section>

        <section className="py-16" aria-labelledby="servicos-relacionados">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 id="servicos-relacionados" className="font-display text-2xl sm:text-3xl font-black text-foreground">
              Serviços relacionados em Pelotas
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <Link to="/disk-gas-pelotas" className="rounded-2xl border border-border bg-card p-5 hover:border-primary/40 transition-colors">
                <span className="font-display text-lg font-bold text-foreground">Disk gás em Pelotas</span>
                <span className="mt-2 block text-sm leading-6 text-muted-foreground">Veja produtos e como fazer o pedido de gás.</span>
              </Link>
              <Link to="/agua-mineral-pelotas" className="rounded-2xl border border-border bg-card p-5 hover:border-primary/40 transition-colors">
                <span className="font-display text-lg font-bold text-foreground">Água mineral em Pelotas</span>
                <span className="mt-2 block text-sm leading-6 text-muted-foreground">Consulte informações sobre galão de água mineral 20L.</span>
              </Link>
              <Link to="/fale-conosco" className="rounded-2xl border border-border bg-card p-5 hover:border-primary/40 transition-colors">
                <span className="font-display text-lg font-bold text-foreground">Contato e atendimento</span>
                <span className="mt-2 block text-sm leading-6 text-muted-foreground">Acesse WhatsApp, telefones e horário informado.</span>
              </Link>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-primary py-16 text-center text-primary-foreground">
          <div className="texture-business-dark" />
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="font-display text-2xl sm:text-3xl font-black">Confirme atendimento para seu endereço</h2>
            <p className="mx-auto mt-4 max-w-2xl leading-7 text-primary-foreground/80">
              Informe bairro, endereço e produto. A equipe confirma cobertura, disponibilidade e prazo antes de concluir o pedido.
            </p>
            <Button asChild size="lg" className="mt-6 rounded-full bg-cta px-10 text-white hover:bg-cta-hover font-bold">
              <a
                href={appendUtmToWhatsAppLink(getWhatsAppLink(WHATSAPP_MESSAGES.order))}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Confirmar atendimento em Pelotas pelo WhatsApp"
                onClick={() => trackWhatsAppClick("bairros_hub_cta")}
              >
                <MessageCircle className="w-5 h-5" aria-hidden="true" />
                Consultar pelo WhatsApp
              </a>
            </Button>
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

export default BairrosIndexPage;
