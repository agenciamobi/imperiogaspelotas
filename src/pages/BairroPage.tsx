import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Clock, Droplets, Flame, MapPin, MessageCircle, Phone, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import MobileBar from "@/components/MobileBar";
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
import {
  appendUtmToWhatsAppLink,
  trackPhoneClick,
  trackProductClick,
  trackWhatsAppClick,
} from "@/lib/tracking";
import { motion } from "framer-motion";

const products = [
  {
    icon: Flame,
    title: "Botijão P13",
    description: "Botijão de GLP com capacidade de 13 kg.",
    path: "/produto/botijao-p13",
  },
  {
    icon: Flame,
    title: "Botijão P08",
    description: "Botijão de GLP com capacidade de 8 kg.",
    path: "/produto/botijao-p08",
  },
  {
    icon: Flame,
    title: "Liquinho 2kg",
    description: "Botijão compacto com capacidade de 2 kg.",
    path: "/produto/liquinho-2kg",
  },
  {
    icon: Droplets,
    title: "Água Mineral 20L",
    description: "Galão de água mineral de 20 litros.",
    path: "/produto/agua-mineral-20l",
  },
];

const BairroPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const bairro = bairros.find((item) => item.slug === slug);

  useEffect(() => {
    if (!bairro) return;

    const title = `Disk Gás e Água no ${bairro.nome}, Pelotas | Império Gás`;
    const description = `Peça gás de cozinha ou água mineral no bairro ${bairro.nome}, em Pelotas/RS. Consulte disponibilidade e prazo para seu endereço pelo WhatsApp ou telefone.`;
    const url = `${SITE_URL}/bairro/${bairro.slug}`;

    document.title = title;

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

    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[name="robots"]', "content", "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1");
    setMeta('link[rel="canonical"]', "href", url);
    setMeta('meta[property="og:type"]', "content", "website");
    setMeta('meta[property="og:url"]', "content", url);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[name="twitter:title"]', "content", title);
    setMeta('meta[name="twitter:description"]', "content", description);

    window.scrollTo(0, 0);
  }, [bairro]);

  if (!bairro) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Bairro não encontrado</h1>
        <Link to="/" className="text-primary underline underline-offset-4">
          Voltar para a página inicial
        </Link>
      </div>
    );
  }

  const currentIndex = bairros.findIndex((item) => item.slug === bairro.slug);
  const otherBairros = [...bairros.slice(currentIndex + 1), ...bairros.slice(0, currentIndex)]
    .filter((item) => item.slug !== bairro.slug)
    .slice(0, 8);

  const whatsappMessage = `Olá! Quero consultar gás/água para entrega no bairro ${bairro.nome}, em Pelotas.`;
  const pageUrl = `${SITE_URL}/bairro/${bairro.slug}`;
  const organizationId = `${SITE_URL}/#organization`;
  const webSiteId = `${SITE_URL}/#website`;
  const serviceId = `${pageUrl}#service`;

  const faqLocal = [
    {
      q: `A Império atende o bairro ${bairro.nome} em Pelotas?`,
      a: `O bairro ${bairro.nome} consta entre as áreas de atendimento apresentadas no site. Envie o endereço completo pelo WhatsApp para confirmar cobertura, disponibilidade e prazo no momento do pedido.`,
    },
    {
      q: `Quais produtos posso consultar para o ${bairro.nome}?`,
      a: "O site apresenta botijão P13 de 13 kg, P08 de 8 kg, Liquinho de 2 kg e galão de água mineral de 20 litros. A disponibilidade de cada item é confirmada no atendimento.",
    },
    {
      q: `Qual é o prazo de entrega no ${bairro.nome}?`,
      a: `O prazo varia conforme endereço, horário, rota e disponibilidade operacional. A previsão para o ${bairro.nome} é informada pela equipe depois que o endereço e o produto são confirmados.`,
    },
    {
      q: `Como pedir gás ou água no ${bairro.nome}?`,
      a: `Chame pelo WhatsApp ou telefone, informe que o endereço fica no bairro ${bairro.nome} e diga qual produto precisa. A equipe confirma os dados antes da entrega.`,
    },
  ];

  const schemaLD = {
    "@context": "https://schema.org",
    "@graph": [
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
        "@type": "Service",
        "@id": serviceId,
        name: `Entrega de gás e água no bairro ${bairro.nome}, Pelotas`,
        description: `Atendimento para pedidos de gás de cozinha e água mineral no bairro ${bairro.nome}, em Pelotas/RS, com disponibilidade e prazo confirmados para o endereço informado.`,
        url: pageUrl,
        provider: { "@id": organizationId },
        areaServed: {
          "@type": "Place",
          name: `${bairro.nome}, Pelotas, RS`,
        },
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: `Disk Gás e Água no ${bairro.nome}, Pelotas | Império Gás`,
        description: `Peça gás de cozinha ou água mineral no bairro ${bairro.nome}, em Pelotas/RS. Consulte disponibilidade e prazo para seu endereço.`,
        inLanguage: "pt-BR",
        isPartOf: { "@id": webSiteId },
        about: { "@id": organizationId },
        mainEntity: { "@id": serviceId },
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
            name: "Bairros atendidos em Pelotas",
            item: `${SITE_URL}/#atendimento-pelotas`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: bairro.nome,
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: faqLocal.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.a,
          },
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-32 sm:pt-44">
        <section className="bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground py-16 sm:py-20 relative overflow-hidden">
          <div className="texture-business-dark" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-sm text-primary-foreground/70">
                <Link to="/" className="inline-flex items-center gap-2 hover:text-primary-foreground transition-colors">
                  <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                  Início
                </Link>
                <span aria-hidden="true">/</span>
                <span>Bairros atendidos</span>
                <span aria-hidden="true">/</span>
                <span aria-current="page" className="text-primary-foreground/90">{bairro.nome}</span>
              </nav>

              <Badge variant="secondary" className="mb-4">
                <MapPin className="w-3 h-3 mr-1" aria-hidden="true" />
                {bairro.nome} — Pelotas RS
              </Badge>

              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-4">
                Disk Gás e Água no {bairro.nome}
                <span className="block text-secondary">Pelotas RS</span>
              </h1>

              <p className="text-lg text-primary-foreground/80 max-w-3xl mb-8 leading-8">
                Consulte gás de cozinha e água mineral para entrega no bairro {bairro.nome}, em Pelotas.
                Informe seu endereço pelo WhatsApp para confirmar disponibilidade, cobertura e prazo antes do pedido.
              </p>

              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg" className="bg-cta hover:bg-cta-hover rounded-full font-bold shadow-lg text-white">
                  <a
                    href={appendUtmToWhatsAppLink(getWhatsAppLink(whatsappMessage))}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Consultar entrega de gás ou água no ${bairro.nome} pelo WhatsApp`}
                    onClick={() => trackWhatsAppClick(`bairro_${bairro.slug}_hero`)}
                  >
                    <MessageCircle className="w-5 h-5" aria-hidden="true" />
                    Consultar pelo WhatsApp
                  </a>
                </Button>
                <Button asChild size="lg" className="bg-white/15 border-2 border-white/40 text-white hover:bg-white/25 rounded-full font-bold">
                  <a
                    href={`tel:+${WHATSAPP_NUMBER}`}
                    aria-label={`Ligar para consultar atendimento no ${bairro.nome}`}
                    onClick={() => trackPhoneClick(`bairro_${bairro.slug}_hero`)}
                  >
                    <Phone className="w-5 h-5" aria-hidden="true" />
                    {PHONE_DISPLAY}
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-14 sm:py-16" aria-labelledby="bairro-como-funciona">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="max-w-2xl">
              <h2 id="bairro-como-funciona" className="font-display text-2xl sm:text-3xl font-black text-foreground">
                Como funciona o atendimento no {bairro.nome}
              </h2>
              <p className="mt-3 text-muted-foreground leading-7">
                O endereço é a informação principal para confirmar o atendimento local com precisão.
              </p>
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-3">
              {[
                {
                  icon: MapPin,
                  title: "Informe o endereço",
                  description: `Envie o endereço no ${bairro.nome} para confirmar a área atendida.`,
                },
                {
                  icon: MessageCircle,
                  title: "Informe o produto",
                  description: "Diga se precisa de P13, P08, Liquinho 2kg ou água mineral 20L.",
                },
                {
                  icon: Truck,
                  title: "Receba a previsão",
                  description: "A equipe confirma disponibilidade e prazo antes de concluir o pedido.",
                },
              ].map((item, index) => (
                <motion.article
                  key={item.title}
                  className="rounded-2xl border border-border bg-card p-6"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                >
                  <item.icon className="w-7 h-7 text-primary" aria-hidden="true" />
                  <h3 className="mt-4 font-display text-lg font-bold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted" aria-labelledby="bairro-produtos">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center max-w-3xl mx-auto">
              <h2 id="bairro-produtos" className="font-display text-2xl sm:text-3xl font-black text-foreground">
                Produtos para consultar no {bairro.nome}
              </h2>
              <p className="mt-3 text-muted-foreground leading-7">
                Consulte a disponibilidade de cada item no momento do pedido. As páginas abaixo explicam os formatos apresentados no site.
              </p>
            </div>

            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product, index) => (
                <motion.article
                  key={product.title}
                  className="bg-background rounded-2xl p-6 shadow-sm border border-border text-center space-y-3"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                >
                  <product.icon className="w-10 h-10 text-primary mx-auto" aria-hidden="true" />
                  <h3 className="font-display text-lg font-bold">{product.title}</h3>
                  <p className="text-sm text-muted-foreground leading-6">{product.description}</p>
                  <Link
                    to={product.path}
                    className="inline-flex text-sm font-semibold text-primary underline-offset-4 hover:underline"
                    aria-label={`Ver informações sobre ${product.title} em Pelotas`}
                  >
                    Ver informações do produto
                  </Link>
                  <Button asChild className="w-full bg-cta hover:bg-cta-hover text-white rounded-full font-bold">
                    <a
                      href={appendUtmToWhatsAppLink(getWhatsAppLink(WHATSAPP_MESSAGES.product(product.title)))}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Consultar ${product.title} para o bairro ${bairro.nome} pelo WhatsApp`}
                      onClick={() => trackProductClick(product.title)}
                    >
                      <MessageCircle className="w-4 h-4" aria-hidden="true" />
                      Consultar disponibilidade
                    </a>
                  </Button>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-16" aria-labelledby="bairro-atendimento-info">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid gap-5 sm:grid-cols-3 text-center">
              <div className="rounded-2xl border border-border bg-card p-6">
                <MapPin className="w-8 h-8 text-primary mx-auto" aria-hidden="true" />
                <h2 className="mt-3 font-display text-lg font-bold">Área de atendimento</h2>
                <p className="mt-2 text-sm text-muted-foreground leading-6">{bairro.nome}, Pelotas/RS. Confirme o endereço exato no pedido.</p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-6">
                <Clock className="w-8 h-8 text-primary mx-auto" aria-hidden="true" />
                <h2 className="mt-3 font-display text-lg font-bold">Horário informado</h2>
                <p className="mt-2 text-sm text-muted-foreground leading-6">{BUSINESS_HOURS}.</p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-6">
                <Phone className="w-8 h-8 text-primary mx-auto" aria-hidden="true" />
                <h2 className="mt-3 font-display text-lg font-bold">Canais de pedido</h2>
                <p className="mt-2 text-sm text-muted-foreground leading-6">WhatsApp {PHONE_DISPLAY} · Telefone {PHONE_LANDLINE}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted" aria-labelledby="bairro-faq">
          <div className="container mx-auto px-4 max-w-3xl">
            <motion.h2
              id="bairro-faq"
              className="font-display text-2xl sm:text-3xl font-black text-foreground text-center mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Perguntas sobre atendimento no {bairro.nome}
            </motion.h2>

            <div className="space-y-5">
              {faqLocal.map((faq, index) => (
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

        <section className="py-14 sm:py-16" aria-labelledby="outros-bairros">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="max-w-2xl">
              <h2 id="outros-bairros" className="font-display text-2xl sm:text-3xl font-black text-foreground">
                Outros bairros atendidos em Pelotas
              </h2>
              <p className="mt-3 text-muted-foreground leading-7">
                Consulte outras áreas de atendimento ou volte para a página principal de disk gás em Pelotas.
              </p>
            </div>

            <nav className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4" aria-label="Outros bairros atendidos em Pelotas">
              {otherBairros.map((item) => (
                <Link
                  key={item.slug}
                  to={`/bairro/${item.slug}`}
                  className="rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  {item.nome}
                </Link>
              ))}
            </nav>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/disk-gas-pelotas" className="text-sm font-semibold text-primary underline-offset-4 hover:underline">
                Disk gás em Pelotas
              </Link>
              <Link to="/agua-mineral-pelotas" className="text-sm font-semibold text-primary underline-offset-4 hover:underline">
                Água mineral em Pelotas
              </Link>
              <Link to="/fale-conosco" className="text-sm font-semibold text-primary underline-offset-4 hover:underline">
                Contato e atendimento
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 bg-primary text-primary-foreground text-center relative overflow-hidden">
          <div className="texture-business-dark" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
              <h2 className="font-display text-2xl sm:text-3xl font-black mb-4">
                Confirme atendimento no {bairro.nome}
              </h2>
              <p className="text-primary-foreground/80 mb-6 max-w-2xl mx-auto leading-7">
                Informe seu endereço e o produto desejado. A equipe confirma disponibilidade e prazo antes de concluir o pedido.
              </p>
              <Button asChild size="lg" className="bg-cta hover:bg-cta-hover rounded-full font-bold text-lg px-10 shadow-xl text-white">
                <a
                  href={appendUtmToWhatsAppLink(getWhatsAppLink(whatsappMessage))}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Confirmar atendimento no bairro ${bairro.nome} pelo WhatsApp`}
                  onClick={() => trackWhatsAppClick(`bairro_${bairro.slug}_cta_final`)}
                >
                  <MessageCircle className="w-5 h-5" aria-hidden="true" />
                  Consultar pelo WhatsApp
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

export default BairroPage;
